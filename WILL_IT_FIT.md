# Machinery Genius Will It Fit? MVP

## Goal
Allow a signed-in customer to choose a saved machine or enter overall dimensions, then place a life-size representation on the floor using a mobile phone.

## MVP behavior
1. Open `/will-it-fit` after signing in.
2. Choose a machine from My Machine Garage or use custom dimensions.
3. Confirm maximum overall width, depth, and height.
4. The frontend calls `POST /api/will-it-fit/representation`.
5. A matching exact GLB is returned only after its floor alignment has been verified.
6. Otherwise the backend produces a short-lived signed URL for a dimension-baked gray GLB.
7. `<model-viewer>` launches WebXR, Android Scene Viewer, or iOS Quick Look with fixed scale and floor placement.

## Floor-lock rule
A model must never be approved merely because it opens in AR.

For generated gray envelopes:
- X is overall width.
- Y is overall height.
- Z is overall depth.
- One GLB unit equals one meter.
- The lowest visible geometry point is exactly Y = 0.
- The model is positioned using floor placement with fixed scale.

For exact or photo-textured models:
- Apply all transforms before export.
- Remove hidden, transparent, or stray geometry that changes the bounding box.
- Use Y-up orientation.
- Center the footprint in X/Z.
- Move the lowest visible machine point to Y = 0.
- Verify overall bounds against the stored dimensions.
- Record `ar_model_floor_verified_at` before the model is eligible for customer AR.

An uploaded exact GLB that has not passed this check automatically falls back to the generated gray size box.

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
9. Point the phone toward a well-lit, textured floor and move it slowly in a small arc until the surface is detected.
10. Place the gray machine envelope and walk around it.

Android AR requires a supported device with current Google Play Services for AR. The page must use HTTPS.

## Floor alignment acceptance test
1. Mark a 96-inch by 55-inch rectangle on the floor with painter's tape.
2. Put a visible marker at each corner.
3. Place the 96 × 55 × 48 inch AR box over the taped rectangle.
4. Confirm that the visible bottom edge and shadow touch the detected floor with no large gap.
5. Walk around all four sides and confirm the footprint stays attached to the floor.
6. End AR and repeat the placement five times.
7. Repeat on a second Android device and one iPhone.
8. Reject the build if the box floats, sinks noticeably, changes scale, or drifts away from the taped footprint.

## iPhone test
1. Open the same HTTPS staging URL in Safari.
2. Prepare the model and tap the AR button.
3. When no separate `ios-src` is supplied, model-viewer generates the USDZ for Quick Look from the current GLB.
4. Repeat the taped-floor alignment test before production approval.

## Data rules
- Never infer dimensions or weight from a photograph.
- Store dimensions with a status and source.
- Exact model, photo-box, and size-box representations must be labeled differently.
- Keep the scale fixed in AR.
- Show the planning-aid warning at all times.

## Next phase
- Add searchable Machinery Genius catalog matching by machine type, manufacturer, and model.
- Add an explicit save flow for user-supplied dimensions.
- Add an automated model-normalization job for authorized GLB uploads.
- Add authorized photo textures to generated boxes.
- Add clearance zones around controls, operator areas, chip conveyors, and service panels.
- Add route planning and multi-machine shop layouts.
