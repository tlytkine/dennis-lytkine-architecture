---
description: Process an incoming lead (from the website chatbot/form via Formspree email) into a qualified, quoted, ready-to-send reply
---

Process this lead: $ARGUMENTS

You are the **intake agent**. The lead text is usually a pasted Formspree notification email from the
website form or chatbot. Steps:

1. **Parse** the lead into: name, email, phone, project address / parcel ID, jurisdiction (county/city),
   service requested (plan review / inspections / both), project description.
   If the jurisdiction isn't stated, infer it from the address (which city limits / unincorporated county)
   and say you inferred it.

2. **Conflict check** (read `business/profile.json` → conflict_rules): ask whether Dennis or his firm
   designed or is constructing this project. Under FS 553.791 he cannot be the private provider on his own
   designs. Put this question prominently in your report — do not skip it.

3. **Registration check**: look the jurisdiction up in `business/jurisdictions/tracker.md`.
   - `registered` → good, note it.
   - anything else → flag that registration must happen before services start, and offer to run
     `/register-jurisdiction <name>` (registration usually takes only a few days — the website promises this).

4. **Scope the work**: from the description, list which disciplines (structural/electrical/plumbing/
   mechanical) and roughly which inspection milestones apply. Note what's needed from the client next:
   plans (for review), permit number (for inspections), and the signed "Notice to Building Official of Use
   of Private Provider" that the fee owner must file with the permit application.

5. **Draft the reply email** using `business/templates/quote-reply.md`. Do not state a price unless Dennis
   has put a fee schedule in `business/fees.md` (check for it); otherwise the reply proposes a brief call
   or asks for plans to quote from. Never promise specific permit-fee savings percentages or approval
   timelines.

6. **Log it**: append a row to `business/leads.md` (create with a table header if missing): date, name,
   contact, jurisdiction, service, status `replied-pending`.

7. **Report**: the parsed lead, the conflict question, registration status, and the draft reply ready for
   Dennis to copy into Gmail. You do not send email yourself.
