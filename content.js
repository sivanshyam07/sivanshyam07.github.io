/* EDIT THIS FILE for text, links, photos, and videos.
   Copy a section object to add another section. Array order = page order.
   Set visible: false on any section to hide it without deleting it.
   Leave unavailable URLs blank; the site won't display broken links.
   Keep commas between entries and put text inside quotation marks. */
window.PORTFOLIO = {
  name: "Shyam Sivan",
  subtitle: "Aerospace Engineering · Astrophysics Minor",
  institution: "Georgia Institute of Technology",
  portrait: "", // Example: "shyam.jpg"
  portraitAlt: "Shyam Sivan",
  email: "sivanshyam07@gmail.com", // Your personal email
  linkedin: "https://www.linkedin.com/in/shyamsivan/", // Full https:// URL
  resume: "Shyam_Sivan_Resume.pdf", // Example: "Shyam_Sivan_Resume.pdf"
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
  "I'm Shyam, an aerospace engineering student at [Georgia Tech] (https://ae.gatech.edu/) with a minor in astrophysics! I'm from Lexington, South Carolina (represent🗣️) but I've been raised in Georgia since I was 5. I'm always down to learn and chat about anything, so don't hesitate to contact me about anything!"
],
    sections: [
      { title: "Who am I?", text: [
      "Within aerospace engineering, my interests and experience span propulsion, materials, and aerosciences. My propulsion experience is through the time I've spent in my club, [Propulsive Landers] (https://gtpropulsivelanders.org/), while my materials and aerosciences experience comes from the Daedalus and Computational Combustion Lab, respectively.",
      "Outside the classroom, I'm a huge music fan (and always down to recommend a song!) and a diehard Borussia Dortmund fan, with plenty of baseless hope that it'll be our year, every year. I follow baseball and football as well, albeit very loosely, and I'm always open to learning about anything interesting from any subject!"
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
    sections: [
  {
    "title": "Free Bird",
    "visible": true,
    "text": [
      "For my Introduction to Aerospace Engineering class (AE 1601), our team designed and built a single-stage model rocket to carry and safely recover a PerfectFlite Pnut altimeter, with a target apogee of 125 feet.",
      "My contribution focused on the SolidWorks CAD and OpenRocket simulation work, helping develop the rocket’s geometry and compare design configurations. We used SolidWorks, OpenRocket, and machine tools to take the design from a simulation to testable flight hardware.",
      "Starting with an Estes Viking kit, we added a custom PETG nose cone, an enlarged payload bay for the altimeter, and a transition connecting the payload bay to the main body tube. The rocket also used four cardboard fins and a streamer recovery system.",
      "The rocket reached an apogee of 98 feet and was successfully recovered. Our original OpenRocket simulation predicted 121 feet using an A8-3 motor. After observing other model rockets exceed their predicted altitudes, we switched to a ½A6-2 motor for the flight.",
      "The project gave me hands-on experience connecting CAD, flight simulation, fabrication, and testing. It helped me understand the connection between simulated design and physical manufacturing, and how to iterate when initial plans don't work out."
    ],
    "media": [
      {
        "type": "image",
        "src": "free-bird-rocket.png",
        "alt": "Completed Free Bird model rocket standing upright",
        "caption": "The completed Free Bird."
      },
      {
        "type": "image",
        "src": "free-bird-openrocket.png",
        "alt": "Free Bird rocket configuration in OpenRocket",
        "caption": "Rocket configuration modeled in OpenRocket."
      },
      {
        "type": "image",
        "src": "free-bird-transition.jpeg",
        "alt": "SolidWorks model of the body tube transition",
        "caption": "Transition between the payload bay and main body tube."
      },
      {
        "type": "image",
        "src": "free-bird-payload-bay.png",
        "alt": "SolidWorks model of the cylindrical payload bay",
        "caption": "Custom payload bay for the Pnut altimeter."
      },
      {
        "type": "image",
        "src": "free-bird-nose-cone.png",
        "alt": "SolidWorks model of the rocket nose cone",
        "caption": "Custom nose cone."
      },
      {
        "type": "image",
        "src": "free-bird-altitude.png",
        "alt": "Measured altitude versus flight time",
        "caption": "Flight altitude history; measured apogee: 98 ft."
      },
      {
        "type": "image",
        "src": "free-bird-velocity.png",
        "alt": "Velocity versus flight time from the flight data",
        "caption": "Flight velocity history."
      }
    ],
    "links": []
  }
]
 // Add project sections using the example in README.md.
  },
  beyond: {
    eyebrow: "THE OTHER SIDE", title: "Beyond the Classroom",
    intro: "Music, soccer, and the things I enjoy outside engineering.",
    sections: [] // Add hobbies, playlist links, album images, or videos here.
  },
  contact: {
    eyebrow: "GET IN TOUCH", title: "Let's connect!",
    intro: "For opportunities, collaborations, or a conversation about a shared interest."
  }
};
