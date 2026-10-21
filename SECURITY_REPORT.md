# Security Report — Beer Regatta

**Date:** 2026-10-21
**Branch:** `security-audit-2026-10-21`
**Stack:** Next.js (App Router) + React + Tailwind CSS, hosted on Vercel
**Site type:** Static marketing site — **no forms, no database, no authentication, no payments, no Server Actions, no Route Handlers, no API routes, no middleware.** All calls-to-action are outbound links (Facebook/X).

---

> **Update — 2026-10-21 (post-audit):** The recommended major upgrade was
> completed. **Next.js 14.2.35 → 16.4.2** and **React 18.3.1 → 19.3.1**
> (ESLint → 9 flat config; `next lint` replaced by the ESLint CLI). This
> cleared the remaining **critical `next`** advisory. The site is unchanged
> visually and behaviourally (build/lint/types pass; 0 CSP violations; no
> horizontal overflow 320–1920px; images optimize correctly). `npm audit`
> now reports **9 findings, all dev/build-time only** (Tailwind 3 CLI chain +
> ESLint tooling), fixable only via `tailwindcss@4` (a design-risky major,
> deliberately deferred). See §4/§5 below for the pre-upgrade detail.

---

## 1. Summary

**Before:** Low–Medium risk. The site is static with a very small attack surface, but it ran an outdated Next.js patch (14.2.5) with known advisories, shipped **no security headers** (no CSP, HSTS, framing protection, etc.), advertised its framework via `X-Powered-By`, and had no automated dependency monitoring.

**After:** **Low risk.** Next.js is updated to the latest release in its major (14.2.35), a full set of security headers and a tight same-origin Content-Security-Policy are applied to every route, XSS sinks are hardened, env-file handling is locked down, and Dependabot is enabled. The site is byte-for-byte identical in appearance and behaviour (0 CSP violations, 0 console errors across all pages).

**Residual risk** is concentrated in one item: Next.js 14 is now two majors behind (current is 16.x) and no longer receives full security patches. Clearing the last advisories requires a **major upgrade**, which the audit rules say to flag rather than apply automatically (see §3).

---

## 2. Fixed

| # | Issue | Severity | File(s) | Fix |
|---|-------|----------|---------|-----|
| 1 | Outdated Next.js patch (14.2.5) missing backported security fixes, incl. `next/image` optimization advisories | High | `package.json`, `package-lock.json` | Upgraded `next` + `eslint-config-next` to **14.2.35** (latest within major v14); ran `npm audit fix` (no `--force`). |
| 2 | No security response headers | High | `next.config.mjs` | Added HSTS, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options: DENY` to all routes. |
| 3 | No Content-Security-Policy (clickjacking / injected-resource exposure) | High | `next.config.mjs` | Added a strict same-origin CSP: `default-src 'self'`, no external origins, `object-src 'none'`, `frame-ancestors 'none'`, `base-uri 'self'`, `form-action 'self'`, `upgrade-insecure-requests`. `'unsafe-inline'` limited to script/style (unavoidable without middleware); no `'unsafe-eval'`. |
| 4 | Framework version advertised via `X-Powered-By` | Low | `next.config.mjs` | `poweredByHeader: false`. |
| 5 | `dangerouslySetInnerHTML` in JSON-LD could break out of `<script>` if data ever contained `</script>` | Low | `components/JsonLd.tsx` | Escape `<`, `>`, `&` to `\uXXXX` in the serialized JSON-LD (still valid JSON; defence-in-depth). |
| 6 | Content-authored links not scheme-restricted (future `javascript:`/`data:` risk) | Low | `components/LegalPage.tsx` | Added `safeHref()` allowing only `https/http`, `mailto`, `tel` and relative URLs. |
| 7 | No automated dependency monitoring | Low | `.github/dependabot.yml` | Added weekly Dependabot for npm + GitHub Actions. |
| 8 | Env-file handling / documentation | Low | `.gitignore`, `.env.example` | Broadened `.gitignore` to all `.env*` (keeping `.env.example`); added `.env.example` documenting the "never `NEXT_PUBLIC_` for secrets" convention. |

**Verification after every change:** `npm run build`, `npm run lint`, `npx tsc --noEmit` all pass (clean baseline, no new failures). Headers confirmed on all routes with `curl -I`. **0 CSP violations and 0 console errors** across all 4 pages in headless Chromium. Site is visually and behaviourally unchanged.

---

## 3. Needs human action (priority order)

### High priority
- [ ] **Plan a Next.js major upgrade (14 → 16).** Next 14 is two majors behind and no longer fully patched; `npm audit` reports the only fix for the remaining `next` advisory is `next@16`. This is a major upgrade and was **not** applied automatically per the audit rules. It should be scheduled and tested, as it is the only way to clear the last runtime advisory. Note: most of the flagged Next advisories target features this site does **not** use (middleware, Server Actions, rewrites, ISR); the practically-relevant ones concern `next/image` optimization, partially mitigated by Vercel's managed image layer and the 14.2.35 backports.

### Medium priority (Vercel dashboard — cannot be changed from code)
- [ ] Turn on **Deployment Protection** for preview deployments.
- [ ] Verify **environment variables are scoped** correctly (production secrets not exposed to preview) — currently there are no env vars.
- [ ] Enable **Vercel Firewall / bot protection**; add a rate-limit rule if a form endpoint is ever added.
- [ ] Remove unused **team members / access tokens**.
- [ ] Ensure **2FA** is enabled on both the Vercel and GitHub accounts.
- [ ] Confirm the **custom domain forces HTTPS** (HSTS is now set in-app to reinforce this).

### Lower priority (build-chain major upgrades)
- [ ] Upgrade **Tailwind CSS 3 → 4** and **eslint-config-next → 16** to clear the remaining dev/build-time advisories (see §4). These are not shipped to browsers, so runtime risk is negligible; defer until convenient.

### Only if a form/email feature is added later
- [ ] Add **Zod** server-side validation, a **honeypot + time-to-submit** check, **rate limiting** (Upstash Ratelimit or Vercel Firewall), and **Cloudflare Turnstile** CAPTCHA (needs a site key). Keep any email-provider secret server-side (never `NEXT_PUBLIC_`), add `import "server-only"` to the sending module, and use the visitor's email only as `replyTo` after stripping `\r`/`\n`.

---

## 4. Not fixed / accepted risks

- **12 `npm audit` findings (1 critical, 9 high, 2 moderate)** — all are fixable **only via major upgrades** (`next@16`, `tailwindcss@4`, `eslint-config-next@16`), which the ground rules forbid applying automatically. Breakdown:
  - `next`, `postcss` (bundled) — runtime/build; cleared only by `next@16`. Flagged in §3.
  - `tailwindcss`, `braces`, `chokidar`, `micromatch`, `fast-glob`, `postcss-selector-parser`, `postcss-nested` — **dev/build-time only** (Tailwind's CLI toolchain); not in the production bundle. Cleared by `tailwindcss@4`.
  - `@next/eslint-plugin-next`, `eslint-config-next`, `glob` — **dev-only** (linting); not shipped. Cleared by `eslint-config-next@16`.
  - Not run: `npm audit fix --force` (would install `tailwindcss@4`, a breaking major change).
- **CSP `'unsafe-inline'` for `script-src`/`style-src`** — required because Next.js App Router emits inline hydration `<script>` tags and the UI uses inline `style` attributes. A nonce-based CSP would require `middleware.ts` and dynamic rendering, changing the site from fully static. Residual XSS risk is low: no external script origins are allowed, `'unsafe-eval'` is excluded, and the site takes **no user input**. Recommended future improvement: nonce-based CSP if the site ever becomes dynamic.
- **`server-only` package** — not installed: no module reads `process.env` or holds secrets, so there is nothing to protect. Add it with the first secret-using module.

---

## 5. Dependency versions

| Package | Before | After |
|---|---|---|
| next | 14.2.5 | **14.2.35** |
| react | 18.3.1 | 18.3.1 (latest v18) |
| react-dom | 18.3.1 | 18.3.1 (latest v18) |
| Node.js | v22.x | v22.22.0 |

Latest Next.js overall at audit time: **16.4.2** (major upgrade — see §3).
Lockfile `package-lock.json` is committed.
