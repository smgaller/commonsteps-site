(function () {
  "use strict";

  var settings = window.COMMON_STEPS || {};
  var events = window.COMMON_STEPS_EVENTS || [];

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  /* ---------- Floor plan: couples travelling the line of dance ---------- */

  function setUpFloorPlan() {
    var path = document.getElementById("ronda");
    var group = document.getElementById("couples");
    if (!path || !group || !path.getTotalLength) return;

    var SVG_NS = "http://www.w3.org/2000/svg";
    var length = path.getTotalLength();
    var count = 10;
    var gap = 12.5;          // distance between the two dancers of a couple
    var lapMs = 90000;       // one full trip around the floor
    var couples = [];

    for (var i = 0; i < count; i++) {
      var lead = document.createElementNS(SVG_NS, "circle");
      var follow = document.createElementNS(SVG_NS, "circle");
      lead.setAttribute("r", "6");
      follow.setAttribute("r", "6");
      lead.setAttribute("class", "couple-lead");
      follow.setAttribute("class", "couple-follow");
      group.appendChild(lead);
      group.appendChild(follow);
      couples.push({ lead: lead, follow: follow, offset: (i / count) * length });
    }

    function place(travelled) {
      for (var j = 0; j < couples.length; j++) {
        var c = couples[j];
        var a = path.getPointAtLength((c.offset + travelled) % length);
        var b = path.getPointAtLength((c.offset + travelled + gap) % length);
        c.lead.setAttribute("cx", a.x.toFixed(1));
        c.lead.setAttribute("cy", a.y.toFixed(1));
        c.follow.setAttribute("cx", b.x.toFixed(1));
        c.follow.setAttribute("cy", b.y.toFixed(1));
      }
    }

    place(0);

    var stillOnly = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (stillOnly || !window.requestAnimationFrame) return;

    var startedAt = null;
    function tick(now) {
      if (startedAt === null) startedAt = now;
      place(((now - startedAt) / lapMs) * length);
      window.requestAnimationFrame(tick);
    }
    window.requestAnimationFrame(tick);
  }

  /* ---------- Upcoming dates ---------- */

  function parseDay(text) {
    var parts = String(text || "").split("-");
    if (parts.length !== 3) return null;
    var day = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    return isNaN(day.getTime()) ? null : day;
  }

  // Accepts "19:00", "7:00pm", "7:00 PM" or "7pm" and shows "7:00 pm".
  function formatClock(text) {
    var match = /^\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)?\s*$/i.exec(String(text || ""));
    if (!match) return "";
    var hour = Number(match[1]);
    var minute = match[2] || "00";
    var marker = (match[3] || "").toLowerCase();
    if (hour > 23 || (marker && (hour < 1 || hour > 12))) return "";
    var suffix = marker || (hour >= 12 ? "pm" : "am");
    var shown = hour % 12 === 0 ? 12 : hour % 12;
    return shown + ":" + minute + " " + suffix;
  }

  function formatTimes(event) {
    var start = formatClock(event.start);
    var end = formatClock(event.end);
    if (!start) return "Time to be announced";
    if (!end) return start;
    // "5:30 pm to 8:30 pm" reads better as "5:30 to 8:30 pm" when both share am/pm.
    if (start.slice(-2) === end.slice(-2)) start = start.slice(0, -3);
    return start + " to " + end;
  }

  function renderEvents() {
    var list = document.getElementById("event-list");
    if (!list) return;

    var today = new Date();
    today.setHours(0, 0, 0, 0);

    var upcoming = events
      .map(function (event) { return { event: event, day: parseDay(event.date) }; })
      .filter(function (item) { return item.day && item.day >= today; })
      .sort(function (a, b) { return a.day - b.day; });

    if (!upcoming.length) {
      list.appendChild(el("p", "events-empty", "No public dates are scheduled right now. Join the email list and we'll send the next one as soon as it's set."));
      return;
    }

    upcoming.forEach(function (item) {
      var event = item.event;
      var day = item.day;
      var row = el("article", "event");

      var date = el("p", "event-date");
      var weekday = day.toLocaleDateString("en-US", { weekday: "long" });
      var monthDay = day.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      if (day.getFullYear() !== today.getFullYear()) weekday += ", " + day.getFullYear();
      date.appendChild(el("span", "event-weekday", weekday));
      date.appendChild(el("span", "event-day", monthDay));
      row.appendChild(date);

      var body = el("div", "event-body");
      body.appendChild(el("h3", "", event.title));
      var place = [event.venue, event.area].filter(Boolean).join(", ");
      if (place) body.appendChild(el("p", "event-meta", place));
      body.appendChild(el("p", "event-meta", formatTimes(event)));
      if (event.note) body.appendChild(el("p", "", event.note));
      if (event.link) {
        var linkLine = el("p", "event-link");
        var link = el("a", "", event.linkLabel || "Tickets and details");
        link.href = event.link;
        linkLine.appendChild(link);
        body.appendChild(linkLine);
      }
      row.appendChild(body);
      list.appendChild(row);
    });
  }

  /* ---------- Email list ---------- */

  function setUpSignup() {
    var form = document.getElementById("signup-form");
    var status = document.getElementById("signup-status");
    var note = document.getElementById("signup-preview-note");
    var email = document.getElementById("signup-email");
    var name = document.getElementById("signup-name");
    if (!form || !email) return;

    var signup = settings.signup || {};
    var connected = Boolean(signup.action);
    var button = form.querySelector("button[type=submit]");

    function say(message) {
      if (status) status.textContent = message;
    }

    if (!connected && note) note.hidden = false;

    form.addEventListener("submit", function (submitEvent) {
      submitEvent.preventDefault();

      var value = email.value.trim();
      var looksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

      // The mailing list form requires a name, so check here: a signup without
      // one would be dropped without the visitor being told.
      if (name && name.required && !name.value.trim()) {
        say("Enter your name.");
        name.focus();
        return;
      }

      if (!looksValid) {
        say("Enter an email address like name@example.com.");
        email.focus();
        return;
      }

      if (!connected) {
        say("Nothing was saved. This form isn't connected to a mailing list yet.");
        return;
      }

      var fields = new URLSearchParams();
      fields.append(signup.emailField || "email", value);
      var firstName = name ? name.value.trim() : "";
      if (firstName && signup.nameField) fields.append(signup.nameField, firstName);

      if (button) button.disabled = true;
      say("Adding you to the list…");

      // The signup is sent in the background so the visitor stays on this page.
      // Google Forms and most list services don't let another site read their
      // reply, so "no-cors" sends without reading one; only a failed connection
      // shows up as an error here.
      fetch(signup.action, { method: "POST", mode: "no-cors", body: fields })
        .then(function () {
          form.reset();
          say("Thank you for joining the list! We look forward to seeing you at our future events.");
        })
        .catch(function () {
          say("That didn't go through. Check your connection and try again.");
        })
        .then(function () {
          if (button) button.disabled = false;
        });
    });
  }

  /* ---------- Contact ---------- */

  function setUpContact() {
    var link = document.getElementById("contact-email");
    var button = document.getElementById("copy-email");
    var address = settings.contactEmail || "";
    if (!link) return;

    if (!address) {
      link.hidden = true;
      if (button) button.hidden = true;
      return;
    }

    link.textContent = address;
    link.href = "mailto:" + address;

    if (!button) return;
    button.addEventListener("click", function () {
      function selectAddress() {
        var range = document.createRange();
        range.selectNodeContents(link);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        button.textContent = "Address selected";
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(address).then(function () {
          button.textContent = "Copied";
        }, selectAddress);
      } else {
        selectAddress();
      }
    });
  }

  function setYear() {
    var year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  setUpFloorPlan();
  renderEvents();
  setUpSignup();
  setUpContact();
  setYear();
})();
