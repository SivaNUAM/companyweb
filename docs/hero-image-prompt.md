# Nuam Technologies — Hero Image Prompt

Cinematic 3D still for the homepage hero (`src/components/home/Hero.jsx`) — use as background, poster frame, or reference for video.

**Brand:** Nuam Technologies  
**Use:** Full-bleed hero background / video poster  
**Palette:** Ink black `#0B0B0B` · Accent lime `#C8F542` · Warm neutral highlights  
**Aspect:** `16:9` (desktop) · optional `9:16` (mobile)

**Keep this block in every prompt (do not remove):**  
`No logos, no readable text, no people, no UI icons, no purple neon, no cyberpunk clutter. Color grade: deep ink blacks, warm neutral highlights, selective lime accents only. Elegant, expensive, Apple keynote × architecture photography × abstract tech art. Ultra detailed, 8K, masterpiece composition, centered vanishing point, full-bleed hero ready.`

---

## Master prompt

```
Cinematic 3D hero still for Nuam Technologies, digital product studio. Ultra-wide 16:9, photoreal volumetric lighting, anamorphic lens look, subtle film grain.

Vast dark architectural void of glass, black concrete, and brushed metal. Soft electric-lime light accents (#C8F542) tracing thin geometric edges and floating wireframe lattices. Fine particle dust in the air. Deep depth of field with creamy bokeh in the far distance.

Mid-ground: abstract 3D forms assembling into sleek luminous panels and curved glass surfaces — like a digital city of screens, not literal UI text. Reflections, soft caustics, gentle god-rays from above. Mood: premium, intelligent, calm power — high-end agency key art, not sci-fi chaos.

No logos, need readable text, need people, need UI icons, need purple neon, need cyberpunk clutter. Color grade: deep ink blacks, warm neutral highlights, selective lime accents only. Elegant, expensive, Apple keynote × architecture photography × abstract tech art. Ultra detailed, 8K, masterpiece composition, centered vanishing point, full-bleed hero ready.
```

---

## Short prompt

```
Cinematic 3D hero image for Nuam Technologies: dark glass-and-metal architectural void, soft electric-lime edge lights, floating abstract digital panels, volumetric fog, anamorphic bokeh, premium agency look. No logos, no readable text, no people, no UI icons, no purple neon, no cyberpunk clutter. Color grade: deep ink blacks, warm neutral highlights, selective lime accents only. Elegant, expensive, Apple keynote × architecture photography × abstract tech art. Ultra detailed, 8K, masterpiece composition, centered vanishing point, full-bleed hero ready. 16:9.
```

---

## Midjourney-style prompt

```
cinematic 3D hero key art for Nuam Technologies digital studio, vast dark glass metal architectural void, electric lime #C8F542 edge lighting, floating abstract luminous panels, volumetric fog, anamorphic bokeh, film grain, premium agency aesthetic. No logos, no readable text, no people, no UI icons, no purple neon, no cyberpunk clutter. Color grade: deep ink blacks, warm neutral highlights, selective lime accents only. Elegant, expensive, Apple keynote × architecture photography × abstract tech art. Ultra detailed, 8K, masterpiece composition, centered vanishing point, full-bleed hero ready --ar 16:9 --stylize 180 --v 6.1 --style raw --no text, logo, watermark, people, faces, purple neon, cyberpunk, cartoon, low quality
```

---

## Negative prompt

```
text, watermark, logo, captions, letters, numbers, people, faces, hands, cartoon, anime, purple neon, cyberpunk clutter, glitch, overexposed, low resolution, stock photo look, UI buttons, readable screens, cluttered composition, bright daylight, flat lighting
```

---

## Recommended settings

| Setting | Value |
|--------|--------|
| Aspect ratio | `16:9` (1920×1080 or 2560×1440) |
| Style | Photoreal 3D / cinematic still |
| Lighting | Volumetric, low-key, lime accents only |
| Mood | Calm, premium, architectural |
| Format | `.jpg` / `.webp` for hero; also use as video poster |

---

## Drop-in path (when ready)

1. Save as `public/images/hero-nuam.jpg` (or `.webp`)
2. Optional poster twin: `public/videos/hero-nuam-poster.jpg`
3. Point `hero.image` in `src/data/home.js` to `/images/hero-nuam.jpg`

Or keep Unsplash until the generated asset is approved.
