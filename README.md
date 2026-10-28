# Kalārika website

React + Vite build of the "final pages" section of the *Usability Engineering* Figma file.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in dist/
npm run preview  # serve the built dist/
```

The site uses hash URLs (`/#/about`) and relative asset paths, so `dist/` can be hosted from any folder of any static host (GitHub Pages, Netlify, a university server) without extra configuration.

## Structure

- `src/pages/` – one folder per section (about, works, services, plan, blogs, careers, contact)
- `src/components/` – shared pieces: nav bar, footer, hero, form fields, banners, cards
- `src/lib/routes.js` – every URL in one place
- `src/lib/validation.js` – form rules (`PHONE_DIGITS`, word limits, file types) and the `useForm` hook
- `public/assets/` – images and icons exported from Figma

## Behaviour notes

- Buttons navigate only where the Figma prototype has a link; everything else is intentionally inert.
- Form errors appear instantly for invalid input (letters in a phone number, more than 10 digits, numbers in a name, too many words, wrong file type) and on leaving a field or submitting for missing or incomplete input.
- Phone numbers are 10-digit Indian mobile numbers; change `PHONE_DIGITS` in `src/lib/validation.js` to adjust.
- Customer log in (`/#/login`, opened from the profile icon) is not in the Figma prototype. It has no backend either: any valid email and a password of 8+ characters log in, and the session is kept in the browser (localStorage with "Keep me logged in", otherwise sessionStorage).
- Forms have no backend: a valid submission shows a confirmation message and clears the form. The artisan form's *Save and Exit* keeps a draft in the browser's localStorage. The questionnaire saves its answers in sessionStorage for the result page.
