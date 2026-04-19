# Asset Naming Conventions

To ensure consistent rendering and easy database expansion, all assets must follow these naming conventions.

## Frames (`/frames/`)
Used for rarity backgrounds.

### Gear Frames (`/frames/gear/`)
- `frame_<rarity>.png`
- **Rarities**: `common`, `fine`, `rare`, `epic`, `epic_1`, `epic_2`, `legendary`, `legendary_1`, `legendary_2`, `legendary_3`, `mythic`, `mythic_1`, `mythic_2`, `mythic_3`, `mythic_4`, `chaotic`

### Rune Frames (`/frames/runes/`)
- `/frames/runes/enhancement/frame_<rarity>.png`
- `/frames/runes/ability/frame_<rarity>.png`
- `/frames/runes/blessing/frame_<rarity>.png`
- `/frames/runes/etched/frame_<rarity>.png`
- **Rarities**: `common`, `fine`, `rare`, `epic`, `epic_1`, `epic_2`, `legendary`, `legendary_1`, `legendary_2`, `legendary_3`, `mythic`

## Gear (`/gear/`)
Gear icons (without rarity frame).
- `<gear_id>.png` (e.g., `oracle_weapon.png`, `destruction_boots.png`)
- **Sets**: `oracle`, `griffin`, `dragoon` (S-tier), `echo`, `decisiveness`, `destruction` (non S-tier)
- **Gear Types**: `weapon`, `amulet`, `ring`, `helmet`, `armor`, `boots`
- **S-Tier Layer**: If an item is S-tier, the system will overlay `s_tier_badge.png` from this folder.

## Runes (`/runes/`)
Specific rune type icons.
- `rune_<category>_<id>.png` (e.g., `rune_enhancement_power.png`)

## Characters (`/characters/`)
Base avatars and skin overlays.
- `char_<character_id>.png` (base avatar, e.g., `char_atreus.png`)
- `skin_<character_id>_<skin_id>.png` (skin overlay, e.g., `skin_atreus_chef.png`)

## General Rules
- Use lowercase.
- Use underscores for spaces and numeric variants (e.g., `epic_1`).
- Prefer PNG format with transparency.
