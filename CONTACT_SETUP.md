# How to Make the Contact Form Work (No PHP)

The site uses **Formspree** so the contact form works on any static host (Netlify, Vercel, GitHub Pages, etc.) without a server or PHP.

### Steps

1. **Create a Formspree account**
   - Go to [https://formspree.io](https://formspree.io) and sign up (free tier is enough).

2. **Create a new form**
   - Click **New Form**.
   - Set **Email** to **nour.ragab@virtualviewing.com** (submissions will be sent here).
   - Copy the **Form ID** (e.g. `xyzabcde`).

3. **Add the Form ID to your project**
   - Copy `.env.example` to `.env` in the project root (or create `.env`).
   - Set:
   ```env
   VITE_FORMSPREE_CONTACT_ID=your_form_id_here
   ```
   - Replace `your_form_id_here` with your Formspree Form ID.

4. **Restart the dev server**
   - Stop the app (`Ctrl+C`) and run `npm run dev` again so Vite loads the variable.

5. **Deploy**
   - Add the same variable in your host’s environment:
     - **Netlify:** Site settings → Environment variables → `VITE_FORMSPREE_CONTACT_ID`
     - **Vercel:** Project → Settings → Environment Variables → `VITE_FORMSPREE_CONTACT_ID`

Submissions will be emailed to **nour.ragab@virtualviewing.com**. The contact page shows **info@mihub.ai** as the public address.
