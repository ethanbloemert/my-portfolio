import { useState, useEffect } from "react";
import "./App.css";

const FOCUS_COPY = {
    mechanical:
      "Mechanical design is the foundation of my work. I have experience with sheet metal design, welded structures, drivetrains, mechanisms, and large equipment packaging. At Salford I contributed to the SS400+ spreader through structural design, hydraulic performance improvements, and field testing. Through Baja SAE, personal restoration projects, and fabrication work, I stay close to practical manufacturability, serviceability, and packaging constraints.",

    electrical:
      "My electrical experience includes wiring harness design, PLC programming, embedded controllers, and custom PCB development. I have designed complete harnesses and rate control systems for the SS400+, implemented ISOBUS communication on a cultivator platform, retrofitted and decoupled packaging machinery using Siemens PLC logic, and built reliable custom electronics for Baja SAE under harsh conditions.",

    software:
      "On the software side I focus on control logic, modeling, and tools that support hardware development. I have implemented controller networking using Parker IQAN, added ISO11783 compatibility to non-native controllers, built MATLAB and Simulink models for an electrohydraulic engine dynamometer, and created small software and data-processing tools that help validate designs and guide engineering decisions."
  };


const PROJECTS = [
  {// Baja SAE Team Captain
    id: "baja-captain",
    title: "Baja SAE – Team Captain",
    image: "/projects/baja-captain.jpg",
    featured: true,
    skills: ["Leadership", "Integration", "Vehicle", "Electrical Design", "Management"],
    details: {
      description:
        "Western Baja designs, builds, and races an off-road competition vehicle each season. I joined in 2022 and worked across mechanical, electrical, and systems integration roles. Over time I took on increasing responsibility as Electrical Lead and Technical Director for WB23 and now serve as Team Captain for WB25.",

      contribution:
        "I developed strong skills in system design, data acquisition, PCB development, vehicle wiring, and full-vehicle integration. For WB23 I created the team’s first custom data acquisition hardware, redesigned the electrical architecture to improve reliability, and introduced a more analytical approach to engineering. As Technical Director and now Captain I coordinate subsystem decisions using geometry, suspension, and powertrain modeling. I lead structured design reviews, create validation and testing pipelines, and maintain documentation and serviceability standards across seasons.",

      result:
        "WB25 won the 2025 Clarkson University Competition and the data acquisition system earned the Innovative Design Award from Laval University in both 2024 and 2025. WB23 established a new reliability benchmark for the team and generated high-quality data that changed how Western Baja approaches engineering and validation. The processes developed during that cycle now form the core of the team’s workflow. WB25 expanded on that foundation and became the most integrated, data-driven, and serviceable vehicle the team has produced, supported by a validation-first development pipeline."
    }
  },
  {// Salford SS400+ Fertilizer Spreader
    id: "ss400",
    title: "Salford SS400+ Fertilizer Spreader",
    image: "/projects/ss400.jpeg",
    featured: true,
    skills: ["Mechanical Design", "Hydraulics", "Agriculture", "Simulation", "Manufacturability"],
    details: {
      description:
        "The SS400+ is a high-capacity fertilizer and lime spreader designed for large-scale agriculture. It offers a wide spread width, a large hopper, and dual-product capability, which allow operators to cover more acres with fewer stops. During a sixteen-month co-op at Salford I worked across mechanical, hydraulic, electrical, and field-testing roles as the platform moved from early concepts to production-ready designs.",

      contribution:
        "I developed strong skills in mechanical design, hydraulic analysis, electrical integration, and test-driven development. I worked across hundreds of sheet metal parts and major bodywork changes with a focus on manufacturability and serviceability. I performed hydraulic modeling, heat-load estimation, and pump to motor matching. I designed the main wiring harness, integrated multiple rate control systems, tuned their behaviour, and collaborated with a controller manufacturer on a custom software release. I operated and tested each prototype in real field conditions and used the issues I observed to drive improvements in the next iteration.",

      result:
        "The SS400+ was awarded the 2024 CropLife IRON Product of the Year, validating its performance and innovation. The platform delivered a measured hydraulic and control performance improvement of about 68% over the initial design. Its large hopper, wide swath capability (spreading fertilizer up to 120 ft and lime up to 70 ft), and dual-material design positioned it as a high-throughput solution for modern agriculture. The improvements significantly boosted reliability, manufacturability, and ease of maintenance while reducing field-use surprises."    }
  },
  {// ISOBUS Protocol Networking
    id: "salford-isobus",
    title: "ISOBUS Protocol Networking",
    image: "/projects/salford-isobus.jpg",
    featured: false,
    skills: ["Automation", "J1939 ISOBUS", "Agriculture"],
    details: {
      description:
        "Modern agricultural implements communicate with tractors over the ISOBUS (ISO 11783) standard for control, monitoring, and map-based application. This project involved bringing a cultivator platform onto the ISOBUS network to enable GPS-based implement control and better integration with existing farm equipment.",
      contribution:
        "I implemented ISOBUS messaging on a Parker Hannifin controller that did not support the protocol natively. Using Parker IQAN, I developed controller logic, mapped application signals to ISOBUS messages, and validated communication on the network. I worked with early-release units in the field, supporting farmers, collecting feedback, and troubleshooting edge cases that only appeared in real operating environments.",
      result:
        "The cultivator could now integrate seamlessly with ISOBUS-capable tractors and farm displays, enabling more precise control and easier operator setup. The work de-risked future ISOBUS projects at the company and provided a template for adding standard networking to other implements."
    }
  },
  {// Custom PCB Design
    id: "baja-pcb",
    title: "Custom PCB Design",
    image: "/projects/baja-pcb.jpg",
    featured: false,
    skills: ["PCB Design", "Electrical Design", "Validation"],
    details: {
      description:
        "Baja SAE vehicles operate in a harsh, high-vibration environment where wiring, connectors, and electronics are constantly stressed. Off-the-shelf boards often do not fit the packaging, durability, or integration requirements of the car, which makes custom PCB design an important part of building a reliable and serviceable vehicle.",

      contribution:
        "I developed strong skills in circuit design, PCB layout, simulation, and on-vehicle validation. I created custom boards for sensor integration and auxiliary control logic that worked alongside existing ECUs. I simulated circuits in LTspice, built prototypes, and validated each board on the bench and on the car during real operating conditions. My design approach emphasized clear labeling, simple diagnostics, robust connectors, strain relief, and mounting strategies that made trackside service fast and intuitive.",

      result:
        "The custom electronics reduced wiring complexity and improved signal integrity across the vehicle. The team gained more reliable data, faster troubleshooting, and hardware that continued to function through full off-road race seasons. The boards contributed to a more maintainable electrical system and supported the team’s shift toward higher-quality instrumentation and validation."
    }
  },
  {// Engine Dynamometer
    id: "dyno",
    title: "Engine Dynamometer",
    image: "/projects/dyno.jpg",
    featured: false,
    skills: ["Vehicle", "Controls", "Simulation"],
    details: {
      description:
        "Baja SAE powertrains are highly sensitive to CVT tuning, load conditions, and cooling. A dedicated engine and drivetrain dynamometer gives the team a controlled way to study performance and durability before installing components on the vehicle.",

      contribution:
        "I developed strong skills in hydraulic modeling, controls design, system integration, and simulation-driven development. I am designing an electrohydraulic dynamometer that applies realistic load profiles to a Baja powertrain. I model the hydraulic circuit and control strategy in MATLAB and Simulink to tune system behaviour in simulation before committing to hardware. The design includes torque, speed, temperature, and pressure instrumentation so simulation results can be validated directly against physical data.",

      result:
        "The completed system will give the team a repeatable method to test engines, CVTs, and cooling packages off the vehicle. It will provide reliable torque and speed data, improve CVT calibration, reduce tuning guesswork, and allow the team to identify failures long before competition. The dyno will support more efficient drivetrain development and streamline the path from concept to validated hardware."
    }
  },
  {// Vertical Flow Wrapper
    id: "vertical-flow-wrapper",
    title: "VFFS Emulator",
    image: "/projects/vertical-flow-wrapper.jpg",
    featured: false,
    skills: ["Electrical Design", "Automation", "Controls"],
    details: {
      description:
        "In a food packaging plant, a Planit MarsRapid vertical form-fill-seal system with a multihead weigher was available but had gone unused for more than two years. The plant continued to hand-pack a specific product format even though the weigher was fully capable of automating the count-and-dispense step. The equipment needed a new control strategy that used only the multihead weigher while leaving the VFFS portion inactive.",

      contribution:
        "I developed strong skills in controls engineering, PLC programming, and production-line integration. I identified the opportunity to automate the hand-packed product and designed the full solution. I repurposed the multihead weigher as a standalone dispensing system by writing a Siemens PLC program that emulated all necessary VFFS control signals and timing. I created new logic for two independent operator stations with foot pedals that triggered A-side and B-side dispense commands. I added and mapped I/O, built sequencing and interlocks for accurate and repeatable operation, and refined cycle timing, alarms, and usability through direct feedback from operators.",

      result:
        "The new system removed a long-standing hand-packing bottleneck and restored a machine that had been idle for years. The PLC-based VFFS emulation allowed the multihead weigher to run reliably as a standalone dispenser with two independent operator lanes, which increased throughput, reduced manual labor, and improved counting accuracy. The solution provided a flexible and low-maintenance system that fit seamlessly into existing production without requiring new capital equipment."
    }
  },
  {// 1947 Ford Sedan
    id: "47-ford",
    title: "1947 Ford Sedan",
    image: "/projects/47-ford.jpg",
    featured: false,
    skills: ["Fabrication", "Vehicle", "Restoration"],
    details: {
      description:
        "I’ve restored multiple vehicles from the ground up, including a 1998 Dodge Ram 1500 and a 1947 Ford sedan. These are long-term, hands-on projects that touch every part of a vehicle’s structure, systems, and packaging.",
      contribution:
        "Work included full teardown, rust repair, fabrication, rewiring, suspension rebuilds, drivetrain restoration, interior refreshes, and complete reassembly. I spent a lot of time understanding factory design intent, service procedures, and where aftermarket parts help or hurt long-term reliability.",
      result:
        "These restorations built a practical understanding of vehicle structure, packaging constraints, and serviceability that I carry into every design decision. It’s much harder to design something unserviceable once you’ve had to fight with seized fasteners and hidden components on a 75-year-old car."
    }
  },
  {// Custom Audio System
    id: "subwoofer",
    title: "Custom Audio System",
    image: "/projects/sub-box.jpeg",
    featured: false,
    skills: ["Fabrication", "Vehicle", "Audio Design"],
    details: {
      description:
        "This project was a full custom audio upgrade for a single-cab pickup that originally had four factory speakers. The goal was to build a fifteen-speaker system with significantly better sound quality while preserving the truck’s storage space and day-to-day usability.",

      contribution:
        "I developed strong skills in audio system design, enclosure modeling, packaging, and fabrication. I modeled the required air volume for the subwoofer enclosure and designed the box with proper panel stiffness, internal bracing, and secure mounting so it would not flex or rattle. I packaged the system tightly into the available cabin space, routing wiring cleanly, maintaining access to storage compartments, and finishing the installation with an OEM-like appearance. I tuned the system for clarity, balance, and low-frequency performance once installed.",

      result:
        "The completed system delivered clear, powerful sound with tight low-frequency response while fully preserving the truck’s storage functions. The packaging work allowed a fifteen-speaker system to fit into a single-cab interior without compromising usability. The project reflects the same approach I use on larger engineering work, with a focus on packaging, structure, and long-term serviceability."
    }
  },
  {// Western Engineering Build Team
    id: "webt",
    title: "Western Engineering Build Team",
    image: "/projects/webt.jpg",
    featured: false,
    skills: ["Construction", "Fabrication", "Management"],
    details: {
      description:
        "Western Engineering Build Team takes on hardware projects that give students experience with real components, tools, and constraints. One of the team’s largest responsibilities is creating major structures and displays for Western’s Orientation Week.",

      contribution:
        "I developed strong skills in structural design, planning, fabrication, and team coordination. I designed, planned, and completed the largest O-Week display in the team’s history using a full 3D CAD model built in SketchUp. The structure was fully self-supporting and included detailed bracing, truss geometry, and modular wall sections. I coordinated material selection, fabrication sequencing, and safety considerations, and I managed a large student team during preparation and final assembly while communicating closely with Western Engineering faculty.",

      result:
        "The project produced the largest O-Week display Western Engineering had ever built, with a footprint of sixteen feet by thirty-two feet and a height of twenty feet. It included eleven wall sections, a slider door header, four trusses with full X and W bracing, and an eight-by-twelve-foot sliding door. The structure assembled cleanly on schedule and demonstrated the team’s ability to deliver large, safe, and fully engineered installations under tight constraints."
    }
  },
  {// Agricultural Framer
    id: "ag-framer",
    title: "Browndale Farm",
    image: "/projects/ag-framer.JPG",
    featured: false,
    skills: ["Construction", "Teamwork", "Agriculture"],
    details: {
      description:
        "This project involved constructing a new dairy barn built to high-quality, modern agricultural standards. The structure became a key part of the farm’s facilities during the year it received the 2019 Agri-Business Award.",
      contribution:
        "I worked on the full structural build after the foundation was poured, helping set walls, install trusses, fasten steel roofing and siding, and complete trim, doors, and finishing work. Through this project I developed strong hands-on construction skills and learned how to maintain precise, consistent workmanship while working efficiently with a small crew.",
      result:
        "The barn was built with durable, clean workmanship and contributed directly to the farm’s overall infrastructure improvements recognized by the 2019 Agri-Business Award. Our crew delivered a reliable structure that supported the operation’s day-to-day needs and long-term growth."
    }
  }
];

const EXPERIENCE_PRO = [
  {// Baja SAE Team Captain
    id: "baja-experience",
    role: "Team Captain",
    company: "Western Baja Racing",
    logo: "/logos/Baja.png",
    dates: "September 2021 – Present",
    tags: ["Leadership", "Systems Integration", "Simulation", "Fabrication"],
    bullets: [
      "Lead a multi-disciplinary engineering team to design, build, and validate an off-road vehicle each season using a testing-first development cycle.",
      "Shifted the team from single-pass design toward structured modelling, prototype testing, data collection, and iteration across all subsystems.",
      "Pushed full-vehicle modelling for suspension, powertrain, CVT behaviour, and electrical architecture to guide geometry and durability decisions.",
      "Developed an electrohydraulic engine dynamometer model in MATLAB and Simulink to study drivetrain efficiency and characterize load profiles.",
      "Coordinated subsystem leads, managed design reviews, budgets, build schedules, and documentation across multi-year vehicle programs.",
      "Implemented structured validation plans for suspension, steering, drivetrain, and frame stiffness to support data-driven engineering.",
      "Led fabrication workflows including jigs, fixtures, weldments, quality checks, and full-vehicle assembly under competition timelines.",
      "Established documentation standards and CAD revision control practices to improve design traceability and long-term knowledge retention."
    ]
  },
  {// WEESDF Chair
    id: "weesdf-chair",
    role: "WEESDF Chair",
    company: "Western Engineering Endowed Student Donation Fund",
    logo: "/logos/Western.png",
    dates: "September 2025 – Present",
    tags: ["Leadership", "Finance", "Strategy"],
    bullets: [
      "Chair a student-run endowed fund of $450,000 that allocates financial support to engineering clubs, design teams, and student-led technical initiatives.",
      "Oversee proposal evaluation, funding decisions, and long-term financial stewardship to ensure equitable and high-impact resource distribution.",
      "Develop strategic funding priorities that balance innovation, educational value, and fiscal sustainability across diverse engineering projects.",
      "Lead committee meetings, manage deliberations, and ensure transparent, criteria-based decision-making for all grant applications.",
      "Modernized review workflows by implementing structured scoring rubrics, documentation standards, and multi-year funding tracking.",
      "Collaborate with faculty advisors, team leads, and student groups to clarify budgets, technical scopes, and outcome expectations.",
      "Established reporting and accountability processes requiring funded groups to demonstrate learning value, responsible spending, and project impact.",
      "Strengthened WEESDF’s long-term resilience through policy updates, clearer governance structures, and improved institutional memory."
    ]
  },
  {// Design Engineering Co-op
    id: "salford-coop",
    role: "Design Engineering Co-op",
    company: "Salford Group",
    logo: "/logos/Salford.png",
    dates: "2024 – 2025",
    tags: ["Mechanical Design", "Hydraulics", "Electrical Design", "R&D"],
    bullets: [
      "Contributed to mechanical, hydraulic, and electrical design for multiple iterations of the SS400+ fertilizer spreader platform from concept through field testing.",
      "Developed hydraulic subsystems including pump and motor matching, flow and line sizing, and heat-load estimation to improve performance and reliability.",
      "Designed complete wiring harnesses and integrated rate-control hardware, including PID tuning and collaboration with a controller manufacturer on custom software releases.",
      "Implemented ISOBUS communication on a Parker Hannifin controller to support automated cultivator functions and map-based implement control.",
      "Supported field testing and used real-world failures, downtime, and performance data to guide iterative design improvements."
    ]
  },
  {// Process Optimization and Maintenance Engineer
    id: "process-optimization",
    role: "Maintenance and Process Engineering",
    company: "Schep's Bakeries Ltd",
    logo: "/logos/Scheps.png",
    dates: "2020 – 2023",
    tags: ["PLC Programming", "Process Engineering", "Automation"],
    bullets: [
      "Served as the primary technical lead for two fully custom production lines with more than fifteen automated machines each, overseeing equipment performance, reliability, and integration.",
      "Transitioned into a process engineering role by developing new control strategies, identifying improvement opportunities, and optimizing automated machinery to meet production-rate and effectiveness targets.",
      "Designed and implemented a Siemens PLC-based logic system to decouple two linked machines by emulating the missing VFFS control signals, enabling independent operation and restoring throughput.",
      "Led troubleshooting and root-cause analysis across electrical, mechanical, and automation systems, providing rapid solutions during high-demand production periods.",
      "Built strong expertise in machine process analysis, controls integration, and practical, time-critical problem solving necessary to keep high-throughput equipment operating reliably."
    ]
  },
  {// Construction Framer
    id: "construction-framer",
    role: "Construction Framer",
    company: "ASB Inc.",
    logo: "/logos/ASBInc.png",
    dates: "2018 – 2020",
    tags: ["Construction", "Teamwork", "Agriculture"],
    bullets: [
      "Worked as part of a small crew to construct agricultural buildings including barns and drivesheds from post-set through final finishing.",
      "Installed walls, trusses, steel siding, roofing, trim, and doors while maintaining consistent workmanship and safe jobsite practices.",
      "Supported five full building projects completed on schedule with durable, high-quality construction that met demanding farm-use conditions."
    ]
  }

];
const EXPERIENCE_EDU = [
  {
    id: "tron-degree",
    role: "Bachelor of Mechatronics Engineering",
    company: "Western University",
    logo: "/logos/Western.png",
    dates: "2020 – 2026 (expected)",
    tags: [
      "Mechatronics",
      "Mechanical",
      "Electrical",
      "Controls",
      "Embedded Systems",
      "Automation"
    ],
    bullets: [
      "Developed multidisciplinary expertise across mechanical design, electronics, control systems, modelling, and automation.",
      "Completed coursework in robotics, kinematics, embedded programming, circuit design, fluid power, dynamics, and systems integration.",
      "Applied engineering concepts through Western Baja Racing, including subsystem design, testing, fabrication, and full vehicle development.",
      "Worked extensively with CAD, FEA, Simulink, PLC logic, PCB design, and hardware-in-the-loop testing across academic and extracurricular projects.",
      "Integrated hands-on engineering experience with leadership, documentation, and iterative design processes across multi-year team projects."
    ]
  }
];


function App() {
  const [focusArea, setFocusArea] = useState("mechanical");
  const [openProject, setOpenProject] = useState(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [activeSkills, setActiveSkills] = useState([]);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [openExperienceId, setOpenExperienceId] = useState(null);
  const sortAlpha = (arr = []) => arr.slice().sort((a, b) => a.localeCompare(b));
  
  useEffect(() => {
    if (activeSkills.length > 0) {
      setShowAllProjects(true);
    }
  }, [activeSkills]);

  // Unique list of all skills from projects
  const allSkills = [...new Set(PROJECTS.flatMap((p) => p.skills || []))];

  // Projects filtered by active skill
  const filteredProjects =
    activeSkills.length === 0
      ? PROJECTS
      : PROJECTS.filter((project) =>
          activeSkills.every((skill) => project.skills.includes(skill))
        );

  // Skills that exist in the currently filtered projects
  const currentSkillsSet = new Set(
    filteredProjects.flatMap((p) => p.skills || [])
  );

  // Preserve original order from allSkills, but only keep the visible ones
  const visibleSkills = allSkills.filter((skill) => currentSkillsSet.has(skill));

  const handleProjectClick = (project) => {
    setOpenProject(project);
  };

  const handleCloseModal = () => {
    setOpenProject(null);
  };

  const toggleExperience = (id) => {
    setOpenExperienceId((current) => (current === id ? null : id));
  };

  return (
    <div className="app">
      {/* Navbar */}
      <header className="nav">
        <div className="nav-inner">
          <div
            className="nav-logo"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ cursor: "pointer" }}
          >
            <span className="logo-full">Ethan Bloemert</span>
            <span className="logo-short">EB</span>
          </div>
          <nav className="nav-links">
            <a href="#focus">Overview</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#story">Story</a>
            <button /* Contact button */
              type="button"
              className="nav-links"
              onClick={() => setIsContactOpen(true)}
            >
              Contact
            </button>
          </nav>
        </div>
      </header>

      <main className="main">
        {/* Hero */}
        <section id="hero" className="hero">
          <p className="hero-tagline">
            Mechatronics Engineer · Off-Highway & Vehicle Systems
          </p>
          <h1 className="hero-title">
            <span className="hero-hello">Hello,</span>
            <span className="hero-name">
              &nbsp;I&apos;m <span className="accent">Ethan</span>
            </span>
          </h1>
          <p className="hero-subtitle">
            I work across disciplines to design, integrate, and validate hardware systems. I focus on practical engineering grounded in clear design, strong testing, and field-ready reliability, and I enjoy leading teams through the process from concept to proven equipment.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View projects
            </a>
            <button
              className="contact-trigger contact-link"
              onClick={() => setIsContactOpen(true)}
            >
              Contact Me
            </button>
          </div>
        </section>

        {/* Mechanical / Electrical / Software toggle */}
        <section id="focus" className={`section focus-section ${focusArea}`}>
          <h2 className="section-title">Mechanical · Electrical · Software</h2>
          <div className="focus-toggle">
            <button
              className={
                "focus-pill mechanical-pill" + (focusArea === "mechanical" ? " active" : "")
              }
              onClick={() => setFocusArea("mechanical")}
            >
              Mechanical
            </button>
            <button
              className={
                "focus-pill electrical-pill" + (focusArea === "electrical" ? " active" : "")
              }
              onClick={() => setFocusArea("electrical")}
            >
              Electrical
            </button>
            <button
              className={
                "focus-pill software-pill" + (focusArea === "software" ? " active" : "")
              }
              onClick={() => setFocusArea("software")}
            >
              Software
            </button>
          </div>
          <p className="section-text">{FOCUS_COPY[focusArea]}</p>
        </section>

        {/* Projects */}
        <section id="projects" className="section">
          <h2 className="section-title">Projects</h2>
          <p className="section-text section-text-muted">
            Click a project to see the full story.
          </p>

          <div className="pill-row scroll-fade">
            {/* "All" pill */}
            <button
              className={`pill pill-clear ${activeSkills.length === 0 ? "pill-active" : ""}`}
              onClick={() => {
                setActiveSkills([]);
                setShowAllProjects(false);
              }}
            >
              Clear
            </button>

            {/* Generated pills from project skills */}
            {sortAlpha(visibleSkills).map((skill) => {
              const isActive = activeSkills.includes(skill);

              return (
                <button
                  key={skill}
                  className={`pill ${isActive ? "pill-active" : ""}`}
                  onClick={() => {
                    setActiveSkills((current) =>
                      isActive
                        ? current.filter((s) => s !== skill) // unlatch
                        : [...current, skill]               // latch
                    );
                  }}
                >
                  {skill}
                </button>
              );
            })}
          </div>

          {/* FEATURED PROJECTS – filtered by skill */}
          <div className="projects-featured-grid">
            {filteredProjects
              .filter((p) => p.featured)
              .map((project) => (
                <article
                  key={project.id}
                  className="card featured"
                  onClick={() => handleProjectClick(project)}
                >
                  {project.image && (
                    <div className="card-image-wrap">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="card-image"
                      />
                    </div>
                  )}

                  <div className="card-header">
                    <div>
                      <h3 className="card-title">{project.title}</h3>
                      <div className="pill-row card-pill-row">
                        {sortAlpha(project.skills ?? []).map((skill) => (
                          <span
                            key={skill}
                            className="pill pill-small pill-static"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="card-chevron">⟶</div>
                  </div>
                </article>
              ))}
          </div>

          {/* OTHER PROJECTS – filtered by skill, gated by "Show more" */}
          {showAllProjects && (
            <div className="projects-grid">
              {filteredProjects
                .filter((p) => !p.featured)
                .map((project) => (
                  <article
                    key={project.id}
                    className="card"
                    onClick={() => handleProjectClick(project)}
                  >
                    {project.image && (
                      <div className="card-image-wrap">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="card-image"
                        />
                      </div>
                    )}

                    <div className="card-header">
                      <div>
                        <h3 className="card-title">{project.title}</h3>
                        <div className="pill-row card-pill-row">
                          {sortAlpha(project.skills ?? []).map((skill) => (
                            <span
                              key={skill}
                              className="pill pill-small pill-static"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="card-chevron">⟶</div>
                    </div>
                  </article>
                ))}
            </div>
          )}

          {/* Show more / less button */}
          {filteredProjects.filter((p) => !p.featured).length > 0 && (
            <div className="projects-show-more-wrap">
              <button
                className="projects-show-more-btn"
                onClick={() => setShowAllProjects((v) => !v)}
              >
                {showAllProjects ? "Show less" : "Show more"}
              </button>
            </div>
          )}
        </section>

        {/* Experience */}
        <section id="experience" className="section">
          <h3 className="section-title">Professional Experience</h3>

          {EXPERIENCE_PRO.map((job) => {
            const isOpen = openExperienceId === job.id;

            return (
              <div
                key={job.id}
                className={`experience-item ${isOpen ? "is-open" : ""}`}
                onClick={() => toggleExperience(job.id)}
              >
                <div className="experience-header">
                  {job.logo && (
                    <img
                      src={job.logo}
                      alt={`${job.company} logo`}
                      className="experience-logo"
                    />
                  )}

                  <div>
                    <h3 className="experience-role">{job.role}</h3>
                    <p className="experience-company">
                      {job.company}
                      <span className="experience-divider">·</span>
                      <span className="experience-dates">{job.dates}</span>
                    </p>
                  </div>
                </div>

                <div className="experience-body">
                  {job.tags && job.tags.length > 0 && (
                    <div className="pill-row experience-tags">
                      {sortAlpha(job.tags ?? []).map((tag) => (
                        <span key={tag} className="pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <ul className="experience-responsibilities">
                    {job.bullets.map((line, index) => (
                      <li key={index}>{line}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}

          <h3 className="section-title">Educational Experience</h3>

          {EXPERIENCE_EDU.map((job) => {
            const isOpen = openExperienceId === job.id;

            return (
              <div
                key={job.id}
                className={`experience-item ${isOpen ? "is-open" : ""}`}
                onClick={() => toggleExperience(job.id)}
              >
                <div className="experience-header">
                  {job.logo && (
                    <img
                      src={job.logo}
                      alt={`${job.company} logo`}
                      className="experience-logo"
                    />
                  )}

                  <div>
                    <h3 className="experience-role">{job.role}</h3>
                    <p className="experience-company">{job.company}</p>
                    <p className="experience-dates">{job.dates}</p>
                  </div>
                </div>

                <div className="experience-body">
                  {job.tags && job.tags.length > 0 && (
                    <div className="pill-row experience-tags">
                      {sortAlpha(job.tags ?? []).map((tag) => (
                        <span key={tag} className="pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <ul className="experience-responsibilities">
                    {job.bullets.map((line, index) => (
                      <li key={index}>{line}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </section>


        {/* Hands-on Story */}
        <section id="story" className="section">
          <h2 className="section-title">Story</h2>

          <p className="section-text">
            I have been restoring and rebuilding vehicles since I was twelve. My family
            works in construction, so I grew up around tools, but I was the only one who
            gravitated toward engines, drivetrains, and mechanical systems instead of
            wood and framing. Everything I learned came from taking machines apart on my
            own and figuring out how to put them back together.
          </p>

          <p className="section-text">
            It started with a riding mower in sixth grade, where I first learned how a
            clutch worked by watching tension come on and off a belt-driven transaxle.
            From there I rebuilt a two-stroke dirt bike engine and eventually took on my
            first full vehicle restoration: a ’98 Dodge Ram 1500. That project lasted
            five years and involved complete disassembly, rust repair, drivetrain work,
            electrical fixes, and reassembly almost entirely from memory. I stripped a
            second parts truck to a bare frame in a single day using only hand tools in
            a gravel-floor shed.
            My most challenging project is a 1947 Ford sedan, which I began in 2020. The
            chassis, drivetrain, and suspension are fully restored, the body is stripped
            and repainted, and the car is nearing final assembly. Nearly all of this
            work has been done alone with basic tools, which taught me how vehicles are
            actually built, serviced, and repaired at a fundamental level.
          </p>

          <p className="section-text">
            This experience shapes how I approach engineering today. Years of working on
            machines without manuals or support made serviceability, packaging,
            durability, and failure modes second nature. Those instincts guide every
            design review, simulation, and prototype I work on, whether it’s heavy
            equipment, automation, or high-performance off-road vehicles.
          </p>
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Ethan Bloemert</p>
      </footer>

      {/* Contact modal */}
      {isContactOpen && (
        <div
          className="modal-backdrop"
          onClick={() => setIsContactOpen(false)}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()} // stop click from closing when clicking inside
          >
            <button
              className="modal-close"
              onClick={() => setIsContactOpen(false)}
            >
              ✕
            </button>

            <h2 className="modal-title">Get in touch</h2>

            <div className="modal-body">
              {/* Put everything that used to be in your Contact section here */}
              <p>Email: <a href="mailto:ethanbloemert@gmail.com">ethanbloemert@gmail.com</a></p>
              <p>LinkedIn: <a href="https://linkedin.com/in/ethanbloemert" target="_blank" rel="noreferrer">linkedin.com/in/ethanbloemert</a></p>
              <p> </p>
              <p>Instagram: <a href="https://www.instagram.com/old_school_restorations?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer">@old_school_restorations</a></p>
            </div>
          </div>
        </div>
      )}

      {/* Project modal */}
      {openProject && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={handleCloseModal}>
              ✕
            </button>

            <img
              src={openProject.image}
              alt={openProject.title}
              className="modal-image"
            />

            <p className="modal-tag">Project</p>
            <h3 className="modal-title">{openProject.title}</h3>

            <div className="pill-row modal-pill-row">
              {openProject.skills?.map((skill) => (
                <span
                  key={skill}
                  className="pill pill-small pill-static"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* New structured sections */}
            {openProject.details?.description && (
              <div className="modal-section">
                <h4 className="modal-section-title">Description</h4>
                <p className="modal-section-body">
                  {openProject.details.description}
                </p>
              </div>
            )}

            {openProject.details?.contribution && (
              <div className="modal-section">
                <h4 className="modal-section-title">Contribution</h4>
                <p className="modal-section-body">
                  {openProject.details.contribution}
                </p>
              </div>
            )}

            {openProject.details?.result && (
              <div className="modal-section">
                <h4 className="modal-section-title">Result</h4>
                <p className="modal-section-body">
                  {openProject.details.result}
                </p>
              </div>
            )}
          </div>
        </div>
)}
    </div>
  );
}

export default App;
