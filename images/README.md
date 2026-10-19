# Website screenshots

Two images are placeholders. Replace each with a real capture of the same name.

Take them with **⇧⌘4 then space**, then click the window — that gives a clean shot with the
window shadow and no desktop around it.

| File | What to capture |
|---|---|
| `hud.png` | Hold the dictation key in any app and capture the floating panel mid-sentence, with partial text visible. |
| `pinned.png` | Lock dictation to one window (⌃⇧⌘D), bring another app in front, and capture both so the outline is visible behind it. |

Done, for reference: `settings-words.png` and `settings-dictation.png` were captured this way.

`icon.png` is generated from `Resources/Quill.icns` and needs no attention.

## Why these are not generated

Offscreen rendering was tried four ways and each loses something:

- `ImageRenderer` draws SwiftUI text but replaces every AppKit control — toggles, pickers,
  text fields, lists — with a placeholder glyph
- `cacheDisplay` draws the real controls but none of the SwiftUI text
- `dataWithPDF` produces an empty panel
- The accessibility view tree has no tab chrome at all offscreen

A screenshot with placeholder glyphs where the checkboxes should be is worse than an honest
gap, so these say what they need instead. The HUD and the locked-window outline could not be
generated regardless: they only exist while someone is dictating.
