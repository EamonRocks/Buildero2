# Buildero 2

Buildero 2 is a specialized web application designed for **Archero 2** players to create, visualize, and share their character builds. It features a high-fidelity inventory replica optimized for mobile devices, allowing players to experiment with gear, runes, and heroes in a familiar environment.

## 🗺️ Roadmap

- [ ] **Improve Layout:** Move and resize character and skin portraits to better fill the space in the app view and exported image.
- [ ] **Notes section:** Add a textbox for additional notes regarding the build.
- [ ] **Alternatives:** Adding "alternative options to each gear, rune, character and enchant slot. So if there's some wiggle room for different options they could all be reflected in the build.

## 📜 Changelog

### [V1.1.2] - 2026-06-06
- **New Characters:** Added new characters (and skins) for Demeter ("Wrath of the Earth") and Artemis ("Eclipse Hunt Order").

### [V1.1.1] - 2026-05-31
- **Rarity Caching:** Implemented temporary caching for the last selected gear and rune rarities. Empty slots now autoselect the previously used rarity to streamline build creation.
- **Quick Display Modes:** Added specialized `?mode=json` and `?mode=render` views to facilitate build access from a code.
- **New Plant Etched Rune:** Added the "Plant Crit" etched rune to the database.

### [V1.1.0] - 2026-05-25
- **Twin Rune Feature:** Implemented "Twin Runes" which allow pairing two runes of the same category to share a single slot, supporting two concurrent enchantment slots and a new V3 serialization format (B3).

### [V1.0.3] - 2026-04-22
- **Meta-Rarities:** Introduced dedicated frames for "Legendary+", "Mythic+", and "Mythic+3" gear, as well as "Epic2+" and "Legendary+" runes.
- **ANY Rune:** Added a special "ANY" rune asset for all categories to signal flexible slot requirements.

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
