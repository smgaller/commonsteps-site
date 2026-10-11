// Site-wide settings. Change a value here and it updates everywhere on the site.

window.COMMON_STEPS = {
  // Shown in the "Host a night" section.
  contactEmail: "smgaller@gmail.com",

  // Email list signup.
  // `action` is the address signups are sent to. For a Google Form it looks like
  //   https://docs.google.com/forms/d/e/<form id>/formResponse
  // and each field name looks like "entry.123456789" (one per question on the form).
  // While `action` is empty, the form shows a "not connected" note and saves nothing.
  signup: {
    action: "",
    emailField: "email",
    nameField: "name"
  }
};
