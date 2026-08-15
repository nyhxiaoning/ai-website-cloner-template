# Virtual Try-On Clothes Page — Full Page Topology

## Sections (top to bottom)
1. **Hero** (same structure as home, but different copy/images)
   - bg: `#f3efe6`, px-4, py-20, text `#191613`
   - H1: "AI FASHION MODEL GENERATOR" + "Turn Clothing Photos Into On-Model Images"
   - H1 subtitle: "Upload a product photo, choose an AI fashion model, and create on-model images..."
   - CTA note: "Want to try clothes on yourself? Try Virtual Try-On" (link to /virtual-try-on-clothes)
   - Interactive demo: Person upload + 3 person thumbnails + Clothing upload + 3 cloth thumbnails + compare slider
   - Right panel: Before/After result

2. **Examples** — "Virtual Try-On Examples with Real AI Results"
   - bg: `#fbfaf6`
   - 4 tabs: Featured / Shopping Preview / Event Looks / Wardrobe Styling (aria-pressed)
   - 3 cards per tab, each with 3 image strips (person/ref/result)
   - Images use: `virtual-try-on-examples/*.webp`

3. **Use Cases** — "What You Can Do with a Virtual Fitting Room"
   - bg: `#f3efe6`
   - 4 cards: Preview clothes before buying / Try outfits from your own wardrobe / Plan looks for events / Create outfit content

4. **How To** — "How to Virtually Try On Clothes Online in 3 Steps"
   - bg: `#191613`, text `#f3efe6`
   - Steps: "Upload a clear photo of yourself" / "Add the clothes you want to try" / "Generate your virtual try-on"

5. **Pricing** — "Pricing"
   - bg: `#f3efe6`
   - Same plan structure as home: Starter/Creator/Seller + credit pack
   - Subtext: "Choose how many virtual try-on images you need..."

6. **FAQ** — "Virtual Try-On Questions, Answered"
   - bg: `#fbfaf6`
   - 13 accordion items (Radix Accordion)
   - First item "Can you virtually try on clothes online?" open by default
   - Questions:
     1. Can you virtually try on clothes online? ✓ OPEN
     2. How does AI virtual try-on work?
     3. Can I try on clothes online for free?
     4. Do I need to sign up?
     5. Do I need a virtual try-on clothes app?
     6. What person photos work best?
     7. What garment photos can I upload?
     8. Can virtual try-on tell me the correct clothing size?
     9. Will your face, body, pose, and background stay the same?
     10. Do generated images have a watermark?
     11. Are your uploaded photos private?
     12. What happens if a generation fails?
     13. Can I use the generated images commercially?

## Assets
- Hero: `public/sites/virtual-try-on-clothes-root-2e35dd5c/images/hero-{person,cloth}-{1,2,3}.webp`, `hero-result-1.webp`
- Examples: `ex-{person,cloth,result}-{1,3,5}.webp`
- How-to: `howto-{person,garment,result}.webp`
