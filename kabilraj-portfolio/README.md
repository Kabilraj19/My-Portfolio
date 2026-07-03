# Siva — Portfolio (HTML / CSS / JS)

Professional, responsive single-page portfolio built with vanilla **HTML, CSS and JavaScript** — no build tools required.

## Run it

Just open `index.html` in your browser, or serve the folder:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

Then visit http://localhost:8000

## Sections

- **Hero** — headline, CTAs, animated avatar with orbit + skill chips
- **About** — bio + quick info cards (Mission / Focus / Approach)
- **Skills** — animated proficiency bars (Programming, Data/AI, Web, Tools)
- **Experience** — vertical timeline (Education, Internship, Self-learning)
- **Project Experience** — detailed role-based cards with impact bullets
- **Projects** — featured project showcase
- **Services** — what I offer
- **Contact** — info cards + working contact form (client-side validation)

## Customize

- Replace `S` avatar text with your photo (swap the `.avatar` div with an `<img>`)
- Drop your CV at `resume.pdf` next to `index.html`
- Update emails, socials and project links in `index.html`
- Tweak colors via CSS variables at the top of `styles.css` (`--cyan`, `--purple`, `--grad`)

## Files

- `index.html` — markup
- `styles.css` — design system + responsive layout
- `script.js` — interactivity (menu, reveal animations, skill bars, form)

