# Setup HITL log

Każde HITL z fazy setup (H0a-H0g) plus krótki "co się tu uczę".

## H0a — GitHub account is `lipka-clazzpl` (personal)

- **Decyzja:** confirmed by user 2026-05-15 (zapisane w spec)
- **Stan widziany:** `gh auth status` → `lipka-clazzpl (keyring) — Active account: true`. Drugie konto `disler` zalogowane ale nieaktywne.
- **Czemu to ważne:** fork ląduje pod active gh account; pomyłka skierowałaby fork na zły profil i wymagała ręcznego cleanup.
- **Co się tu uczę:** `gh auth status` to single source of truth dla "który user akurat klika" — multi-account jest legalne, ale active matters.

## H0b — `gh repo fork strzalex/fashion-hero-shop --clone --fork-name fash-n-feshyn`

- **Decyzja (2026-05-15):** Yes, fork & clone now.
- **Wykonanie:** plan zakładał `--remote` flag, ale gh CLI nie akceptuje go gdy podajesz explicit repo arg. `--remote` automatycznie dodaje upstream tylko w trybie "fork *tego* repo, w którym aktualnie jesteś". Sub uruchomiłem bez `--remote`; gh i tak ustawił **upstream → strzalex** + **origin → lipka-clazzpl** (widać w `git remote -v`).
- **Output:** `https://github.com/lipka-clazzpl/fash-n-feshyn` utworzony, sklonowany do `aiph2/fash-n-feshyn/`, oba remotes wired.
- **Co się tu uczę:** flagi gh nie są ortogonalne — czytaj komunikat błędu, nie domyślaj się.

## H0c — clone target = `aiph2/fash-n-feshyn/`

- **Decyzja:** implicit (jednoznaczne z planu).
- **Stan widziany:** `aiph2/` nie jest git repo na top-levelu (jest mirror folder bez `.git`); `fash-n-feshyn/` nie istniał — bezpieczny clone.
- **Co się tu uczę:** zanim coś klonujesz w cudze drzewo, sprawdź `git status` w katalogu nadrzędnym; tutaj `aiph2/` ma in-place artifacts (learn-agent, learning, weeks) ale nie git history na poziomie roota.

## H0d — Vercel CLI

- **Decyzja (2026-05-15):** user installed in another terminal → potwierdzone `vercel --version` = 54.1.0.
- **Co się tu uczę:** plan zakładał, że CLI jest instalowany; warto sprawdzić *zanim* dojdziesz do `vercel link`, bo to blocker dla całego Q3.2.

## H0e — env vars posture: SKIP (read-only deploy OK)

- **Decyzja (2026-05-15):** "Skip — read-only deploy OK (Recommended for pretotyp)".
- **Stan widziany:** fork nie ma `.env.sample` w ogóle. Stack: Next.js 16 + shadcn + Tailwind v4 + Lucide; bez bazy danych, bez auth, bez płatności (per `TARGET.md`: out of scope). Statyczny site.
- **Co się tu uczę:** w fashion-hero-shop celowo wycięto runtime dependencies (DB/Stripe/auth) — to *intencja* templatki, nie pominięcie. Pretotyp na statycznym landingu nie potrzebuje envów.

## H0f — questlog Chrome session

- **Decyzja (2026-05-15):** "Yes, I'm already logged into questlog in Chrome".
- **Status:** weryfikacja zostanie zrobiona przy Task 5 (questlog-auth) przez `mcp__claude-in-chrome__tabs_context_mcp` zanim otworzę nowy tab.
- **Co się tu uczę:** browser-automation nie zaczyna od `tabs_create` — zaczyna od `tabs_context_mcp`, żeby zobaczyć stan obecnych tabów; nadpisanie working tabu użytkownika to common smell.

## H0g — Chosen Assumption Test = A2.1.3 (revenue-side ✓)

- **Decyzja (2026-05-15):** "Use A2.1.3 verbatim for Q3.1 spec, scope down later for Q3.2".
- **Test:** Mini-RCT propensity-matched dla S2.1 Free 100 PLN credit at activation. 100 treatment / 100 control, 90-day GMV tracking, p<0.10.
- **Źródło:** `weeks/w2d2-2026-04-30-decide/analyses/map-the-territory.md` § Chosen Assumption Test (H4e — 2026-05-15).
- **Co się tu uczę:** Q3.1 spec może targetować pełną wizję RCT (assumption-test "as-is"), a Q3.2 pretotyp osobno wycina najtańsze możliwe sprawdzenie *fragmentu* tej wizji (np. smoke-test "czy seller w ogóle kliknie 'Claim 100 PLN credit'"). Spec dla AI buildera ≠ pretotyp. To dwa różne dokumenty pod dwie różne fazy.
