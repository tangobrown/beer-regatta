# Next.js Site Upgrade & Security-Hardening Runbook

A repeatable procedure to bring a **Next.js 14 (App Router) + Tailwind** site up to
**Next.js 16 + React 19** and apply a baseline set of security hardening. Written to
be handed to any such site (follow it top-to-bottom per repo).

> **Derived from** the Beer Regatta upgrade. That site is a static marketing site
> (no forms, DB, auth, middleware, Server Actions). **Sites with those features need
> extra steps** — see §7.

---

## 0. Before you start

- **Branch, never work on `main`:** `git checkout -b upgrade-next-16-$(date +%Y-%m-%d)`
- **Record a baseline** so new failures are distinguishable from pre-existing ones:
  ```bash
  npm install
  npm run build   # note pass/fail
  npm run lint
  npx tsc --noEmit
  npm audit
  npm ls next react react-dom
  ```
- **Know the surface.** Check for things that change the work:
  ```bash
  find app -name "route.ts" -o -name "route.tsx"      # Route Handlers
  grep -rl "use server" --include=*.ts --include=*.tsx . | grep -v node_modules   # Server Actions
  ls middleware.ts src/middleware.ts 2>/dev/null       # Middleware
  grep -rl "cookies()\|headers()\|draftMode()\|searchParams\|params" app   # async request APIs
  ```
  If any of those exist, read §6 (framework breaking changes) carefully — they need code changes this runbook's reference site did not.
- **Requirements for Next 16:** Node **≥ 20.9**, TypeScript **≥ 5.1**. Check `node -v`.

---

## Part A — Security hardening (do this first; smaller blast radius)

You can apply Part A on its own even if you defer the framework upgrade.

### 1. Dependencies
```bash
# Patch within the current major first (safe), then review:
npm audit
npm audit fix            # NEVER --force (it installs breaking majors)
```
- Add Dependabot if missing — `.github/dependabot.yml`:
  ```yaml
  version: 2
  updates:
    - package-ecosystem: "npm"
      directory: "/"
      schedule: { interval: "weekly" }
      open-pull-requests-limit: 10
    - package-ecosystem: "github-actions"
      directory: "/"
      schedule: { interval: "weekly" }
  ```
- Commit: `security: dependency updates + dependabot`

### 2. Secrets & env hygiene
```bash
grep -rniE "sk_[a-z0-9]|api[_-]?key|secret|password|token|smtp" app components lib --include=*.ts --include=*.tsx | grep -v node_modules
grep -rn "NEXT_PUBLIC_" . --include=*.ts --include=*.tsx | grep -v node_modules   # anything secret here is exposed to the browser
git log --all --full-history -- "*.env*"   # was an env file ever committed?
```
- Ensure `.gitignore` ignores all env files but keeps the example:
  ```
  .env
  .env.*
  !.env.example
  ```
- Add `.env.example` (variable **names only**, never values).
- Any real secret in `NEXT_PUBLIC_*` → rename without the prefix, use server-side only. If a secret was ever committed, **rotate it** (don't rewrite history).
- Commit: `security: env-file hygiene`

### 3. XSS sinks
```bash
grep -rn "dangerouslySetInnerHTML\|eval(\|new Function\|\.innerHTML" app components lib --include=*.ts --include=*.tsx | grep -v node_modules
```
- Remove `dangerouslySetInnerHTML` where avoidable; where needed (e.g. JSON-LD), **escape** `<`, `>`, `&`; for rendered HTML/Markdown use `isomorphic-dompurify`.
- Guard any href/src built from data so it can't be `javascript:`/`data:` (allow only `https`, `http`, `mailto`, `tel`, relative).
- Ensure every `target="_blank"` link has `rel="noopener noreferrer"`.
- Commit: `security: XSS hardening`

### 4. Security headers + CSP (`next.config.mjs`)
Add `poweredByHeader: false` and an `async headers()` block for `source: "/(.*)"`:

```js
const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },            // see note below
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "X-Frame-Options", value: "DENY" },
];
```

**The CSP MUST be built per-site.** Inventory what the site actually loads
(analytics, Google Fonts, maps, embeds, form endpoints, Vercel Analytics/Speed
Insights) before copying anything. Static same-origin starting point:
```
default-src 'self';
script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline';
img-src 'self' data:;
font-src 'self';
connect-src 'self';
object-src 'none'; base-uri 'self'; form-action 'self';
frame-ancestors 'none'; upgrade-insecure-requests
```
- `'unsafe-inline'` is required for `script-src` only because of Next's inline
  hydration scripts (no middleware/nonce). Keep `'unsafe-eval'` **out**. Add each
  real external origin you found to the right directive — **do not** blanket-allow.
- **Verify, don't assume:**
  ```bash
  npm run build && npm run start
  curl -I http://localhost:3000        # confirm all headers present
  ```
  Then load **every page** in a browser and fix the CSP until the console shows
  **zero CSP violations**. (A headless check with Playwright works well in CI.)
- Commit: `security: add security headers and CSP`

### 5. Images & third-party
- `next.config` → `images.remotePatterns`: list **specific** domains only, never `hostname: "**"`.
- Every third-party script via `next/script`; remove unused ones.
- Don't publish production source maps (`productionBrowserSourceMaps` not `true`).

---

## Part B — Framework upgrade (Next 14 → 16, React 18 → 19)

### 6. Upgrade
```bash
npm install next@latest react@latest react-dom@latest
npm install -D eslint@^9 eslint-config-next@latest @types/react@latest @types/react-dom@latest
```
> The official codemod `npx @next/codemod@canary upgrade latest` can do most of
> this and rewrite async request APIs — useful on larger/dynamic apps. The manual
> path above is predictable for small/static sites.

**Breaking changes to fix (the ones that bite in practice):**

| Symptom / change | Fix |
|---|---|
| `next lint` removed | Change `package.json` script `"lint"` from `next lint` to `eslint .` |
| ESLint 9 needs flat config; `eslint-config-next@16` requires ESLint ≥9 | Delete `.eslintrc.json`; add `eslint.config.mjs` (below) |
| `useRef<T>(null)` now types as `RefObject<T \| null>` | Widen any **prop types** that receive such refs to `RefObject<T \| null>` |
| New rule `react-hooks/set-state-in-effect` flags `setState` in an effect | Refactor, or `// eslint-disable-next-line react-hooks/set-state-in-effect` with a reason for intentional "reset-on-change" effects |
| `tsconfig.json` auto-edited (`jsx: "react-jsx"`, `.next/dev/types`) | Keep it — Next applies this on first build |
| **Async request APIs** (`params`, `searchParams`, `cookies()`, `headers()`, `draftMode()`) now must be `await`ed; sync access removed | `await` them; make the component/handler `async`. (N/A if the site doesn't use them.) |
| `middleware.ts` deprecated → `proxy.ts`; Edge runtime not supported in proxy | Rename and adjust. (N/A if no middleware.) |
| `revalidateTag()` takes a `cacheLife` 2nd arg; caching now opt-in (`"use cache"`) | Only relevant if you use data caching/revalidation |
| `next/image` defaults changed | Re-check images render identically (see §8) |
| Turbopack is the default bundler | Usually transparent; `next build --webpack` to opt out if needed |

**`eslint.config.mjs`** (flat config, importing Next's native flat config):
```js
import coreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  { ignores: [".next/**", "node_modules/**", "out/**", "build/**"] },
  ...coreWebVitals,
];
export default eslintConfig;
```

- Commit: `Upgrade to Next.js 16 and React 19`

---

## 7. Sites that are NOT static (extra work)

If §0 found forms, Route Handlers, Server Actions, middleware, a DB, auth or
payments, also do (before shipping):
- **Validate every server input** with Zod (`.strict()`), including max lengths.
- **Email forms:** no user input in `to/from/cc/bcc/subject`; use `replyTo` only,
  strip `\r`/`\n`; escape HTML in notification emails; add a honeypot + time-to-submit.
- **Rate limiting** (Upstash / Vercel Firewall) and **Turnstile** CAPTCHA on public
  endpoints.
- **Generic error messages** to users; log detail server-side only.
- **SSRF/open redirect:** no user-supplied URL in `fetch()` or `redirect()` without
  an allowlist.
- Add `import "server-only"` to any module holding secrets.
- These sites' **CSP will differ** — inventory their analytics/fonts/embeds/form
  services and add those origins.

---

## 8. Verification (run on every site before merging)

```bash
npm run build         # passes (Turbopack)
npm run lint          # clean (or no NEW failures vs baseline)
npx tsc --noEmit      # clean
npm audit             # no new criticals/highs; list remaining with reasons
npm run start         # then smoke-test:
curl -I http://localhost:3000     # headers present, no X-Powered-By
```
Browser / automated checks:
- **0 CSP violations** and 0 console errors on every page.
- No horizontal scroll at 320 / 375 / 768 / 1024 / 1440 / 1920 px.
- All images load and optimize (`/_next/image?...` returns 200).
- Interactive bits work (menus, carousels, forms).
- **Site looks identical** to before (screenshot compare).

## 9. Ship
- Open a PR for review, or merge to the production branch per your workflow.
- **Vercel:** confirm **Node ≥ 20.9** (Project → Settings → Node.js Version) or the
  Next 16 build fails. Review dashboard items: Deployment Protection, Firewall/bot
  protection, env-var scoping (prod secrets not in preview), team/token cleanup, 2FA,
  domain forces HTTPS.

## 10. Known residual (accept & document)
- `npm audit` may still report **dev/build-time-only** findings in the Tailwind 3
  CLI chain (`braces`, `chokidar`, `micromatch`, `postcss-selector-parser`, …) and
  ESLint tooling. These are **not shipped to browsers**; they clear only with
  **Tailwind CSS v4** (a breaking major that can affect styling — treat as a
  separate, tested migration, not part of this upgrade).
- CSP `'unsafe-inline'` for scripts is inherent to Next without middleware; a
  nonce-based CSP requires middleware + dynamic rendering.

## Rollback
All changes are additive/isolated. To revert: `git checkout main -- next.config.mjs`
(headers) or reset the branch; redeploy. Keep each section a separate commit so
individual changes can be reverted cleanly.
