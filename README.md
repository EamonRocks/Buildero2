# Buildero 2

Buildero 2 is a specialized web application designed for **Archero 2** players to create, visualize, and share their character builds. It features a high-fidelity inventory replica optimized for mobile devices, allowing players to experiment with gear, runes, and heroes in a familiar environment.

## 🗺️ Roadmap

- [ ] **Implementation of V2 Compact Export Format:** Transitioning to a Base62 tagged-section system to significantly shorten build codes.
- [ ] **Improve Layout:** Move and resize character and skin portraits to better fill the space in the app view and exported image.

## 📜 Changelog

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
