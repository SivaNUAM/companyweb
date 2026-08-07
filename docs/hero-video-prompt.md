# Nuam Technologies — Hero Video Prompt

Cinematic 3D loop for the homepage hero (`src/components/home/Hero.jsx`).

**Brand:** Nuam Technologies  
**Use:** Full-bleed background video (muted, autoplay, loop)  
**Palette:** Ink black `#0B0B0B` · Surface `#F6F5F2` · Accent lime `#C8F542`

**Keep this block in every prompt (do not remove):**  
`No logos, no readable text, no people, no UI icons, no purple neon, no cyberpunk clutter. Color grade: deep ink blacks, warm neutral highlights, selective lime accents only. Elegant, expensive, Apple keynote × architecture photography × abstract tech art. Ultra detailed, 8K, masterpiece composition, centered vanishing point, full-bleed hero ready.`

---

## Master prompt

```
Cinematic 3D hero film for Nuam Technologies, digital product studio. Ultra-wide full-bleed background, 16:9, photoreal volumetric lighting.

Slow camera push through a vast dark architectural void of glass, black concrete, and brushed metal. Soft electric-lime light accents (#C8F542) trace thin geometric edges and floating wireframe lattices. Subtle particle dust in the air. Depth of field, anamorphic lens feel, slight film grain.

In the mid-ground, abstract 3D forms assemble into a sleek product interface / digital city of screens — not literal UI text, just luminous panels and curved glass surfaces. Reflections, caustics, and soft god-rays from above. Mood: premium, intelligent, calm power — like a high-end agency reel, not sci-fi chaos.

No logos, no readable text, no people, no UI icons, no purple neon, no cyberpunk clutter. Color grade: deep ink blacks, warm neutral highlights, selective lime accents only. Elegant, expensive, Apple keynote × architecture photography × abstract tech art. Ultra detailed, 8K, masterpiece composition, centered vanishing point, full-bleed hero ready.

Camera: slow dolly-in + gentle orbit, 6–8 seconds loopable, seamless end frame close to start for looping.
```

---

## Short prompt

```
Cinematic 3D loop for Nuam Technologies: slow dolly through a dark glass-and-metal void, soft electric-lime edge lights, floating abstract digital panels, volumetric fog, anamorphic bokeh, premium agency look. No logos, no readable text, no people, no UI icons, no purple neon, no cyberpunk clutter. Color grade: deep ink blacks, warm neutral highlights, selective lime accents only. Elegant, expensive, Apple keynote × architecture photography × abstract tech art. Ultra detailed, 8K, masterpiece composition, centered vanishing point, full-bleed hero ready. Seamless loop, 6–8 seconds.
```

---

## Negative prompt

```
text, watermark, logo, captions, people, faces, hands, cartoon, anime, purple neon, cyberpunk clutter, glitch, shaky cam, low resolution, overexposed, stock footage look, UI buttons, readable screens
```

---

## Recommended settings

| Setting | Value |
|--------|--------|
| Aspect ratio | `16:9` (desktop hero); optional `9:16` for mobile |
| Duration | `6–8` seconds |
| Motion | Slow, smooth — no hard cuts |
| Loop | Seamless; end frame close to start |
| Format | `.mp4` (H.264) + still poster `.jpg` / `.webp` |
| Audio | None (hero plays muted) |

---

## Drop-in path (when ready)

1. Export as `public/videos/hero-nuam.mp4`
2. Export a still frame as `public/videos/hero-nuam-poster.jpg`
3. Wire into `Hero.jsx` with:

```html
<video autoPlay muted loop playsInline poster="/videos/hero-nuam-poster.jpg">
  <source src="/videos/hero-nuam.mp4" type="video/mp4" />
</video>
```

Keep the existing image as a fallback until the video loads.
