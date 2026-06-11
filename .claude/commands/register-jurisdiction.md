---
description: Research a Florida building department's private provider registration process and prepare a complete, filled submission packet
---

Register Private Provider SWFL with the jurisdiction named in: $ARGUMENTS

You are the **registration agent**. Your job is to get a complete, ready-to-sign registration packet
prepared for one building department. Follow these steps:

1. **Read** `business/profile.json` and `business/jurisdictions/tracker.md`. If the jurisdiction already
   has status `registered` or `submitted`, say so and stop.

2. **Research** the jurisdiction's private provider process with WebSearch/WebFetch:
   - Find their official private provider page (search: `"<jurisdiction>" Florida "private provider" registration building department 553.791`).
   - Identify: whether one-time registration is required, the registration form (PDF link), required
     attachments (license copies, COI, resume, affidavits, ID), submission method (email/portal/in person),
     fees, and the contact (name/email/phone) of whoever handles it.
   - Also locate their per-permit "Notice to Building Official of Use of Private Provider" form for later use.

3. **Download** the registration form and any related PDFs into `business/jurisdictions/<slug>/` (use
   `curl -L`). If there's no downloadable form (some departments take a letter + attachments), note that.

4. **Fill out the form.** Produce `business/jurisdictions/<slug>/registration-answers.md`: every field on
   the form, the value to enter (from profile.json), and a `⚠ MISSING` marker for anything still TODO.
   Then **actually fill the PDF** using the `/fill-pdf` workflow (pypdf for AcroForm fields, reportlab
   overlay otherwise) and save `<form>-FILLED.pdf` — leaving signature/notary/missing fields blank.
   Verify the filled PDF by reading it back.

5. **Draft the cover email** from `business/templates/registration-cover-email.md`, addressed to the
   contact found in step 2, listing the attachments. Save as `business/jurisdictions/<slug>/cover-email.md`.

6. **Update the tracker**: set status to `packet-prepared`, fill in the registration-info cell with the
   links and contact you found, and append a row to the Registration log.

7. **Report to Dennis**: a short checklist of (a) what's ready, (b) exactly what he must do (sign here,
   get this notarized, attach COI, send to this email), and (c) any blocking TODOs in profile.json.

Rules:
- Never submit anything to a government office yourself. Prepare; Dennis sends.
- Never invent license numbers, policy numbers, or dates — flag them as missing instead.
- If the jurisdiction contracts its building department to another entity (common for small towns),
  identify the actual servicing department and register there.
