/* Edit portfolio text and media here.
   Each project needs a unique id.
   Set visible: false to hide a project. */

window.PORTFOLIO = {
  name: "Shyam Sivan",
  subtitle: "Aerospace Engineering · Astrophysics Minor",
  institution: "Georgia Institute of Technology",
  portrait: "assets/shyam_sivan_portrait.jpg",
  portraitAlt: "Shyam Sivan",
  email: "sivanshyam07@gmail.com",
  phone: "+1 (470) 350-9720",
  gtEmail: "ssivan3@gatech.edu",
  linkedin: "https://www.linkedin.com/in/shyamsivan/",
  resume: "assets/Shyam_Sivan_Resume.pdf",
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
  cover: "assets/injector-face.jpeg",
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
    src: "assets/injector-face.jpeg",
    alt: "CAD view of the injector face showing the triplet arrangement",
    caption: "Injector face with 16 unlike-triplet elements."
  },
  {
    type: "image",
    group: "hero",
    src: "assets/injector-manifold-section.jpeg",
    alt: "CAD cross section of the internal injector manifolds",
    caption: "Internal manifold geometry."
  },
  {
    type: "image",
    group: "geometry",
    src: "assets/injector-triplet-geometry.jpeg",
    alt: "Cross-sectional diagram of the unlike-triplet element geometry",
    caption: "Element geometry and jet impingement arrangement."
  },
  {
    type: "image",
    group: "geometry",
    src: "assets/injector-flow-paths.jpeg",
    alt: "Annotated cross section showing oxygen and methane flow paths",
    caption: "Separate oxygen and methane flow paths through the injector."
  },
  {
    type: "image",
    group: "mesh",
    src: "assets/injector-methane-mesh.jpeg",
    alt: "Computational mesh of the methane manifold",
    caption: "Methane-manifold mesh and boundary-layer refinement."
  },
  {
    type: "image",
    group: "mesh",
    src: "assets/injector-lox-mesh.jpeg",
    alt: "Computational mesh of the liquid oxygen manifold",
    caption: "Liquid-oxygen manifold mesh and boundary-layer refinement."
  },
  {
    type: "image",
    group: "cfd",
    src: "assets/injector-methane-cfd.jpeg",
    alt: "Methane-manifold pressure contours and velocity streamlines",
    caption: "Methane-manifold CFD results indicating preferential flow toward the outer elements."
  },
  {
    type: "image",
    group: "cfd",
    src: "assets/injector-lox-cfd.jpeg",
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
  cover: "assets/voxel-pet-block.jpeg",
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
    src: "assets/voxel-pet-block.jpeg",
    alt: "Recycled PET voxel block",
    caption: "A voxel block printed using recycled PET."
  },
  {
    type: "image",
    group: "process",
    src: "assets/voxel-bottle-cutter.jpeg",
    alt: "Bottle-strip cutting setup",
    caption: "Preparing plastic bottles for filament production."
  },
  {
    type: "image",
    group: "process",
    src: "assets/voxel-filament.jpeg",
    alt: "Recycled PET filament and filament-making equipment",
    caption: "Recycled PET filament."
  },
  {
    type: "image",
    group: "process",
    src: "assets/voxel-assemblies.jpeg",
    alt: "Printed voxel structures in different configurations",
    caption: "Printed components and assembled voxel structures."
  },
  {
    type: "image",
    group: "results",
    src: "assets/voxel-2x2-comparison.png",
    alt: "Compression results for 2×2×2 PET and PETG structures",
    caption: "2×2×2 configuration: PET and PETG."
  },
  {
    type: "image",
    group: "results",
    src: "assets/voxel-3x3-comparison.png",
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
        cover: "assets/free-bird-rocket.png",
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
            src: "assets/free-bird-rocket.png",
            alt: "Completed Free Bird model rocket standing upright",
            caption: "The completed Free Bird rocket."
          },
          {
            type: "image",
            group: "nose",
            src: "assets/free-bird-nose-cone.png",
            alt: "SolidWorks model of the rocket nose cone",
            caption: "Custom nose cone."
          },
          {
            type: "image",
            group: "parts",
            src: "assets/free-bird-transition.jpeg",
            alt: "SolidWorks model of the body tube transition",
            caption: "Transition between the payload bay and main body tube."
          },
          {
            type: "image",
            group: "parts",
            src: "assets/free-bird-payload-bay.png",
            alt: "SolidWorks model of the cylindrical payload bay",
            caption: "Custom payload bay for the Pnut altimeter."
          },
          {
            type: "image",
            group: "analysis",
            src: "assets/free-bird-openrocket.png",
            alt: "Free Bird rocket configuration in OpenRocket",
            caption: "Rocket configuration modeled in OpenRocket."
          },
          {
            type: "image",
            group: "analysis",
            src: "assets/free-bird-altitude.png",
            alt: "Measured altitude versus flight time",
            caption: "Flight altitude history; measured apogee: 98 ft."
          },
          {
            type: "image",
            group: "analysis",
            src: "assets/free-bird-velocity.png",
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
        cover: "assets/bank-left-final-top.jpeg",
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
            src: "assets/bank-left-final-flight.mp4",
            poster: "assets/bank-left-final-flight-poster.png",
            caption: "Final flight test. The final design achieved a reported flight distance of 54 ft."
          },
          {
            type: "image",
            group: "initial",
            src: "assets/bank-left-initial.jpeg",
            alt: "Initial balsa wood glider design",
            caption: "Initial design: 12-inch wingspan and 9-inch fuselage."
          },
          {
            type: "video",
            group: "initial",
            src: "assets/bank-left-other-test.mp4",
            poster: "assets/bank-left-other-test-poster.png",
            caption: "An outdoor flight test of the initial design."
          },
          {
            type: "image",
            group: "final",
            src: "assets/bank-left-final-top.jpeg",
            alt: "Top view of the final balsa wood glider",
            caption: "Final design: 16-inch wingspan and 12-inch fuselage."
          },
          {
            type: "image",
            group: "final",
            src: "assets/bank-left-final-side.jpeg",
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
        description: "What’s on repeat and what I’ll always recommend.",
        image: "assets/music-collage.png",
        imageAlt: "A collage of twenty album covers",
        text: [],
        media: [],
        links: []
      },
      {
        id: "sports",
        title: "Sports",
        description: "My local and overseas allegiances.",
        image: "assets/sports-collage-matched.png",
        imageAlt: "Borussia Dortmund, Atlanta Falcons, Atlanta United, and Atlanta Braves",
        text: [],
        media: [],
        links: []
      },
      {
        id: "life-experiences",
        title: "Life & Experiences",
        description: "Trips, extracurriculars, and whatever I’ve been doing for fun.",
        image: "life-experiences.jpg",
        imageAlt: "Galaxy NGC 6384 surrounded by stars",
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

/* Paste at the END of content.js, after the existing closing }; */
window.PORTFOLIO.beyond = {
  eyebrow: "THE OTHER SIDE",
  title: "Beyond the Classroom",
  intro: "Music, sports, and photos from wherever I end up.",
  travel: {
    countries: ["USA", "CAN", "IND", "PRT"],
    territories: ["PRI"],
    states: [
      "CA", "NV", "AZ", "AL", "TN", "FL", "GA", "SC", "NC",
      "VA", "DC", "MD", "NY", "NJ", "MN", "MA", "PA", "AK"
    ],
    tentativeStates: []
  },
  sections: [
    {
      id: "music", title: "Music", kind: "music",
      description: "What’s on repeat and what I’ll always recommend.",
      image: "assets/music-collage.png", imageAlt: "Twenty of my favorite album covers",
      text: [
        "I listen to a pretty wide variety of music, and I’m always open to recommendations—giving and receiving.",
        "I’m also getting into playing music again. I used to play trumpet, and I’m learning guitar."
      ],
      playlist: {
        image: "assets/music-snoopy.png",
        href: "https://open.spotify.com/playlist/11fr5tV0yhsAbRM3de9jnG",
        note: "One mega playlist. Weird, I know. I use Apple Music, so this Spotify version might not be completely up to date."
      },
      favorites: [
        { title: "On repeat", songs: [
          ["Drink", "Destroy Boys"], ["Kiss", "Lucille"],
          ["Roommates", "Malcolm Todd"], ["Strawberry Blonde", "Under High Street"],
          ["Mayari", "bunii"]
        ] },
        { title: "Always recommend", songs: [
          ["Kitchen Lights", "Westside Gunn & Stove God Cooks"],
          ["Devil in a New Dress", "Kanye West & Rick Ross"],
          ["GONE, GONE / THANK YOU", "Tyler, The Creator"],
          ["Self Care", "Mac Miller"], ["One Beer", "MF DOOM"]
        ] }
      ]
    },
    {
      id: "sports", title: "Sports", kind: "sports",
      description: "My local and overseas allegiances.",
      image: "assets/sports-collage-matched.png", imageAlt: "Dortmund and Atlanta sports",
      text: [
        "I started following soccer around 2015 after watching the Bundesliga. I liked the way Dortmund played and especially enjoyed watching Aubameyang, Marco Reus, and Roman Weidenfeller. I primarily played goalkeeper, so Weidenfeller stood out to me. I’ve stuck with Dortmund ever since.",
        "I started following Brighton around 2020 for much the same reason. Roma has a different origin story: my first soccer jersey was a Roma shirt I bought at Heathrow on the way to Lisbon.",
        "The Atlanta teams are the local allegiances. I loved watching Josef Martínez when he was here, and I’m getting more into football and baseball through the Falcons and Braves. My first soccer game in person wasn’t until August 2025—criminal that it took that long."
      ],
      media: [
        { src: "assets/sports-hawks-sumo.jpg", caption: "Sumo at a Hawks game, Oct 2025." },
        { src: "assets/sports-hertha-lisbon.jpg", caption: "Hertha Berlin sticker in Lisbon." },
        { src: "assets/sports-dortmund-keychain.jpg", caption: "Part of my Dortmund haul: a bottle opener keychain, alongside a shirt, hoodie, and jersey." },
        { src: "assets/sports-world-cup-fanfest.jpg", caption: "Watching the World Cup at FanFest in Atlanta, Jul 2026." },
        { src: "assets/sports-first-match.jpg", caption: "My first soccer game in person at Mercedes-Benz Stadium, Aug 2025." }
      ]
    },
    {
      id: "photos", title: "Photos", kind: "photos",
      description: "Random photos from the places I visited.",
      media: [
        { src: "assets/photo-azhimala.jpg", caption: "Shiva statue at Aazhimala Shiva Temple, Kerala." },
        { src: "assets/photo-las-vegas.jpg", caption: "Welcome sign at Las Vegas, Dec 2022." },
        { src: "assets/photo-venetian.jpg", caption: "Gondolas at The Venetian, Las Vegas, Dec 2022." },
        { src: "assets/photo-horseshoe-sunset.jpg", caption: "Christmas sunset at Horseshoe Bend, Dec 2022." },
        { src: "assets/photo-vancouver-clock.jpg", caption: "Steam clock at Gastown, Vancouver, summer 2023." },
        { src: "assets/photo-glacier-bay.jpg", caption: "Mountains and water at Glacier Bay National Park, Alaska." },
        { src: "assets/photo-cumming-quarry.jpg", caption: "Quarry at Cumming, Georgia, Apr 2024." },
        { src: "assets/photo-puerto-rico-coast.jpg", caption: "Coastal cliffs in Puerto Rico, Dec 2024." },
        { src: "assets/photo-puerto-rico-waterfall.jpg", caption: "Waterfall at Ala de la Piedra, Puerto Rico." },
        { src: "assets/photo-sao-jorge.jpg", caption: "City view at Castelo de São Jorge, Lisbon, Dec 2025." },
        { src: "assets/photo-lisbon-christmas.jpg", caption: "Christmas lights in Lisbon." },
        { src: "assets/photo-sao-vicente.jpg", caption: "Sunset at São Vicente, Lisbon." },
        { src: "assets/photo-porto-covo.jpg", caption: "Rocky coastline at Porto Covo, Portugal." },
        { src: "assets/photo-northside-sunset.jpg", caption: "Sunset outside Northside Hospital, May 2026." },
        { src: "assets/photo-midtown-night.jpg", caption: "Midtown Atlanta from my balcony, Oct 2026." },
        { type: "video", src: "assets/video-la-jolla.mp4", poster: "assets/poster-la-jolla.jpg", caption: "Waves at La Jolla, California, Dec 2022." },
        { type: "video", src: "assets/video-mendenhall.mp4", poster: "assets/poster-mendenhall.jpg", caption: "Waterfall at Mendenhall Lake, Alaska, Jun 2023." },
        { type: "video", src: "assets/video-skagway.mp4", poster: "assets/poster-skagway.jpg", caption: "Mountain views on the Skagway train ride, Alaska." }
      ]
    }
  ]
};
(() => {
  const beyond = window.PORTFOLIO.beyond;
  const music = beyond.sections.find(item => item.id === "music");
  const sports = beyond.sections.find(item => item.id === "sports");
  const photos = beyond.sections.find(item => item.id === "photos");

  music.text = [
    "I listen to a pretty wide variety of music, and I’m always open to recommendations, both giving and receiving, so don't hesitate to drop a song you want me to listen to at any time!",
    "I’m also getting into playing music again; I used to play trumpet, and I’m learning guitar (emphasis on learning)."
  ];

  music.playlist.note =
    "My one mega playlist [weird, I know]. I use Apple Music, so this Spotify version might not be completely up to date.";

  // Each song: title, artist, Spotify track ID, album artwork URL.
  const song = (title, artist, id, artwork) => [
    title,
    artist,
    "https://open.spotify.com/track/" + id,
    artwork
  ];

  music.favorites = [
    {
      title: "On repeat",
      songs: [
        song(
          "Drink",
          "Destroy Boys",
          "1BPrb82sw4NISXgRfdBFRS",
          "assets/music/song-cover-4.jpg"
        ),
        song(
          "Kiss",
          "Lucille",
          "2YZcBYcve5hmoxwWqiegqT",
          "assets/music/song-cover-8.jpg"
        ),
        song(
          "Roommates",
          "Malcolm Todd",
          "5vPUv0xziXbV4lnWeVNXNq",
          "assets/music/song-cover-5.jpg"
        ),
        song(
          "Strawberry Blonde",
          "Under High Street",
          "3nvP8i9h7VvC5s48O1i1Ub",
          "assets/music/song-cover-2.jpg"
        ),
        song(
          "Mayari",
          "bunii",
          "2HugUG5L0maVwEPooB0Eux",
          "assets/music/song-cover-9.jpg"
        )
      ]
    },
    {
      title: "All-time favorites",
      songs: [
        song(
          "Kitchen Lights",
          "Westside Gunn & Stove God Cooks",
          "4mlP10ICLhXt2QmUf0GkpB",
          "assets/music/song-cover-7.jpg"
        ),
        song(
          "Devil in a New Dress",
          "Kanye West & Rick Ross",
          "1UGD3lW3tDmgZfAVDh6w7r",
          "assets/music/song-cover-10.jpg"
        ),
        song(
          "GONE, GONE / THANK YOU",
          "Tyler, The Creator",
          "1hz7SRTGUNAtIQ46qiNv2p",
          "assets/music/song-cover-6.jpg"
        ),
        song(
          "Self Care",
          "Mac Miller",
          "5bJ1DrEM4hNCafcDd1oxHx",
          "assets/music/song-cover-3.jpg"
        ),
        song(
          "One Beer",
          "MF DOOM",
          "4BnrGx9tWNF8aiXl1UhDBa",
          "assets/music/song-cover-1.jpg"
        )
      ]
    }
  ];

  sports.text[2] =
    "Obviously, I have to follow the Atlanta teams too. I loved watching Josef Martínez when he was here, and I’m getting more into football and baseball through the Falcons and Braves. My first soccer game in person wasn’t until August 2025 (absolutely criminal that it took that long).";

  const captions = {
    "assets/photo-azhimala.jpg":
      "Shiva statue at Aazhimala Shiva Temple, Kerala, summer 2022.",

    "assets/photo-vancouver-clock.jpg":
      "Steam clock at Gastown, Vancouver, summer 2023.",

    "assets/photo-glacier-bay.jpg":
      "Mountains and water at Glacier Bay National Park, Alaska, summer 2023.",

    "assets/video-mendenhall.mp4":
      "Waterfall at Mendenhall Lake, Alaska, summer 2023.",

    "assets/video-skagway.mp4":
      "Mountain views on the Skagway train ride, Alaska, summer 2023.",

    "assets/photo-sao-jorge.jpg":
      "City view at Castelo de São Jorge, Lisbon, Dec 2025.",

    "assets/photo-lisbon-christmas.jpg":
      "Christmas lights in Lisbon, Dec 2025.",

    "assets/photo-sao-vicente.jpg":
      "Sunset at São Vicente, Lisbon, Dec 2025.",

    "assets/sports-hertha-lisbon.jpg":
      "Hertha Berlin sticker in Lisbon, Dec 2025.",

    "assets/photo-puerto-rico-coast.jpg":
      "Coastal cliffs in Puerto Rico, Dec 2024.",

    "assets/photo-puerto-rico-waterfall.jpg":
      "Waterfall at Ala de la Piedra, Puerto Rico, Dec 2024."
  };

  [...photos.media, ...sports.media].forEach(asset => {
    if (captions[asset.src]) {
      asset.caption = captions[asset.src];
    }
  });
})();


/* Music page: edit these arrays to update albums and playlist statistics. */
(() => {
  const music = window.PORTFOLIO.beyond.sections.find(section => section.id === "music");
  Object.assign(music, {
  "albums": [
    {
      "title": "SCARLET",
      "artist": "lucille",
      "description": "A short alternative project with strong indie-rock elements and raw, emotional vocals. Each song has a feeling that stays with you; an album you feel in your soul as much as your ears.",
      "highlights": [
        {
          "title": "kiss",
          "href": "https://open.spotify.com/track/2YZcBYcve5hmoxwWqiegqT"
        },
        {
          "title": "motley",
          "href": "https://open.spotify.com/track/1yskCy9gxYxscHJXh8LKl2"
        },
        {
          "title": "whatever",
          "href": "https://open.spotify.com/track/34rsH11GRoXnXpgr9nZRiD"
        }
      ],
      "href": "https://open.spotify.com/album/2ieO1dOClFy6tduKWfqCLI",
      "image": "assets/music/album-scarlet.jpg"
    },
    {
      "title": "Across The Tracks",
      "artist": "Boldy James & Conductor Williams",
      "description": "Boldy’s calm, deliberate delivery meets Conductor’s warped soul samples and grimey drums to create an incredible project. Detailed street stories over production that's warm and uneasy at the same time, with plenty to catch in every song.",
      "highlights": [
        {
          "title": "Terms And Conditions",
          "href": "https://open.spotify.com/track/2q96AKhUMU6sRz4VhpQVKn"
        },
        {
          "title": "St. Juliana",
          "href": "https://open.spotify.com/track/2Rig20krug9sy1Y95z6StG"
        },
        {
          "title": "Flying Trapeze Act",
          "href": "https://open.spotify.com/track/69GyePdgzaKuR2opXcamCT"
        }
      ],
      "href": "https://open.spotify.com/album/4vGxWRaA3iG6w8st1eOtlt",
      "image": "assets/music/album-across-the-tracks.jpg"
    },
    {
      "title": "Charm",
      "artist": "Clairo",
      "description": "Warm basslines, soft vocals, and touches of vintage soul. An understated indie-pop album about attraction and wanting to get closer to someone. Also, it came out on my 17th birthday!",
      "highlights": [
        {
          "title": "Juna",
          "href": "https://open.spotify.com/track/2mWfVxEo4xZYDaz0v7hYrN"
        },
        {
          "title": "Second Nature",
          "href": "https://open.spotify.com/track/7cFwopK7QTOgaEwF9JgipA"
        },
        {
          "title": "Terrapin",
          "href": "https://open.spotify.com/track/32fwe7MW5koort1Ua3YFx6"
        }
      ],
      "href": "https://open.spotify.com/album/1KNUCVXgIxKUGiuEB8eG0i",
      "image": "assets/music/album-charm.jpg"
    },
    {
      "title": "MM..FOOD",
      "artist": "MF DOOM",
      "description": "Dense rhymes, food metaphors, and comic-book samples over playful, offbeat production. There’s always another reference to catch on each next listen.",
      "highlights": [
        {
          "title": "One Beer",
          "href": "https://open.spotify.com/track/16JjiyBtunSBytgnVkOtmy"
        },
        {
          "title": "Deep Fried Frenz",
          "href": "https://open.spotify.com/track/7ph4ScAOlfqwhwH06B5oSa"
        },
        {
          "title": "Vomitspit",
          "href": "https://open.spotify.com/track/0iJOSpq9kcAVpQiHTJ1V8G"
        }
      ],
      "href": "https://open.spotify.com/album/5cJZYHZ3f5yc3TjHWRR0mg",
      "image": "assets/music/album-mm-food.jpg"
    },
    {
      "title": "CHASE",
      "artist": "Aaron May",
      "description": "Laid-back rap with soulful beats and reflective writing about ambition, relationships, and finding your direction. An underrated project from an underrated artist with something for any rap head.",
      "highlights": [
        {
          "title": "Let Go",
          "href": "https://open.spotify.com/track/2axiRrUWmlFUKmPzDsjjzg"
        },
        {
          "title": "Cream",
          "href": "https://open.spotify.com/track/1Sf0N3UueUQ5Nmk0f382BJ"
        },
        {
          "title": "I'm Good Luv, Enjoy.",
          "href": "https://open.spotify.com/track/0Cv3Jku9IP47deaYcfHWar"
        }
      ],
      "href": "https://open.spotify.com/album/6WlJw5nden9COAJaZheEuh",
      "image": "assets/music/album-chase.jpg"
    },
    {
      "title": "Some Rap Songs",
      "artist": "Earl Sweatshirt",
      "description": "Short, fragmented tracks built around hazy loops and deeply personal verses. Grief, family, and self-reflection run through this heartfelt album that rewards close listening.",
      "highlights": [
        {
          "title": "December 24",
          "href": "https://open.spotify.com/track/0LppLsxXXDBTqihx84BJGo"
        },
        {
          "title": "Azucar",
          "href": "https://open.spotify.com/track/1mAEQbdq0dZQWfujWG6rCd"
        },
        {
          "title": "Cold Summers",
          "href": "https://open.spotify.com/track/0xUbrvxYljD4OZ02BbuPpK"
        }
      ],
      "href": "https://open.spotify.com/album/66at85wgO2pu5CccvqUF6i",
      "image": "assets/music/album-some-rap-songs.jpg"
    },
    {
      "title": "In Between Dreams",
      "artist": "Jack Johnson",
      "description": "Easygoing acoustic guitar and warm vocals, with songs about love and everyday life. A relaxed listen without needing to fade into the background.",
      "highlights": [
        {
          "title": "Banana Pancakes",
          "href": "https://open.spotify.com/track/0BgbobvykXxEvxo2HhCuvM"
        },
        {
          "title": "Better Together",
          "href": "https://open.spotify.com/track/2iXdwVdzA0KrI2Q0iZNJbX"
        },
        {
          "title": "Sitting, Waiting, Wishing",
          "href": "https://open.spotify.com/track/1dnXuEuApvuVqQCn0v9McL"
        }
      ],
      "href": "https://open.spotify.com/album/2B9q4KPjOEYu885Keo9dfX",
      "image": "assets/music/album-in-between-dreams.jpg"
    },
    {
      "title": "Songs in the Key of Life",
      "artist": "Stevie Wonder",
      "description": "Soul, funk, jazz, and pop across songs about love, childhood, inequality, and everyday joy. A true classic, not the shortest but plenty of reasons to hear it through.",
      "highlights": [
        {
          "title": "Isn't She Lovely",
          "href": "https://open.spotify.com/track/6RANU8AS5ICU5PEHh8BYtH"
        },
        {
          "title": "Sir Duke",
          "href": "https://open.spotify.com/track/4pNiE4LCVV74vfIBaUHm1b"
        },
        {
          "title": "Love's In Need Of Love Today",
          "href": "https://open.spotify.com/track/39sdlCugrGBsoC4Flos0HO"
        }
      ],
      "href": "https://open.spotify.com/album/6YUCc2RiXcEKS9ibuZxjt0",
      "image": "assets/music/album-songs-in-the-key-of-life.jpg"
    }
  ],
  "stats": {
    "intro": "A breakdown of my playlist in numbers; the genres and the artists that make it up:",
    "genres": [
      [
        "Hip Hop",
        50.3
      ],
      [
        "Pop",
        15.6
      ],
      [
        "Rock",
        11.4
      ],
      [
        "R&B",
        6.2
      ],
      [
        "Electronic",
        6.0
      ],
      [
        "Jazz",
        4.6
      ],
      [
        "Traditional Music",
        1.9
      ],
      [
        "Latin",
        1.5
      ],
      [
        "Folk",
        0.8
      ],
      [
        "Easy Listening",
        0.4
      ],
      [
        "Classical",
        0.4
      ],
      [
        "Christian",
        0.4
      ],
      [
        "Country",
        0.4
      ],
      [
        "Blues",
        0.2
      ]
    ],
    "artists": [
      {
        "name": "Westside Gunn",
        "count": 30,
        "href": "https://open.spotify.com/artist/0ABk515kENDyATUdpCKVfW",
        "image": "assets/music/artist-westside-gunn.jpg"
      },
      {
        "name": "lucille",
        "count": 21,
        "href": "https://open.spotify.com/artist/0g6CutYJWOLpnIfjju8n8o",
        "image": "assets/music/artist-lucille.jpg"
      },
      {
        "name": "Boldy James",
        "count": 12,
        "href": "https://open.spotify.com/artist/4fpwOzxFRMVGfd197dKIdY",
        "image": "assets/music/artist-boldy-james.jpg"
      },
      {
        "name": "Stove God Cooks",
        "count": 12,
        "href": "https://open.spotify.com/artist/35fcckhFq2cF2u7hIG0fPv",
        "image": "assets/music/artist-stove-god-cooks.jpg"
      },
      {
        "name": "Kanye West",
        "count": 12,
        "href": "https://open.spotify.com/artist/5K4W6rqBFWDnAN6FQUkS6x",
        "image": "assets/music/artist-kanye-west.jpg"
      },
      {
        "name": "Aaron May",
        "count": 12,
        "href": "https://open.spotify.com/artist/2rwALQ1SXdfUWPUd6WOfYS",
        "image": "assets/music/artist-aaron-may.jpg"
      },
      {
        "name": "bunii",
        "count": 11,
        "href": "https://open.spotify.com/artist/6mx3Y8XNLPaS2pjJbQFq3W",
        "image": "assets/music/artist-bunii.jpg"
      },
      {
        "name": "JPEGMAFIA",
        "count": 10,
        "href": "https://open.spotify.com/artist/6yJ6QQ3Y5l0s0tn7b0arrO",
        "image": "assets/music/artist-jpegmafia.jpg"
      },
      {
        "name": "Mac Miller",
        "count": 10,
        "href": "https://open.spotify.com/artist/4LLpKhyESsyAXpc4laK94U",
        "image": "assets/music/artist-mac-miller.jpg"
      }
    ]
  },
  "text": [
    "I listen to a pretty wide variety of music, and I’m always open to recommendations, both giving and receiving, so don't hesitate to drop a song you want me to listen to at any time!",
    "Rap is my biggest genre given I've been a fan for over 10 years, but I’m getting a lot more into indie music nowadays. My playlist is a big mashup of genres, though, so everything’s welcome in there.",
    "I’m also getting into playing music again; I used to play trumpet, and I’m learning guitar (emphasis on learning though, definitely not that good)."
  ]
});
  music.playlist.note = "My one mega playlist [weird, I know]. I use Apple Music, so this Spotify version might not be completely up to date.";
  music.favorites.forEach(group => group.songs.forEach(song => { if (song[2].endsWith("2YZcBYcve5hmoxwWqiegqT")) { song[0] = "kiss"; song[1] = "lucille"; } if (song[2].endsWith("2HugUG5L0maVwEPooB0Eux")) song[0] = "MAYARI"; }));
})();


/* AE 2610 labs and project order. Reorder this ID list to change the displayed order. */
(() => {
  const projects = window.PORTFOLIO.projects;
  const additions = [
  {
    "id": "wind-tunnel-testing",
    "title": "Wind Tunnel Testing: Wing Loads and Stall",
    "labType": "wind",
    "category": "AE 2610 · Aerodynamics · Experimental Methods",
    "visible": true,
    "summary": "Wind tunnel testing of lift, drag, stall, and pitching moment, with and without an end plate.",
    "cover": "assets/labs/wind-lift-12-with-end-plate.png",
    "coverAlt": "Lift coefficient vs. angle of attack, 12 m/s, with end plate",
    "text": [
      "For Experimental Methods in Aerospace Engineering ([AE 2610](https://ae.gatech.edu/sites/default/files/file/2022/12/AE%202610%20Syllabus%20-%20Introduction%20to%20Experimental%20Methods%20in%20Aerospace.pdf)), our lab group tested how angle of attack, wind speed, and whether or not there was an end plate affected a rectangular wing’s aerodynamic performance. We tested four configurations in a low-turbulence wind tunnel: 12 and 16.5 m/s, each with and without the end plate.",
      "A six-component load cell measured forces and moments, while a Pitot-static probe and differential pressure transducer measured dynamic pressure. We grouped measurements by angle of attack, calculating lift, drag, lift coefficient, drag coefficient, and pitching moment coefficient from measured forces, angle of attack, and wing geometry.",
      "The end plate increased the measured maximum lift coefficient at both speeds. It also improved the lift-to-drag ratio around 10° and reduced drag when compared at a specific lift coefficient. Near stall, lift dropped sharply while drag increased and pitching moment changed abruptly.",
      "The experiment also involved uncertainty propagation and comparison with thin-airfoil theory. The difference in stall behavior between the two wind speeds highlighted the need for repeated tests and careful alignment to better distinguish flow effects from measurement variability."
    ],
    "media": [
      {
        "type": "image",
        "src": "assets/labs/wind-lift-12-with-end-plate.png",
        "alt": "Lift coefficient vs. angle of attack, 12 m/s, with end plate",
        "caption": "12 m/s · With end plate",
        "plotGroup": "lift",
        "speed": 12,
        "endPlate": true
      },
      {
        "type": "image",
        "src": "assets/labs/wind-lift-16p5-with-end-plate.png",
        "alt": "Lift coefficient vs. angle of attack, 16.5 m/s, with end plate",
        "caption": "16.5 m/s · With end plate",
        "plotGroup": "lift",
        "speed": 16.5,
        "endPlate": true
      },
      {
        "type": "image",
        "src": "assets/labs/wind-lift-12-without-end-plate.png",
        "alt": "Lift coefficient vs. angle of attack, 12 m/s, without end plate",
        "caption": "12 m/s · Without end plate",
        "plotGroup": "lift",
        "speed": 12,
        "endPlate": false
      },
      {
        "type": "image",
        "src": "assets/labs/wind-lift-16p5-without-end-plate.png",
        "alt": "Lift coefficient vs. angle of attack, 16.5 m/s, without end plate",
        "caption": "16.5 m/s · Without end plate",
        "plotGroup": "lift",
        "speed": 16.5,
        "endPlate": false
      },
      {
        "type": "image",
        "src": "assets/labs/wind-drag-12-with-end-plate.png",
        "alt": "Drag coefficient vs. angle of attack, 12 m/s, with end plate",
        "caption": "12 m/s · With end plate",
        "plotGroup": "drag",
        "speed": 12,
        "endPlate": true
      },
      {
        "type": "image",
        "src": "assets/labs/wind-drag-16p5-with-end-plate.png",
        "alt": "Drag coefficient vs. angle of attack, 16.5 m/s, with end plate",
        "caption": "16.5 m/s · With end plate",
        "plotGroup": "drag",
        "speed": 16.5,
        "endPlate": true
      },
      {
        "type": "image",
        "src": "assets/labs/wind-drag-12-without-end-plate.png",
        "alt": "Drag coefficient vs. angle of attack, 12 m/s, without end plate",
        "caption": "12 m/s · Without end plate",
        "plotGroup": "drag",
        "speed": 12,
        "endPlate": false
      },
      {
        "type": "image",
        "src": "assets/labs/wind-drag-16p5-without-end-plate.png",
        "alt": "Drag coefficient vs. angle of attack, 16.5 m/s, without end plate",
        "caption": "16.5 m/s · Without end plate",
        "plotGroup": "drag",
        "speed": 16.5,
        "endPlate": false
      },
      {
        "type": "image",
        "src": "assets/labs/wind-polar-12-with-end-plate.png",
        "alt": "Drag polar, 12 m/s, with end plate",
        "caption": "12 m/s · With end plate",
        "plotGroup": "polar",
        "speed": 12,
        "endPlate": true
      },
      {
        "type": "image",
        "src": "assets/labs/wind-polar-16p5-with-end-plate.png",
        "alt": "Drag polar, 16.5 m/s, with end plate",
        "caption": "16.5 m/s · With end plate",
        "plotGroup": "polar",
        "speed": 16.5,
        "endPlate": true
      },
      {
        "type": "image",
        "src": "assets/labs/wind-polar-12-without-end-plate.png",
        "alt": "Drag polar, 12 m/s, without end plate",
        "caption": "12 m/s · Without end plate",
        "plotGroup": "polar",
        "speed": 12,
        "endPlate": false
      },
      {
        "type": "image",
        "src": "assets/labs/wind-polar-16p5-without-end-plate.png",
        "alt": "Drag polar, 16.5 m/s, without end plate",
        "caption": "16.5 m/s · Without end plate",
        "plotGroup": "polar",
        "speed": 16.5,
        "endPlate": false
      },
      {
        "type": "image",
        "src": "assets/labs/wind-moment-12-with-end-plate.png",
        "alt": "Pitching moment coefficient vs. angle of attack, 12 m/s, with end plate",
        "caption": "12 m/s · With end plate",
        "plotGroup": "moment",
        "speed": 12,
        "endPlate": true
      },
      {
        "type": "image",
        "src": "assets/labs/wind-moment-16p5-with-end-plate.png",
        "alt": "Pitching moment coefficient vs. angle of attack, 16.5 m/s, with end plate",
        "caption": "16.5 m/s · With end plate",
        "plotGroup": "moment",
        "speed": 16.5,
        "endPlate": true
      },
      {
        "type": "image",
        "src": "assets/labs/wind-moment-12-without-end-plate.png",
        "alt": "Pitching moment coefficient vs. angle of attack, 12 m/s, without end plate",
        "caption": "12 m/s · Without end plate",
        "plotGroup": "moment",
        "speed": 12,
        "endPlate": false
      },
      {
        "type": "image",
        "src": "assets/labs/wind-moment-16p5-without-end-plate.png",
        "alt": "Pitching moment coefficient vs. angle of attack, 16.5 m/s, without end plate",
        "caption": "16.5 m/s · Without end plate",
        "plotGroup": "moment",
        "speed": 16.5,
        "endPlate": false
      }
    ],
    "plotTabs": [
      {
        "id": "lift",
        "label": "Lift"
      },
      {
        "id": "drag",
        "label": "Drag"
      },
      {
        "id": "polar",
        "label": "Drag polar"
      },
      {
        "id": "moment",
        "label": "Pitching moment"
      }
    ],
    "links": []
  },
  {
    "id": "tensile-testing",
    "title": "Tensile Testing and Material Identification",
    "labType": "tensile",
    "category": "AE 2610 · Materials · Mechanical Testing",
    "visible": true,
    "summary": "Tensile testing, stress–strain analysis, and identification of an unknown metal through measured material properties.",
    "cover": "assets/labs/tensile-aluminum-comparison.png",
    "coverAlt": "2024-T3 aluminum: engineering and true-stress comparison.",
    "text": [
      "For Experimental Methods in Aerospace Engineering ([AE 2610](https://ae.gatech.edu/sites/default/files/file/2022/12/AE%202610%20Syllabus%20-%20Introduction%20to%20Experimental%20Methods%20in%20Aerospace.pdf)), our lab group tensile-tested 2024-T3 aluminum and an unknown metal to compare their mechanical properties and investigate the what the unknown material is.",
      "An Instron electromechanical load frame applied tension until the specimens fractured. Load, extensometer measurements, and specimen dimensions before and after testing provided the data for this analysis.",
      "Using Excel, we converted the raw data into engineering stress-strain curves and estimated Young’s modulus, ultimate tensile strength, fracture properties, and strain-hardening behavior. The aluminum specimen had the higher engineering ultimate tensile strength, while the unknown specimen had a higher measured elastic modulus and greater elongation.",
      "Comparing the unknown specimen’s stiffness, strength, and elongation with published properties gave us a tentative guess of the material as 260 brass. The experiment showed how specimen measurements and the choice of fitting interval affect calculated material properties, particularly the elastic modulus."
    ],
    "media": [
      {
        "type": "image",
        "src": "assets/labs/tensile-aluminum-engineering.png",
        "alt": "2024-T3 aluminum: engineering stress–strain curve.",
        "caption": "2024-T3 aluminum: engineering stress–strain curve.",
        "group": "engineering"
      },
      {
        "type": "image",
        "src": "assets/labs/tensile-unknown-engineering.png",
        "alt": "Unknown metal: engineering stress–strain curve.",
        "caption": "Unknown metal: engineering stress–strain curve.",
        "group": "engineering"
      },
      {
        "type": "image",
        "src": "assets/labs/tensile-aluminum-comparison.png",
        "alt": "2024-T3 aluminum: engineering and true-stress comparison.",
        "caption": "2024-T3 aluminum: engineering and true-stress comparison.",
        "group": "comparison"
      },
      {
        "type": "image",
        "src": "assets/labs/tensile-unknown-comparison.png",
        "alt": "Unknown metal: engineering and true-stress comparison.",
        "caption": "Unknown metal: engineering and true-stress comparison.",
        "group": "comparison"
      }
    ],
    "properties": [
      [
        "Young’s modulus (GPa)",
        "79.8",
        "112.9"
      ],
      [
        "Engineering UTS (MPa)",
        "492.02",
        "378.06"
      ],
      [
        "Elongation from specimen dimensions (%)",
        "23.88",
        "44.89"
      ],
      [
        "Strain-hardening index, n",
        "0.1847",
        "0.2030"
      ],
      [
        "Strength coefficient, K (MPa)",
        "809.18",
        "624.83"
      ]
    ],
    "links": []
  }
];
  additions.forEach(project => { const i = projects.sections.findIndex(p => p.id === project.id); if (i === -1) projects.sections.push(project); else projects.sections[i] = project; });
  const order = ["recycled-pet-voxels", "free-bird", "bank-left", "lox-methane-injector", "wind-tunnel-testing", "tensile-testing"];
  projects.sections = [...order.map(id => projects.sections.find(p => p.id === id)).filter(Boolean), ...projects.sections.filter(p => !order.includes(p.id))];
})();
(() => {
  const projects = window.PORTFOLIO.projects.sections;

  const wind = projects.find(
    project => project.id === "wind-tunnel-testing"
  );

  const tensile = projects.find(
    project => project.id === "tensile-testing"
  );

  if (wind) {
    wind.cover = "assets/labs/wind-tunnel-setup.png";
    wind.coverAlt = "Wind tunnel used for aerodynamic testing";
    wind.heroMedia = {
      type: "image",
      src: wind.cover,
      alt: wind.coverAlt,
      caption: "Wind tunnel setup."
    };
  }

  if (tensile) {
    tensile.cover = "assets/labs/tensile-test-setup.png";
    tensile.coverAlt = "Tensile-testing grips and extensometer";
    tensile.heroMedia = {
      type: "image",
      src: tensile.cover,
      alt: tensile.coverAlt,
      caption: "Tensile-testing grips and extensometer."
    };
  }
})();
/* Resume navigation and homepage card */
(() => {
  const portfolio = window.PORTFOLIO;

  portfolio.navigation = portfolio.navigation.filter(
    item => item.page !== "resume"
  );

  const projectsPosition = portfolio.navigation.findIndex(
    item => item.page === "projects"
  );

  portfolio.navigation.splice(
    projectsPosition < 0 ? 1 : projectsPosition,
    0,
    {
      page: "resume",
      label: "Resume",
      href: "resume.html"
    }
  );

  portfolio.home.pathways = portfolio.home.pathways.filter(
    item => item.href !== "resume.html"
  );

  portfolio.home.pathways.unshift({
    title: "Resume",
    text: "My experience, education, and technical skills.",
    label: "View resume",
    href: "resume.html"
  });

  portfolio.home.pathways.forEach((item, index) => {
    item.number = String(index + 1).padStart(2, "0");
  });
})();


/* OCTOBER LAYOUT SETTINGS — edit these lists as you add photos and places. */
(() => {
  const portfolio = window.PORTFOLIO;

  // HOMEPAGE PHOTOS: add one object per photo. No new HTML files needed.
  // position controls cropping: "center", "center top", "50% 35%", etc.
  portfolio.home.portraits = [
    { src: portfolio.portrait, alt: portfolio.portraitAlt, position: "center", fit: "cover" },
    { src: "assets/portraits/shyam-lander.jpeg", alt: "Working on the Propulsive Landers test setup", position: "center", fit: "contain" },
    { src: "assets/portraits/shyam-roma.jpeg", alt: "Wearing my Roma jersey in Lisbon", position: "center", fit: "cover" },
    { src: "assets/portraits/shyam-cafe.jpeg", alt: "Reading at a café", position: "center", fit: "cover" },
    { src: "assets/portraits/shyam-restaurant.jpeg", alt: "At a restaurant", position: "center", fit: "cover" }
  ];

  const beyond = portfolio.beyond;
  const music = beyond.sections.find(item => item.id === "music");
  const sports = beyond.sections.find(item => item.id === "sports");
  const photos = beyond.sections.find(item => item.id === "photos");
  const travel = {
    id: "places", title: "Places I’ve been", kind: "travel",
    description: "A little more of the map, one trip at a time."
  };

  // PHOTOS COVER: replace the blank string when you've picked an image.
  photos.image = "";
  photos.imageAlt = "";
  photos.description = "Random views I’ve captured over the years.";
  beyond.sections = [music, sports, travel, photos].filter(Boolean);

  // Keep adding ISO three-letter country codes to beyond.travel.countries.
  // Add a matching entry here for its name, continent, and flag file.
  beyond.travel.homeCountry = "USA";
  beyond.travel.homeState = "GA";
  beyond.travel.countryDetails = {
    USA: { name: "United States", continent: "North America", flag: "assets/flags/us.svg" },
    CAN: { name: "Canada", continent: "North America", flag: "assets/flags/ca.svg" },
    IND: { name: "India", continent: "Asia", flag: "assets/flags/in.svg" },
    PRT: { name: "Portugal", continent: "Europe", flag: "assets/flags/pt.svg" }
  };
  beyond.travel.continentTotals = {
    "Africa": 54, "Asia": 48, "Europe": 44,
    "North America": 23, "South America": 12, "Oceania": 14
  };
})();
