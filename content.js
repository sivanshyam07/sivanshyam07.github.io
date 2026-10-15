/* Edit portfolio text and media here.
   Each project needs a unique id.
   Set visible: false to hide a project. */

window.PORTFOLIO = {
  name: "Shyam Sivan",
  subtitle: "Aerospace Engineering · Astrophysics Minor",
  institution: "Georgia Institute of Technology",
  portrait: "shyam_sivan_portrait.jpg",
  portraitAlt: "Shyam Sivan",
  email: "sivanshyam07@gmail.com",
  phone: "+1 (470) 350-9720",
  gtEmail: "ssivan3@gatech.edu",
  linkedin: "https://www.linkedin.com/in/shyamsivan/",
  resume: "Shyam_Sivan_Resume.pdf",
  formEndpoint: "https://formsubmit.co/sivanshyam07@gmail.com",

  navigation: [
    { page: "home", label: "About", href: "index.html" },
    { page: "projects", label: "Projects", href: "projects.html" },
    { page: "beyond", label: "Beyond the Classroom", href: "beyond.html" },
    { page: "contact", label: "Contact", href: "contact.html" }
  ],

  home: {
    eyebrow: "ABOUT ME",
    intro: [
      "I'm Shyam, an aerospace engineering student at [Georgia Tech](https://ae.gatech.edu/) with a minor in astrophysics! I'm from Lexington, South Carolina (represent🗣️) but I've been raised in Georgia since I was 5. I'm always down to learn and chat about anything, so don't hesitate to contact me about anything!"
    ],
    sections: [
      {
        title: "Who am I?",
        text: [
          "Within aerospace engineering, my interests and experience span propulsion, materials, and aerosciences. My propulsion experience is through the time I've spent in my club, [Propulsive Landers](https://gtpropulsivelanders.org/), while my materials and aerosciences experience comes from the Daedalus and Computational Combustion Lab, respectively.",
          "Outside the classroom, I'm a huge music fan (and always down to recommend a song!) and a diehard Borussia Dortmund fan, with plenty of baseless hope that it'll be our year, every year. I follow baseball and football as well, albeit very loosely, and I'm always open to learning about anything interesting from any subject!"
        ],
        media: [],
        links: []
      }
    ],
    pathways: [
      {
        number: "01",
        title: "What I'm working on",
        text: "Propulsion design, materials engineering, aerodynamic simulations, and more.",
        label: "Explore projects",
        href: "projects.html"
      },
      {
        number: "02",
        title: "Beyond the classroom",
        text: "Music recommendations, soccer takes, and everything outside engineering.",
        label: "Get to know me",
        href: "beyond.html"
      },
      {
        number: "03",
        title: "Let's connect",
        text: "For opportunities, project ideas, or a conversation.",
        label: "Contact me",
        href: "contact.html"
      }
    ]
  },

  projects: {
    eyebrow: "ENGINEERING & RESEARCH",
    title: "Projects",
    intro: "A space for the things I design, build, test, and learn. Plenty of trial and error goes on here.",

    sections: [
       {
  id: "lox-methane-injector",
  title: "LOX–Methane Injector Design",
          layout: "injector",
  category: "AE 3030 · Injector design and CFD",
  visible: true,

  summary: "Preliminary design and CFD analysis of a 16-element unlike-triplet injector for a 3,000 lbf LOX–methane engine. The study identified uneven methane distribution and oxygen-manifold recirculation.",
  cover: "injector-face.jpeg",
  coverAlt: "CAD view of the 16-element injector face",

  text: [
    "For a project in Aerodynamics ([AE 3030](https://syllabus.gatech.edu/sites/default/files/2026-04/AE3030_Syllabus_Summer2026.pdf)), our team developed a preliminary injector design for a pressure-fed liquid oxygen and liquid methane rocket engine targeting 3,000 lbf of thrust at a chamber pressure of 250 psia.",

    "We compared showerhead, coaxial, pintle, and impinging jet injector designs before selecting an unlike-triplet impinging injector design. Each element uses one central methane jet and two angled oxygen jets directed toward a common impingement point. We selected this arrangement for its manageable geometry and real-world manufacturability.",

    "Using analytical sizing relationships, we calculated the required orifice areas and passage dimensions for a nominal injector pressure drop of 50 psi. The final CAD design arranged 16 triplet elements across the injector face, with 16 methane passages and 32 oxygen passages. We developed separate propellant manifolds while considering the manufacturing constraints of direct metal laser sintering.",

    "We evaluated the methane and oxygen flow paths separately in ANSYS Fluent. The preliminary results showed that methane preferentially flowed toward the outer elements and that there was significant recirculation within the oxygen manifold. These findings identified opportunities to improve flow distribution through smoother transitions and changes to the internal manifold geometry.",

    "The project connected injector sizing, CAD, manufacturing constraints, and CFD within one problem. The analysis focused on internal flow distribution; external jet impingement, atomization, and combustion were outside its scope."
  ],

  media: [
  {
    type: "image",
    group: "hero",
    src: "injector-face.jpeg",
    alt: "CAD view of the injector face showing the triplet arrangement",
    caption: "Injector face with 16 unlike-triplet elements."
  },
  {
    type: "image",
    group: "hero",
    src: "injector-manifold-section.jpeg",
    alt: "CAD cross section of the internal injector manifolds",
    caption: "Internal manifold geometry."
  },
  {
    type: "image",
    group: "geometry",
    src: "injector-triplet-geometry.jpeg",
    alt: "Cross-sectional diagram of the unlike-triplet element geometry",
    caption: "Element geometry and jet impingement arrangement."
  },
  {
    type: "image",
    group: "geometry",
    src: "injector-flow-paths.jpeg",
    alt: "Annotated cross section showing oxygen and methane flow paths",
    caption: "Separate oxygen and methane flow paths through the injector."
  },
  {
    type: "image",
    group: "mesh",
    src: "injector-methane-mesh.jpeg",
    alt: "Computational mesh of the methane manifold",
    caption: "Methane-manifold mesh and boundary-layer refinement."
  },
  {
    type: "image",
    group: "mesh",
    src: "injector-lox-mesh.jpeg",
    alt: "Computational mesh of the liquid oxygen manifold",
    caption: "Liquid-oxygen manifold mesh and boundary-layer refinement."
  },
  {
    type: "image",
    group: "cfd",
    src: "injector-methane-cfd.jpeg",
    alt: "Methane-manifold pressure contours and velocity streamlines",
    caption: "Methane-manifold CFD results indicating preferential flow toward the outer elements."
  },
  {
    type: "image",
    group: "cfd",
    src: "injector-lox-cfd.jpeg",
    alt: "Liquid-oxygen manifold pressure contours and velocity streamlines",
    caption: "Liquid-oxygen manifold CFD results showing internal recirculation."
  }
],

  links: []
},
       {
  id: "recycled-pet-voxels",
  title: "Recycled PET Voxel Structures",
  category: "Daedalus Lab · Materials and structural research",
  layout: "voxel",
  visible: true,

  summary: "Recycling plastic bottles into 3D-printing filament for modular voxel structures. Compression testing compared recycled PET with PLA and PETG across three assembly configurations.",
  cover: "voxel-pet-block.jpeg",
  coverAlt: "Modular voxel block printed using recycled PET",

  text: [
    "In a research project for the Daedalus Lab at Georgia Tech, we investigated whether recycled PET from plastic bottles could provide a more sustainable alternative with mechanical performance comparable to PLA and PETG for manufacturing modular voxel structural blocks. Our goal was to produce usable filament, print consistent components, and evaluate how the assembled structures behaved under compression. My contributions involved voxel design, material preparation, and compression test data reduction.",

    "We converted plastic bottles into PET filament using an in-house built bottle strip cutter and filament making setup, then used the filament to print interconnected structural components. Alongside material development, we investigated voxel geometries that could be manufactured reliably and assembled with stable connections.",

    "We compression-tested PLA, PETG, and recycled PET structures in 1×1×1, 2×2×2, and 3×3×3 configurations. Comparing their force-displacement curves allowed us to examine load capacity, deformation, and how structural behavior changed with assembly size.",

    "The tested recycled PET specimens achieved higher peak loads than PETG in the 2×2×2 and 3×3×3 comparisons, reaching approximately 0.56 kN and 1.2 kN, respectively. These results supported further investigation of recycled PET as an alternate 3D printing filament, although broader conclusions would require repeated testing and better control of printing and manufacturing variability.",

    "We also explored revised connection geometries and voxel designs to improve assembly, printability, and mechanical strength while limiting changes to component geometry and mass. The project connected sustainable engineering, additive manufacturing, structural design, and mechanical testing in one research project."
  ],

  media: [
  {
    type: "image",
    group: "hero",
    src: "voxel-pet-block.jpeg",
    alt: "Recycled PET voxel block",
    caption: "A voxel block printed using recycled PET."
  },
  {
    type: "image",
    group: "process",
    src: "voxel-bottle-cutter.jpeg",
    alt: "Bottle-strip cutting setup",
    caption: "Preparing plastic bottles for filament production."
  },
  {
    type: "image",
    group: "process",
    src: "voxel-filament.jpeg",
    alt: "Recycled PET filament and filament-making equipment",
    caption: "Recycled PET filament."
  },
  {
    type: "image",
    group: "process",
    src: "voxel-assemblies.jpeg",
    alt: "Printed voxel structures in different configurations",
    caption: "Printed components and assembled voxel structures."
  },
  {
    type: "image",
    group: "results",
    src: "voxel-2x2-comparison.png",
    alt: "Compression results for 2×2×2 PET and PETG structures",
    caption: "2×2×2 configuration: PET and PETG."
  },
  {
    type: "image",
    group: "results",
    src: "voxel-3x3-comparison.png",
    alt: "Compression results for 3×3×3 PET and PETG structures",
    caption: "3×3×3 configuration: PET and PETG."
  }
],

  links: []
},
      {
        id: "free-bird",
        title: "Free Bird",
        category: "AE 1601 · Model rocketry",
        layout: "rocket",
        visible: true,

        summary: "A single-stage model rocket designed in SolidWorks and OpenRocket to carry an altimeter toward a 125 ft target apogee. Built and flight-tested, reaching 98 ft.",
        cover: "free-bird-rocket.png",
        coverAlt: "Completed Free Bird model rocket",

        text: [
          "For my Introduction to Aerospace Engineering class ([AE 1601](https://syllabus.gatech.edu/sites/default/files/2026-08/AE1601_Syllabus%20Fall%202026_2.pdf)), our team designed and built a single-stage model rocket to carry and safely recover a PerfectFlite Pnut altimeter, with a target apogee of 125 feet.",
          "My contribution focused on the SolidWorks CAD and OpenRocket simulation work, helping develop the rocket’s geometry and compare design configurations. We used SolidWorks, OpenRocket, and machine tools to take the design from a simulation to testable flight hardware.",
          "Starting with an Estes Viking kit, we added a custom PETG nose cone, an enlarged payload bay for the altimeter, and a transition connecting the payload bay to the main body tube. The rocket also used four cardboard fins and a streamer recovery system.",
          "The rocket reached an apogee of 98 feet and was successfully recovered. Our original OpenRocket simulation predicted 121 feet using an A8-3 motor. After observing other model rockets exceed their predicted altitudes, we switched to a ½A6-2 motor for the flight.",
          "The project gave me hands-on experience connecting CAD, flight simulation, fabrication, and testing. It helped me understand the connection between simulated design and physical manufacturing, and how to iterate when initial plans don't work out."
        ],

        media: [
          {
            type: "image",
            group: "hero",
            src: "free-bird-rocket.png",
            alt: "Completed Free Bird model rocket standing upright",
            caption: "The completed Free Bird rocket."
          },
          {
            type: "image",
            group: "nose",
            src: "free-bird-nose-cone.png",
            alt: "SolidWorks model of the rocket nose cone",
            caption: "Custom nose cone."
          },
          {
            type: "image",
            group: "parts",
            src: "free-bird-transition.jpeg",
            alt: "SolidWorks model of the body tube transition",
            caption: "Transition between the payload bay and main body tube."
          },
          {
            type: "image",
            group: "parts",
            src: "free-bird-payload-bay.png",
            alt: "SolidWorks model of the cylindrical payload bay",
            caption: "Custom payload bay for the Pnut altimeter."
          },
          {
            type: "image",
            group: "analysis",
            src: "free-bird-openrocket.png",
            alt: "Free Bird rocket configuration in OpenRocket",
            caption: "Rocket configuration modeled in OpenRocket."
          },
          {
            type: "image",
            group: "analysis",
            src: "free-bird-altitude.png",
            alt: "Measured altitude versus flight time",
            caption: "Flight altitude history; measured apogee: 98 ft."
          },
          {
            type: "image",
            group: "analysis",
            src: "free-bird-velocity.png",
            alt: "Velocity versus flight time from the flight data",
            caption: "Flight velocity history."
          }
        ],

        links: []
      },

      {
        id: "bank-left",
        title: "Bank Left",
        category: "AE 1601 · Glider design",
        layout: "glider",
        visible: true,

        summary: "A hand-built balsa wood glider developed through aerodynamic calculations and flight-test iteration. The final design flew 54 ft, more than twice the initial distance.",
        cover: "bank-left-final-top.jpeg",
        coverAlt: "Final Bank Left balsa wood glider",

        text: [
          "For my Introduction to Aerospace Engineering class ([AE 1601](https://syllabus.gatech.edu/sites/default/files/2026-08/AE1601_Syllabus%20Fall%202026_2.pdf)), a teammate and I designed and built a hand-made balsa wood glider capable of at least 20 feet of stable, straight flight. The design had to fit within a 16 × 16-inch box, contain more than 50% balsa wood by weight, and remain intact during testing.",
          "My contribution focused on the calculations, design, and iteration from our initial dimensions, alongside some fabrication work using machine shop tools. We compared wing configurations and selected swept, tapered wings with a 7° dihedral angle to support stable flight.",
          "Initial tests revealed that the glider was tail-heavy, so we added modeling clay to the nose to adjust its balance. This version flew approximately 20–25 feet. We then increased the overall dimensions by a factor of 4:3, expanding the wingspan from 12 to 16 inches and the fuselage length from 9 to 12 inches.",
          "The final glider flew 54 feet, more than twice the initial flight distance, and met all of the project requirements. It demonstrated stable, straight flight and remained intact during testing.",
          "The project helped me connect aerodynamic calculations and design choices with observed flight behavior. Working through the balance adjustments and redesign showed me how testing can guide improvements that calculations alone may not capture."
        ],

        media: [
          {
            type: "video",
            group: "hero",
            src: "bank-left-final-flight.mp4",
            poster: "bank-left-final-flight-poster.png",
            caption: "Final flight test. The final design achieved a reported flight distance of 54 ft."
          },
          {
            type: "image",
            group: "initial",
            src: "bank-left-initial.jpeg",
            alt: "Initial balsa wood glider design",
            caption: "Initial design: 12-inch wingspan and 9-inch fuselage."
          },
          {
            type: "video",
            group: "initial",
            src: "bank-left-other-test.mp4",
            poster: "bank-left-other-test-poster.png",
            caption: "An outdoor flight test of the initial design."
          },
          {
            type: "image",
            group: "final",
            src: "bank-left-final-top.jpeg",
            alt: "Top view of the final balsa wood glider",
            caption: "Final design: 16-inch wingspan and 12-inch fuselage."
          },
          {
            type: "image",
            group: "final",
            src: "bank-left-final-side.jpeg",
            alt: "Another view of the final glider",
            caption: "Another view of the final design."
          }
        ],

        links: []
      }
    ]
  },

  beyond: {
  eyebrow: "THE OTHER SIDE",
  title: "Beyond the Classroom",
  intro: "The interests and experiences that make me, me.",

  sections: [
    {
      id: "music",
      title: "Music",
      image: "",
      imageAlt: "",
      text: [],
      media: [],
      links: []
    },
    {
      id: "sports",
      title: "Sports",
      image: "",
      imageAlt: "",
      text: [],
      media: [],
      links: []
    },
    {
      id: "model-un",
      title: "Model UN",
      image: "",
      imageAlt: "",
      text: [],
      media: [],
      links: []
    },
    {
      id: "about-me",
      title: "A Little More About Me",
      image: "",
      imageAlt: "",
      text: [],
      media: [],
      links: []
    }
  ]
},
  contact: {
    eyebrow: "GET IN TOUCH",
    title: "Let's connect!",
    intro: "For opportunities, collaborations, or a conversation about a shared interest."
  }
};
