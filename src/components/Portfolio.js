import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, X, Download } from 'lucide-react';

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
          <h2 className="text-7xl md:text-8xl font-light mb-16">
            {project.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm opacity-100">
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
          </div>
          <div className="mt-16 max-w-2xl">
            <p className="text-lg text-gray-400 leading-relaxed">
              {project.description}
            </p>
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

const SkillsModal = ({ onClose }) => {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
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

  const skills = {
    technical: [
      { name: "Python", level: 90 },
      { name: "Machine Learning", level: 85 },
      { name: "React.js", level: 88 },
      { name: "Node.js", level: 82 },
      { name: "SQL & NoSQL", level: 85 },
      { name: "Data Analysis", level: 92 }
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
      "AWS Certified Machine Learning - Specialty",
      "Google Data Analytics Professional Certificate",
      "Deep Learning Specialization - Coursera",
      "Full Stack Development - Udacity"
    ]
  };

  return (
    <div className="fixed inset-0 bg-black text-white z-50">
      <button 
        onClick={onClose}
        className="fixed top-8 right-8 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
      >
        <X className="w-6 h-6" />
      </button>
      <div className="skills-container h-screen overflow-y-auto scroll-smooth">
        <div ref={sectionRef} className="min-h-screen relative">
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

          <div className="relative z-10 container mx-auto px-8 py-24">
            <h2 className="text-7xl md:text-8xl font-light mb-16">
              Skills &<br />Experience
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-16">
                <div>
                  <h3 className="text-2xl font-light mb-8">Technical Skills</h3>
                  <div className="space-y-6">
                    {skills.technical.map((skill, index) => (
                      <div key={index} className="group">
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
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-light mb-8">Certifications</h3>
                  <div className="space-y-4">
                    {skills.certifications.map((cert, index) => (
                      <div 
                        key={index}
                        className="flex items-center space-x-4 group"
                      >
                        <div className="h-0.5 w-8 bg-white/30 group-hover:w-12 group-hover:bg-white transition-all duration-300" />
                        <span className="text-lg text-white/70 group-hover:text-white transition-colors">
                          {cert}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-light mb-8">Notable Achievements</h3>
                <div className="space-y-8">
                  {skills.achievements.map((achievement, index) => (
                    <div 
                      key={index}
                      className="p-6 rounded-lg border border-white/10 hover:border-white/30 transition-colors group"
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
  );
};

const Portfolio = () => {
  const [loading, setLoading] = useState(true);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [showParallaxProjects, setShowParallaxProjects] = useState(false);
  const [showSkills, setShowSkills] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const projects = [
    {
      title: "Data Science and Machine Learning Project",
      description: "An end-to-end machine learning solution focused on predictive analytics. Built using Python and modern ML frameworks, this project processes large datasets to extract meaningful business insights and make data-driven predictions.",
      role: "ML Engineer",
      date: "2023",
      tags: ["Python", "Machine Learning", "Data Analytics", "scikit-learn", "TensorFlow"],
      link: "#"
    },
    {
      title: "Neural Networks for Profile Analysis",
      description: "Developed an innovative system using deep learning to analyze and classify social media profiles. The solution employs advanced neural network architectures to process user behavior patterns and detect anomalies.",
      role: "AI Developer",
      date: "2023",
      tags: ["Deep Learning", "Neural Networks", "Python", "Data Analysis"],
      link: "#"
    },
    {
      title: "Inventory Management System",
      description: "A comprehensive inventory tracking solution built with modern web technologies. Features real-time updates, automated reporting, and intuitive dashboards for efficient stock management.",
      role: "Full Stack Developer",
      date: "2022",
      tags: ["React", "Node.js", "MongoDB", "REST API"],
      link: "#"
    },
    {
      title: "Web Development Project (Abhista)",
      description: "A modern web application focused on streamlining business operations. Includes custom analytics dashboards and seamless third-party service integrations.",
      role: "Frontend Developer",
      date: "2022",
      tags: ["React", "TypeScript", "UI/UX", "API Integration"],
      link: "#"
    }
  ];

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <div className="min-h-screen bg-white px-8 md:px-16 py-8">
            {/* Navigation */}
            <nav className="flex justify-between items-center mb-24">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-black/5 cursor-pointer"
                  onClick={() => setShowSkills(true)}
                >
                  <img 
                    src="./public/praveen-profile.jpg" 
                    alt="Praveen Peddinti"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <span className="text-lg font-medium">Praveen Peddinti</span>
              </div>
              <div className="flex space-x-12">
                <a href="#about" className="text-black hover:text-gray-600">About</a>
                <a href="#works" className="text-black hover:text-gray-600">Works</a>
                <a href="#contact" className="text-black hover:text-gray-600">Contact</a>
              </div>
            </nav>

            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
              {/* Left Column */}
              <div className="pr-4">
                <h1 className="text-7xl font-normal mb-12 leading-tight">
                  I'm Sai<br />Praveen.
                </h1>
                <p className="text-xl mb-12 leading-relaxed max-w-xl">
                  As a recent graduate, I specialize in Data Science and Web Development.
                  My toolkit includes Python, Machine Learning, and Full-stack development, 
                  with a particular focus on building AI-powered applications that solve real problems.
                </p>
                <button 
                  onClick={() => setIsResumeOpen(true)}
                  className="border-2 border-black rounded-full px-12 py-4 text-lg hover:bg-black hover:text-white transition-all"
                >
                  View Resume
                </button>
              </div>

              {/* Right Column - Projects */}
              <div>
                <h2 className="text-gray-500 mb-12">MY PROJECTS</h2>
                <div className="space-y-8">
                  {projects.map((project, index) => (
                    <div 
                      key={index}
                      className="relative border-b border-gray-200 pb-8 last:border-b-0 cursor-pointer"
                      onMouseEnter={() => setHoveredProject(index)}
                      onMouseLeave={() => setHoveredProject(null)}
                      onClick={() => setShowParallaxProjects(true)}
                    >
                      <div className="group flex items-center justify-between">
                        <span className="text-2xl group-hover:text-gray-600 transition-colors">
                          {project.title}
                        </span>
                        <ArrowUpRight 
                          className={`w-6 h-6 transform transition-all duration-300 ${
                            hoveredProject === index 
                              ? 'opacity-100 translate-x-0' 
                              : 'opacity-0 -translate-x-4'
                          }`}
                        />
                      </div>
                      <div
                        className={`absolute bottom-0 left-0 h-0.5 bg-black transform origin-left transition-transform duration-500 ease-out ${
                          hoveredProject === index ? 'w-full scale-x-100' : 'w-full scale-x-0'
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Resume Modal */}
          {isResumeOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm flex items-center justify-center p-4 md:p-8">
              <div className="bg-white rounded-2xl shadow-2xl flex flex-col w-full max-w-3xl h-[95vh] animate-fade-in overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b bg-white">
                  <h2 className="text-2xl font-medium">My Resume</h2>
                  <div className="flex items-center space-x-4">
                    <a
                      href="/Praveen-resume.pdf"
                      download
                      className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors"
                    >
                      <Download className="w-5 h-5" />
                      <span>Download PDF</span>
                    </a>
                    <button
                      onClick={() => setIsResumeOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>
                
                <div className="flex-1 bg-gray-50 overflow-hidden">
                  <iframe
                    src="/Praveen-resume.pdf#toolbar=0"
                    className="w-full h-full"
                    title="Resume PDF"
                    style={{ aspectRatio: '1/1.4142' }}
                  />
                </div>
              </div>
            </div>
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
