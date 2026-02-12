import React, { useEffect, useRef, useState } from 'react';
import { Phone, Mail, Github, Linkedin, Instagram, MapPin, ExternalLink, Lightbulb, Layout, Server, Brain, Database, Gamepad2, Play, X } from 'lucide-react';

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(1);
    const chars = 'aykutKrAs'.split('');

    ctx.font = `${fontSize}px monospace`;

    function draw() {
      if (!ctx || !canvas) return;
      
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
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
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
        <div className="flex justify-center items-center mb-4">
          <img 
            src="https://i.imgur.com/sCNG5qg.png" 
            alt="Profile" 
            className="w-80 h-80 object-contain fade-in-illustration"
          />
        </div>
        <h1 className="text-6xl font-bold mb-6"></h1>
        <p className="text-4xl mb-8">Dream BIG. Play BIGGER. Because LIMITS? Just LIES.</p>
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
            I'm Aykut, a software engineer who wants to create my own game. To achieve this goal, I develop my own projects and come up with innovative ideas. I've been playing MMORPG, MOBA, tactical FPS, sports, open-world action-adventure, and RTS games since childhood.
          </p>
          <p>
            To briefly introduce myself: During the first two years of university, I worked in the bar industry and gained valuable experience by working with companies like Zorlu and Red Bull. Later, I focused more on software development and started building projects aligned with my goal of launching my own venture.
          </p>
          <p>
            I don't see games only as a player. I'm also interested in the systems, mechanics, and logic behind them. With this perspective, I'm focused on developing my own games.
          </p>
        </div>
      </div>
    </div>
  );
}

function SkillsPage() {
  const skills = [
    {
      category: "Product",
      icon: <Lightbulb className="w-8 h-8 mb-4" />,
      items: ["Creative Problem Solving", "Clean UI", "Reliable APIs", "Practical AI"],
      description: ""
    },
    {
      category: "Frontend",
      icon: <Layout className="w-8 h-8 mb-4" />,
      items: ["React", "Vite", "Tailwind CSS", "Figma to UI"],
      description: ""
    },
    {
      category: "Backend",
      icon: <Server className="w-8 h-8 mb-4" />,
      items: ["Node.js", "Express.js", "REST APIs", "MongoDB", "JWT"],
      description: ""
    },
    {
      category: "Computer Vision / AI",
      icon: <Brain className="w-8 h-8 mb-4" />,
      items: ["Python", "OpenCV", "YOLO"],
      description: ""
    },
    {
      category: "Data",
      icon: <Database className="w-8 h-8 mb-4" />,
      items: ["SQL", "NumPy", "Matplotlib"],
      description: ""
    }
  ];

  return (
    <div className="relative z-10 min-h-screen pt-24 px-4 pb-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-16">My Skills</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className="bg-black/90 backdrop-blur-sm rounded-xl p-6 text-white border border-white/10 hover:border-white/30 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl"
            >
              <div className="flex flex-col items-center mb-4">
                {skill.icon}
                <h3 className="text-xl font-bold mb-2">{skill.category}</h3>
              </div>
              <p className="text-gray-400 text-center mb-4">{skill.description}</p>
              <div className="space-y-2">
                {skill.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="bg-white/10 rounded-full px-4 py-2 text-center text-white/80 border border-white/20 hover:bg-white/20 transition-colors">
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
      title: "UFC Website",
      description: "",
      image: "https://i.imgur.com/aQd979y.png",
      tags: ["React", "Node.js", "REST API", "MongoDB", "Cheerio", "Swagger", "Helmet"]
    },
    {
      title: "HafizAI Game",
      description: "",
      image: "https://i.imgur.com/Uzq6a7x.png",
      tags: ["Flutter", "Dart", "Cursor", "LeonardoAI"]
    },
    {
      title: "Real-time Movement Chart for GPS-free Drone",
      description: "",
      image: "https://i.imgur.com/RvS9NNQ.png",
      tags: ["Python", "OpenCV", "Pandas", "Os", "Time", "Matplotlib"]
    },
    {
      title: "Parking Space Counter Project",
      description: "",
      image: "https://i.imgur.com/pyFxiKT.jpeg",
      tags: ["Python", "OpenCV"]
    }
  ];

  return (
    <div className="relative z-10 min-h-screen pt-24 px-4 pb-24">
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
            <div 
              key={index} 
              className="bg-black/90 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl"
            >
              <div className="relative">
                <img src={project.image} alt={project.title} className="w-full h-64 object-contain bg-black" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-sm border border-white/20 hover:bg-white/20 transition-colors">
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

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameUrl: string;
  gameTitle: string;
}

function GameModal({ isOpen, onClose, gameUrl, gameTitle }: GameModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl mx-4">
        <div className="bg-black/95 rounded-xl border border-white/20 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Gamepad2 className="w-6 h-6" />
              {gameTitle}
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="relative" style={{ paddingBottom: '62.5%' }}>
            <iframe
              src={gameUrl}
              title={gameTitle}
              className="absolute inset-0 w-full h-full"
              allow="fullscreen"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function GamesPage() {
  const [selectedGame, setSelectedGame] = useState<{ url: string; title: string } | null>(null);

  const games = [
    {
      title: "Ball Launcher",
      description: "A fun physics-based slingshot game where you launch balls to hit targets. Built with Unity.",
      image: "https://i.imgur.com/x3Qq5k2.png",
      tags: ["Unity", "C#", "Physics", "WebGL", "Android", "iOS"],
      demoUrl: "/demos/slingshot/Ball Launcher/index.html"
    }
  ];

  return (
    <>
      <div className="relative z-10 min-h-screen pt-24 px-4 pb-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-12 text-white text-center">My Games</h1>
          <div 
            className="grid gap-8 justify-center"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
              maxWidth: `${Math.min(games.length, 3) * 384}px`,
              margin: '0 auto'
            }}
          >
            {games.map((game, index) => (
              <div 
                key={index} 
                className="bg-black/90 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl"
              >
                <div 
                  className="relative group cursor-pointer"
                  onClick={() => setSelectedGame({ url: game.demoUrl, title: game.title })}
                >
                  <img src={game.image} alt={game.title} className="w-full h-64 object-contain bg-black transition-all duration-300 group-hover:scale-105 group-hover:brightness-50" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg shadow-black/50">
                      <Play className="w-7 h-7 text-white ml-1" fill="white" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{game.title}</h3>
                  <p className="text-gray-400 mb-4">{game.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {game.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-sm border border-white/20 hover:bg-white/20 transition-colors">
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
      <GameModal
        isOpen={selectedGame !== null}
        onClose={() => setSelectedGame(null)}
        gameUrl={selectedGame?.url || ''}
        gameTitle={selectedGame?.title || ''}
      />
    </>
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
                <span className="text-lg break-all">aykutk.akkus@gmail.com</span>
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

interface NavigationMenuProps {
  currentPage: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

function NavigationMenu({ currentPage, setCurrentPage }: NavigationMenuProps) {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const sections = {
    'Home': {
      title: 'Home'
    },
    'About': {
      title: 'About'
    },
    'Skills': {
      title: 'Skills'
    },
    'Projects': {
      title: 'Projects'
    },
    'Games': {
      title: 'Games'
    },
    'Contact': {
      title: 'Contact'
    }
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(prev => {
      if (prev === page) return prev;
      return page;
    });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <img 
              src="https://i.imgur.com/ld0DQZL.png" 
              alt="Logo" 
              className="h-8 w-auto mr-6 md:h-10 transition-transform duration-300 hover:scale-110"
            />
          </div>
          <div className="flex-1 flex justify-center space-x-8">
            {Object.entries(sections).map(([key, section]) => {
              const isActive = currentPage === key;
              const isHovered = hoveredButton === key;

              return (
                <div
                  key={key}
                  className="relative group"
                  onMouseEnter={() => {
                    setHoveredButton(key);
                  }}
                  onMouseLeave={() => {
                    setHoveredButton(null);
                  }}
                >
                  <button 
                    className={`relative px-6 py-2 text-white transition-all duration-300 overflow-visible ${
                      isActive ? 'text-blue-400' : 'hover:text-blue-300'
                    }`}
                    onClick={() => handlePageChange(key)}
                  >
                    {/* Tüm butonlar için modern hover efekti */}
                    <span 
                      className={`absolute inset-x-0 h-[2px] bottom-0 bg-gradient-to-r from-transparent via-white to-transparent transform origin-left transition-all duration-500 ${
                        isHovered ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                      }`}
                    />
                    <span 
                      className={`absolute inset-x-0 h-[2px] top-0 bg-gradient-to-r from-transparent via-white to-transparent transform origin-right transition-all duration-500 delay-150 ${
                        isHovered ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                      }`}
                    />
                    <span 
                      className={`absolute inset-y-0 w-[2px] right-0 bg-gradient-to-b from-transparent via-white to-transparent transform origin-bottom transition-all duration-500 delay-75 ${
                        isHovered ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
                      }`}
                    />
                    <span 
                      className={`absolute inset-y-0 w-[2px] left-0 bg-gradient-to-b from-transparent via-white to-transparent transform origin-top transition-all duration-500 delay-225 ${
                        isHovered ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
                      }`}
                    />

                    {/* Aktif sayfa için alt çizgi - beyaz ve ince */}
                    {isActive && (
                      <span className="absolute inset-x-0 h-[1px] bottom-0 bg-white" />
                    )}

                    <span className="relative z-10 font-medium tracking-wide">
                      {section.title}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

interface PageTransitionProps {
  children: React.ReactNode;
  isVisible: boolean;
}

function PageTransition({ children, isVisible }: PageTransitionProps) {
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
      case 'Games':
        return <GamesPage />;
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