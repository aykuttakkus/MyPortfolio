import React, { useEffect, useRef, useState } from 'react';
import { Phone, Mail, Github, Linkedin, Instagram, MapPin, ExternalLink, Code2, Brain, Terminal, Database } from 'lucide-react';

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = document.documentElement.scrollHeight;

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(1);
    const chars = 'aykutKrAs'.split('');

    ctx.font = `${fontSize}px monospace`;

    function draw() {
      ctx.fillStyle = 'rgba(18, 18, 18, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 0.5;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(text, x, y);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 100);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('scroll', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('scroll', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ backgroundColor: 'transparent' }}
    />
  );
}

function HomePage() {
  return (
    <div className="relative z-10 min-h-screen pt-24 px-4">
      <div className="max-w-4xl mx-auto text-center text-white">
        <img 
          src="https://i.imgur.com/sCNG5qg.png" 
          alt="Profile" 
          className="mx-auto mb-4 w-80 h-80 object-contain fade-in-illustration"
        />
        <h1 className="text-6xl font-bold mb-6"></h1>
        <p className="text-4xl mb-8">Building the Next Ce...</p>
        <div className="flex justify-center space-x-8">
          <a href="https://github.com/aykuttakkus" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
            <Github className="w-12 h-12" />
          </a>
          <a href="https://www.linkedin.com/in/aykuttakkus" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
            <Linkedin className="w-12 h-12" />
          </a>
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="relative z-10 min-h-screen pt-24 px-4">
      <div className="max-w-3xl mx-auto bg-black/80 backdrop-blur-sm rounded-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-6">About Me</h1>
        <div className="space-y-4 leading-relaxed">
          <p>
            I'm Aykut, a software engineer aspiring to become the CEO of my own company. Currently, I'm creating my own projects and generating innovative ideas to achieve this goal.
          </p>
          <p>
            To briefly introduce myself: during the first two years of university, I worked in the bar industry, managing various events both within and outside the city in collaboration with companies like Zorlu and RedBull.
          </p>
          <p>
            At the beginning of this year, I left the bar industry to fully focus on my studies. This year, I was working on a project for TEKNOFEST with the Quantum Dynamics Club; however, due to some disagreements, I parted ways with the club as of March 13.
          </p>
          <p>
            I view all my experiences as steps toward becoming a CEO. My contact information is available on my website.
          </p>
        </div>
      </div>
    </div>
  );
}

function SkillsPage() {
  const skills = [
    {
      category: "Programming Languages",
      icon: <Code2 className="w-8 h-8 mb-4" />,
      items: ["Python", "C++"],
      description: ""
    },
    {
      category: "AI & Machine Learning",
      icon: <Brain className="w-8 h-8 mb-4" />,
      items: ["Claude", "Cursor", "Bolt"],
      description: ""
    },
    {
      category: "Algorithms",
      icon: <Terminal className="w-8 h-8 mb-4" />,
      items: ["OpenCV", "Pandas", "Matplotlib"],
      description: ""
    },
    {
      category: "Databases",
      icon: <Database className="w-8 h-8 mb-4" />,
      items: ["SQL"],
      description: ""
    }
  ];

  return (
    <div className="relative z-10 min-h-screen pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-16">My Skills</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div key={index} className="bg-black/80 backdrop-blur-sm rounded-lg p-6 text-white">
              <div className="flex flex-col items-center mb-4">
                {skill.icon}
                <h3 className="text-xl font-bold mb-2">{skill.category}</h3>
              </div>
              <p className="text-gray-300 text-center mb-4">{skill.description}</p>
              <div className="space-y-2">
                {skill.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="bg-white/10 rounded-lg px-4 py-2 text-center">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectsPage() {
  const projects = [
    {
      title: "Parking Space Counter Project",
      description: "",
      image: "https://i.imgur.com/pyFxiKT.jpeg",
      tags: ["Python", "OpenCV"]
    },
    {
      title: "Real-time Movement Chart for GPS-free Drone",
      description: "",
      image: "https://i.imgur.com/RvS9NNQ.png",
      tags: ["Python", "OpenCV", "Pandas", "Os", "Time", "Matplotlib"]
    }
  ];

  return (
    <div className="relative z-10 min-h-screen pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-12 text-white text-center">My Projects</h1>
        <div 
          className="grid gap-8 justify-center"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
            maxWidth: `${Math.min(projects.length, 3) * 384}px`,
            margin: '0 auto'
          }}
        >
          {projects.map((project, index) => (
            <div key={index} className="bg-black/80 backdrop-blur-sm rounded-lg overflow-hidden">
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="relative z-10 min-h-screen pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">Contact</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 lg:px-16">
          {/* Social Media Section */}
          <div className="bg-black/80 backdrop-blur-sm rounded-lg p-8 text-white">
            <div className="flex items-center justify-center mb-6">
              <h3 className="text-2xl font-semibold">Social Media</h3>
            </div>
            <div className="space-y-6">
              <a 
                href="https://www.instagram.com/aykuttakkus" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Instagram className="w-6 h-6" />
                <span className="text-lg">Instagram</span>
                <ExternalLink className="w-5 h-5 ml-auto opacity-70" />
              </a>
              <a 
                href="https://www.linkedin.com/in/aykuttakkus" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Linkedin className="w-6 h-6" />
                <span className="text-lg">LinkedIn</span>
                <ExternalLink className="w-5 h-5 ml-auto opacity-70" />
              </a>
            </div>
          </div>

          {/* Mail & Phone Section */}
          <div className="bg-black/80 backdrop-blur-sm rounded-lg p-8 text-white">
            <div className="flex items-center justify-center mb-6">
              <h3 className="text-2xl font-semibold">Mail & Phone</h3>
            </div>
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-3">
                <Mail className="w-6 h-6 flex-shrink-0" />
                <span className="text-lg break-all">aykuttbusiness@hotmail.com</span>
              </div>
              <div className="flex items-center space-x-4 p-3">
                <Phone className="w-6 h-6 flex-shrink-0" />
                <span className="text-lg">+90 535 278 80 78</span>
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="bg-black/80 backdrop-blur-sm rounded-lg p-8 text-white">
            <div className="flex items-center justify-center mb-6">
              <h3 className="text-2xl font-semibold">Address</h3>
            </div>
            <div className="flex items-center justify-center space-x-4 p-3">
              <MapPin className="w-6 h-6" />
              <span className="text-lg">Istanbul / Besiktas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavigationMenu({ currentPage, setCurrentPage }) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sections = {
    'Home': {
      title: 'Home',
      content: 'Welcome'
    },
    'About': {
      title: 'About',
      content: 'Who Am I?'
    },
    'Skills': {
      title: 'Skills',
      content: 'My Expertise'
    },
    'Projects': {
      title: 'Projects',
      content: 'My Work'
    },
    'Contact': {
      title: 'Contact',
      content: 'Get in Touch'
    }
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(prev => {
      if (prev === page) return prev;
      return page;
    });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <img 
              src="https://i.imgur.com/ld0DQZL.png" 
              alt="Logo" 
              className="h-8 w-auto mr-6 md:h-10"
            />
          </div>
          <div className="flex-1 flex justify-center space-x-8">
            {Object.entries(sections).map(([key, section]) => (
              <div
                key={key}
                className="relative group"
                onMouseEnter={() => setActiveSection(key)}
                onMouseLeave={() => setActiveSection(null)}
              >
                <button 
                  className="relative px-6 py-2 text-white overflow-hidden group"
                  onClick={() => handlePageChange(key)}
                >
                  <span className="absolute inset-x-0 h-[1px] bottom-0 bg-white transform origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                  <span className="absolute inset-x-0 h-[1px] top-0 bg-white transform origin-right scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                  <span className="absolute inset-y-0 w-[1px] right-0 bg-white transform origin-bottom scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100"></span>
                  <span className="absolute inset-y-0 w-[1px] left-0 bg-white transform origin-top scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100"></span>
                  {section.title}
                </button>
                {activeSection === key && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-64 bg-black/90 backdrop-blur-md rounded-lg shadow-xl p-4 mt-2">
                    <div className="text-white text-center">{section.content}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

function PageTransition({ children, isVisible }) {
  return (
    <div
      className={`transition-opacity duration-500 ease-in-out absolute w-full ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
    >
      {children}
    </div>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState<string>('Home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [visiblePage, setVisiblePage] = useState<string>('Home');

  useEffect(() => {
    if (currentPage !== visiblePage) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setVisiblePage(currentPage);
        setIsTransitioning(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentPage, visiblePage]);

  const renderPage = (pageName: string) => {
    switch (pageName) {
      case 'Home':
        return <HomePage />;
      case 'About':
        return <AboutPage />;
      case 'Skills':
        return <SkillsPage />;
      case 'Projects':
        return <ProjectsPage />;
      case 'Contact':
        return <ContactPage />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-image">
      <div className="min-h-screen bg-overlay">
        <MatrixRain />
        <NavigationMenu currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <div className="relative">
          <PageTransition isVisible={!isTransitioning}>
            {renderPage(visiblePage)}
          </PageTransition>
        </div>
      </div>
    </div>
  );
}

export default App;