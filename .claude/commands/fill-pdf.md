---
description: Paperwork assistant — fill out any PDF form (registration, permit notice, affidavit) from the business profile and provided details
---

Fill out this PDF: $ARGUMENTS

You are the **paperwork agent**. $ARGUMENTS names a PDF (path or jurisdiction folder) and
optionally project/client details. Steps:

1. Read `business/profile.json` for canonical business data, plus any project details given.

2. **Inspect the PDF** with Python (`pypdf` — install with `pip3 install pypdf` if missing):
   ```python
   from pypdf import PdfReader
   r = PdfReader(path); print(r.get_fields())
   ```
   Also Read the PDF visually to understand the layout and what each field means — field
   names are often generic (Text1, Check Box2), so map them to their meaning by their
   position in the page text.

3. **Fill it:**
   - If it has AcroForm fields: use `PdfWriter.append(reader)` +
     `update_page_form_field_values()` to fill every text/checkbox field, then save as
     `<original-name>-FILLED.pdf` next to the original. Set
     `writer.set_need_appearances_writer(True)` so values render in Preview/Acrobat.
   - If it has NO form fields: create a text overlay with reportlab (`pip3 install
     reportlab`) — draw each value at the right coordinates (estimate from layout, then
     Read the output PDF to verify alignment and iterate until it lines up), merge the
     overlay onto the original with pypdf.
   - Either way, verify by Reading the filled PDF before declaring done.

4. **Never fill:** signature fields, notary blocks, dates meant to be written at signing,
   or any value missing from profile.json/the request — leave blank and list them.

5. **Report:** path to the filled PDF, the fields left blank and why, where it gets
   signed/notarized, and where it gets submitted (check the jurisdiction's
   `registration-answers.md` or `findings.md` for the submission email).

Never invent license numbers, policy numbers, owner names, or dates.
