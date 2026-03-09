# How to Make the Contact Form Work

The contact form can work in two ways. Choose **one** that matches how you host the site.

---

## Option 1: Formspree (recommended for static hosting)

Use this if you host on **Netlify**, **Vercel**, **GitHub Pages**, or any **static** host (no PHP).

### Steps

1. **Create a Formspree account**
   - Go to [https://formspree.io](https://formspree.io) and sign up (free tier is enough).

2. **Create a new form**
   - Click **New Form**.
   - Set **Email** to **nour.ragab@virtualviewing.com** (this is where submissions will be sent).
   - Copy the **Form ID** (e.g. `xyzabcde`). The full endpoint is `https://formspree.io/f/xyzabcde`.

3. **Add the Form ID to your project**
   - In the project root, create or edit a file named **`.env`**:
   ```env
   VITE_FORMSPREE_CONTACT_ID=your_form_id_here
   ```
   - Replace `your_form_id_here` with the Form ID from Formspree (e.g. `xyzabcde`).

4. **Restart the dev server**
   - Stop the app (`Ctrl+C`) and run `npm run dev` again so Vite loads the new env variable.

5. **Deploy**
   - When you deploy, add the same variable in your host’s dashboard:
     - **Netlify:** Site settings → Environment variables → add `VITE_FORMSPREE_CONTACT_ID`.
     - **Vercel:** Project → Settings → Environment Variables → add `VITE_FORMSPREE_CONTACT_ID`.

After this, the form will POST to Formspree and they will email **nour.ragab@virtualviewing.com** for each submission.

---

## Option 2: PHP backend (contact.php)

Use this only if the site is on a server that runs **PHP** (e.g. shared hosting, cPanel, or a VPS with PHP).

### Steps

1. **Do not set** `VITE_FORMSPREE_CONTACT_ID` in `.env`. Leave it unset so the app uses `/contact.php`.

2. **Upload the PHP stack**
   - Upload your built site so that `contact.php` and the `PHPMailer` folder are in the same directory as in the repo (e.g. `public/contact.php` and `public/PHPMailer/`).
   - Ensure the server is configured to run PHP and that the web root can execute `contact.php`.

3. **Set the Outlook app password**
   - In `public/contact.php`, replace `'YOUR_OUTLOOK_APP_PASSWORD'` with a real **App Password** for the Outlook account (`chrizelle.feliciano@virtualviewing.com`).
   - To create an App Password: Microsoft 365 → Security → Additional security → App passwords. Use that in `contact.php`.

4. **Keep the recipient**
   - The script already sends to **nour.ragab@virtualviewing.com**. No change needed unless you want a different address.

When a user submits the form, the server runs `contact.php`, which sends the email via Outlook to **nour.ragab@virtualviewing.com**.

---

## Summary

| Hosting type        | Use this              | What to set / do                                      |
|---------------------|-----------------------|--------------------------------------------------------|
| Static (Netlify etc.) | **Option 1: Formspree** | `VITE_FORMSPREE_CONTACT_ID` in `.env` and in host env |
| PHP server          | **Option 2: PHP**     | No Formspree ID; set Outlook app password in `contact.php` |

The page will always show **info@mihub.ai**; in both options, the actual submissions are delivered to **nour.ragab@virtualviewing.com**.
