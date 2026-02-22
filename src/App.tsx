import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  ExternalLink,
  Gamepad2,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Play,
  X,
} from 'lucide-react';

function MatrixRainHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame = 0;
    let lastTime = 0;
    const fps = 12;
    const interval = 1000 / fps;

    const chars = 'AYKUTCODEGAMEBUILD'.split('');
    let fontSize = 14;
    let columns = 0;
    let drops: number[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      fontSize = window.innerWidth < 768 ? 12 : 14;
      columns = Math.floor(canvas.width / fontSize);
      drops = new Array(columns).fill(1);
      ctx.font = `${fontSize}px monospace`;
    };

    const draw = (timestamp: number) => {
      if (timestamp - lastTime >= interval) {
        lastTime = timestamp;

        ctx.fillStyle = 'rgba(5, 5, 5, 0.14)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < drops.length; i += 1) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;

          ctx.fillStyle = i % 9 === 0 ? 'rgba(120, 255, 200, 0.85)' : 'rgba(255, 255, 255, 0.55)';
          ctx.fillText(text, x, y);

          if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i] += 1;
        }
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    animationFrame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}

const projects = [
  {
    title: 'UFC Website',
    description: 'API odaklı içerik platformu. Veri toplama, backend servisleri ve modern frontend deneyimi.',
    image: 'https://i.imgur.com/aQd979y.png',
    tags: ['React', 'Node.js', 'MongoDB'],
    imageFit: 'cover' as const,
    link: 'https://ufc.aykuttakkus.com.tr/',
  },
  {
    title: 'Parking Space Counter',
    description: 'Görüntü işleme ile otopark doluluk analizi ve boş alan sayımı.',
    image: 'https://i.imgur.com/pyFxiKT.jpeg',
    tags: ['Python', 'OpenCV', 'Computer Vision'],
    imageFit: 'cover' as const,
    link: 'https://github.com/aykuttakkus/Parking-Space-Counter-Project',
  },
  {
    title: 'Drone Movement Chart',
    description: 'GPSsiz hareket takibi için görüntü işleme destekli analiz ve görselleştirme.',
    image: 'https://i.imgur.com/RvS9NNQ.png',
    tags: ['Python', 'OpenCV', 'Matplotlib'],
    imageFit: 'cover' as const,
  },
];

const games = [
  {
    title: 'Ball Launcher',
    description: 'Unity ile geliştirilen fizik tabanlı mini WebGL oyun demosu.',
    demoUrl: '/demos/slingshot/Ball Launcher/index.html',
    image: 'https://i.imgur.com/x3Qq5k2.png',
    tags: ['Unity', 'C#', 'WebGL'],
    aspectRatio: '16:10' as const,
  },
  {
    title: 'Polygon Racer',
    description: 'Low-poly stilinde sürüş deneyimi sunan WebGL yarış demosu.',
    demoUrl: '/demos/polygon-racer/Simple Driving/index.html',
    image: 'https://i.imgur.com/bwKwsZh.png',
    tags: ['Unity', 'C#', 'WebGL'],
    aspectRatio: '9:16' as const,
  },
  {
    title: 'HafizAI Game',
    description: 'Mobil oyun fikrini hızlı prototipe dönüştüren deneysel ürün çalışması.',
    demoUrl: '#',
    image: 'https://i.imgur.com/Uzq6a7x.png',
    tags: ['Flutter', 'Dart', 'AI Tools'],
    aspectRatio: '16:10' as const,
    imageFit: 'contain' as const,
  },
];

type PageKey = 'home' | 'projects' | 'games';
type GameAspectRatio = '16:10' | '9:16';

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameTitle: string;
  gameUrl: string;
  aspectRatio: GameAspectRatio;
}

function GameModal({ isOpen, onClose, gameTitle, gameUrl, aspectRatio }: GameModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isPortrait = aspectRatio === '9:16';

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
      <button
        type="button"
        aria-label="Kapat"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />
      <div
        className={`relative z-[71] w-full overflow-hidden rounded-2xl border border-white/15 bg-[#0a0a0a] shadow-2xl ${
          isPortrait ? 'max-w-[430px]' : 'max-w-5xl'
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-2">
            <Gamepad2 className="h-4 w-4 text-emerald-300" />
            <h3 className="text-sm font-medium text-white">{gameTitle}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/10 p-2 text-white/70 transition hover:bg-white/5 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {isPortrait ? (
          <div className="flex h-[85vh] max-h-[860px] items-center justify-center bg-black p-2">
            <iframe
              src={gameUrl}
              title={gameTitle}
              className="h-full border-0"
              style={{ aspectRatio: '9 / 16' }}
              allow="fullscreen"
            />
          </div>
        ) : (
          <div className="relative bg-black" style={{ paddingBottom: '62.5%' }}>
            <iframe
              src={gameUrl}
              title={gameTitle}
              className="absolute inset-0 h-full w-full border-0"
              allow="fullscreen"
            />
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  const [page, setPage] = useState<PageKey>('home');
  const [selectedGame, setSelectedGame] = useState<null | {
    title: string;
    demoUrl: string;
    aspectRatio: GameAspectRatio;
  }>(null);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/75 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <button
            type="button"
            onClick={() => setPage('home')}
            className="inline-flex items-center text-sm font-medium tracking-[0.08em] text-emerald-300/90 transition hover:text-emerald-200"
            aria-label="Ana sayfa"
          >
            <span className="font-mono">{'> levelup'}</span>
            <span className="terminal-cursor ml-0.5 font-mono text-white/90">_</span>
          </button>
          <div className="flex items-center gap-4 text-sm text-white/70">
            <a
              href="https://github.com/aykuttakkus"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition hover:text-white"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/aykuttakkus"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition hover:text-white"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
            <a
              href="https://www.instagram.com/aykuttakkus"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition hover:text-white"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
              <span className="hidden sm:inline">Instagram</span>
            </a>
          </div>
        </nav>
      </header>

      <main id="top">
        {page === 'home' && (
          <section className="relative overflow-hidden border-b border-white/10">
            <div className="absolute inset-0 opacity-55">
              <MatrixRainHero />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/70 to-[#050505]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(0,255,170,0.08),transparent_35%)]" />

            <div className="relative mx-auto flex min-h-[66vh] w-full max-w-6xl items-end px-4 pb-12 pt-16 sm:px-6 sm:pb-16">
              <div className="max-w-3xl">
                <p className="mb-5 text-xs font-medium tracking-[0.24em] text-emerald-300/90">
                  YAZILIM MÜHENDİSİ • OYUN GELİŞTİRİCİ
                </p>
                <h1 className="text-4xl font-semibold leading-tight text-white sm:text-6xl sm:leading-[1.02]">
                  Ben Aykut Kayra Akkus.
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/72 sm:text-lg">
                  Kendi projelerini geliştiren bir yazılım mühendisliği öğrencisiyim. Web uygulamaları, backend servisleri ve oyun prototipleri üzerinde sade, çalışır ve kullanıcı odaklı ürünler geliştiriyorum.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setPage('projects')}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white px-4 py-2 text-sm font-medium text-black transition duration-200 hover:-translate-y-0.5 hover:bg-white/90"
                  >
                    Projeleri İncele <ArrowUpRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPage('games')}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition duration-200 hover:-translate-y-0.5 hover:bg-white/8"
                  >
                    Oyunlar
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {page === 'projects' && (
          <section id="projects" className="border-b border-white/10">
            <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
              <div className="mb-10">
                <button
                  type="button"
                  onClick={() => setPage('home')}
                  className="inline-flex items-center text-sm text-emerald-300/85 transition hover:-translate-y-0.5 hover:text-emerald-200"
                  aria-label="Ana sayfaya dön"
                >
                  <span className="font-mono">{'< cd ..'}</span>
                  <span className="terminal-cursor ml-0.5 font-mono text-white/90">_</span>
                </button>
              </div>
              <div className="mb-8 flex items-end justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <h2 className="text-2xl font-semibold sm:text-4xl">Projeler</h2>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {projects.map((project) => {
                  const Wrapper = project.link ? 'a' : 'div';
                  const wrapperProps = project.link
                    ? {
                        href: project.link,
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        className:
                          'group block overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-black/60 transition hover:border-white/25 cursor-pointer',
                      }
                    : { className: 'group block overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-black/60 transition' };
                  return (
                    <Wrapper key={project.title} {...wrapperProps}>
                      <article className="h-full">
                        <div className="aspect-[16/10] overflow-hidden border-b border-white/10 bg-black">
                          <img
                            src={project.image}
                            alt={project.title}
                            className={`h-full w-full opacity-90 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-100 ${
                              (project as { imageFit?: 'cover' | 'contain' }).imageFit === 'contain'
                                ? 'object-contain p-2'
                                : 'object-cover object-top'
                            }`}
                          />
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold">{project.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-white/65">{project.description}</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-white/75"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </article>
                    </Wrapper>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {page === 'games' && (
          <section id="games" className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
            <div className="mb-10">
              <button
                type="button"
                onClick={() => setPage('home')}
                className="inline-flex items-center text-sm text-emerald-300/85 transition hover:-translate-y-0.5 hover:text-emerald-200"
                aria-label="Ana sayfaya dön"
              >
                <span className="font-mono">{'< cd ..'}</span>
                <span className="terminal-cursor ml-0.5 font-mono text-white/90">_</span>
              </button>
            </div>
            <div className="mb-8 border-b border-white/10 pb-5">
              <h2 className="text-2xl font-semibold sm:text-4xl">Oyunlar</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {games.map((game) => (
                <button
                  key={game.title}
                  type="button"
                  onClick={() =>
                    setSelectedGame({
                      title: game.title,
                      demoUrl: game.demoUrl,
                      aspectRatio: game.aspectRatio,
                    })
                  }
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] text-left transition hover:border-white/25 hover:bg-white/[0.035]"
                >
                  <div className="aspect-[16/10] relative overflow-hidden border-b border-white/10 bg-black">
                    <img
                      src={game.image}
                      alt={game.title}
                      className={`h-full w-full bg-black object-center transition duration-500 group-hover:scale-[1.02] group-hover:opacity-95 ${
                        game.aspectRatio === '9:16' || (game as { imageFit?: string }).imageFit === 'contain'
                          ? 'object-contain p-2'
                          : 'object-cover'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/50 backdrop-blur-sm">
                        <Play className="ml-0.5 h-6 w-6 text-white" fill="white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-white">
                        <Gamepad2 className="h-4 w-4 text-emerald-300" />
                        <h3 className="text-lg font-semibold">{game.title}</h3>
                      </div>
                      <ExternalLink className="h-4 w-4 shrink-0 text-white/45 transition group-hover:text-white" />
                    </div>
                    <p className="text-sm leading-6 text-white/65">{game.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {game.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-white/75"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer id="contact" className="border-t border-white/10 bg-black">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">İletişim</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/60">
              İş birliği, proje geliştirme veya ürün fikirleri için ulaşabilirsin.
            </p>
          </div>

          <div className="space-y-3 text-sm">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=aykutk.akkus@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-white/70 transition hover:text-white"
            >
              <Mail className="h-4 w-4 shrink-0" />
              <span>aykutk.akkus@gmail.com</span>
            </a>
            <a
              href="https://wa.me/905352788078"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-white/70 transition hover:text-white"
            >
              <Phone className="h-4 w-4 shrink-0" />
              <span>+90 535 278 80 78</span>
            </a>
            <div className="flex items-center gap-3 text-white/85">
              <MapPin className="h-4 w-4 text-white/55" />
              <span>Istanbul / Besiktas</span>
            </div>
          </div>
        </div>
      </footer>

      <GameModal
        isOpen={selectedGame !== null}
        onClose={() => setSelectedGame(null)}
        gameTitle={selectedGame?.title ?? ''}
        gameUrl={selectedGame?.demoUrl ?? ''}
        aspectRatio={selectedGame?.aspectRatio ?? '16:10'}
      />
    </div>
  );
}

export default App;
