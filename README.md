# Buildero 2

Buildero 2 is a specialized web application designed for **Archero 2** players to create, visualize, and share their character builds. It features a high-fidelity inventory replica optimized for mobile devices, allowing players to experiment with gear, runes, and heroes in a familiar environment.

## 🗺️ Roadmap

- [ ] **Improve Layout:** Move and resize character and skin portraits to better fill the space in the app view and exported image.
- [ ] **Meta-rarities:** Add frames/rarities like "M+3 or above", "Legendary or above", "Any rarity", etc. Also add an "ANY" option rune that signals that it can be whatever you want.
- [ ] **Notes section:** Add a textbox for additional notes regarding the build.
- [ ] **Alternatives:** Adding "alternative options to each gear, rune, character and enchant slot. So if there's some wiggle room for different options they could all be reflected in the build.

## 📜 Changelog

### [V1.0.2] - 2026-04-21
- **V2 Compact Export (B2):** Implemented a new, highly compact Base36 tagged-section format. Build codes are now significantly shorter.
- **Discord Integration:** Native sharing now generates Discord-formatted messages with multiline code blocks and hyperlinked "Buildero 2" text.
- **Improved Import Feedback:** Added an "Invalid Code" pop-up with detailed error messaging for failed imports.
- **Backwards Compatibility:** Maintained support for V1 legacy build codes.

### [V1.0.1] - 2026-04-20
- **Native Image Sharing:** Attaches exported images directly to the native share sheet with loading state.
- **Godforge Revamp:** Star system changed from boolean to a 0-5 numeric level scale.
- **Author Attribution:** Added a required "Author" field to build sharing metadata.
- **Featured Builds UX:** Entire tiles are now clickable for loading; redundant buttons removed.
- **Export Branding:** Updated share image header with `[Build] by [Author]` and applied branding colors.
- **URL Integration:** Exported images now include the application URL in the footer for easy reference.

### [V1.0.0] - 2026-04-15
- Initial release of Buildero 2.
- Core loadout system for Heroes, Gear, and Runes.
- V1 Serialization system using LZString-compressed JSON.
- "Featured Builds" showcase.
- Share as Image functionality.

## 📄 License

This project is for personal and community use. Archero 2 assets and trademarks are property of their respective owners.
