/* EDIT THIS FILE for text, links, photos, and videos.
   Copy a section object to add another section. Array order = page order.
   Set visible: false on any section to hide it without deleting it.
   Leave unavailable URLs blank; the site won't display broken links.
   Keep commas between entries and put text inside quotation marks. */
window.PORTFOLIO = {
  name: "Shyam Sivan",
  subtitle: "Aerospace Engineering · Astrophysics Minor",
  institution: "Georgia Institute of Technology",
  portrait: "", // Example: "assets/shyam.jpg"
  portraitAlt: "Shyam Sivan",
  email: "sivanshyam07@gmail.com", // Your personal email
  linkedin: "https://www.linkedin.com/in/shyamsivan/", // Full https:// URL
  resume: "assets/Shyam_Sivan_Resume.pdf", // Example: "assets/Shyam_Sivan_Resume.pdf"
  formEndpoint: "https://formsubmit.co/sivanshyam07@gmail.com", // Verified endpoint from your chosen form service
  navigation: [
    { page: "home", label: "About", href: "index.html" },
    { page: "projects", label: "Projects", href: "projects.html" },
    { page: "beyond", label: "Beyond the Classroom", href: "beyond.html" },
    { page: "contact", label: "Contact", href: "contact.html" }
  ],
  home: {
    eyebrow: "ABOUT ME",
    intro: [
  "I'm Shyam, an aerospace engineering student at Georgia Tech with a minor in astrophysics, based in Atlanta."
],
    sections: [
      { title: "Who am I?", text: [
      "Within aerospace engineering, my interests and experience span propulsion, materials and composites, and aerosciences.",
      "Outside the classroom, I'm a huge music fan and a diehard Borussia Dortmund fan, with plenty of baseless hope that it'll be our year, every year."
    ], media: [], links: [] }
    ],
    pathways: [
      { number: "01", title: "What I'm working on", text: "Explore my engineering work.", label: "Explore projects", href: "projects.html" },
      { number: "02", title: "Beyond the classroom", text: "Get to know me outside of the classroom.", label: "Get to know me", href: "beyond.html" },
      { number: "03", title: "Let's connect", text: "Want to connect?", label: "Contact me", href: "contact.html" }
    ]
  },
  projects: {
    eyebrow: "ENGINEERING & RESEARCH", title: "Projects",
    intro: "A space for the things I design, build, test, and learn.",
    sections: [] // Add project sections using the example in README.md.
  },
  beyond: {
    eyebrow: "THE OTHER SIDE", title: "Beyond the Classroom",
    intro: "Music, soccer, and the things I enjoy outside engineering.",
    sections: [] // Add hobbies, playlist links, album images, or videos here.
  },
  contact: {
    eyebrow: "GET IN TOUCH", title: "Let's connect.",
    intro: "For opportunities, collaborations, or a conversation about a shared interest."
  }
};
