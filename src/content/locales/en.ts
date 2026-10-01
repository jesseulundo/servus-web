import type { SiteContent } from "../types";

/**
 * English copy — adapted from the Portuguese source.
 * TODO(content): blueprint requires "original content per language, no unreviewed
 * machine translation". This draft needs review by a fluent editor before launch.
 */
const en: SiteContent = {
  home: {
    seo: {
      title: "Technology applied to your business's real problems",
      description: "Servus builds digital products and helps companies develop websites, apps, management systems and AI-powered solutions.",
    },
    hero: {
      title: "Technology applied to your business's real problems",
      text: "Servus builds digital products and helps companies develop websites, apps, management systems and AI-powered solutions.",
    },
    capabilities: {
      title: "From challenge to digital solution",
      intro: "Consulting, development, automation, integrations and maintenance — from the first conversation to launch and beyond.",
    },
    products: {
      title: "Servus products",
      intro: "We build and run our own products. It's the best proof that we know how to take an idea all the way to production.",
    },
    work: {
      title: "Solutions for our partners",
      intro: "Projects Servus has built or manages for other organisations. Each case names the partner and our contribution.",
    },
    method: {
      title: "How we work",
      intro: "We start with the problem, validate the value, and only then choose the technology.",
      steps: [
        { title: "Discovery", text: "We understand the business, the users and the problem to solve." },
        { title: "Definition", text: "We agree on scope, priorities, costs and responsibilities." },
        { title: "Build", text: "We develop in short cycles, with versions you can see and test." },
        { title: "Launch", text: "We go live, follow adoption and fix whatever needs fixing." },
        { title: "Evolve", text: "We maintain, measure and add features, languages and integrations." },
      ],
    },
    trust: {
      title: "Responsible technology",
      items: [
        { title: "Security", text: "Credentials stay on the server, access is minimal and dependencies are kept up to date." },
        { title: "Data", text: "We collect only what's needed and handle personal data with care." },
        { title: "Accessibility", text: "Interfaces that work with a keyboard, screen readers and on mobile." },
        { title: "Support", text: "Ongoing support after launch, with named owners." },
        { title: "Transparency", text: "We're upfront about limits, dependencies and next steps." },
      ],
    },
    contact: {
      title: "Tell us what you need to solve",
      text: "A short description is enough. We'll reply with questions or a proposed call.",
      partnershipLink: "Looking for a partnership? Use the partnership form.",
    },
  },

  company: {
    seo: { title: "Company", description: "Servus combines technical know-how with business vision: consulting, development and our own digital products." },
    title: "Technical know-how with business vision",
    intro:
      "Servus was founded to bring technical know-how and business vision together. We build our own products and work with organisations that need to build, modernise or maintain digital solutions.",
    blocks: [
      { title: "Who we are", text: "A technology company focused on consulting, development and digital products." },
      { title: "What sets us apart", text: "Hands-on experience with our own products, close collaboration and the ability to work across markets." },
      { title: "How we think", text: "We start with the problem, validate the value and choose the right technology." },
    ],
    mission: { title: "Mission", text: "To turn operational problems and market opportunities into useful, secure and sustainable digital solutions." },
    vision: {
      title: "Vision",
      text: "To build a technology company known for creating its own products and delivering relevant digital solutions for organisations in Africa, Europe, Asia and beyond.",
    },
    promise: {
      title: "Promise",
      text: "Understand the problem before proposing technology. Every solution should be clear for the user, manageable for the client and ready to evolve.",
    },
    pillarsTitle: "Principles",
    pillars: [
      { title: "Clarity", text: "We explain the problem, the solution, the cost and the next steps without unnecessary jargon." },
      { title: "Execution", text: "We show real products and projects, with defined phases, results and responsibilities." },
      { title: "Adaptation", text: "We design solutions that fit the market, the team and the client's digital maturity." },
      { title: "Trust", text: "We handle data, access, payments and operations responsibly." },
      { title: "Evolution", text: "We build systems that can take on new features, languages and integrations." },
    ],
    markets: {
      title: "Where we work",
      text: "We have projects connected to Japan, Angola and international markets. We don't limit ourselves to a single country.",
      tags: ["Japan", "Angola", "International"],
    },
    cta: { title: "Let's talk about your project", text: "Tell us what you need to solve and in which market." },
  },

  services: {
    seo: {
      title: "Services",
      description: "IT consulting, responsive websites, mobile apps, management systems, AI and automation, maintenance and evolution.",
    },
    title: "Services",
    intro: "Capabilities turned into clear offers. Every service starts with the problem it solves.",
    labels: { problem: "The problem", deliverables: "Typical deliverables", related: "Related work", faq: "FAQ", process: "Process" },
    items: {
      "it-consulting": {
        name: "IT consulting",
        summary: "Clarity on architecture, technology, data and execution before you invest.",
        seo: { title: "IT consulting", description: "Assessment, architecture, roadmap and technical review so you can decide with confidence." },
        problem: {
          title: "Technical decisions without enough information",
          text: "Lack of clarity about architecture, technology, data or the execution plan.",
          impact: ["Spending on tools that don't fit the process", "Projects delayed by unclear priorities", "Vendor lock-in with no alternative"],
        },
        approach: {
          title: "Our approach",
          text: "We review the current process, existing systems and business goals. We present options with costs, risks and next steps, and help you decide.",
        },
        deliverables: { title: "Typical deliverables", items: ["Assessment", "Architecture", "Roadmap", "Technical review", "Decision support"] },
        process: {
          title: "Process",
          steps: [
            { title: "Kick-off", text: "Goals, context and constraints." },
            { title: "Analysis", text: "Interviews, systems and available data." },
            { title: "Recommendation", text: "Compared options and a proposed roadmap." },
          ],
          clientResponsibilities: {
            title: "What we need from you",
            items: ["A decision-maker on your side", "Access to documentation and key people", "Time to validate the findings"],
          },
        },
        faq: [{ q: "Does consulting commit us to building with Servus?", a: "No. The recommendations are yours and any team can carry them out." }],
        cta: { title: "Need to decide your next technical step?", text: "Book a discovery call." },
      },
      websites: {
        name: "Responsive websites",
        summary: "A modern, fast, easy-to-manage web presence that turns visits into enquiries.",
        seo: { title: "Responsive websites", description: "Corporate websites, landing pages, portals, CMS, SEO and analytics." },
        problem: {
          title: "A weak or outdated web presence",
          text: "A slow website that's hard to update or doesn't explain what the company does loses opportunities every day.",
          impact: ["Visitors who leave without getting in touch", "Content only one supplier can change", "Low search visibility"],
        },
        approach: {
          title: "Our approach",
          text: "First we define what visitors need to find and the action we want them to take. Then we design, write and build for mobile and desktop.",
        },
        deliverables: { title: "Typical deliverables", items: ["Corporate website", "Landing page", "Portal", "CMS", "SEO", "Analytics"] },
        process: {
          title: "Process",
          steps: [
            { title: "Structure", text: "Sitemap, user journeys and content." },
            { title: "Design", text: "Desktop and mobile prototype." },
            { title: "Build", text: "Development, CMS and integrations." },
            { title: "Launch", text: "Domain, indexing and monitoring." },
          ],
          clientResponsibilities: {
            title: "What we need from you",
            items: ["Approved copy and images, or time to review them", "Access to the domain", "One person responsible for sign-off"],
          },
        },
        faq: [{ q: "Can we edit the content ourselves?", a: "Yes. We set up a CMS that suits your team and show you how to use it." }],
        cta: { title: "Want a website that works for you?", text: "Tell us your goal and your audience." },
      },
      "mobile-apps": {
        name: "Mobile apps",
        summary: "A dedicated mobile experience for customers, teams or field operations.",
        seo: { title: "Mobile apps", description: "iOS and Android apps with backend, authentication, notifications and store publishing." },
        problem: {
          title: "You need a dedicated mobile experience",
          text: "Some services only work well in the user's pocket: bookings, notifications, field work.",
          impact: ["Processes that rely on phone calls or paper", "Customers who don't come back without reminders", "Teams without information outside the office"],
        },
        approach: {
          title: "Our approach",
          text: "We validate the core flow with a prototype before building. We develop the app and backend and handle store publishing.",
        },
        deliverables: { title: "Typical deliverables", items: ["iOS and Android app", "Backend", "Authentication", "Notifications", "Store publishing"] },
        process: {
          title: "Process",
          steps: [
            { title: "Prototype", text: "Core flow tested with users." },
            { title: "Build", text: "App and backend in short cycles." },
            { title: "Publish", text: "App Store, Google Play and monitoring." },
          ],
          clientResponsibilities: {
            title: "What we need from you",
            items: ["Developer accounts on the stores", "Users available for testing", "Validated business rules"],
          },
        },
        faq: [{ q: "An app or a responsive website?", a: "It depends on the use case. We help you decide before starting — you don't always need an app." }],
        cta: { title: "Have an idea for an app?", text: "Start by telling us who will use it." },
      },
      "management-systems": {
        name: "Management systems",
        summary: "Fewer manual processes and all your information in one place, with permissions and reports.",
        seo: { title: "Management systems", description: "Dashboards, workflows, permissions, reports, integrations and audit trails." },
        problem: {
          title: "Manual processes and scattered information",
          text: "Spreadsheets, email and paper make work slow and hard to control.",
          impact: ["Data entry errors", "Little visibility into operations", "Hard to audit who did what"],
        },
        approach: {
          title: "Our approach",
          text: "We map the real process with the people who run it, simplify it, and only then turn it into software.",
        },
        deliverables: { title: "Typical deliverables", items: ["Dashboards", "Workflows", "Permissions", "Reports", "Integrations", "Audit trail"] },
        process: {
          title: "Process",
          steps: [
            { title: "Mapping", text: "Current process, roles and data." },
            { title: "First version", text: "The most important flow up and running." },
            { title: "Expansion", text: "New modules, integrations and reports." },
          ],
          clientResponsibilities: {
            title: "What we need from you",
            items: ["Access to the people who run the process", "Sample data", "Decisions on permissions and owners"],
          },
        },
        faq: [{ q: "Can you integrate with what we already use?", a: "Yes, wherever the existing system allows it. We assess this during mapping." }],
        cta: { title: "Want to organise your operations?", text: "Describe the process that takes up the most time." },
      },
      "ai-automation": {
        name: "AI and automation",
        summary: "Less repetitive work: documents read, data classified and tasks automated.",
        seo: { title: "AI and automation", description: "OCR, text extraction, classification, assistants, analysis and automations." },
        problem: {
          title: "Repetitive work or hard-to-process data",
          text: "Teams spending hours copying data from documents or sorting requests by hand.",
          impact: ["Time spent on low-value tasks", "Slow responses to customers", "Errors that are hard to spot"],
        },
        approach: {
          title: "Our approach",
          text: "We measure the current task, test automation on real data and keep a person in the loop wherever mistakes are costly. We never promise 100% accuracy.",
        },
        deliverables: { title: "Typical deliverables", items: ["OCR and text extraction", "Classification", "Assistants", "Analysis", "Automations"] },
        process: {
          title: "Process",
          steps: [
            { title: "Proof of concept", text: "Measured results on your data." },
            { title: "Integration", text: "Connected to existing systems and workflows." },
            { title: "Monitoring", text: "Quality tracking and improvements." },
          ],
          clientResponsibilities: {
            title: "What we need from you",
            items: ["Anonymised data samples", "Acceptable quality criteria", "One person responsible for validation"],
          },
        },
        faq: [{ q: "Is our data protected?", a: "Before starting, we agree with you where data is processed and stored." }],
        cta: { title: "Which task would you like to automate?", text: "Tell us the volume and format of the data." },
      },
      maintenance: {
        name: "Maintenance and evolution",
        summary: "Systems that are monitored, secure and up to date, with continuous improvement.",
        seo: { title: "Maintenance and evolution", description: "Monitoring, fixes, improvements, security and support." },
        problem: {
          title: "Systems without ongoing care",
          text: "Unmaintained software builds up security gaps and gets more expensive to change.",
          impact: ["Failures discovered by customers", "Outdated dependencies", "No one accountable when things go wrong"],
        },
        approach: {
          title: "Our approach",
          text: "We start with an assessment of the current state, then agree a maintenance plan with clear response times and priorities.",
        },
        deliverables: { title: "Typical deliverables", items: ["Monitoring", "Fixes", "Improvements", "Security", "Support"] },
        process: {
          title: "Process",
          steps: [
            { title: "Assessment", text: "Code, hosting, security and risks." },
            { title: "Stabilisation", text: "Urgent fixes and monitoring." },
            { title: "Evolution", text: "Planned improvements by priority." },
          ],
          clientResponsibilities: {
            title: "What we need from you",
            items: ["Access to code and hosting", "History of known issues", "A contact for priorities"],
          },
        },
        faq: [{ q: "Do you maintain systems Servus didn't build?", a: "Yes, after an initial review of the code and hosting." }],
        cta: { title: "Does your system need attention?", text: "Tell us what's in production and what worries you." },
      },
    },
  },

  products: {
    seo: {
      title: "Products",
      description: "Servus digital products: Trumuno Footy is live; Audio Cleaner, MOAMBEIRA and RH are in development.",
    },
    title: "Servus products",
    intro: "Products we build and run. Each keeps its own identity. Products in development are not yet available as a service.",
    items: {
      "trumuno-footy": {
        name: "Trumuno Footy",
        valueProp: "A free football prediction game with leagues, results and standings.",
        seo: { title: "Trumuno Footy", description: "Predict results, pick scorers and compete with friends in your own leagues. Free, no betting." },
        heroTitle: "Your predictions. Your league. Your standings.",
        description:
          "Trumuno Footy is a free platform for fans who want to predict results, pick scorers and compete with friends or communities in their own leagues.",
        sections: [
          { title: "How it works", text: "Pick a league, predict the results, choose one scorer per matchday and follow the standings." },
          { title: "Who it's for", items: ["Football fans", "Groups of friends", "Companies", "Communities", "Content creators"] },
          { title: "What's different", text: "Competition based on football knowledge — no betting, no money at stake." },
          { title: "Proof", text: "Real competitions, up-to-date matchdays and standings for every league." },
        ],
        primaryLabel: "Visit Trumuno Footy",
        secondaryLabel: "Contact us about a partnership or campaign",
      },
      "audio-cleaner": {
        name: "Audio Cleaner",
        valueProp: "Noise removal and audio preparation for creators and professionals.",
        seo: { title: "Audio Cleaner", description: "Noise removal and audio/video preparation for publishing. In development." },
        heroTitle: "Clean audio without wasting time",
        description: "Audio Cleaner will help creators and professionals reduce noise, balance levels and prepare audio or video files for publishing.",
        sections: [
          { title: "The problem", text: "Noise, echo and uneven levels lower the quality of interviews, podcasts, videos and recordings." },
          { title: "The solution", text: "Upload, process, listen to the result and download the prepared file." },
          { title: "Who it's for", items: ["Creators", "Podcasters", "Journalists", "Remote teams", "Small businesses"] },
          { title: "Features", items: ["Automatic cleanup", "Background processing", "Acoustic environment simulation"] },
        ],
        notice: {
          title: "Realistic expectations",
          text: "Audio Cleaner will significantly reduce noise, but no tool removes all noise from every recording.",
        },
        primaryLabel: "I want to know more",
      },
      moambeira: {
        name: "MOAMBEIRA",
        valueProp: "A marketplace connecting buyers with travellers for agreed transport of legal goods between regions.",
        seo: { title: "MOAMBEIRA", description: "Local products delivered through real journeys. In development." },
        heroTitle: "Local products delivered through real journeys",
        description:
          "MOAMBEIRA will be a marketplace where someone can request a legal product available in another region and arrange delivery with a traveller heading to the destination.",
        sections: [],
        flow: {
          title: "How it will work",
          steps: [
            { title: "Request", text: "The buyer posts a request with product, origin, destination and deadline." },
            { title: "Offers", text: "Eligible travellers share their availability and an offer." },
            { title: "Agreement", text: "Both parties agree on price, details and conditions." },
            { title: "Payment", text: "The buyer pays through the platform." },
            { title: "Delivery", text: "Delivery is confirmed and the platform applies its commission." },
          ],
        },
        notice: {
          title: "Trust and compliance",
          text: "Rules on prohibited items, customs, declarations, identity, payments, cancellations, disputes and liability will be published and legally reviewed before launch in each market.",
        },
        primaryLabel: "Join the interest list",
        secondaryLabel: "Propose a logistics partnership",
      },
      rh: {
        name: "RH",
        valueProp: "A platform that automates HR tasks, including OCR and AI features.",
        seo: { title: "RH", description: "HR operations with less manual work. In development." },
        heroTitle: "HR operations with less manual work",
        description: "RH will be a licensed platform for companies, with modules that automate HR processes and keep information in a single system.",
        sections: [
          { title: "Employees", text: "Profiles, documents, contracts, history and permissions." },
          { title: "Attendance and schedules", text: "Time tracking, validation, shifts, absences and reports." },
          { title: "Recruitment", text: "Applications, documents, screening and follow-up." },
          { title: "Documents and OCR", text: "Image-to-text conversion, field extraction and a searchable archive." },
          { title: "Workflows and approvals", text: "Requests, validations, notifications and audit trail." },
          { title: "Reports", text: "Indicators, exports and views by unit or company." },
        ],
        notice: {
          title: "Built for the local context",
          text: "Implementation, training, support, hosting and data protection adapted to each market, including limited-connectivity scenarios.",
        },
        primaryLabel: "Request a future demo",
      },
    },
  },

  work: {
    seo: { title: "Work", description: "Projects Servus has built or manages for partners: IBEX, Fenix Academy and Urolundo." },
    title: "Solutions for our partners",
    intro: "Servus's experience on other organisations' projects. The businesses belong to our partners; each case shows the challenge and our contribution.",
    labels: {
      context: "Partner context",
      challenge: "Problem or opportunity",
      responsibility: "Servus's responsibility",
      solution: "Solution delivered",
      status: "Current status",
      outcome: "Result or next step",
    },
    cta: { title: "Have a similar project?", text: "Tell us about your context." },
    items: {
      ibex: {
        partner: "IBEX",
        context: "Hip hop club in Roppongi, Tokyo.",
        seo: { title: "IBEX — Servus work", description: "Digital presence for a hip hop club in Roppongi, Tokyo." },
        challenge: "A digital presence of its own for a local and international audience, in English and Japanese.",
        responsibility: "The club's official website: event schedule, news, venue rental, gallery and contacts.",
        solution: "A bilingual website (English and Japanese) at ibex-tokyo.net, built by Servus.",
        status: "Live.",
        outcome: "The website is published and open to visitors.",
      },
      "fenix-academy": {
        partner: "Fenix Academy",
        context: "Academy offering certified courses in Angola.",
        seo: { title: "Fenix Academy — Servus work", description: "Institutional platform and course catalogue for an academy in Angola." },
        challenge: "To be confirmed with the partner.",
        responsibility: "Institutional platform, course catalogue, enrolments and digital management, according to the approved scope.",
        solution: "Details to follow once approved by the partner.",
        status: "To be confirmed.",
        outcome: "To be published with the partner's permission.",
      },
      urolundo: {
        partner: "Urolundo",
        context: "Urology clinic in Angola.",
        seo: { title: "Urolundo — Servus work", description: "A clinic management platform for a urology clinic in Angola." },
        challenge: "Organising schedules, clinical operations and tracking patient and doctor activity.",
        responsibility: "A clinic management platform that organises schedules, doctors' activities and operational patient follow-up.",
        scope: ["Scheduling", "Doctor management", "Patient follow-up"],
        solution: "Details to follow once approved by the partner. No patient data is published.",
        status: "To be confirmed.",
        outcome: "To be published with the partner's permission.",
      },
    },
  },

  partnerships: {
    seo: { title: "Partnerships", description: "Ways to work with Servus: development, joint products, distribution, integration and campaigns." },
    title: "Let's build the right opportunity together",
    intro:
      "We work with companies that bring technology, distribution, market knowledge, investment, content or access to a community. Pick the model closest to your idea.",
    modelsTitle: "Collaboration models",
    labels: { example: "Example", nextAction: "Next step" },
    models: [
      { name: "Development for a partner", example: "Website, app or management system.", nextAction: "Meeting request" },
      { name: "Joint product", example: "A solution built with the partner's knowledge or access.", nextAction: "Partnership proposal" },
      { name: "Distribution and sales", example: "A partner sells a Servus product in a market.", nextAction: "Commercial conversation" },
      { name: "Technology integration", example: "An external service integrated into a product or project.", nextAction: "Technical assessment" },
      { name: "Campaign or community", example: "Activations with Trumuno Footy, events or creators.", nextAction: "Campaign brief" },
    ],
    formTitle: "Propose a partnership",
  },

  contact: {
    seo: { title: "Contact", description: "Request a service, propose a partnership, ask for a demo or get in touch." },
    title: "Talk to Servus",
    intro: "Choose the request type to reach the right person directly.",
    directTitle: "Prefer email?",
    directText: "Write to us at",
    practices: [
      "You get a reference number as soon as your request is sent.",
      "We never ask for documents or sensitive data in a first contact.",
      "We use your data only to respond to your request.",
    ],
  },

};

export default en;
