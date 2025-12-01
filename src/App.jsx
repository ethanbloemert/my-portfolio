import { useState, useEffect } from "react";
import "./App.css";

const FOCUS_COPY = {
  mechanical:
    "Mechanical design is where I started: sheet metal, welded structures, drivetrains, and mechanisms. At Salford I led major portions of the SS400+ fertilizer spreader structure and hydraulics. With Baja SAE and personal projects like my 1947 Ford restoration, I stay close to real-world packaging, manufacturability, and serviceability.",
  electrical:
    "Electrically, I work on wiring harnesses, PLC logic, embedded controllers, and PCB design. That includes rate controller integration and harness design on the SS400+, ISOBUS implementation on a cultivator automation project, retrofitting and unmarrying packaging lines with Siemens PLCs, and custom PCBs for Baja SAE.",
  software:
    "On the software side I focus on control logic, system modelling, and tooling around hardware. I’ve developed controller networking in Parker IQAN, implemented ISOBUS / ISO11783 on non-native controllers, used MATLAB/Simulink for an electro-hydraulic engine dyno, and built small software tools to support testing and data-driven design."
};

const PROJECTS = [
  {
    // Baja SAE Team Captain
    id: "baja-captain",
    title: "Baja SAE – Team Captain",
    image: "/projects/baja-captain.jpg",
    featured: true,
    skills: ["Leadership", "Mechanical", "Project Management", "Testing"],
    details: {
      description:
        "Western Baja is a student team that designs, builds, and races an off-road vehicle for SAE competition. I joined in 2022 and grew into leadership through hands-on work across electrical and mechanical systems, serving as Electrical Lead and Technical Director for WB23 (2023–24) and now Team Captain for WB25 (2025–26).",
      contribution:
        "For WB23, I designed the team’s first custom data-acquisition PCB, rebuilt the vehicle’s electrical architecture, and delivered an award-winning, highly reliable electrical system. As Technical Director, I pushed the team toward simulation-driven engineering—tying geometry, suspension, and powertrain decisions to measurable data and structuring design reviews and validation plans. Now as Captain for WB25, I oversee full-vehicle integration and have built a validation-first pipeline with subsystem simulations, prototype testing before manufacturing, and documentation that survives multiple seasons.",
      result:
        "WB23 set a new reliability benchmark for the team and gave us high-quality data to understand vehicle behaviour. The processes created in that cycle now define how Western Baja approaches engineering. WB25 builds on that foundation, aiming for the team’s most integrated, data-validated, and serviceable car to date."
    }
  },
  {
    // Salford SS400+ Fertilizer Spreader
    id: "ss400",
    title: "Salford SS400+ Fertilizer Spreader",
    image: "/projects/ss400.jpeg",
    featured: true,
    skills: ["Mechanical", "Electrical", "Hydraulics", "Testing", "CAD"],
    details: {
      description:
        "The SS400+ is a high-capacity fertilizer spreader platform used in large-scale agriculture. Over a 16-month co-op at Salford, I worked on three major iterations of the machine, covering structure, hydraulics, electrical, and field testing from early concepts through production-ready designs.",
      contribution:
        "I owned major mechanical design across 800+ sheet metal parts and large bodywork changes, focusing on manufacturability and serviceability. On the hydraulic side, I performed heat-load estimation, line sizing, and pump-to-motor matching that improved system performance by roughly 68% over the initial concept. I designed the wiring harness, retrofitted two different rate controllers (including PID tuning and parameter specification), and collaborated with a controller manufacturer on a custom rate-control software release. I also operated and tested each iteration in the field, feeding failures, downtime, and maintenance observations directly back into the design.",
      result:
        "The SS400+ platform became more reliable, easier to build, and better matched to real-world operating conditions. The hydraulic and control changes significantly improved performance, and the iterative test-driven approach reduced surprises in the field and informed future product decisions."
    }
  },
  {
    // ISOBUS Protocol Networking
    id: "salford-isobus",
    title: "ISOBUS Protocol Networking",
    image: "/projects/salford-isobus.jpeg",
    featured: false,
    skills: ["Embedded", "Controls", "Networking", "Electrical"],
    details: {
      description:
        "Modern agricultural implements communicate with tractors over the ISOBUS (ISO 11783) standard for control, monitoring, and map-based application. This project involved bringing a cultivator platform onto the ISOBUS network to enable GPS-based implement control and better integration with existing farm equipment.",
      contribution:
        "I implemented ISOBUS messaging on a Parker Hannifin controller that did not support the protocol natively. Using Parker IQAN, I developed controller logic, mapped application signals to ISOBUS messages, and validated communication on the network. I worked with early-release units in the field, supporting farmers, collecting feedback, and troubleshooting edge cases that only appeared in real operating environments.",
      result:
        "The cultivator could now integrate seamlessly with ISOBUS-capable tractors and farm displays, enabling more precise control and easier operator setup. The work de-risked future ISOBUS projects at the company and provided a template for adding standard networking to other implements."
    }
  },
  {
    // Vertical Flow Wrapper
    id: "vertical-flow-wrapper",
    title: "Vertical Flow Wrapper",
    image: "/projects/vertical-flow-wrapper-2.jpeg",
    featured: false,
    skills: ["PLC", "Process Engineering", "Electrical", "Automation"],
    details: {
      description:
        "In a food packaging plant, two fully custom production lines with 15+ automated machines each needed to be adapted for new product formats and higher throughput. One key bottleneck was a legacy vertical flow wrapper that was tightly coupled to upstream and downstream equipment.",
      contribution:
        "As a maintenance lead transitioning into a process-engineering role, I retrofitted the vertical flow wrapper to operate independently and handle new package requirements outside its original design envelope. I wrote Siemens PLC logic, added I/O, and implemented virtual interlocks to safely decouple linked machines. I also tuned the system for stable, continuous operation and worked closely with operators to refine alarms, modes, and changeovers.",
      result:
        "The retrofit reduced manual labour, increased uptime, and improved quality control on the line. Decoupling the equipment gave the plant more flexibility to run different products and reduced the risk of single-machine failures shutting down the entire system."
    }
  },
  {
    // Custom PCB Design
    id: "baja-pcb",
    title: "Custom PCB Design",
    image: "/projects/baja-pcb.jpg",
    featured: false,
    skills: ["Electronics", "PCB Design", "Validation"],
    details: {
      description:
        "Baja SAE vehicles operate in a harsh, high-vibration environment where wiring, connectors, and electronics are constantly stressed. Off-the-shelf boards rarely fit packaging, durability, or integration needs, so custom PCBs are a key part of making the car serviceable and reliable.",
      contribution:
        "I designed PCBs for sensor integration and control logic around existing ECUs, focusing on simple, robust layouts. I simulated circuits in LTspice, validated boards on the bench, and then on-vehicle under real operating conditions. Design decisions prioritized clear labeling, straightforward diagnostics, robust connectors, and mounting strategies that made trackside service easier.",
      result:
        "The custom boards reduced wiring complexity, improved signal reliability, and made instrumentation more maintainable. The team gained cleaner data, easier troubleshooting, and hardware that could survive the punishment of an off-road race season."
    }
  },
  {
    // Engine Dynamometer
    id: "dyno",
    title: "Engine Dynamometer",
    image: "/projects/dyno.jpg",
    featured: false,
    skills: ["Modelling", "Controls", "Hydraulics", "Simulation"],
    details: {
      description:
        "Baja SAE powertrains are sensitive to CVT tuning, loading conditions, and cooling. A dedicated engine and drivetrain dynamometer allows the team to characterize performance and durability before putting components on the car.",
      contribution:
        "I am designing an electro-hydraulic engine dynamometer that can apply realistic load profiles to a Baja powertrain. Using MATLAB/Simulink, I model the hydraulic circuit and control strategy to tune the system in simulation before committing to a full hardware build. The design includes provisions for torque, speed, and temperature measurement to close the loop between simulation and test data.",
      result:
        "Once complete, the dyno will give the team a repeatable way to test engines, CVTs, and cooling setups off-vehicle. That will improve drivetrain efficiency, reduce guesswork in tuning, and decrease the risk of discovering failures only at competition."
    }
  },
  {
    // 1947 Ford Sedan
    id: "47-ford",
    title: "1947 Ford Sedan",
    image: "/projects/47-ford.jpeg",
    featured: false,
    skills: ["Fabrication", "Mechanical", "Restoration"],
    details: {
      description:
        "I’ve restored multiple vehicles from the ground up, including a 1998 Dodge Ram 1500 and a 1947 Ford sedan. These are long-term, hands-on projects that touch every part of a vehicle’s structure, systems, and packaging.",
      contribution:
        "Work included full teardown, rust repair, fabrication, rewiring, suspension rebuilds, drivetrain restoration, interior refreshes, and complete reassembly. I spent a lot of time understanding factory design intent, service procedures, and where aftermarket parts help or hurt long-term reliability.",
      result:
        "These restorations built a practical understanding of vehicle structure, packaging constraints, and serviceability that I carry into every design decision. It’s much harder to design something unserviceable once you’ve had to fight with seized fasteners and hidden components on a 75-year-old car."
    }
  },
  {
    // Custom Audio System
    id: "subwoofer",
    title: "Custom Audio System",
    image: "/projects/sub-box.jpeg",
    featured: false,
    skills: ["Fabrication", "Packaging", "Design"],
    details: {
      description:
        "This project was a custom subwoofer enclosure designed to integrate cleanly into a vehicle interior while meeting strict volume and performance targets.",
      contribution:
        "I designed the enclosure around the subwoofer’s required air volume, then focused on panel stiffness, bracing, and mounting strategy to avoid flex and rattles. I packaged the box tightly into the available space, paying attention to cable routing, service access, and an OEM-like appearance.",
      result:
        "The finished system delivered strong, clean bass without compromising cargo space or usability. It’s a small project, but it reflects the same priorities I bring to larger work: packaging, structure, and long-term serviceability."
    }
  },
  {
    // Western Engineering Build Team
    id: "webt",
    title: "Western Engineering Build Team",
    image: "/projects/webt.jpg",
    featured: false,
    skills: ["Prototyping", "Fabrication", "Student Design"],
    details: {
      description:
        "Western Engineering Build Team focuses on small, hardware-centric projects that give students hands-on experience with real components, tools, and constraints.",
      contribution:
        "I contributed to multiple projects involving frames, fixtures, mechanisms, and wiring setups. These builds were typically fast-paced and resource-limited, demanding simple, robust designs that could be fabricated quickly and modified on the fly.",
      result:
        "The work sharpened my ability to move from concept to physical hardware quickly, prioritize practicality over perfection, and collaborate in small teams under tight constraints."
    }
  },
  {
    // Agricultural Framer
    id: "ag-framer",
    title: "Agricultural Framer",
    image: "/projects/ag-framer.JPG",
    featured: false,
    skills: ["Concept Design", "Structural", "Mechanical"],
    details: {
      description:
        "Agricultural implements place large, cyclical loads into frames that must be manufacturable, durable, and easy to service. This project focused on conceptual frame designs for implements and toolbars.",
      contribution:
        "I developed frame concepts with clear load paths, sensible weld locations, and realistic fabrication strategies. I referenced field experience to keep service points accessible and considered how dirt, debris, and wear would affect long-term performance.",
      result:
        "The concepts informed later detailed designs and helped align structural thinking with real-world agricultural use. The work reinforced the importance of combining analysis, manufacturing reality, and service considerations from the start."
    }
  }
];

const EXPERIENCE_PRO = [
  {
    id: "baja-experience",
    role: "Western Baja Racing – Team Captain",
    company: "Western Baja Racing",
    logo: "/logos/Baja.png",
    dates: "September 2021 – Present",
    tags: ["Leadership", "R&D", "Simulation", "Fabrication"],
    bullets: [
      "Lead a multi-disciplinary team to design, build, and race an off-road vehicle annually, emphasizing a testing-first and iterative development process.",
      "Shifted the team from one-shot design to a structured cycle of modelling, prototype testing, data collection, and continuous improvement.",
      "Pushed full-vehicle simulations for suspension, powertrain, and electronic subsystems to inform geometry decisions and expected failure modes.",
      "Developed and validated an electro-hydraulic engine dynamometer model using MATLAB/Simulink to characterize drivetrain efficiency and load profiles.",
      "Coordinated subsystem leaders and managed scheduling, budgets, documentation, design reviews, and manufacturing planning.",
      "Implemented structured test plans for suspension, steering, CVT tuning, durability, and frame stiffness to support data-driven decisions.",
      "Led fabrication planning including weldments, jigs, fixtures, quality checks, and final vehicle assembly under competition deadlines.",
      "Established documentation standards, CAD revision control, and design audit processes to improve transparency and knowledge retention."
    ]
  },
  {
    id: "salford-coop",
    role: "Mechanical Engineering Co-op",
    company: "Salford Group",
    logo: "/logos/Salford.png",
    dates: "2024 – 2025",
    tags: ["Mechanical", "Hydraulics", "", "R&D"],
    bullets: [
      "Led major mechanical and electrical design for three iterations of the SS400+ fertilizer spreader, from early concept through field testing.",
      "Developed hydraulic system designs, including pump/motor selection, line sizing, and heat-load estimation.",
      "Designed wiring harnesses and integrated rate controllers, including PID tuning and collaboration on custom controller software.",
      "Implemented ISOBUS / ISO11783 on a Parker Hannifin controller for cultivator automation."
    ]
  },
  {
    id: "process-engineer-coop",
    role: "Process Engineer Co-op",
    company: "Schep's Bakeries Ltd",
    logo: "/logos/Scheps.png",
    dates: "2020 – 2023",
    tags: ["PLC", "Process Engineering", "Electrical", "Automation"],
    bullets: [
      "Supported two fully custom production lines with 15+ automated machines each in a high-throughput manufacturing environment.",
      "Retrofitted a vertical flow wrapper to meet new package and throughput requirements by writing Siemens PLC logic and adding supporting hardware.",
      "Improved maintenance procedures and reduced downtime through root-cause analysis, documentation, and process improvements."
    ]
  },
  {
    id: "construction-framer",
    role: "Construction Framer",
    company: "ASB Inc.",
    logo: "/logos/ASBInc.png",
    dates: "2018 – 2020",
    tags: ["Construction", "Teamwork"],
    bullets: [
      "Framed residential homes and additions, interpreting blueprints and ensuring structural details were built to spec.",
      "Collaborated with small crews to meet tight deadlines while maintaining build quality and site safety."
    ]
  }
];
const EXPERIENCE_EDU = [
  {
    id: "tron-degree",
    role: "Bachelor of Engineering Science (Mechatronics Engineering)",
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
            Ethan Bloemert
          </div>
          <nav className="nav-links">
            <a href="#focus">Discipline Overview</a>
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
            I design, build, and test machines — from fertilizer spreaders and
            cultivator automation to off-road race cars, production lines, and
            engine dynamometers. I care about practical engineering: clear
            design, good testing, and shipping hardware that works in the field.
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
                "focus-pill" + (focusArea === "mechanical" ? " active" : "")
              }
              onClick={() => setFocusArea("mechanical")}
            >
              Mechanical
            </button>
            <button
              className={
                "focus-pill" + (focusArea === "electrical" ? " active" : "")
              }
              onClick={() => setFocusArea("electrical")}
            >
              Electrical
            </button>
            <button
              className={
                "focus-pill" + (focusArea === "software" ? " active" : "")
              }
              onClick={() => setFocusArea("software")}
            >
              Software
            </button>
          </div>
          <p className="section-text focus-copy">{FOCUS_COPY[focusArea]}</p>
        </section>

        {/* Projects */}
        <section id="projects" className="section">
          <h2 className="section-title">Projects</h2>
          <p className="section-text section-text-muted">
            Click a project to see the full story.
          </p>

          <div className="pill-row skills-pill-row">
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
            {visibleSkills.map((skill) => {
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
                        {project.skills?.map((skill) => (
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
                          {project.skills?.map((skill) => (
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
                {job.logo && (
                  <img
                    src={job.logo}
                    alt={`${job.company} logo`}
                    className="experience-logo"
                  />
                )}

                <div className="experience-header">
                  <div>
                    <h3 className="experience-role">{job.role}</h3>
                    <p className="experience-company">{job.company} 
                      <span className="experience-divider">·</span>
                      <span className="experience-dates">{job.dates}</span>
                    </p>
                  </div>
                </div>

                <div className="experience-body">
                  {job.tags && job.tags.length > 0 && (
                    <div className="pill-row experience-tags">
                      {job.tags.map((tag) => (
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
                {job.logo && (
                  <img
                    src={job.logo}
                    alt={`${job.company} logo`}
                    className="experience-logo"
                  />
                )}

                <div className="experience-header">
                  <div>
                    <h3 className="experience-role">{job.role}</h3>
                    <p className="experience-company">{job.company}</p>
                    <p className="experience-dates">{job.dates}</p>
                  </div>
                </div>

                <div className="experience-body">
                  {job.tags && job.tags.length > 0 && (
                    <div className="pill-row experience-tags">
                      {job.tags.map((tag) => (
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
            I&apos;ve been working on machines since I was a kid — starting with
            a riding mower and a two-stroke dirt bike, eventually moving into
            complete vehicle rebuilds like a ’98 Dodge Ram 1500 and a 1947 Ford
            sedan. Most of this work was done alone, with basic tools, in basic
            spaces.
          </p>
          <p className="section-text">
            This background grounds my engineering work today: real-world
            serviceability, packaging, wear, and failure modes guide how I
            design, test, and refine mechanical and control systems.
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
