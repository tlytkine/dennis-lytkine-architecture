---
description: Read new leads directly from the business Gmail and process each one into a drafted reply
---

Check the lead inbox and process anything new. $ARGUMENTS

You are the **inbox agent**. This command needs the Gmail connector for the business
account (service.privateproviderswfl@gmail.com):

1. If Gmail tools (mcp__claude_ai_Gmail__*) aren't available or authenticated, stop and
   tell the user exactly how to connect: run `/mcp` in Claude Code, choose Gmail, and sign
   in with **service.privateproviderswfl@gmail.com** (not a personal account). Then re-run
   `/check-leads`.

2. Search the inbox for lead emails newer than the last processed date (top of
   `business/leads.md`): senders/subjects from Formspree — "New submission", "Chatbot
   lead:", form name "mbdarwrb". Ignore anything already logged in `business/leads.md`.

3. For each new lead, run the full `/process-lead` workflow (parse → conflict question →
   registration check against `business/jurisdictions/tracker.md` → draft reply from
   `business/templates/quote-reply.md` → log to `business/leads.md`).

4. If the Gmail connector supports creating drafts, save each reply as a **Gmail draft**
   addressed to the lead. **Never send automatically** — quotes and pricing always get
   human review. If drafts aren't supported, put the reply text in your report to copy.

5. Report: one block per lead (who/what/where, conflict question, registration status,
   where the draft is), or "no new leads."
