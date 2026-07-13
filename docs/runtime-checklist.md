# Runtime checklist (prod)

## Build

- Zainstaluj zadeklarowane zależności: `npm install`.
- Uruchom pełny build: `npm run build`.
- Sprawdź parity i semantykę wspólnego shellu: `npm run check:html`.
- Sprawdź integralność publicznych treści i destinations: `npm run check:content`.
- Sprawdź tokeny, selektory i kontrast obu motywów: `npm run check:css`.
- Sprawdź routing, indeksowanie, metadane, JSON-LD, sitemapę i robots: `npm run check:seo`.
- Potwierdź, że powstały:
  - `assets/build/style.min.css`
  - `assets/build/main.min.js`
  - `service-worker.js`
- Sprawdź, czy `BUILD_VERSION` w `service-worker.js` jest identyczny z `version` w `package.json`.

## Build assets

- Otwórz każdą stronę (`index.html`, `uslugi.html`, `pakiety.html`, `materialy.html`, `postepy.html`, `thank-you.html`, `offline.html`, `404.html`) i w DevTools → Network upewnij się, że:
  - `/assets/build/style.min.css` zwraca HTTP 200.
  - `/assets/build/main.min.js` zwraca HTTP 200.
  - Nie ma requestów do kanonicznych plików `css/` ani `js/`.
  - Fonty Inter ładują się z `/assets/fonts/` bez odpowiedzi 404.
  - Konsola nie zawiera błędów modułów ani błędów ładowania zasobów.

## Responsive smoke test

- Sprawdź osiem stron przy szerokości desktopowej i mobilnej.
- Potwierdź, że po zmianie ścieżek assetów nie pojawiły się nowe przesunięcia, nakładanie treści ani poziomy overflow względem stanu źródłowego.

## Playwright E2E

- Zainstaluj zależności bez lockfile: `npm install --no-package-lock`.
- Zainstaluj Chromium: `npx playwright install chromium`.
- Uruchom kompletny build i browser E2E: `npm run test:e2e`.
- W razie potrzeby uruchom osobno: `test:e2e:smoke`, `test:e2e:interactions`, `test:e2e:theme` lub `test:e2e:responsive`.
- Routing i metadane uruchom osobno przez `npm run test:e2e:seo`; pięć tras indeksowanych i wymagane zasoby muszą zwracać `200`, a nieznane ścieżki muszą zwracać projektowy dokument z HTTP `404`.
- Widoki bazowe to Chromium desktop `1440 × 900` oraz mobile `390 × 844`; responsive suite dodatkowo sprawdza szerokości 320, 768 i 1024 px.
- Raport HTML otwórz przez `npm run test:e2e:report`; lokalne `playwright-report/`, `test-results/` i `blob-report/` pozostają poza Git.
- E2E używa izolowanych kontekstów i blokuje Service Workery, aby nie korzystać ze starego cache ani zapisanego stanu.

## SEO i routing

- Potwierdź origin `https://education-pr-01-lauren-english.netlify.app` w `scripts/site-config.mjs`.
- Potwierdź, że canonical i `og:url` są identyczne na pięciu stronach indeksowanych.
- Potwierdź raster `assets/og/og-default.png` (`image/png`, `1200 × 630`) oraz odpowiedź HTTP `200`.
- Potwierdź `noindex, nofollow` i brak canonical na `404.html`, `offline.html` i `thank-you.html`.
- Potwierdź, że `sitemap.xml` zawiera tylko pięć tras indeksowanych, bez niezweryfikowanych `lastmod`.
- Potwierdź pojedynczy wpis `Sitemap:` w `robots.txt` i brak catch-all rewrite do `index.html` w `_redirects`.

## Service Worker (aktualizacja cache)

- W DevTools → Application → Service Workers:
  - Sprawdź, czy SW jest aktywny i kontroluje stronę.
  - Kliknij **Update** i odśwież stronę.
  - W **Cache Storage** upewnij się, że pozostaje tylko jeden cache `clean-english-v*`.

## Wykrywanie starego cache

- W DevTools → Application → Cache Storage:
  - Jeśli widzisz więcej niż jeden cache `clean-english-v*`, usuń stare i odśwież.
  - Wejdź w nowe podstrony (np. `/uslugi.html`, `/pakiety.html`, `/materialy.html`) i sprawdź,
    czy w offline mode wciąż działają (Navigation fallback + cache).
