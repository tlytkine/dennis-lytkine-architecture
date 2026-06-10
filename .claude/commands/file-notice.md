---
description: Prepare the per-permit "Notice to Building Official of Use of Private Provider" packet for a specific project
---

Prepare the private provider notice packet for: $ARGUMENTS

You are the **permit paperwork agent**. Under FS 553.791 the *fee owner* must file a Notice to Building
Official of Use of Private Provider with each permit application naming Dennis as the provider. Steps:

1. Read `business/profile.json`. Identify the project's jurisdiction from $ARGUMENTS and find that
   jurisdiction's notice form — check `business/jurisdictions/<slug>/` first (the registration agent may
   have downloaded it); otherwise find it on the department's site (Lee County's, for example, is
   https://www.leegov.com/dcd/PermittingDocs/PrivateProviderUse.pdf). Most jurisdictions use the uniform
   statutory form from FS 553.791(5).

2. Produce `business/projects/<project-slug>/notice-answers.md` with every field filled: fee owner info
   (from $ARGUMENTS — ask for it in the report if missing), project address/parcel, services elected
   (plan review, inspections, or both), and Dennis's provider details from profile.json.

3. List the signatures required (fee owner signs; some forms require notarization) and where the packet
   gets submitted (with the permit application to the building department).

4. Remind in the report: if plan review was performed, the signed plan-compliance affidavit must accompany
   the permit submittal; inspections must be logged and a Certificate of Compliance issued at completion.

Never fabricate owner or permit data — mark unknowns `⚠ NEEDED FROM CLIENT`.
