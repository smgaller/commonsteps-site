// Site-wide settings. Change a value here and it updates everywhere on the site.

window.COMMON_STEPS = {
  // Shown in the "Host a night" section.
  contactEmail: "smgaller@gmail.com",

  // Email list signup.
  // `action` is the address signups are sent to. For a Google Form it looks like
  //   https://docs.google.com/forms/d/e/<form id>/formResponse
  // and each field name looks like "entry.123456789" (one per question on the form).
  // While `action` is empty, the form shows a "not connected" note and saves nothing.
  // Currently connected to the Google Form "Sam Tango Mailing List"
  // (questions: Full Name, Email). Signups appear in that form's responses sheet.
  signup: {
    action: "https://docs.google.com/forms/d/e/1FAIpQLSediOkb1ngnE1uDU1TAC0dCQrRgvujBmcwtQCJsejEVkStPWg/formResponse",
    emailField: "entry.463957106",
    nameField: "entry.1860965681"
  }
};
