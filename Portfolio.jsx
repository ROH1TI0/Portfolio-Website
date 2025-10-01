import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ArrowUpRight, GraduationCap, Building2, BookOpen } from 'lucide-react';

// --- Configuration & Data Mockup (Easily editable) ---

// Your image URL is added here.
const PROFILE_IMAGE_URL = "/self.jpeg"; 
// The resume file reference for download
const RESUME_FILE_URL = "/Rohit Sonawane_Resume.pdf"; 

const profileData = {
  name: "Rohit Sonawane",
  title: "", 
  heroInfo: [
    { text: "USC '27" },
    { text: "Los Angeles, CA" },
    // EDITED: Added link property for the email item to make it clickable
    { text: "sonawane.rohit251@gmail.com", link: "mailto:sonawane.rohit251@gmail.com", icon: Mail}, 
    { text: "LinkedIn", link: "https://www.linkedin.com/in/rohitsonawane10/", icon: Linkedin },
    { text: "GitHub", link: "https://github.com/ROH1TI0", icon: Github },
  ],
  // UPDATED About section to include researcher status and publications
  about: [
    "I am a Masters student with experience in <b>Natural Language Processing, Deep Learning, and Multi-modal AI</b>. My focus is on building and deploying scalable, high-accuracy intelligent systems for <i>finance, healthcare, and education</i>.",
    "As a <b>published researcher</b>, I translate complex algorithms into impactful solutions. My work has appeared in the <i>International Journal of Information Technology and Computer Science (IJITCS)</i> and the <i>SSRN Electronic Journal</i>."
  ],
  techStack: [
    "Python", "PyTorch", "Tensorflow", "LangChain", "LLMs", "RAG", "HuggingFace", "Scikit-learn", "Numpy", "Pandas", "SQL"
  ],
  // Stats removed from data object
  contact: {
    email: "sonawane.rohit251@gmail.com",
    github: "https://github.com/ROH1TI0", 
    linkedin: "https://www.linkedin.com/in/rohitsonawane10/", 
    resume: RESUME_FILE_URL //
  }
};

const USC_LOGO = "/usc_logo.png"
const NMIMS_LOGO = "/nmims_logo.png"

const educationData = [
    {
        year: "2025 — 2027",
        institution: "University of Southern California (USC)",
        degree: "Master's in Computer Science (Artificial Intelligence)",
        details: "Focus on advanced topics in Deep Learning, NLP, and Computer Vision.",
        location: "Los Angeles, CA",
        logo: USC_LOGO,
        logoAlt: "USC Logo"
    },
    {
        year: "2019 — 2025",
        institution: "SVKM'S NMIMS, Mumbai",
        degree: "Bachelor of Technology (with Diploma) in Computer Engineering",
        gpa: "3.86/4.0", // Added GPA for alignment
        details: "Foundational training in Software Engineering, Data Structures and Artificial Intelligence.",
        location: "Mumbai, India",
        logo: NMIMS_LOGO,
        logoAlt: "NMIMS Logo"
    }
];

// Define highlight color classes
// Primary Accent Color (Teal) is for titles/GPA
const TEAL_HIGHLIGHT_CLASS = `text-teal-600 font-semibold`; // New Teal class for publications

// Component for statistics highlighted with a gradient background
const GradientHighlight = ({ children }) => (
    <span className="gradient-highlight font-semibold text-gray-800 px-2 py-1 rounded-md">
        {children}
    </span>
);

const CRIF_LOGO = "/crif_logo.svg"
const TRANSLAB_LOGO = "/translab_logo.png"

const experienceData = [
  {
    year: "June 2024 — Dec 2024",
    company: "CRIF Highmark",
    role: "Machine Learning Intern (Intern Consultant)",
    highlights: [
        // Using Gradient Highlight Box
        `Developed and deployed an NLP pipeline for transaction classification, achieving <span class="gradient-highlight">91% categorization accuracy</span> and eliminating manual efforts.`,
        // Using Gradient Highlight Box
        `Built a refined unsupervised clustering model to group customer addresses, successfully identifying <span class="gradient-highlight">~23% incorrect/duplicate entries</span> for improved data quality.`,
    ],
    tags: ["NLP", "Unsupervised Learning", "Python", "Scikit-learn", "Data Quality"],
    logo: CRIF_LOGO,
    logoAlt: "CRIF Highmark Logo"
  },
  {
    year: "Dec 2022 — May 2023",
    company: "Translab Technologies",
    role: "Data Engineering and Analytics Intern",
    highlights: [
        // Using Gradient Highlight Box
        `Formulated a robust data pipeline/framework to <span class="gradient-highlight">consolidate over 100,000 raw data records</span> from various databases for effective processing and analysis.`,
        // Using Gradient Highlight Box
        `Analyzed and predicted growth trends with the Analytics team, steering client decision-making that ultimately <span class='gradient-highlight'>benefited 1 million+ general consumers</span>`,
    ],
    tags: ["Data Pipeline", "SQL", "Analytics", "Python", "Data Consolidation"],
    logo: TRANSLAB_LOGO,
    logoAlt: "Translab Technologies Logo"
  },
];

// Publication data separated from Projects
const publicationData = [
    {
        title: "Machine Learning based Wildfire Area Estimation Leveraging Weather Forecast Data",
        journal: "International Journal of Information Technology and Computer Science (IJITCS)",
        // Using Teal text highlight
        description: `Authored and published research on an advanced wildfire area estimation tool, utilizing AutoGluon to train machine learning models on weather data, reaching a <span class='${TEAL_HIGHLIGHT_CLASS}'>final RMSE of 1.84 km<sup>2</sup></span>.`,
        doi: "10.5815/ijitcs.2025.01.01",
        tags: ["Publication", "AutoGluon", "Machine Learning", "Time Series", "Data Science"],
        link: "https://www.mecs-press.org/ijitcs/ijitcs-v17-n1/v17n1-1.html", // Updated link
        authors: "Saket Sultania, Rohit Sonawane, Prashasti Kanikar",
        date: "2025"
    },
    {
        title: "Reinforcement Learning for Subject Mastery Prediction Using Double Deep Q-Network",
        journal: "SSRN Electronic Journal (Preprint)",
        // Using Teal text highlight
        description: `Introduces a novel <b>Double Deep Q-Network (DDQN)</b> framework to enhance personalized subject mastery prediction in digital education. The DDQN approach mitigated overestimation bias and showed an <span class='${TEAL_HIGHLIGHT_CLASS}'>18.7% improvement</span> in average reward over baselines. The mature policy favored tag-based interventions <span class='${TEAL_HIGHLIGHT_CLASS}'>68.3% of the time,</span> demonstrating fine-grained personalization.`,
        doi: "N/A",
        tags: ["Reinforcement Learning", "DDQN", "Personalized Learning", "Deep Learning", "Human-computer interface"],
        link: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5498641", // Added new link
        authors: "Soni Shweta, Saket Sultania, Rohit Sonawane, Vansh Shah", 
        date: "2025"
    },
];

// Project data (Wildfire removed)
const projectData = [
  {
    title: "DermaVLM: Multi-modal Skin Disease Diagnosis",
    description: `Prepared a custom database for 20 unique dermatological conditions and achieved a <span class='gradient-highlight'>92% classification accuracy</span> using a multi-modal approach (ResNet101 CNN and Llama 3.2 11B VLM). <span class='gradient-highlight'>Lowered inference time by 48%.</span>`,
    tags: ["Multi-modal AI", "Deep Learning", "Llama 3.2 11B", "CNN", "TensorFlow", "Healthcare"],
    // ADDED correct GitHub link
    githubLink: "https://github.com/ROH1TI0/DermaVLM-Skin-Disease-Diagnosis",
  },
  {
    title: "NyaayAI: RAG-powered Chatbot for Legal Assistance",
    description: `Designed and deployed a Retrieval-Augmented Generation (RAG) chatbot combining nomic embeddings, ChromaDB, and a fine-tuned LLM to interpret Indian Law documents attaining <span class='gradient-highlight'>training loss of 0.0762 with AdamW.</span>`,
    tags: ["RAG", "LLMs", "NLP", "LangChain", "ChromaDB", "Generative AI"],
    // ADDED correct GitHub link
    githubLink: "https://github.com/ROH1TI0/NyaayAI-Legal-Chatbot",
  },
];


// --- Utility Components for Dynamics ---

// Component for subtle fade-in animation on scroll
const AnimatedElement = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Stop observing once visible
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`
        transition-all duration-700 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
      {children}
    </div>
  );
};

// Custom Section Heading Component
const SectionHeading = ({ title }) => (
    <AnimatedElement delay={50}>
        <div className="text-center mb-12"> {/* REDUCED BOTTOM MARGIN */}
            <h2 className="text-5xl font-black mb-3 text-gray-900 tracking-tight">
                {title}
            </h2>
            {/* Primary Accent: Teal line */}
            <div className={`h-1 w-20 bg-teal-600 mx-auto rounded-full`}></div>
        </div>
    </AnimatedElement>
);

// --- Section Components ---

const AboutSection = () => {
    // Summarized and highlighted text
    const summarizedAbout = (
        <div className="text-left md:text-center">
            {profileData.about.map((paragraph, index) => (
                <p key={index} className="mb-4 text-lg text-gray-700">
                    {/* Render paragraphs directly from the new concise array */}
                    <span dangerouslySetInnerHTML={{ __html: paragraph }} />
                </p>
            ))}

            {/* NEW: Tech Stack Section */}
            <AnimatedElement delay={300}>
                <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                        Technical Stack
                    </h3>
                    <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
                        {profileData.techStack.map((tech, index) => (
                            <span key={index} className={`px-4 py-1 text-sm font-medium bg-gray-100 border border-teal-300 text-teal-700 rounded-full shadow-sm`}>
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </AnimatedElement>

        </div>
    );


    return (
        <section id="about" className="py-12 md:py-16 text-center"> {/* REDUCED PADDING */}
          
          <SectionHeading title="About Me" />

          <AnimatedElement delay={200}>
            <div className="text-lg text-gray-700 max-w-4xl mx-auto space-y-4">
                {/* Render the summarizedAbout content */}
                {summarizedAbout} 
            </div>
          </AnimatedElement>
        </section>
    );
};

const EducationSection = () => (
    <section id="education" className="py-12 md:py-16"> {/* REDUCED PADDING */}
        <SectionHeading title="Education" />
        <div className="space-y-10 max-w-4xl mx-auto">
            {educationData.map((edu, index) => (
                <AnimatedElement key={index} delay={index * 150}>
                    {/* Card background changed to transparent, border softened */}
                    <div className="p-5 rounded-xl border border-gray-100 bg-transparent shadow-sm hover:shadow-md transition duration-300">
                        <div className="flex items-start space-x-4 mb-3">
                            {/* Logo Placeholder */}
                            <img src={edu.logo} alt={edu.logoAlt} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                            
                            <div className="flex-grow">
                                <div className="flex justify-between items-center">
                                    {/* UPDATED: Degree on top, bold */}
                                    <h3 className="text-xl font-bold text-gray-900">
                                        {edu.degree}
                                    </h3>
                                    {/* GPA Aligned Right with Gradient Highlight */}
                                    {edu.gpa && (
                                        <div className="flex-shrink-0 ml-4">
                                            <span 
                                                className="text-lg font-bold flex-shrink-0 ml-4 px-3 py-1 rounded-full text-white" 
                                                style={{ 
                                                    // Primary Accent Gradient: Teal gradient
                                                    background: 'linear-gradient(45deg, #0d9488, #14b8a6)', // Teal gradient
                                                    boxShadow: '0 2px 4px rgba(20, 184, 166, 0.4)'
                                                }}
                                            >
                                                GPA: {edu.gpa}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                {/* UPDATED: Institution on next line, ITALIC, not highlighted */}
                                <p className="text-lg italic text-gray-700 font-semibold mt-0.5">{edu.institution}</p>

                                <div className="flex justify-between items-center text-sm text-gray-500 mt-1">
                                    <span>{edu.location}</span>
                                    <span>{edu.year}</span>
                                </div>
                                <p className="text-base text-gray-700 mt-2">
                                    {edu.details}
                                </p>
                            </div>
                        </div>
                    </div>
                </AnimatedElement>
            ))}
        </div>
    </section>
);

const ExperienceSection = () => (
  <section id="experience" className="py-12 md:py-16"> {/* REDUCED PADDING */}
    <SectionHeading title="Experience" />
    <div className="space-y-8 max-w-4xl mx-auto">
      {experienceData.map((exp, index) => (
        <AnimatedElement key={index} delay={index * 100}>
          {/* Card background changed to transparent, border softened */}
          <div className="p-5 rounded-xl border border-gray-100 bg-transparent shadow-sm hover:shadow-md transition duration-300">
            <div className="flex items-start space-x-4 mb-4">
                {/* Logo Placeholder */}
                <img src={exp.logo} alt={exp.logoAlt} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                
                <div className="flex-grow">
                    <div className="flex justify-between items-start">
                        {/* UPDATED: Role on top, bold */}
                        <h3 className="text-xl font-bold text-gray-900">
                            {exp.role}
                        </h3>
                        <p className="text-sm font-semibold uppercase tracking-wider text-gray-500 flex-shrink-0 ml-4">
                            {exp.year}
                        </p>
                    </div>
                    {/* UPDATED: Company name on next line, ITALIC, not highlighted */}
                    <p className="text-lg italic text-gray-700 font-semibold mt-0.5">{exp.company}</p>
                </div>
            </div>
            
            <ul className="list-disc list-outside ml-5 space-y-2 text-gray-700">
                {/* Highlight statistics using dangerouslySetInnerHTML */}
                {exp.highlights.map((highlight, i) => (
                    // Highlight color is Gradient Box
                    <li key={i} className="text-base" dangerouslySetInnerHTML={{ __html: highlight }}></li>
                ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                {/* Experience tags use sky blue color */}
                {exp.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 text-xs font-medium bg-sky-100 text-sky-700 rounded-full">
                    {tag}
                  </span>
                ))}
            </div>
          </div>
        </AnimatedElement>
      ))}
    </div>
  </section>
);

// New Publication List Item Component
const PublicationListItem = ({ pub, index }) => {
    // Determine the color for the author list, making Rohit's name bold 
    const formattedAuthors = pub.authors.split(',').map((author, i) => (
        <span key={i} className={author.trim().includes(profileData.name) ? 'font-bold' : 'font-medium'}>
            {author.trim()}{i < pub.authors.split(',').length - 1 ? ', ' : ''}
        </span>
    ));

    return (
        <AnimatedElement delay={index * 100}>
            {/* WRAPPED ENTIRE CARD IN ANCHOR TAG */}
            <a 
                href={pub.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label={`View full publication: ${pub.title}`}
                className="block" // Make the anchor tag a block element to contain the card
            >
                <div className="p-5 rounded-xl border border-gray-100 bg-transparent shadow-sm hover:shadow-md transition duration-300">
                    
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex-grow">
                            <h3 className="text-xl font-bold text-gray-900 leading-snug">
                                {pub.title}
                            </h3>
                            {/* Journal Name: Italicized, not highlighted */}
                            <p className="text-lg italic text-gray-600 font-medium mt-1">{pub.journal}</p>
                        </div>
                        {/* Right Icon */}
                        <ArrowUpRight className="w-5 h-5 text-teal-600 flex-shrink-0 ml-4 mt-2" aria-hidden="true" />
                    </div>
                    
                    {/* Publication Details */}
                    <p className="text-sm text-gray-600 mb-3">
                        <span className="font-semibold">Authors:</span> {formattedAuthors} ({pub.date})
                    </p>

                    <p className="text-base text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: pub.description }}>
                        {/* Highlight statistics using dangerouslySetInnerHTML */}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
                        {pub.tags.map((tag, i) => (
                            <span key={i} className="px-3 py-1 text-xs font-medium bg-orange-100 text-orange-700 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </a>
        </AnimatedElement>
    );
};


const PublicationsSection = () => (
    <section id="publications" className="py-12 md:py-16"> {/* REDUCED PADDING */}
      <SectionHeading title="Publications" />
      <div className="max-w-4xl mx-auto space-y-8"> {/* Changed from divide-y to space-y for cards */}
        {publicationData.map((pub, index) => (
          <PublicationListItem key={index} pub={pub} index={index} />
        ))}
      </div>
    </section>
  );

// Component for a single Project Card (NOW CLICKABLE LINK)
const ProjectCard = ({ project }) => {
    // State hooks for Gemini features removed

    return (
        <AnimatedElement>
            {/* WRAPPED ENTIRE CARD IN ANCHOR TAG TO GO TO GITHUB */}
            <a 
                href={project.githubLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label={`View GitHub repository for ${project.title}`}
                className="block" // Make the anchor tag a block element
            >
                {/* Card background changed to transparent, border softened */}
                <div className="p-5 rounded-xl border border-gray-100 bg-transparent shadow-sm hover:shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1">
                    
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-gray-900 leading-snug">
                            {project.title}
                        </h3>
                        {/* Right Icon */}
                        <Github className="w-5 h-5 text-teal-600 flex-shrink-0 ml-4 mt-1" aria-hidden="true" />
                    </div>
                    
                    <p className="mt-3 text-gray-700 text-base" dangerouslySetInnerHTML={{ __html: project.description }}>
                        {/* Highlight statistics using dangerouslySetInnerHTML */}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2 pt-3 border-t border-gray-100">
                        {project.tags.map((tag, i) => (
                            <span key={i} className="px-3 py-1 text-xs font-medium bg-violet-100 text-violet-700 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </a>
        </AnimatedElement>
    );
};

const ProjectsSection = () => (
    <section id="projects" className="py-12 md:py-16"> {/* REDUCED PADDING */}
        <SectionHeading title="Projects" />
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {projectData.map((project, index) => (
                <ProjectCard key={index} project={project} />
            ))}
        </div>
    </section>
);


const ContactSection = () => (
  <section id="contact" className="py-12 md:py-16 text-center"> {/* REDUCED PADDING */}
    <SectionHeading title="Get In Touch" />
    
    <AnimatedElement delay={200}>
      <a
        href={`mailto:${profileData.contact.email}`}
        className={`inline-flex items-center justify-center px-8 py-3 text-lg font-semibold rounded-full text-white bg-teal-600 hover:bg-teal-700 transition duration-300 shadow-lg hover:shadow-xl`}
      >
        <Mail className="w-5 h-5 mr-2" />
        Email Me
      </a>
    </AnimatedElement>

    <AnimatedElement delay={300}>
      <div className="mt-10 flex justify-center space-x-6">
        <a href={profileData.contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className={`text-gray-500 hover:text-teal-600 transition duration-300`}>
          <Github className="w-8 h-8" />
        </a>
        <a href={profileData.contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className={`text-gray-500 hover:text-teal-600 transition duration-300`}>
          <Linkedin className="w-8 h-8" />
        </a>
      </div>
    </AnimatedElement>
  </section>
);


// --- Main Application Component ---

const App = () => {
  // Navigation is effectively removed, but sections array is kept for accessibility (smooth scrolling button in hero)
  const allSections = ['about', 'education', 'experience', 'projects', 'publications', 'contact'];
  const [activeSection, setActiveSection] = useState('about');
  const observerRef = useRef(null);
  
  // Resume download function
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    // IMPORTANT: Use the RESUME_FILE_URL constant for the downloadable file
    link.href = RESUME_FILE_URL; 
    link.download = 'Rohit_Sonawane_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Observer logic is kept for potential future use or debugging, but doesn't affect navigation now.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -50% 0px', // When section is near the middle of the viewport
        threshold: 0.1,
      }
    );

    observerRef.current = observer;

    allSections.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    }); 

    // Cleanup observer on unmount
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []); 

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  const imageSrc = typeof PROFILE_IMAGE_URL === 'string' && PROFILE_IMAGE_URL.startsWith('uploaded:') 
        ? PROFILE_IMAGE_URL 
        : 'https://placehold.co/128x128/eeeeee/333333?text=RS'; 

  return (
    <>
      <style>
        {`
          /* STATIC BACKGROUND: Subtle Pastel Gradient */
          .dynamic-background {
            /* Using a soft peach/cream combination for a warm, minimalist pastel look */
            background-image: linear-gradient(to bottom, #fefefe 0%, #fefcfb 100%); 
            background-color: #fefcfb; /* Base color for consistency */
            
            /* Apply a subtle, large radial gradient layer for soft texture */
            background-image: 
              radial-gradient(at 50% 10%, #fff0f5 0%, transparent 50%), /* Light Pink/Lavender */
              radial-gradient(at 90% 90%, #f0fff0 0%, transparent 60%), /* Pale Green/Mint */
              linear-gradient(to bottom, #fefefe 0%, #f5f5f5 100%); /* Main Cream/White base */

            background-attachment: scroll; /* Static background */
            background-size: cover;
          }

          /* Gradient Highlight Box for Experience and Projects */
          .gradient-highlight {
            display: inline-block;
            padding: 0.15rem 0.6rem;
            margin: 0 0.1rem;
            border-radius: 0.5rem;
            font-weight: 600; /* semi-bold */
            color: #1f2937; /* Dark Gray for text contrast */
            /* Gradient for the background */
            background-image: linear-gradient(to right, #d1fae5, #a7f3d0); /* Light Mint to Pale Teal */
            box-shadow: 0 1px 2px rgba(20, 184, 166, 0.2);
            line-height: 1.5; /* Ensure text flows nicely with padding */
          }

        `}
      </style>
      <div className="min-h-screen text-gray-900 dynamic-background">

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Global Photo Element (Moved to top) */}
          <div className="pt-16 pb-8 flex justify-center">
              <AnimatedElement delay={0}>
                  <img 
                      src={imageSrc} 
                      alt={profileData.name} 
                      className="w-40 h-40 rounded-full object-cover shadow-2xl border-4 border-white ring-4 ring-teal-500/50"
                      onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/160x160/eeeeee/333333?text=RS'; }} 
                  />
              </AnimatedElement>
          </div>
          
          {/* HERO SECTION - Centered */}
          <section className="flex flex-col justify-center items-center pb-12 text-center">
            
            <AnimatedElement delay={0}>
              {/* Increased text size */}
              <p className={`text-2xl font-semibold text-teal-600 mb-2`}>Hello, I'm</p>
            </AnimatedElement>
            <AnimatedElement delay={100}>
              <h2 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-6 text-gray-900 tracking-tighter leading-tight">
                {profileData.name}
              </h2>
            </AnimatedElement>
            
            {/* Replaced tagline and title with new info block */}
            <AnimatedElement delay={300}>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-lg text-gray-600 font-medium mb-10 mx-auto max-w-2xl">
                  {profileData.heroInfo.map((item, index) => (
                      <span key={index} className="flex items-center space-x-2">
                          {/* UPDATED: If item has a link (like email), render it as an anchor tag, otherwise as a span */}
                          {item.icon ? (
                              <a 
                                href={item.link} 
                                target={item.text !== "sonawane.rohit251@gmail.com" ? "_blank" : "_self"} 
                                rel="noopener noreferrer" 
                                aria-label={item.text} 
                                className={`flex items-center font-medium hover:text-teal-600 transition duration-200`}
                              >
                                  <item.icon className="w-5 h-5 mr-1" />
                                  {item.text}
                              </a>
                          ) : (
                              <span className="font-medium">{item.text}</span>
                          )}
                          {/* Add separator dot if not the last item */}
                          {index < profileData.heroInfo.length - 1 && (
                              <span className="text-gray-400">·</span>
                          )}
                      </span>
                  ))}
              </div>
            </AnimatedElement>
            
            <AnimatedElement delay={400}>
              {/* UPDATED: Button text and function to download resume */}
              <button
                onClick={handleDownloadResume}
                className={`px-6 py-3 text-lg font-semibold rounded-full border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white transition duration-300 shadow-md hover:shadow-lg`}
              >
                View My Resume
              </button>
            </AnimatedElement>
          </section>
          
          {/* Main Content Sections */}
          <div className="space-y-20 lg:space-y-32">
            <AboutSection />
            <EducationSection /> 
            <ExperienceSection />
            <ProjectsSection />
            <PublicationsSection /> 
            <ContactSection />
          </div>
        </main>
        
        {/* Footer */}
        <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-gray-100 mt-20">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p className="mb-2 md:mb-0">
              Designed and Developed by Rohit Sonawane
            </p>
            <p>
              Built with React & Tailwind CSS.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default App;
