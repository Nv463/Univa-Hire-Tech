# UNIVA Supabase setup

Project: `univa-production` (Mumbai / `ap-south-1`)

## First administrator account

Public sign-ups must remain disabled. New Auth users are created with the `Pending` role and cannot access staff data.

1. In Supabase Dashboard, open **Authentication → Sign In / Providers → Email** and disable public sign-ups.
2. Open **Authentication → Users → Add user** and create the first administrator using the company's real staff email and a strong unique password.
3. In **SQL Editor**, run the following after replacing the email:

```sql
update public.staff_profiles
set role = 'Admin', updated_at = now()
where lower(email) = lower('YOUR_ADMIN_EMAIL');
```

4. Confirm one row was updated. The new account can now sign in at `https://univa-hire-tech.vercel.app/recruiter`.

## Add recruiters

Create each recruiter under **Authentication → Users → Add user**. Their profile is created with `Pending` role automatically. Promote an approved staff account with:

```sql
update public.staff_profiles
set role = 'Recruiter', updated_at = now()
where lower(email) = lower('RECRUITER_EMAIL');
```

Do not enable public sign-ups. Do not put a Supabase secret/service-role key in frontend code or GitHub.

## Storage

Candidate CVs are stored in the private `candidate-resumes` bucket. PDF-only, 5 MB maximum. Anonymous users may upload only; only approved UNIVA staff can read files.


## Password recovery links

In Supabase Dashboard, open **Authentication → URL Configuration**. Set the Site URL to `https://univa-hire-tech.vercel.app` and add `https://univa-hire-tech.vercel.app/recruiter/reset-password` to the Redirect URLs list. The staff portal sends recovery links to this production URL. Keep `http://localhost:3000/recruiter/reset-password` only if you also need local development.
