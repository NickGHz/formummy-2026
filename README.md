# Mum's Birthday Surprise Website 🎂

A personalised, interactive birthday website: a greeting, a tap-to-surprise
cake, a scrolling photo-memory timeline, and a cheerful finale — with
background music. Built in plain HTML/CSS/JavaScript, no frameworks, no
accounts, no tracking.

---

## 1. What's in this folder

```
mum-birthday-surprise/
├── index.html          the page itself (don't normally need to touch this)
├── style.css            all visual styling
├── script.js             all the interactive behaviour
├── memories.js           ← THE FILE YOU EDIT to add photos & text
├── images/                put your real photos here
│   ├── mum.jpg                     her portrait on the first screen (already set)
│   └── photo1.jpg … photo10.jpg   (placeholders — replace these)
├── audio/
│   ├── birthday-music.mp3         (a short original instrumental loop — replace if you like)
│   └── cake-chime.mp3             (short sparkle sound when the cake is tapped — replace if you like)
└── README.md              this file
```

**You should only ever need to edit `memories.js`** to personalise the
site. Everything else already works.

---

## 2. Adding your own photos

1. Copy your photos into the `images/` folder.
2. Open `memories.js` in any text editor (Notepad, TextEdit, VS Code, etc).
3. For each photo you want to show, add a block like this to the `memories`
   list:

   ```js
   {
     image: "images/vietnam-1.jpg",
     caption: "Vietnam adventures together 🇻🇳",
     date: "Our Vietnam Trip"
   },
   ```

   - `image` — the path to your photo inside `images/`
   - `caption` — the short text under the photo (keep it casual and fun)
   - `date` — optional small label (a place or date); leave as `""` to hide it

4. **To change the order:** just move the blocks up or down in the list —
   they appear on the page top to bottom in the same order.
5. **To add more photos:** copy one block, paste it in, and edit it. There's
   no limit — the timeline scrolls however many you add.
6. **To remove a photo:** delete its block.

The 10 placeholder images already in `images/` are just labelled colour
cards (e.g. "Photo 1 — replace in images/") so you can see the layout
working before you add real photos. Simply save your own photo over a
placeholder with the same file name, or add new files and point to them
in `memories.js`.

> Tip: if a phone photo is very large (10+ MB), the page will still work,
> but it will load faster for your mum if you resize it to roughly
> 1600px on the longest side first. Any free "resize image" tool or your
> phone's share/export options will do this.

---

## 3. Adding her photo to the first screen

A round portrait photo of just your mum appears above the greeting text
on the very first screen.

1. Save a photo of just her as `mum.jpg` (or any name you like).
2. Put it in the `images/` folder, replacing the placeholder `mum.jpg`.
3. If you used a different file name, open `memories.js` and update this
   line near the top of the `siteText` block:

   ```js
   heroPhoto: "images/mum.jpg",
   ```

A square or portrait-orientation photo with her face centred works best,
since it's cropped into a circle. If you'd rather not show a photo here
at all, delete the `heroPhoto` line entirely and that section will be
skipped automatically.

---

## 4. Personalising the text

Still inside `memories.js`, scroll down to the `siteText` block near the
bottom:

```js
const siteText = {
  greetingTitle: "Happy Birthday, Mum! 🎂❤️",
  greetingMessage: "Wishing you a wonderful birthday...",
  cakeHint: "Tap the cake for a little surprise! ✨",
  timelineTitle: "Our Little Adventures 📸💕",
  finalTitle: "Once Again, Happy Birthday, Mum! 🎂❤️",
  finalMessage: "Hope you have a wonderful birthday..."
};
```

Edit any of these lines freely — just keep the text inside the quotation
marks.

---

## 5. Replacing the background music

A short original instrumental tune is already included at
`audio/birthday-music.mp3`, so the music button works right away.

If you'd like to swap it for something else:

1. Find a **royalty-free** instrumental track (a cheerful piano or
   acoustic tune works nicely). Good free sources: Pixabay Music,
   YouTube Audio Library, or Free Music Archive — filter for tracks
   that don't require attribution if possible.
2. Save the file as an MP3.
3. Rename it exactly to `birthday-music.mp3`.
4. Replace the existing file in the `audio/` folder with it.

No code changes are needed — the player automatically uses whatever file
is at that path.

There's also a separate, much shorter sound at `audio/cake-chime.mp3` — a
quick sparkle/bell sound that plays the moment the cake is tapped, on top
of the background music. To replace it, follow the same steps above but
save over `cake-chime.mp3` instead; keep it short (1–2 seconds) since it's
just an accent, not a song.

---

## 6. Testing it on your own computer first

Before uploading anywhere, you can preview it locally:

- **Easiest:** just double-click `index.html` to open it in your browser.
  (Photos and music should still work, though some browsers are picky
  about local files — if the music button or scroll-reveal animations
  don't behave, use the hosted version in section 6 to test instead,
  it's just as quick.)

---

## 7. Putting it online so you can send a link

You need the site hosted somewhere public so your mum can open a link —
your computer alone can't serve it to her. **Netlify** is the easiest free
option and doesn't require any coding knowledge.

### Option A — Netlify (recommended, easiest)

1. Go to **netlify.com** and sign up for a free account (email or GitHub).
2. Once logged in, look for **"Add new site" → "Deploy manually"**
   (sometimes shown as a big drag-and-drop box on the dashboard).
3. Drag the whole `mum-birthday-surprise` folder (or a ZIP of it) onto
   that box.
4. Netlify uploads it and gives you a live URL within seconds, like:
   `https://some-name-123.netlify.app`
5. Optional: click **"Site settings" → "Change site name"** to pick a
   nicer URL, e.g. `happybirthday-mum.netlify.app`.
6. That URL is your public link — open it yourself first (see section 7),
   then send it to your mum on WhatsApp.

**To update the site later** (new photo, fixed typo): edit the files,
then drag the folder onto the same Netlify site again — it redeploys
in seconds, same URL.

### Option B — GitHub Pages

1. Create a free account at **github.com** if you don't have one.
2. Create a new repository (e.g. `mum-birthday-surprise`), and upload all
   the files and folders from this project into it (GitHub's web
   interface lets you drag-and-drop files in).
3. In the repository, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to "Deploy from a branch",
   choose the `main` branch and the `/ (root)` folder, then save.
5. GitHub will give you a URL after a minute or two, like:
   `https://yourusername.github.io/mum-birthday-surprise/`
6. **To update later:** upload the changed file again through the GitHub
   website (or `git push` if you're comfortable with Git) — the live
   site updates automatically.

Both options are completely free for a site this size.

---

## 8. Testing on a phone before sending it

1. Open the published link (from Netlify or GitHub Pages) on your **own**
   phone first — Android or iPhone, either browser is fine.
2. Checklist:
   - [ ] Greeting text and cake appear correctly, no overlapping text
   - [ ] Tapping the cake triggers confetti/balloons and reveals the photos
   - [ ] Tapping "Birthday Music" starts the music; tapping again pauses it
   - [ ] All photos load (if any show "Add photoX.jpg…", that image is
         missing or misnamed in `images/`)
   - [ ] Scrolling is smooth, no sideways scrolling or cut-off text
   - [ ] Final birthday message appears after the last photo
   - [ ] Page loads reasonably fast on mobile data (not just Wi-Fi)
3. Test on a second device/browser if you can (e.g. your own phone +
   a friend's, or Chrome + Safari) just to be safe.
4. Once it looks right, send the link to your mum on WhatsApp — it will
   open directly in her phone's browser, no app or login needed.

---

## 9. Notes

- No accounts, logins, analytics, or external tracking are used anywhere.
- Everything (photos, music, code) is self-contained in this folder, so
  hosting it is just "upload the folder" — nothing else to configure.
- If a photo doesn't appear, double check the **file name spelling**
  (including capital letters) matches exactly what's written in
  `memories.js`.
