#!/bin/bash
# Builds a real "Polymark Desk.app" from the repo's Electron and OPENS it.
# Run:  bash make-mac-app.sh   (re-run any time; safe to repeat)
set -e
cd "$(dirname "$0")"
REPO="$(cd .. && pwd)"
SRC="$REPO/app/node_modules/electron/dist/Electron.app"
[ -d "$SRC" ] || { echo "Electron not found — run 'npm install' in app/ first"; exit 1; }

# Prefer the real /Applications; fall back to ~/Applications
if [ -w "/Applications" ]; then DEST="/Applications/Polymark Desk.app"; else
  mkdir -p "$HOME/Applications"; DEST="$HOME/Applications/Polymark Desk.app"; fi
rm -rf "$DEST"
echo "building $DEST …"
cp -R "$SRC" "$DEST"

# Point the bundle at our code: Electron loads Contents/Resources/app if present
ln -s "$REPO/app" "$DEST/Contents/Resources/app"

# Identity
PLIST="$DEST/Contents/Info.plist"
/usr/libexec/PlistBuddy -c "Set :CFBundleName Polymark Desk" "$PLIST" || true
/usr/libexec/PlistBuddy -c "Set :CFBundleDisplayName Polymark Desk" "$PLIST" 2>/dev/null || \
  /usr/libexec/PlistBuddy -c "Add :CFBundleDisplayName string Polymark Desk" "$PLIST" || true
/usr/libexec/PlistBuddy -c "Set :CFBundleIdentifier dk.polymark.desk" "$PLIST" || true

# Icon (valid iconset sizes only; a failure here must not kill the build)
(
  set +e
  TMP="$(mktemp -d)"; ICONSET="$TMP/icon.iconset"; mkdir -p "$ICONSET"
  for s in 16 32 128 256 512; do
    sips -z $s $s assets/icon.png --out "$ICONSET/icon_${s}x${s}.png" >/dev/null 2>&1
    sips -z $((s*2)) $((s*2)) assets/icon.png --out "$ICONSET/icon_${s}x${s}@2x.png" >/dev/null 2>&1
  done
  iconutil -c icns "$ICONSET" -o "$TMP/electron.icns" 2>/dev/null \
    && cp "$TMP/electron.icns" "$DEST/Contents/Resources/electron.icns" \
    && echo "icon applied" || echo "icon skipped (app still works)"
)

# Re-sign ad hoc (we modified the bundle) and clear quarantine
codesign --force --deep --sign - "$DEST" 2>/dev/null || true
xattr -dr com.apple.quarantine "$DEST" 2>/dev/null || true

echo ""
echo "Done: $DEST"
open -R "$DEST" || true   # reveal it in Finder
open "$DEST"    || echo "If it won't open: right-click the app > Open (first time only)"
echo ""
echo "Pin it: drag the app from Finder to the Dock."
echo "Auto-start: System Settings > General > Login Items > + > Polymark Desk"
