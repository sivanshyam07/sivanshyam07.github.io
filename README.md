# Shyam Sivan's portfolio

This is a starter based on your About Me outline. Home has draft copy; Projects and Beyond the Classroom have honest empty states until you supply their content. No fabricated project results, photographs, email, or LinkedIn URL are included.

## Publish on GitHub Pages

1. Extract this ZIP on your computer.
2. Open the `sivanshyam07.github.io` repository on GitHub.
3. Choose Add file > Upload files. Upload the CONTENTS of this folder directly to the repository root. `index.html` must be at the root, not inside another portfolio folder.
4. Commit changes.
5. Settings > Pages > Deploy from a branch > main > /(root) > Save.
6. Your site will be at https://sivanshyam07.github.io.

You can open index.html directly on your computer to preview the site before uploading. No installation or build is needed. JavaScript must be enabled.

## Where to edit

- `content.js`: all your text, page names, navigation labels, contact details, media, and links.
- `styles.css`: colors, fonts, spacing, and layout. Change these without rewriting content.
- `site.js`: shared rendering behavior. Leave this alone for ordinary content updates.
- Four HTML files: separate real pages, each using the same navigation and styling.

Change `navigation[].label` and the corresponding page title in content.js to rename tabs. The browser title in each HTML file can be renamed too.

## Your portrait and resume

Create an `assets` folder next to index.html. Add your photo and resume, then set:

    portrait: "assets/shyam.jpg",
    resume: "assets/Shyam_Sivan_Resume.pdf",

Upload that assets folder along with the other files. Filenames are case-sensitive. Keep quoted text and the commas between entries.

## Add or reorder sections

Paste a section into `projects.sections`, `beyond.sections`, or `home.sections`:

```javascript
{
  title: "Your project or interest title",
  visible: true,
  text: [
    "Your first paragraph.",
    "Your second paragraph."
  ],
  media: [
    {
      type: "image",
      src: "assets/example.jpg",
      alt: "Describe the photo for accessibility",
      caption: "Optional caption"
    },
    {
      type: "video",
      src: "assets/example.mp4",
      poster: "assets/video-preview.jpg",
      caption: "Optional video caption"
    }
  ],
  links: [
    { label: "Listen to my playlist", href: "https://YOUR-PLAYLIST-URL" }
  ]
}
```

Use `media: []` or `links: []` when you have none. Duplicate sections, separate them with commas, and reorder them to change the page order. Set `visible: false` to hide a section. YouTube and other externally hosted videos can be linked through `links`; native video blocks need a direct playable video-file URL. Use your own captions or captioned video versions for spoken content.

## Contact form

Add your email and LinkedIn URL to content.js. The form starts disabled and explicitly says it cannot send yet. GitHub Pages cannot itself process email submissions. Select a static-site form provider, configure your recipient address with that provider, and put its verified HTTPS submission URL in `formEndpoint`. This template uses standard POST fields `name`, `email`, and `message`; verify those field names against your provider's instructions. The provider controls delivery, spam handling, and the page shown after submission. Test delivery before sharing the site. This starter does not claim delivery success or store submissions itself.

## Still needed from you

Portrait, final intro text, project content/media, personal-interest content/media, personal email, LinkedIn URL, resume PDF, and a configured form endpoint. The current homepage wording is editable draft copy based on your outline.
