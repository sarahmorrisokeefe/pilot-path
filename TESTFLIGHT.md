# Cadence — TestFlight Submission Checklist

Complete these steps in order to get the app running on TestFlight.

---

## Prerequisites

- [ ] Apple Developer account ($99/year) enrolled and active
- [ ] Xcode 15+ installed (from Mac App Store)
- [ ] iOS device or Simulator for testing
- [ ] App record created in App Store Connect

---

## Step 1: Local Setup

- [ ] Run `npm install` to install all dependencies
- [ ] Run `npm run build` to build web assets
- [ ] Run `npx cap add ios` (first time only — regenerates the `ios/` Xcode project)
- [ ] Run `npm run ios:open` to open the project in Xcode

---

## Step 2: Xcode — Signing & Capabilities

- [ ] In Xcode, select the **App** target
- [ ] Go to **Signing & Capabilities** tab
- [ ] Set **Team** to your Apple Developer account
- [ ] Confirm **Bundle Identifier** is `com.sarahoke.cadence`
- [ ] Enable **Automatically manage signing**
- [ ] Verify a provisioning profile is created/downloaded successfully

---

## Step 3: Info.plist Configuration

Open `ios/App/App/Info.plist` and add/verify these entries:

- [ ] `UIRequiresFullScreen` → `Boolean: YES`
- [ ] `UISupportedInterfaceOrientations` → Array containing only `UIInterfaceOrientationPortrait`

```xml
<key>UIRequiresFullScreen</key>
<true/>
<key>UISupportedInterfaceOrientations</key>
<array>
    <string>UIInterfaceOrientationPortrait</string>
</array>
```

---

## Step 4: App Icon

- [ ] Generate icon: `node scripts/generate-icon.js` (see instructions it prints)
- [ ] In Xcode: open **Assets.xcassets → AppIcon**
- [ ] Drag `assets/icon.png` (1024x1024) into the App Store slot
- [ ] Verify no missing icon warnings in Xcode
- [ ] **OR** use `npx @capacitor/assets generate --ios` to auto-fill all sizes

---

## Step 5: Splash Screen

- [ ] Capacitor splash screen is configured in `capacitor.config.ts` (cadence purple background, 2s duration)
- [ ] Verify `LaunchScreen.storyboard` loads correctly on first run (Xcode → Run on Simulator)
- [ ] If customizing further: edit `ios/App/App/Base.lproj/LaunchScreen.storyboard`

---

## Step 6: Build Settings

- [ ] Set **Deployment Target** to iOS 14.0 or higher (Capacitor 8 minimum)
- [ ] Set **Device** to iPhone (Portrait only per Info.plist)
- [ ] Confirm **Swift Language Version** is set (usually Swift 5)
- [ ] Set build scheme to **Release** (Product → Scheme → Edit Scheme → Run → Release)

---

## Step 7: Test on Simulator

- [ ] Build and run on iPhone 15 Pro simulator (Cmd+R)
- [ ] Verify safe area insets render correctly (no content behind notch/Dynamic Island)
- [ ] Verify bottom nav is above home indicator
- [ ] Verify dark mode toggle works and status bar color changes
- [ ] Verify all 5 nav tabs navigate correctly
- [ ] Verify splash screen appears and hides cleanly
- [ ] Verify data persists across app restarts (Capacitor Preferences)
- [ ] Verify practice quiz completes without crashing

---

## Step 8: Test on Physical Device

- [ ] Connect iPhone via USB
- [ ] Select physical device in Xcode device dropdown
- [ ] Build and run (Cmd+R) — accept trust prompt on device if needed
- [ ] Repeat all simulator checks on real device
- [ ] Test on at least one device with a notch (iPhone X or later)
- [ ] Test with keyboard: any text input fields

---

## Step 9: Archive for Distribution

- [ ] Set the active scheme destination to **Any iOS Device (arm64)**
- [ ] Product → **Archive** (this may take a few minutes)
- [ ] Wait for the Organizer window to open
- [ ] Verify archive appears in Organizer → Archives

---

## Step 10: App Store Connect Setup

- [ ] Log in to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
- [ ] Create new App (if not done): **My Apps → + → New App**
  - Platform: iOS
  - Name: Cadence
  - Bundle ID: `com.sarahoke.cadence`
  - Primary Language: English (US)
  - SKU: `cadence-ios-001`
- [ ] Fill in app metadata:
  - [ ] App description: "Cadence is an offline music theory study app with gamified lessons covering notation, rhythm, scales, intervals, and chords. Designed for beginners through AP Music Theory."
  - [ ] Keywords: music, theory, AP, study, quiz, education
  - [ ] Support URL
  - [ ] Marketing URL (optional)
  - [ ] Privacy Policy URL (required for App Store)
- [ ] Upload screenshots for iPhone 6.7" display (required)
- [ ] Set age rating (4+)
- [ ] Select category: Education

---

## Step 11: Upload Build to TestFlight

- [ ] In Xcode Organizer: click **Distribute App**
- [ ] Choose **TestFlight & App Store** → **Next**
- [ ] Choose **Upload** → **Next**
- [ ] Leave all distribution options checked → **Next**
- [ ] Xcode will sign and upload the build (takes 2-10 minutes)
- [ ] Wait for build to appear in App Store Connect → TestFlight tab
- [ ] Wait for Apple's automated review (usually 15-30 min for TestFlight)

---

## Step 12: Configure TestFlight

- [ ] In App Store Connect → TestFlight → your build
- [ ] Add **What to Test** notes describing this build
- [ ] Set **Test Information** (privacy policy URL required)
- [ ] Under **Internal Testing**: add yourself as internal tester
- [ ] Accept TestFlight invite email on your iPhone
- [ ] Install via TestFlight app and do final smoke test

---

## Step 13: External TestFlight (Optional)

- [ ] Create an **External Testing** group
- [ ] Submit build for Beta App Review (usually reviewed within 24-48 hours)
- [ ] Once approved, share the public TestFlight link with beta testers

---

## Useful Commands Reference

```bash
# Build web + sync native
npm run ios:build

# Open Xcode
npm run ios:open

# After Xcode project changes (e.g. adding a plugin):
npx cap update ios

# Check Capacitor doctor
npx cap doctor
```

---

## Common Issues

| Problem | Fix |
|---------|-----|
| "No provisioning profile" | Signing & Capabilities → enable Automatically manage signing |
| App crashes on launch | Check Xcode console for errors; verify `capacitor.config.ts` `webDir` is `dist` |
| Safe areas wrong | Verify `viewport-fit=cover` in `index.html` and `safe-top`/`safe-bottom` CSS classes |
| Dark status bar on light background | Check `StatusBar.setStyle` call in `App.tsx` |
| Data not persisting | Verify `@capacitor/preferences` is in `node_modules`; run `npx cap sync` |
| Build fails: "missing Swift Package" | Run `npx cap update ios` then clean build (Cmd+Shift+K) |
