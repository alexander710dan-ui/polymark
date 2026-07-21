#!/bin/bash
# Builds a real "Polymark Desk.app" in ~/Applications from the repo's Electron.
# Run once (and again after Electron updates):  bash make-mac-app.sh
# Result: launch from Finder/Dock/Spotlight, no Terminal, own icon and name,
# works with System Settings > Login Items.
set -e
cd "$(dirname "$0")"
REPO="$(cd .. && pwd)"
SRC="$REPO/app/node_modules/electron/dist/Electron.app"
[ -d "$SRC" ] || { echo "Electron not found — run 'npm install' in app/ first"; exit 1; }

mkdir -p "$HOME/Applications"
DEST="$HOME/Applications/Polymark Desk.app"
rm -rf "$DEST"
echo "copying Electron bundle…"
cp -R "$SRC" "$DEST"

# Point the bundle at our code: Electron loads Contents/Resources/app if present
ln -s "$REPO/app" "$DEST/Contents/Resources/app"

# Identity: name, id, icon
PLIST="$DEST/Contents/Info.plist"
/usr/libexec/PlistBuddy -c "Set :CFBundleName Polymark Desk" "$PLIST"
/usr/libexec/PlistBuddy -c "Set :CFBundleDisplayName Polymark Desk" "$PLIST" 2>/dev/null || \
  /usr/libexec/PlistBuddy -c "Add :CFBundleDisplayName string Polymark Desk" "$PLIST"
/usr/libexec/PlistBuddy -c "Set :CFBundleIdentifier dk.polymark.desk" "$PLIST"

# Icon: build .icns from our png with the built-in tools, replace Electron's
ICONSET="$(mktemp -d)/icon.iconset"
mkdir -p "$ICONSET"
for s in 16 32 64 128 256; do
  sips -z $s $s assets/icon.png --out "$ICONSET/icon_${s}x${s}.png" >/dev/null
  sips -z $((s*2)) $((s*2)) assets/icon.png --out "$ICONSET/icon_${s}x${s}@2x.png" >/dev/null
done
iconutil -c icns "$ICONSET" -o "$DEST/Contents/Resources/electron.icns"

# The modified bundle no longer matches Electron's signature — re-sign ad hoc
codesign --force --deep --sign - "$DEST" 2>/dev/null || true
# Clear quarantine so Gatekeeper allows the first open
xattr -dr com.apple.quarantine "$DEST" 2>/dev/null || true

echo ""
echo "Done: $DEST"
echo "1. Open Finder > Go > Home > Applications > right-click 'Polymark Desk' > Open"
echo "2. Drag it to the Dock to pin it"
echo "3. System Settings > General > Login Items > '+' > add Polymark Desk"
echo "You can now close Terminal — it is never needed again."
