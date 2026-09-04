# Will It Fit? — Connect and Test Handoff

This MVP does **not** require 8th Wall, Unity, Blender, Android Studio, Xcode, or a paid AR service.

It uses the Machinery Genius systems already in place:

- Laravel API and MySQL on the backend
- Vue 3 and Vite on the frontend
- Google `<model-viewer>` loaded by the web page
- Android WebXR / Scene Viewer
- iPhone Quick Look
- A pure-PHP generator for correctly sized gray GLB models

## Branches

Backend repository: `terr887/machinerygenius`

```text
feature/will-it-fit-mvp
```

Frontend repository: `terr887/machinerygenius-frontend`

```text
feature/will-it-fit-mvp
```

Do not merge either branch until the physical taped-floor test passes.

## 1. Connect the backend staging site

Use the site's existing PHP/Composer deployment method, then run:

```bash
git fetch origin
git checkout feature/will-it-fit-mvp
composer install --no-interaction --prefer-dist
php artisan optimize:clear
php artisan migrate --force
php artisan test --filter=WillItFitTest
php artisan will-it-fit:doctor --write
```

The doctor command checks:

- `APP_URL`
- HTTPS readiness
- signed GLB route
- required database columns
- GLB binary validity
- 96 × 55 × 48 inch meter conversion
- visible model bottom at `Y=0`

The backend `.env` must have its real public HTTPS address:

```env
APP_URL=https://YOUR-BACKEND-STAGING-DOMAIN
```

If the frontend and backend use separate domains, keep the existing CORS configuration that already allows the frontend staging origin.

## 2. Connect the frontend staging site

Use the site's existing Node/Vite deployment method, then run:

```bash
git fetch origin
git checkout feature/will-it-fit-mvp
npm ci
npm run type-check
npm run build
```

Set the staging API URL before building:

```env
VITE_API_URL=https://YOUR-BACKEND-STAGING-DOMAIN/api
```

Deploy the generated Vite build with the same SPA history fallback already used by Machinery Genius.

## 3. Open the feature

After signing in, the signed-in home page has a prominent **Will It Fit? — Life-Size AR** card.

The direct path is:

```text
/will-it-fit
```

## 4. First Android test

Use a current Chrome browser on an ARCore-supported Android phone with Google Play Services for AR installed and current.

1. Put blue painter's tape on a well-lit shop floor.
2. Make a rectangle exactly 96 inches wide by 55 inches deep.
3. Open the HTTPS frontend staging site in Chrome.
4. Sign in.
5. Open **Will It Fit?**.
6. Use 96 width, 55 depth, and 48 height.
7. Confirm these are maximum overall dimensions.
8. Tap **Prepare Life-Size AR Model**.
9. Tap **View This Machine in Your Shop**.
10. Allow the camera.
11. Move the phone slowly left and right while pointing at the floor.
12. Place the box over the taped rectangle.
13. Walk around it and check that its bottom remains on the floor.
14. Repeat the placement five times.

The test fails if the object floats, sinks, changes scale, or consistently misses the taped footprint.

## 5. iPhone test

1. Open the same HTTPS staging site in Safari.
2. Sign in and open `/will-it-fit`.
3. Prepare the same 96 × 55 × 48 model.
4. Tap the AR button to open Quick Look.
5. Repeat the taped-floor test.

## 6. What is included now

- Custom overall dimensions
- Optional weight
- Selection from My Machine Garage
- Automatic gray GLB creation
- Floor-first geometry with bottom at zero
- Fixed AR scale
- Android and iPhone launch paths
- Optional upright doorway-envelope comparison
- Exact GLB support only after floor verification
- Strong planning and rigging warning
- Automated backend tests
- Automated frontend type-check and production build

## 7. Later additions—not required for the MVP

- Search the full Machinery Genius make/model specification catalog
- Save user-confirmed dimensions back to a machine record
- Add a licensed machine photograph as a texture
- Automatically normalize and validate uploaded exact GLBs
- Service, operator, and electrical clearance zones
- Multi-machine shop layouts
- Rigging route and truck-loading planning

## Rollback

If staging has a problem, redeploy the previous frontend and backend staging commits. The migration can be rolled back on staging with:

```bash
php artisan migrate:rollback --step=1
```

Do not run rollback commands on production without first confirming the latest migration belongs only to Will It Fit.
