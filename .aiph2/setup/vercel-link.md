# Vercel link + first deploy log

## Stack (z `package.json`, `README.md`)

- Next.js 16.2.1 (App Router, React 19)
- shadcn/ui + Tailwind v4 (oklch tokens)
- TypeScript strict, no `any`
- Lucide icons
- **Brak runtime deps**: no DB, no auth, no payments — statyczny + ISR-ready

## Vercel link

- **Scope (orgId):** `team_WDMtoeDsaWoCVGvi8vfYNKCp` → `przemek-lipkas-projects` (personal, picked by `vercel --yes` default)
- **Project ID:** `prj_TFKyLpKzOJbXMIc4lqQolnLXTG6D`
- **Project name:** `fash-n-feshyn`
- **Git connection:** **deliberately not wired** during this run.
  - `vercel deploy` prompted "Which remote do you want to connect?" because fork has 2 remotes (origin=lipka-clazzpl/fash-n-feshyn, upstream=strzalex/fashion-hero-shop) — arrow-key prompt nie da się uciszyć przez `--yes`.
  - Workaround: deploy z `--archive=tgz` → upload tarball, pomija git connect.
  - **Skutek:** push do GitHuba **nie** triggeruje auto-deploy. Każdy deploy ręcznie: `cd fash-n-feshyn && vercel --prod --archive=tgz` (lub bez `--prod` dla preview).
  - **Co tu można poprawić w przyszłości:** osobno `vercel git connect https://github.com/lipka-clazzpl/fash-n-feshyn` w niebędącej-pipe sesji terminala, żeby push→deploy zaczęło działać.

## First production deploy (2026-05-15)

- **Deployment ID:** `dpl_3UCS4Mz2zuVT8N2KVybA8BrnWMwU`
- **Production URL:** https://fash-n-feshyn-3jaajboa5-przemek-lipkas-projects.vercel.app
- **Aliased URL (stable):** https://fash-n-feshyn.vercel.app
- **Inspector:** https://vercel.com/przemek-lipkas-projects/fash-n-feshyn/3UCS4Mz2zuVT8N2KVybA8BrnWMwU
- **Build time:** ~33s
- **Status:** READY
- **Build warnings:** brak na tail 30 lines (Next.js + shadcn template build clean).

## Decyzje setup

- **Env vars:** SKIP per H0e — fork nie ma `.env.sample`, statyczny site nie wymaga.
- **Auto-deploy on push:** OFF (świadoma decyzja per workaround wyżej). Q3.2 Vercel verifier (Task 22) deployuje ręcznie po commit.
