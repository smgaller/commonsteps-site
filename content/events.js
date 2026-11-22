// Events. Add one block per event. Upcoming events appear under "Upcoming dates",
// sorted by date. The day after an event, it moves to "Past events" on its own,
// newest first, so there's no need to delete anything.
//
//   title       Name of the event
//   date        "YYYY-MM-DD" (for a series, its first date)
//   until       Optional "YYYY-MM-DD" last date, for a series such as a summer season.
//               A series shows its months ("Jun–Sep") instead of a single day.
//   start/end   Times like "7:00pm" or "19:00" (leave "" to show "Time to be announced")
//   when        Optional text shown in place of the times, e.g. "Fridays, all summer"
//   venue       Venue name
//   area        Neighborhood and city
//   note        Optional one-line description
//   link        Optional ticket or RSVP address (shown while the event is upcoming)
//   linkLabel   Optional text for that link (defaults to "Tickets and details")
//   recapLink   Optional photos or recap address (shown once the event is past)
//   recapLabel  Optional text for that link (defaults to "Photos and recap")

window.COMMON_STEPS_EVENTS = [
  {
    title: "Tango Dance Night at Lou's",
    date: "2026-11-18",
    start: "7:00pm",
    end: "11:00pm",
    venue: "Lou's, 13 Brattle St",
    area: "Harvard Square, Cambridge",
    note: "A beginner tango lesson, then social dancing to music from DJ Facha. No partner needed.",
    link: "",
    linkLabel: "",
    recapLink: "https://www.wearelous.com/lous-live/tango-night",
    recapLabel: "Event page at Lou's"
  },
  {
    title: "Halloween Pulso",
    date: "2026-10-31",
    start: "6:00pm",
    end: "10:00pm",
    venue: "Margaret Jewett Hall, First Church in Cambridge",
    area: "Harvard Square, Cambridge",
    note: "A Halloween milonga mixing classic and alternative tango, with dinner provided.",
    recapLink: "https://www.thebostoncalendar.com/events/halloween-tango-night",
    recapLabel: "Listing on The Boston Calendar"
  },
  {
    title: "Milonga Al Fresco",
    date: "2026-06-01",
    until: "2026-09-30",
    when: "Every Friday evening, all summer",
    venue: "Kendall Urban Park Roof Garden",
    area: "Kendall Square, Cambridge",
    note: "Free outdoor tango with a free beginner lesson. Our second summer season."
  },
  {
    title: "Desde El Amor, Tango",
    date: "2025-11-12",
    start: "7:00pm",
    end: "9:00pm",
    venue: "Kresge Little Theater, MIT",
    area: "Cambridge",
    note: "A sold-out concert by Daniel Binelli (bandoneon) and Polly Ferman (piano), with dancers Hernán Brizuela and Anita Flejter, presented by the MIT Tango Club and followed by a tango social.",
    recapLink: "https://calendar.mit.edu/event/daniel-binelli-and-polly-ferman-desde-el-amor-tango-2025",
    recapLabel: "Event page on the MIT calendar"
  },
  {
    title: "Milonga Clandestina",
    date: "2026-11-12",
    start: "7:00pm",
    end: "11:00pm",
    venue: "Nook and Upstairs at Bow, 1 Bow Market Way",
    area: "Bow Market, Somerville",
    note: "An evening of tango: classic tango music in the Nook and Upstairs, dancing upstairs, and tango-themed drinks. 21+.",
    recapLink: "https://www.upstairsatbow.com/public-events/milonga-clandestina-an-evening-of-tango",
    recapLabel: "Event page at Upstairs at Bow"
  }
];
