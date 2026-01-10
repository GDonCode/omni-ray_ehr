# Copilot / AI Agent Instructions for omni-ray_ehr

Summary
- This repository is a Next.js (App Router) frontend-only site (Next.js v15, React 19) focused on a dental clinic UI. Primary app code lives under `app/`.

What to edit and why
- UI lives in `app/` (App Router). Pages/components often use `"use client"` at the top — keep stateful UI client-side.
- Appointment flow is in `app/appointment/page.tsx` (multi-step booking state lives in that file). When changing booking behavior update this file and the UI bits in `app/components/StepIndicator.tsx` and `app/components/AppointmentCalendar.js` and the related CSS modules (`app/appointment/new_appointment.module.css`, `app/components/AppointmentCalendar.module.css`).

Key patterns and conventions
- Local fonts: components use `next/font/local` with relative paths such as `../fonts/Noticia_Text/...`. Keep paths consistent and colocated with `app/` tree.
- Styling: Tailwind + CSS Modules. Per-page CSS modules sit next to pages (e.g., `app/appointment/new_appointment.module.css`). Prefer existing CSS module classes for page-level theming.
- Client-only widgets: `react-slick` is dynamically imported with `ssr: false` (see `app/page.tsx`). For any library that relies on window/document, import dynamically the same way.
- Images: static images referenced from `public/`. `next.config.ts` includes `images.domains: ['ui-avatars.com']` — add external domains here before using them in `<Image>`.
- TypeScript: `tsconfig.json` uses `strict: true` and `allowJs: true`. New code should be typed; JS components are allowed but prefer `.tsx` when introducing typed logic.

Dev / build / lint commands
- Dev (uses Turbopack): `npm run dev` (alias for `next dev --turbopack`).
- Build: `npm run build` then `npm run start` to serve production build.
- Lint: `npm run lint` (uses `eslint-config-next`).

Dependencies and integrations to be aware of
- UI libs: `@radix-ui/themes`, `lucide-react`, `react-slick`, `slick-carousel`.
- No server/API routes found in `app/api` — this is a frontend-only repo. If you add API routes, follow Next.js App Router conventions and add server components under `app/api`.

When making changes
- Keep changes small and focused; edit the page/component and its CSS module together.
- If adding a package, update `package.json` and notify to run `npm install` (or preferred package manager). Do not assume new global tooling.
- Preserve `use client` boundaries: moving logic from client to server requires removing client-only APIs (window, useState, etc.) and placing server code under server components or API routes.

Examples (placeholders you can rely on)
- Multi-step booking state: `app/appointment/page.tsx` (fields: `bookingData`, `currentStep`, validation in `validatePersonalInfo`).
- Step UI: `app/components/StepIndicator.tsx` (visual connector + circle states).
- Calendar widget: `app/components/AppointmentCalendar.js` (client-side month/day rendering, `onSelectSlot` callback).

Checks before PR
- Run `npm run dev` and manually exercise the appointment flow (select service → date/time → personal info → review).
- Ensure any external images/domains are added to `next.config.ts`.
- For UI changes, update corresponding CSS module next to the component.

If anything is unclear
- Ask for which page or component to change and the desired UX/behavior; point to the exact file (for example: `app/appointment/page.tsx` or `app/components/AppointmentCalendar.js`).

— end —
