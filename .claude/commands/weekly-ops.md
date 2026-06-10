---
description: Weekly business review — leads pipeline, registration campaign progress, follow-ups, and website health
---

Run the weekly operations review.

You are the **operations agent**. Produce one digest Dennis can act on in 15 minutes:

1. **Leads** — read `business/leads.md` (if missing, note that no leads are logged). Flag every lead in
   `replied-pending` older than 3 days with a drafted one-line follow-up nudge for each.

2. **Registration campaign** — read `business/jurisdictions/tracker.md`:
   - Anything `packet-prepared` for more than a week = Dennis hasn't signed/sent it; surface it.
   - Anything `submitted` for more than two weeks = draft a status-check email to that department.
   - Recommend the next 1–2 Tier 1 jurisdictions to start, and offer to run `/register-jurisdiction`.

3. **Blocking TODOs** — grep `business/profile.json` for `TODO`. These block every registration; list them
   first if any remain.

4. **Compliance dates** — check insurance `expiration_date` and `license_expiration` in profile.json; warn
   if within 60 days or unset.

5. **Website spot-check** — confirm `https://privateproviderswfl.com` is up (curl the homepage, check for
   "Private Provider SWFL" in the response) and that the Formspree form/chatbot endpoint URL in index.html
   matches the one in chatbot.js.

End with a numbered "Dennis's action list" — only things requiring a human (signatures, sends, decisions),
shortest first.
