import { useState } from "react";
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
    id: "baja-captain",
    title: "Baja SAE – Team Captain & Project Management",
    role: "Project leadership · Vehicle development",
    summary:
      "Leading a multi-year off-road race car program with a focus on testing-first design and realistic constraints.",
    details:
      "As Captain of Western’s Baja SAE team, I coordinate a small core group of students to design, build, and race an off-road vehicle each year. My focus has been shifting the team from ‘design once and hope’ to a loop of simulation, prototype testing, and refinement. That includes scheduling, design reviews, documentation, and ensuring every subsystem has a test plan—suspension, powertrain, and durability—before we hit competition."
  },
  {
    id: "ss400",
    title: "Salford SS400+ Fertilizer Spreader",
    role: "Mechanical + electrical design · Test & validation",
    summary:
      "Largest single project from a 16-month co-op: full machine iterations from concept through field testing.",
    details:
      "I owned major mechanical design across three SS400+ iterations, including over 800 sheet metal parts and major bodywork changes. On the hydraulic side I performed heat-load estimation, line sizing, and pump-to-motor matching, improving system performance by ~68% over the initial concept. I designed the wiring harness, retrofitted two different rate controllers (including PID tuning and parameter specification), and worked with a controller manufacturer on a custom rate-control software version. I also operated and tested each iteration in the field, using failures and maintenance observations to drive design updates."
  },
  {
    id: "salford-isobus",
    title: "Salford HALO ISOBUS Cultivator Automation",
    role: "Embedded controls · Networked implements",
    summary:
      "Brought a cultivator onto the standard agricultural ISOBUS network with GPS-based implement control.",
    details:
      "Implemented ISOBUS / ISO11783 on a Parker Hannifin controller that didn’t support the protocol natively. Developed controller logic in Parker IQAN, validated messages on the ISOBUS network, and supported early-release units with farmers to gather real-world hours and feedback."
  },
  {
    id: "vertical-flow-wrapper",
    title: "Vertical Flow Wrapper – Unmarrying & Retrofit",
    role: "PLC integration · Process engineering",
    summary:
      "Decoupled and repurposed legacy packaging equipment to meet new product and throughput requirements.",
    details:
      "As maintenance lead turned process engineer, I supported two fully custom production lines (15+ automated machines each). A key project was retrofitting a vertical flow wrapper to meet new package requirements outside its designed envelope. I wrote Siemens PLC logic and added supporting hardware to emulate missing interlocks, safely separate linked machines, and stabilize operation. This retrofit reduced manual labour and improved quality control."
  },
  {
    id: "baja-pcb",
    title: "Custom PCB Design for Baja SAE",
    role: "Electronics design · Validation",
    summary:
      "Designed and tested PCBs to support vehicle instrumentation and control on an off-road race car.",
    details:
      "Designed PCBs for sensor integration and control logic around existing ECUs. Simulated circuits using LTspice, validated on-bench and on-vehicle. Focused on making electronics robust, simple, and serviceable in harsh environments."
  },
  {
    id: "dyno",
    title: "Electro-Hydraulic Engine Dynamometer",
    role: "System modelling · Controls · Hydraulics",
    summary:
      "Dyno project to understand drivetrain efficiency and durability for Baja SAE powertrains.",
    details:
      "Designing an electro-hydraulic engine dynamometer using MATLAB/Simulink modelling to tune control strategies before full hardware build. The dyno will provide realistic load profiles for powertrain evaluation and feed back into vehicle-level simulations."
  },
  {
    id: "47-ford",
    title: "1947 Ford Sedan & 1998 Dodge Ram Restorations",
    role: "Full-vehicle rebuilds · Self-directed projects",
    summary:
      "Long-term restorations that taught me how real vehicles go together.",
    details:
      "Restored multiple vehicles from the ground up, including a ’98 Dodge Ram 1500 and a 1947 Ford sedan. Work included teardown, rust repair, rewiring, suspension rebuilds, drivetrain restoration, interior refreshes, and complete reassembly. These projects built a deep understanding of medium-duty vehicle structure and serviceability."
  },
  {
    id: "subwoofer",
    title: "Custom Subwoofer Box & Audio Integration",
    role: "Fabrication · Packaging",
    summary:
      "Designed and built a custom subwoofer enclosure with tight packaging and structural considerations.",
    details:
      "Designed and fabricated a subwoofer enclosure focusing on volume targets, stiffness, clean packaging, and OEM-like integration."
  },
  {
    id: "webt",
    title: "Western Engineering Build Team",
    role: "Student design team · Prototyping",
    summary:
      "Hands-on build projects bridging classroom theory with real hardware.",
    details:
      "Worked on multiple small hardware-focused projects, including frames, fixtures, mechanisms, and wiring setups. These were fast-paced, resource-limited projects emphasizing practicality over perfection."
  },
  {
    id: "ag-framer",
    title: "Agricultural Frame & Structure Concepts",
    role: "Concept development · Structural design",
    summary:
      "Conceptual designs for agricultural frames and implement structures.",
    details:
      "Developed concepts for implement frames and structures focused on manufacturability, load paths, and serviceability. Influenced heavily by practical field experience and test-driven iteration."
  }
];

function App() {
  const [focusArea, setFocusArea] = useState("mechanical");
  const [openProject, setOpenProject] = useState(null); // <— project object or null

  const handleProjectClick = (project) => {
    setOpenProject(project);
  };

  const handleCloseModal = () => {
    setOpenProject(null);
  };

  return (
    <div className="app">
      {/* Navbar */}
      <header className="nav">
        <div className="nav-inner">
          <div className="nav-logo">ethan.dev</div>
          <nav className="nav-links">
            <a href="#about">About</a>
            <a href="#focus">Mechanical · Electrical · Software</a>
            <a href="#projects">Projects</a>
            <a href="#story">Story</a>
            <a href="#contact">Contact</a>
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
            <span className="hero-hello">hello,</span>
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
            <a href="#contact" className="btn btn-ghost">
              Get in touch
            </a>
          </div>
        </section>

        {/* About */}
        <section id="about" className="section">
          <h2 className="section-title">About</h2>
          <p className="section-text">
            I&apos;m an electrical / mechanical engineer with experience in
            agricultural machinery, automated production lines, Baja SAE, and
            vehicle restorations. I enjoy taking ideas from concept to tested,
            working hardware.
          </p>
          <p className="section-text">
            I like small teams where engineers are close to the hardware and can
            iterate quickly. My interests align strongly with hybrid /
            electrified heavy-duty and off-highway platforms — where mechanical
            fundamentals and smart controls meet.
          </p>
        </section>

        {/* Mechanical / Electrical / Software toggle */}
        <section id="focus" className="section focus-section">
          <h2 className="section-title">Mechanical · Electrical · Software</h2>
          <div className="focus-toggle">
            <button
              className={
                "focus-pill" +
                (focusArea === "mechanical" ? " active" : "")
              }
              onClick={() => setFocusArea("mechanical")}
            >
              Mechanical
            </button>
            <button
              className={
                "focus-pill" +
                (focusArea === "electrical" ? " active" : "")
              }
              onClick={() => setFocusArea("electrical")}
            >
              Electrical
            </button>
            <button
              className={
                "focus-pill" +
                (focusArea === "software" ? " active" : "")
              }
              onClick={() => setFocusArea("software")}
            >
              Software
            </button>
          </div>
          <p className="section-text focus-copy">
            {FOCUS_COPY[focusArea]}
          </p>
        </section>

        {/* Projects */}
        <section id="projects" className="section">
          <h2 className="section-title">Selected projects</h2>
          <p className="section-text section-text-muted">
            Click a project to see the full story.
          </p>

          <div className="projects-grid">
            {PROJECTS.map((project) => (
              <article
                key={project.id}
                className="card"
                onClick={() => handleProjectClick(project)}
              >
                <div className="card-header">
                  <div>
                    <h3 className="card-title">{project.title}</h3>
                    <p className="card-role">{project.role}</p>
                  </div>
                  <div className="card-chevron">⟶</div>
                </div>
                <p className="card-text-summary">{project.summary}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Hands-on Story */}
        <section id="story" className="section">
          <h2 className="section-title">Hands-on story</h2>
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

        {/* Contact */}
        <section id="contact" className="section section-contact">
          <h2 className="section-title">Contact</h2>
          <p className="section-text">
            I’m interested in roles around hybrid / electric vehicle systems,
            agricultural machinery, off-highway platforms, and small teams that
            ship hardware.
          </p>

          <div className="contact-links">
            <a
              href="mailto:ethanbloemert@gmail.com"
              className="contact-link primary-link"
            >
              Email me
            </a>
            <a
              href="https://github.com/ethanbloemert"
              target="_blank"
              rel="noreferrer"
              className="contact-link"
            >
              GitHub
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Ethan Bloemert</p>
      </footer>

      {/* Project modal */}
      {openProject && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <button className="modal-close" onClick={handleCloseModal}>
              ✕
            </button>
            <p className="modal-tag">Project</p>
            <h3 className="modal-title">{openProject.title}</h3>
            <p className="modal-role">{openProject.role}</p>
            <p className="modal-summary">{openProject.summary}</p>
            <p className="modal-details">{openProject.details}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
