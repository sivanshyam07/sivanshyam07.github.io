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
  email: "", // Your personal email
  linkedin: "", // Full https:// URL
  resume: "", // Example: "assets/Shyam_Sivan_Resume.pdf"
  formEndpoint: "", // Verified endpoint from your chosen form service
  navigation: [
    { page: "home", label: "About", href: "index.html" },
    { page: "projects", label: "Projects", href: "projects.html" },
    { page: "beyond", label: "Beyond the Classroom", href: "beyond.html" },
    { page: "contact", label: "Contact", href: "contact.html" }
  ],
  home: {
    eyebrow: "ABOUT ME",
    intro: [
      "I'm Shyam, an aerospace engineering student at Georgia Tech with a minor in astrophysics.",
      "My engineering interests include propulsion and materials. Outside the classroom, I'm a big music and soccer fan."
    ],
    sections: [
      { title: "Who am I?", text: ["I enjoy learning how things work, from rocket hardware to the materials that make up a structure. This site brings together my engineering work and the interests that keep me curious outside the classroom."], media: [], links: [] }
    ],
    pathways: [
      { number: "01", title: "What I'm working on", text: "Explore my engineering work, including injector design, structures, model rockets, and gliders as I add them here.", label: "Explore projects", href: "projects.html" },
      { number: "02", title: "Beyond the classroom", text: "Get to know my hobbies, music taste, and opinions on the best soccer team.", label: "Get to know me", href: "beyond.html" },
      { number: "03", title: "Let's connect", text: "Want to talk about a project, an opportunity, or a shared interest?", label: "Contact me", href: "contact.html" }
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
