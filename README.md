# Common Steps website

The site for [commonsteps.us](https://commonsteps.us). Plain HTML, CSS, and JavaScript with no build step: what is in this folder is exactly what gets served.

## What's where

| File | What it holds |
| --- | --- |
| `index.html` | The page: every section's wording lives here |
| `content/events.js` | Upcoming dates |
| `content/settings.js` | Contact email and the email-list connection |
| `assets/site.css` | Colors, type, and layout |
| `assets/site.js` | Renders the dates, the floor plan, the signup form, and the contact line |
| `CNAME` | Tells GitHub Pages the site's domain |

## Common changes

**Add an event.** Copy a block in `content/events.js`, change the values, and save. Events sort by date and disappear on their own the day after they happen. When no events are listed, the section invites people to join the email list.

**Change the contact address.** Edit `contactEmail` in `content/settings.js`.

**Connect the email list.** Signups are sent to the address in `signup.action` in `content/settings.js`, using the field names in `emailField` and `nameField`. For a Google Form linked to the list's spreadsheet, the address is `https://docs.google.com/forms/d/e/<form id>/formResponse` and the field names look like `entry.123456789`; the form's "Get pre-filled link" option shows them. Until `action` is filled in, the form shows a note saying it isn't connected and saves nothing.

**Change colors or type.** Every color and typeface is a named value at the top of `assets/site.css`, with a light set and a dark set.

**Add a section.** Copy one `<section class="band wrap">` block in `index.html`, give it a new `id`, and add a matching link in the header.

**Add a page.** Copy `index.html` to a new file (for example `code-of-conduct.html`), keep the header, footer, and the stylesheet link, and replace what's inside `<main>`. Link to it from the header.

## Publishing

The site is set up for GitHub Pages:

1. Put this folder's contents in a GitHub repository.
2. In the repository, open Settings, then Pages. Publish from the `main` branch, root folder.
3. Under Custom domain, enter `commonsteps.us`.
4. At GoDaddy, in the DNS settings for commonsteps.us, remove the default parked records for `@` and `www`, then add:
   - Four `A` records for `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - One `CNAME` record for `www` pointing to `<your-github-username>.github.io`
5. Back in the Pages settings, turn on Enforce HTTPS once it becomes available. DNS changes and the HTTPS option can each take up to 24 hours.
