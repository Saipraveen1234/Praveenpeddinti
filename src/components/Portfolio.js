import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, X, Download, Briefcase, Github, Globe, ExternalLink } from 'lucide-react';
import ParallaxContact from './ParallaxContact';
import ProjectImage from './ProjectImage';
import ProjectGallery from './ProjectGallery';

const Preloader = () => {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <h1 className="text-6xl md:text-8xl text-white mb-4 animate-fade-in">
        Namaskaram
      </h1>
      <div className="text-4xl md:text-6xl animate-bounce">🙏</div>
      <p className="text-gray-400 mt-8 animate-fade-in">
        You've landed on Praveen's Portfolio
      </p>
    </div>
  );
};

const ParallaxProject = ({ project, index, total }) => {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const handleScroll = () => {
      if (section) {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const scrollPercent = (windowHeight - rect.top) / (windowHeight + rect.height);
        setScrollProgress(Math.min(Math.max(scrollPercent, 0), 1));
      }
    };

    const container = document.querySelector('.parallax-container');
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const backgroundStyle = {
    transform: `rotate(${scrollProgress * 920}deg) scale(${1 + scrollProgress * 1})`,
  };

  const contentStyle = {
    transform: `translateY(${scrollProgress * 100}px)`,
    opacity: 1 - (scrollProgress * 0.5)
  };

  // Base path for assets
  const BASE_PATH = process.env.PUBLIC_URL;

  return (
    <section ref={sectionRef} className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-80">
        <div className="absolute -right-40 -top-40 w-96 h-96 border-2 border-white/20 rounded-full transition-transform duration-700"
          style={backgroundStyle} />
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-white rounded-full animate-pulse delay-150" />
        <div className="absolute top-2/3 left-1/3 w-2 h-2 bg-white rounded-full animate-pulse delay-300" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" 
          style={{transform: `translateY(${scrollProgress * -20}px)`}} />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl rounded-full"
          style={{transform: `translate(${scrollProgress * 20}px, ${scrollProgress * -20}px)`}} />
      </div>

      <div className="absolute top-8 left-8 text-sm opacity-50">
        {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
      </div>

      <div className="absolute top-8 right-8 flex gap-2">
        {project.tags?.map((tag, i) => (
          <span key={i} className="px-4 py-2 rounded-full border border-white/20 text-sm">
            {tag}
          </span>
        ))}
      </div>

      <div className="min-h-screen flex items-center transition-all duration-1000" style={contentStyle}>
        <div className="container mx-auto px-8 pt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-6xl md:text-7xl font-light mb-16">
                {project.title}
              </h2>
              <div className="grid grid-cols-2 gap-8 text-sm opacity-100 mb-8">
                <div>
                  <h3 className="font-medium mb-2">Project</h3>
                  <p>{project.title}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Role</h3>
                  <p>{project.role || 'Developer'}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Date</h3>
                  <p>{project.date || '2023'}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Links</h3>
                  <div className="flex space-x-4">
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.liveLink && (
                      <a 
                        href={project.liveLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition-colors"
                      >
                        <Globe className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <p className="text-lg text-gray-400 leading-relaxed">
                  {project.description}
                </p>
              </div>
              {project.highlights && (
                <div className="mt-8">
                  <h3 className="font-medium mb-4">Key Features</h3>
                  <ul className="space-y-2">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/50 mt-2 mr-2"></span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="flex items-center justify-center">
              <ProjectGallery 
                images={project.images || [project.image || 'placeholder-project.jpg']} 
                projectName={project.title}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ParallaxProjectsView = ({ projects, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black text-white z-50">
      <button 
        onClick={onClose}
        className="fixed top-8 right-8 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
      >
        <X className="w-6 h-6" />
      </button>
      <div className="parallax-container h-screen overflow-y-auto scroll-smooth">
        {projects.map((project, index) => (
          <ParallaxProject 
            key={index}
            project={project}
            index={index}
            total={projects.length}
          />
        ))}
      </div>
    </div>
  );
};

const ExperienceSection = ({ onClose }) => {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);

    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const scrollPercent = (windowHeight - rect.top) / (windowHeight + rect.height);
        setScrollProgress(Math.min(Math.max(scrollPercent, 0), 1));
      }
    };

    const container = document.querySelector('.experience-container');
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => onClose(), 300);
  };

  const experiences = [
    {
      title: "Full Stack Developer",
      company: "AAA Medical Billing",
      location: "California, United States (Remote)",
      duration: "March 2025 - Present",
      description: [
        "Developing responsive and optimized web applications using React.js, Node.js, Express.js, MongoDB",
        "Building reusable components and managing state with Redux/Context API",
        "Collaborating with designers & backend teams to integrate APIs efficiently",
        "Ensuring cross-browser compatibility and performance optimization",
        "Participating in Agile development cycles and documentation"
      ]
    },
    {
      title: "Junior Software Engineer",
      company: "Tabner Inc.",
      location: "Hyderabad, Telangana, India",
      duration: "November 2024 - March 2025",
      description: [
        "Worked on a comprehensive full-stack Insurance Analytics Dashboard using Python, SQL, React, and GraphQL",
        "Enabled real-time monitoring of insurance plans and employee enrollments",
        "Collaborated with cross-functional teams to implement feature requirements",
        "Optimized application performance and fixed bugs",
        "Participated in code reviews and contributed to technical documentation"
      ]
    }
  ];

  return (
    <div 
      className={`fixed inset-0 z-50 transition-all duration-300 ease-out ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      <div 
        className={`fixed inset-0 bg-black text-white z-50 transition-transform duration-500 ${
          isOpen ? 'scale-100' : 'scale-95'
        }`}
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={handleClose}
          className="fixed top-8 right-8 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="experience-container h-screen overflow-y-auto scroll-smooth">
          <div ref={sectionRef} className="min-h-screen relative">
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-80">
              <div 
                className="absolute -right-40 -top-40 w-96 h-96 border-2 border-white/20 rounded-full transition-transform duration-700"
                style={{
                  transform: `rotate(${scrollProgress * 920}deg) scale(${1 + scrollProgress * 1})`,
                }}
              />
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse" />
              <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-white rounded-full animate-pulse delay-150" />
              <div className="absolute top-2/3 left-1/3 w-2 h-2 bg-white rounded-full animate-pulse delay-300" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" 
                style={{transform: `translateY(${scrollProgress * -20}px)`}}
              />
              <div 
                className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl rounded-full"
                style={{transform: `translate(${scrollProgress * 20}px, ${scrollProgress * -20}px)`}}
              />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-8 py-24">
              <h2 
                className={`text-7xl md:text-8xl font-light mb-16 transition-all duration-500 ${
                  isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                Professional<br />Experience
              </h2>

              <div 
                className={`space-y-16 transition-all duration-500 delay-100 ${
                  isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                {experiences.map((exp, index) => (
                  <div 
                    key={index} 
                    className="group border-l-4 border-white/20 pl-8 pb-4 hover:border-white/60 transition-colors"
                    style={{
                      animation: `fade-in 0.8s ease-out forwards ${index * 0.2}s`,
                      opacity: 0
                    }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-2 md:space-y-0">
                      <div>
                        <h3 className="text-3xl font-light text-white/90 group-hover:text-white transition-colors">
                          {exp.title}
                        </h3>
                        <p className="text-xl text-white/70 group-hover:text-white/90 transition-colors">
                          {exp.company}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-white/60 group-hover:text-white/80 transition-colors">
                          {exp.duration}
                        </span>
                        <p className="text-white/50 text-sm group-hover:text-white/70 transition-colors">
                          {exp.location}
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-3 text-white/70 group-hover:text-white/90 transition-colors">
                      {exp.description.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="w-1.5 h-1.5 bg-white/50 rounded-full mt-2 group-hover:bg-white/80 transition-colors" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkillsModal = ({ onClose }) => {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Start opening animation
    setIsOpen(true);

    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const scrollPercent = (windowHeight - rect.top) / (windowHeight + rect.height);
        setScrollProgress(Math.min(Math.max(scrollPercent, 0), 1));
      }
    };

    const container = document.querySelector('.skills-container');
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => onClose(), 300); // Wait for animation to complete
  };

  const skills = {
    technical: [
      { name: "React.js", level: 85 },
      { name: "Node.js", level: 90 },
      { name: "Express.js", level: 88 },
      { name: "MongoDB", level: 82 },
      { name: "Python", level: 70 },
      { name: "GraphQL", level: 65 }
    ],
    education: [
      {
        degree: "Master of Computer Applications (MCA)",
        institution: "Sri Y.N. College of Education",
        year: "2022-2024",
        score: "7.8 CGPA"
      },
      {
        degree: "Bachelor of Science (B.Sc) Computer Science",
        institution: "Sri Y.N. College of Education",
        year: "2019-2022",
        score: "7.4 CGPA"
      },
      {
        degree: "Intermediate (MPC)",
        institution: "Vidyanidhi Junior College",
        year: "2017-2019",
        score: "78.4%"
      },
      {
        degree: "SSC",
        institution: "Victory English Medium School",
        year: "2016",
        score: "8.3 CGPA"
      }
    ],
    achievements: [
      {
        title: "Microsoft Technology Associate",
        description: "Earned a certificate provides the core knowledge needed to begin a career in technology."
      },
      {
        title: "National Service Scheme Certificate",
        description: "Awarded a National Service Scheme certificate after completing 240 hours of community service"
      }
    ],
    certifications: [
      "Microsoft Technology Associate in Python Programming",
      "MEAN Stack Development Certification",
      "React Native Mobile Development",
      "Full Stack Development - Udacity"
    ]
  };

  return (
    <div 
      className={`fixed inset-0 z-50 transition-all duration-300 ease-out ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      <div 
        className={`fixed inset-0 bg-black text-white z-50 transition-transform duration-500 ${
          isOpen ? 'scale-100' : 'scale-95'
        }`}
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={handleClose}
          className="fixed top-8 right-8 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="skills-container h-screen overflow-y-auto scroll-smooth">
          <div ref={sectionRef} className="min-h-screen relative">
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-80">
              <div 
                className="absolute -right-40 -top-40 w-96 h-96 border-2 border-white/20 rounded-full transition-transform duration-700"
                style={{
                  transform: `rotate(${scrollProgress * 920}deg) scale(${1 + scrollProgress * 1})`,
                }}
              />
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse" />
              <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-white rounded-full animate-pulse delay-150" />
              <div className="absolute top-2/3 left-1/3 w-2 h-2 bg-white rounded-full animate-pulse delay-300" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" 
                style={{transform: `translateY(${scrollProgress * -20}px)`}}
              />
              <div 
                className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl rounded-full"
                style={{transform: `translate(${scrollProgress * 20}px, ${scrollProgress * -20}px)`}}
              />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-8 py-24">
              <h2 
                className={`text-7xl md:text-8xl font-light mb-16 transition-all duration-500 ${
                  isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                Skills &<br />Experience
              </h2>

              {/* First Grid Row - Technical Skills and Education */}
              <div 
                className={`grid grid-cols-1 md:grid-cols-2 gap-16 mb-16 transition-all duration-500 delay-100 ${
                  isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                {/* Technical Skills */}
                <div>
                  <h3 className="text-2xl font-light mb-8">Technical Skills</h3>
                  <div className="space-y-6">
                    {skills.technical.map((skill, index) => (
                      <div 
                        key={index} 
                        className="group"
                        style={{
                          animation: `fade-in 0.5s ease-out forwards ${index * 0.1}s`,
                          opacity: 0
                        }}
                      >
                        <div className="flex justify-between mb-2">
                          <span className="text-lg text-white/70 group-hover:text-white transition-colors">
                            {skill.name}
                          </span>
                          <span className="text-white/50 group-hover:text-white/70 transition-colors">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-white/70 group-hover:bg-white transition-all duration-500 rounded-full"
                            style={{
                              width: isOpen ? `${skill.level}%` : '0%',
                              transition: `width 1s ease-out ${index * 0.1}s`
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h3 className="text-2xl font-light mb-8">Education</h3>
                  <div className="space-y-8">
                    {skills.education.map((edu, index) => (
                      <div 
                        key={index}
                        className="group space-y-2 border-l-2 border-white/20 pl-4 hover:border-white/60 transition-colors"
                        style={{
                          animation: `fade-in 0.5s ease-out forwards ${index * 0.1}s`,
                          opacity: 0
                        }}
                      >
                        <h4 className="text-xl text-white/90 group-hover:text-white transition-colors">
                          {edu.degree}
                        </h4>
                        <p className="text-white/70 group-hover:text-white/90 transition-colors">
                          {edu.institution}
                        </p>
                        <div className="flex justify-between text-sm text-white/50 group-hover:text-white/70 transition-colors">
                          <span>{edu.year}</span>
                          <span>{edu.score}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Second Grid Row - Certifications and Achievements */}
              <div 
                className={`grid grid-cols-1 md:grid-cols-2 gap-16 transition-all duration-500 delay-200 ${
                  isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                {/* Certifications */}
                <div>
                  <h3 className="text-2xl font-light mb-8">Certifications</h3>
                  <div className="space-y-4">
                    {skills.certifications.map((cert, index) => (
                      <div 
                        key={index} 
                        className="flex items-center space-x-4 group"
                        style={{
                          animation: `fade-in 0.5s ease-out forwards ${index * 0.1}s`,
                          opacity: 0
                        }}
                      >
                        <div className="h-0.5 w-8 bg-white/30 group-hover:w-12 group-hover:bg-white transition-all duration-300" />
                        <span className="text-lg text-white/70 group-hover:text-white transition-colors">
                          {cert}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notable Achievements */}
                <div>
                  <h3 className="text-2xl font-light mb-8">Notable Achievements</h3>
                  <div className="space-y-8">
                    {skills.achievements.map((achievement, index) => (
                      <div 
                        key={index} 
                        className="p-6 rounded-lg border border-white/10 hover:border-white/30 transition-colors group"
                        style={{
                          animation: `fade-in 0.5s ease-out forwards ${index * 0.1}s`,
                          opacity: 0
                        }}
                      >
                        <div className="flex items-start space-x-4">
                          <span className="text-5xl font-light text-white/30 group-hover:text-white/70 transition-colors">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <div>
                            <h4 className="text-xl mb-2 text-white/90 group-hover:text-white transition-colors">
                              {achievement.title}
                            </h4>
                            <p className="text-white/70 group-hover:text-white/90 transition-colors">
                              {achievement.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Project Card Component for the main portfolio page
const ProjectCard = ({ project, onClick }) => {
  const BASE_PATH = process.env.PUBLIC_URL;
  
  return (
    <div 
      className="relative border-b border-gray-200 pb-8 last:border-b-0 cursor-pointer project-item group"
      onClick={onClick}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
        <div className="md:col-span-3">
          <div className="flex items-center justify-between">
            <span className="text-2xl group-hover:text-gray-600 transition-colors">
              {project.title}
            </span>
            <ArrowUpRight 
              className="w-6 h-6 transform opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
            />
          </div>
          <p className="text-gray-600 mt-2 mb-4 line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {project.tags?.slice(0, 3).map((tag, i) => (
              <span key={i} className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                {tag}
              </span>
            ))}
            {project.tags?.length > 3 && (
              <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                +{project.tags.length - 3} more
              </span>
            )}
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg md:h-24 md:w-24 group-hover:shadow-md transition-all duration-300">
          <ProjectImage 
            imageName={project.image || project.images?.[0] || 'placeholder-project.jpg'}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-0.5 bg-black transform origin-left transition-transform duration-500 ease-out w-full scale-x-0 group-hover:scale-x-100" />
    </div>
  );
};

const Portfolio = () => {
  const [loading, setLoading] = useState(true);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [showParallaxProjects, setShowParallaxProjects] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [showExperience, setShowExperience] = useState(false);

  // Add this constant for the base path
  const BASE_PATH = process.env.PUBLIC_URL;

  // Updated projects array with your LinkedIn information and image paths
  const projects = [

    {
      title: "Insurance Analytics Platform",
      description: "Full-stack Insurance Analytics Dashboard using Python, SQL, React, and GraphQL, enabling real-time monitoring of insurance plans and employee enrollments with interactive visualizations and data filtering capabilities.",
      role: "Junior Software Engineer",
      date: "2024-2025",
      tags: ["Python", "SQL", "React", "GraphQL", "Data Analytics"],
      images: ["insurance-analytics-1.jpg", "insurance-analytics-2.jpg", "insurance-analytics-3.jpg"],
      image: "insurance-analytics-1.jpg", // For backwards compatibility
      github: "https://github.com/Saipraveen1234/insurance-analytics",
      highlights: [
        "Employee enrollment tracking across insurance plans",
        "Cost analysis and comparison tools",
        "Data export in multiple formats (CSV, PDF, Excel)",
        "Custom report generation"
      ]
    },
    {
      title: "A Secure and Privacy-Preserving E-Government Framework",
      description: "An end-to-end machine learning solution focused on predictive analytics. Built using Python and modern ML frameworks, this project processes large datasets to extract meaningful business insights and make data-driven predictions.",
      role: "ML Engineer",
      date: "2023",
      tags: ["Python", "Machine Learning", "Data Analytics", "scikit-learn", "TensorFlow"],
      images: ["predictive-analytics-1.jpg", "predictive-analytics-2.jpg"],
      image: "predictive-analytics-1.jpg", // For backwards compatibility
      github: "https://github.com/Saipraveen1234/predictive-analytics",
      highlights: [
        "Predictive models for business outcome forecasting",
        "Automated data preprocessing pipeline",
        "Interactive visualization of model results",
        "Model performance monitoring and retraining"
      ]
    },
    {
      title: "Abhista - Business Management System",
      description: "A modern web application focused on streamlining business operations. Includes custom analytics dashboards and seamless third-party service integrations.",
      role: "Frontend Developer",
      date: "2022",
      tags: ["React", "TypeScript", "UI/UX", "API Integration"],
      images: ["abhista-business-1.jpg", "abhista-business-2.jpg", "abhista-business-3.jpg"],
      image: "abhista-business-1.jpg", // For backwards compatibility
      github: "https://github.com/Saipraveen1234/abhista-business",
      liveLink: "https://abhista-demo.netlify.app",
      highlights: [
        "Responsive user interface with modern design principles",
        "Advanced filtering and search capabilities",
        "Real-time collaborative features",
        "Integration with multiple external services"
      ]
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <div className="min-h-screen bg-white px-8 md:px-16 py-8">
            {/* Navigation */}
            <nav className="flex flex-col md:flex-row justify-between items-center mb-24">
              {/* Profile Section */}
              <div className="flex flex-col items-center md:items-start md:flex-row md:space-x-6 w-full md:w-auto mb-8 md:mb-0">
                {/* Profile Image Container */}
                <div className="group relative cursor-pointer mb-4 md:mb-0" onClick={() => setShowSkills(true)}>
                  {/* "Click me" Badge */}
                  <div className="absolute -top-2 -right-2 bg-black text-white text-xs px-2 py-1 rounded-full z-10 shadow-lg animate-bounce">
                    Click me
                  </div>

                  {/* Profile Image Frame */}
                  <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-black/5 transform transition-all duration-300 group-hover:ring-offset-4 group-hover:ring-black/20">
                    <img 
                      src={`${BASE_PATH}/assets/praveen-profile.jpg`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `${BASE_PATH}/praveen-profile.jpg`;
                      }}
                      alt="Praveen Peddinti"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="text-white text-sm font-medium text-center">
                        View Skills
                      </div>
                    </div>
                  </div>
                </div>

                {/* Name and Title - Now stacks vertically on mobile */}
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-medium">Praveen Peddinti</h2>
                  <p className="text-gray-500">Full Stack Developer</p>
                  <div className="text-sm text-gray-500 flex items-center justify-center md:justify-start gap-2 mt-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                    Click to view profile
                  </div>
                </div>
              </div>

              {/* Navigation Links - Full width on mobile */}
              <div className="flex space-x-8 md:space-x-12 w-full md:w-auto justify-center md:justify-end">
                <a href="#about" className="text-black hover:text-gray-600 transition-colors text-sm md:text-base">About</a>
                <a href="#works" className="text-black hover:text-gray-600 transition-colors text-sm md:text-base">Works</a>
                <button 
                  onClick={() => setShowExperience(true)}
                  className="text-black hover:text-gray-600 transition-colors text-sm md:text-base cursor-pointer"
                >
                  Experience
                </button>
                <a href="#contact" className="text-black hover:text-gray-600 transition-colors text-sm md:text-base">Contact</a>
              </div>
            </nav>

            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
              {/* Left Column - Intro */}
              <div className="pr-4 overflow-hidden">
                {/* Background Typography */}
                <div className="absolute -center-10 -RIGHT-10 text-[25rem] font-black text-black/[0.03] leading-none pointer-events-none select-none whitespace-nowrap animate-float">
                  PRAVEEN
                </div>

                <div className="overflow-hidden">
                  <h1 className="text-7xl font-normal mb-4 leading-tight animate-fade-in opacity-0" 
                      style={{ animation: 'fade-in 0.8s ease-out forwards 0.2s' }}>
                    I'm <span className="inline-block" 
                               style={{ animation: 'slide-up 0.8s ease-out forwards' }}>Sai</span>
                  </h1>
                  <h1 className="text-7xl font-bold mb-12 leading-tight animate-fade-in opacity-0" 
                      style={{ animation: 'fade-in 0.8s ease-out forwards 0.4s' }}>
                    <span className="inline-block" 
                          style={{ animation: 'slide-up 0.8s ease-out forwards 0.2s' }}>Praveen.</span>
                  </h1>
                </div>
                
                <p className="text-xl mb-12 leading-relaxed max-w-xl opacity-0"
                  style={{ animation: 'fade-in 0.8s ease-out forwards 0.6s' }}>
                  Full Stack Developer specializing in MEAN Stack, React & Node.js. 
                  Currently working at AAA Medical Billing, building scalable applications with 
                  React.js, Node.js, Express, and MongoDB.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                  <button 
                    onClick={() => setIsResumeOpen(true)}
                    className="border-2 border-black rounded-full px-8 py-4 text-lg hover:bg-black hover:text-white transition-all opacity-0"
                    style={{ animation: 'fade-in 0.8s ease-out forwards 0.8s' }}
                  >
                    View Resume
                  </button>
                  
                  <button 
                    onClick={() => setShowExperience(true)}
                    className="flex items-center justify-center gap-2 border-2 border-black/50 rounded-full px-8 py-4 text-lg hover:bg-black hover:text-white transition-all opacity-0"
                    style={{ animation: 'fade-in 0.8s ease-out forwards 1s' }}
                  >
                    <Briefcase className="w-5 h-5" />
                    Experience
                  </button>
                </div>
              </div>

              {/* Projects Section */}
              <div id="works">
                <h2 className="text-gray-500 mb-12 opacity-0"
                    style={{ animation: 'fade-in 0.8s ease-out forwards 0.4s' }}>
                  MY PROJECTS
                </h2>
                <div className="space-y-8">
                  {projects.map((project, index) => (
                    <ProjectCard 
                      key={index}
                      project={project}
                      onClick={() => setShowParallaxProjects(true)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
  
          {/* Parallax Contact Section */}
          <ParallaxContact />

          {/* Resume Modal */}
          {isResumeOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm flex items-center justify-center p-4 md:p-8">
              <div className="bg-white rounded-2xl shadow-2xl flex flex-col w-full max-w-3xl h-[95vh] animate-fade-in overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b bg-white">
                  <h2 className="text-2xl font-medium">My Resume</h2>
                  <button
                    onClick={() => setIsResumeOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="flex-1 bg-gray-50 overflow-hidden">
                  <iframe
                    src={`${BASE_PATH}/Praveen-resume.pdf`}
                    className="w-full h-full"
                    title="Resume PDF"
                    style={{ aspectRatio: '1/1.4142' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Experience Modal */}
          {showExperience && (
            <ExperienceSection onClose={() => setShowExperience(false)} />
          )}

          {/* Skills Modal */}
          {showSkills && (
            <SkillsModal onClose={() => setShowSkills(false)} />
          )}

          {/* Parallax Projects View */}
          {showParallaxProjects && (
            <ParallaxProjectsView 
              projects={projects}
              onClose={() => setShowParallaxProjects(false)}
            />
          )}
        </>
      )}
    </>
  );
};

export default Portfolio;