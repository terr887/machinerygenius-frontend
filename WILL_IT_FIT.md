# Machinery Genius Will It Fit? MVP

## Goal
Allow a signed-in customer to choose a saved machine or enter overall dimensions, then place a life-size representation on the floor using a mobile phone.

## MVP behavior
1. Open `/will-it-fit` after signing in.
2. Choose a machine from My Machine Garage or use custom dimensions.
3. Confirm maximum overall width, depth, and height.
4. The frontend calls `POST /api/will-it-fit/representation`.
5. If a matching exact GLB exists, it is returned.
6. Otherwise the backend produces a short-lived signed URL for a dimension-baked gray GLB.
7. `<model-viewer>` launches WebXR, Android Scene Viewer, or iOS Quick Look.

## Why the gray box is generated on the backend
Android Scene Viewer downloads the original GLB from its URL. Runtime CSS or JavaScript scaling in the webpage is not reliably carried into the native viewer. Baking the dimensions into the GLB makes the model size portable and repeatable.

## Android test
1. Deploy both feature branches to an HTTPS staging environment.
2. Open the frontend staging URL in current Chrome on an ARCore-supported Android phone.
3. Sign in and open `/will-it-fit`.
4. Leave the test values at 96 inches wide, 55 inches deep, and 48 inches high.
5. Check the overall-dimensions confirmation.
6. Tap **Prepare Life-Size AR Model**.
7. Tap **View This Machine in Your Shop**.
8. Allow camera access.
9. Move the phone slowly across a well-lit, textured floor.
10. Place the gray machine envelope and walk around it.

Android AR requires a supported device with current Google Play Services for AR. The page must use HTTPS.

## iPhone test
1. Open the same HTTPS staging URL in Safari.
2. Prepare the model and tap the AR button.
3. When no separate `ios-src` is supplied, model-viewer generates the USDZ for Quick Look from the current GLB.

## Data rules
- Never infer dimensions or weight from a photograph.
- Store dimensions with a status and source.
- Exact model, photo-box, and size-box representations must be labeled differently.
- Keep the scale fixed in AR.
- Show the planning-aid warning at all times.

## Next phase
- Add searchable Machinery Genius catalog matching by machine type, manufacturer, and model.
- Add an explicit save flow for user-supplied dimensions.
- Add authorized photo textures to generated boxes.
- Add clearance zones around controls, operator areas, chip conveyors, and service panels.
- Add route planning and multi-machine shop layouts.
