import { Button } from './components/ui/Button';
import { Card } from './components/ui/Card';
import { GlobalMouseTrail } from './components/ui/GlobalMouseTrail';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { Link as LinkIcon, Mail, MapPin, GraduationCap, Calendar, Briefcase, Code, Database, LayoutTemplate, Settings, Terminal, Star, Globe, Moon, Sun, Download, FolderOpen, ExternalLink, Pause, Music } from 'lucide-react';
import enData from './data/en.json';
import arData from './data/ar.json';
import React, { useState, useEffect, useRef, Suspense, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { playPopSound, playPaperSound } from './utils/audio';

const DoodlePad = React.lazy(() => import('./components/ui/DoodlePad').then(m => ({ default: m.DoodlePad })));
const TodoList = React.lazy(() => import('./components/ui/TodoList').then(m => ({ default: m.TodoList })));
const GithubGraph = React.lazy(() => import('./components/ui/GithubGraph').then(m => ({ default: m.GithubGraph })));
const KonamiCode = React.lazy(() => import('./components/ui/KonamiCode').then(m => ({ default: m.KonamiCode })));
const FormalCV = React.lazy(() => import('./components/ui/FormalCV').then(m => ({ default: m.FormalCV })));

// Helper to render text with <strong> tags safely
const renderBoldText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
};

function ParallaxBackground({ isAr }: { isAr: boolean }) {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          if (ref1.current) ref1.current.style.transform = `translateY(${y * -0.2}px)`;
          if (ref2.current) ref2.current.style.transform = `translateY(${y * 0.1}px)`;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div
        ref={ref1}
        className={`fixed top-[20%] ${isAr ? 'left-10 md:left-32' : 'right-10 md:right-32'} pointer-events-none opacity-60 z-0`}
      >
        <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
          <path d="M50 10C27.9 10 10 27.9 10 50C10 72.1 27.9 90 50 90C72.1 90 90 72.1 90 50" stroke="var(--accent-red)" strokeWidth="4" strokeLinecap="round" strokeDasharray="10 10" />
        </svg>
      </div>

      <div
        ref={ref2}
        className={`fixed top-[60%] ${isAr ? 'right-10 md:right-20' : 'left-10 md:left-20'} pointer-events-none opacity-40 z-0`}
      >
        <Star size={48} className="text-pen" />
      </div>
    </>
  );
}

function App() {
  const [lang, setLang] = useState<'en' | 'ar'>(() => {
    const saved = localStorage.getItem('portfolio_lang');
    return (saved === 'ar' || saved === 'en') ? saved : 'en';
  });
  
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('portfolio_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  const [avatarClicks, setAvatarClicks] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    localStorage.setItem('portfolio_theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('portfolio_lang', lang);
  }, [lang]);

  const data = lang === 'en' ? enData : arData;
  const { hero, about, experience, projects, testimonials, skills, contact, doodle, footer, nav, todoList, githubGraph } = data;

  const toolIcons: Record<string, any> = {
    Terminal: <Terminal size={18} />,
    Code: <Code size={18} />,
    Mail: <Mail size={18} />,
    Database: <Database size={18} />
  };

  const isAr = lang === 'ar';

  const handleToggleTheme = useCallback(() => {
    playPaperSound();
    setIsDark(!isDark);
  }, [isDark]);

  const handleToggleLang = useCallback(() => {
    playPaperSound();
    setLang(lang === 'en' ? 'ar' : 'en');
  }, [lang]);

  const handleAvatarClick = useCallback(() => {
    playPopSound();
    const newCount = avatarClicks + 1;
    setAvatarClicks(newCount);
    if (newCount === 5) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setAvatarClicks(0); // reset
    }
  }, [avatarClicks]);

  const handleDownloadCV = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    playPopSound();
    
    // Modern approach: Use native browser print which supports Save to PDF natively.
    // This produces high-quality, text-selectable PDFs and natively supports all modern CSS (like oklch).
    window.print();
  }, []);

  const toggleAudio = useCallback(() => {
    playPopSound();
    if (!audioRef.current) {
      audioRef.current = new Audio('https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3'); // Free Lo-fi placeholder
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        alert(isAr ? 'عذراً، متصفحك بيمنع تشغيل الصوت تلقائياً!' : 'Audio autoplay blocked by browser.');
      });
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, isAr]);

  return (
    <>
      <div dir={isAr ? 'rtl' : 'ltr'} className={`min-h-screen overflow-x-hidden print:hidden ${isAr ? 'font-sans' : 'font-patrick'} text-pencil relative pt-12 pb-24 px-6 md:px-12`}>
        <GlobalMouseTrail />
        <ScrollProgress />
      <ParallaxBackground isAr={isAr} />

      {/* Invisible Easter Egg */}
      <Suspense fallback={null}>
        <KonamiCode />
      </Suspense>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-16 md:mb-24 gap-4">
          <div className="text-3xl font-kalam font-bold flex items-center gap-2 shrink-0">
            <span className="bg-pencil text-paper px-2 py-1 rounded-wobblyMd rotate-2">{hero.name}</span>
            <span>{hero.lastName}</span>
          </div>
          <div className="hidden lg:flex gap-6 text-xl">
            <a href="#about" onMouseEnter={playPopSound} className="hover:text-pen hover:underline decoration-wavy decoration-pen underline-offset-4">{nav.about}</a>
            <a href="#skills" onMouseEnter={playPopSound} className="hover:text-pen hover:underline decoration-wavy decoration-pen underline-offset-4">{nav.skills}</a>
            <a href="#experience" onMouseEnter={playPopSound} className="hover:text-pen hover:underline decoration-wavy decoration-pen underline-offset-4">{nav.experience}</a>
            <a href="#projects" onMouseEnter={playPopSound} className="hover:text-pen hover:underline decoration-wavy decoration-pen underline-offset-4">{nav.projects}</a>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleToggleTheme}
              className="flex items-center justify-center w-10 h-10 border-2 border-pencil rounded-wobbly bg-paper hover:bg-muted transition-colors shrink-0"
              title={isDark ? 'Light Mode' : 'Dark Mode'}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={handleToggleLang}
              className="flex items-center justify-center w-10 h-10 border-2 border-pencil rounded-wobbly bg-paper hover:bg-muted transition-colors shrink-0"
              title={lang === 'en' ? 'العربية' : 'English'}
            >
              <Globe size={20} />
            </button>
            <a href="#contact" className="hidden sm:block shrink-0">
              <Button variant="secondary" className="px-4 py-2 text-sm md:text-lg" onClick={playPopSound}>{nav.contact}</Button>
            </a>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="text-center md:text-start grid grid-cols-1 md:grid-cols-5 gap-12 items-center mb-24 md:mb-32">
          <div className="relative z-10 md:col-span-3">
            <h1 className="text-5xl md:text-7xl mb-4 leading-tight font-kalam font-bold">
              {isAr ? 'أهلاً بك 👋' : 'Hi there 👋'}<br />
              {isAr ? 'أنا ' : "I'm "} <span className="text-marker relative inline-block">
                {hero.name}
                <svg className={`absolute -bottom-2 ${isAr ? 'right-0' : 'left-0'} w-full`} height="10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 0, 50 5 T 100 5" stroke="var(--accent-red)" strokeWidth="3" fill="none" />
                </svg>
              </span>
            </h1>
            <h2 className={`text-2xl md:text-3xl ${isAr ? 'font-bold' : 'font-kalam'} text-pen mb-6`}>{hero.title}</h2>
            <p className={`text-xl md:text-2xl text-pencil/80 mb-10 leading-relaxed ${isAr ? 'text-2xl' : ''}`}>
              {renderBoldText(hero.description)}
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isAr ? 'md:justify-start' : 'md:justify-start'} relative`}>
              <a href="#contact">
                <Button className="flex items-center justify-center gap-2 w-full sm:w-auto" onClick={playPopSound}>
                  {nav.sayHello} <Mail size={20} />
                </Button>
              </a>
              <a href="#" onClick={handleDownloadCV}>
                <Button variant="secondary" className="flex items-center justify-center gap-2 w-full sm:w-auto text-pencil hover:text-white border-dashed border-[3px]">
                  {nav.downloadCv} <Download size={20} />
                </Button>
              </a>
              <div className="flex gap-4 justify-center items-center mt-4 sm:mt-0 ml-0 sm:ml-2">
                <a href={contact.github} target="_blank" rel="noreferrer" className="text-pencil hover:text-marker transition-colors">
                  <Code size={32} />
                </a>
                <a href={contact.linkedin} target="_blank" rel="noreferrer" className="text-pencil hover:text-pen transition-colors">
                  <LinkIcon size={32} />
                </a>
              </div>
            </div>
          </div>

          <div className="relative md:col-span-2 mt-8 md:mt-0 px-4 md:px-0 max-w-[280px] md:max-w-none mx-auto w-full group">
            <div className="absolute -inset-2 md:-inset-4 border-[3px] md:border-4 border-dashed border-pencil/30 rounded-wobbly z-0 rotate-3"></div>

            <div className="relative z-10 -rotate-2 bg-paper p-3 border-[3px] border-pencil rounded-wobblyMd shadow-hard hover:shadow-hard-lg hover:rotate-1 transition-all duration-300">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-gray-400/40 backdrop-blur-sm -rotate-3 z-20" />

              <img
                src={hero.image}
                alt={`${hero.name} ${hero.lastName}`}
                onClick={handleAvatarClick}
                className="w-full h-auto aspect-square object-cover rounded-wobbly border-2 border-pencil/20 bg-muted cursor-pointer transition-transform group-hover:scale-[1.02]"
                title="Click me 5 times! 🤫"
                loading="lazy"
                decoding="async"
              />

              <div className={`text-center mt-3 ${isAr ? 'font-bold text-xl' : 'font-kalam text-xl md:text-2xl'} text-pencil rotate-1`}>
                {nav.thatsMe}
              </div>
            </div>
          </div>
        </section>

        {/* Todo List Note */}
        {todoList && (
          <div className="flex justify-center mb-24 relative z-10">
            <Suspense fallback={<div className="h-40 animate-pulse bg-muted rounded-wobbly w-full max-w-md"></div>}>
              <TodoList tasks={todoList.tasks} title={todoList.title} />
            </Suspense>
          </div>
        )}

        {/* About Me */}
        <section id="about" className="mb-24 scroll-mt-24">
          <div className="flex items-center gap-4 mb-10">
            <h2 className={`text-4xl md:text-5xl ${isAr ? 'font-bold' : 'font-kalam'} inline-block border-b-4 border-pen border-dashed pb-2`}>
              {about.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card decoration="tape" className="-rotate-1">
              <ul className="space-y-4 text-xl">
                <li className="flex items-start gap-3">
                  <Calendar className="mt-1 text-marker shrink-0" size={24} />
                  <div>
                    <strong>{about.age}:</strong> {about.ageValue}<br />
                    <span className="text-sm text-pencil/70">({about.dob})</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-1 text-pen shrink-0" size={24} />
                  <div>
                    <strong>{about.location}:</strong> {about.locationValue}
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <GraduationCap className="mt-1 text-marker shrink-0" size={24} />
                  <div>
                    <strong>{about.education}:</strong> {about.educationValue}
                  </div>
                </li>
              </ul>
            </Card>

            <Card decoration="tack" variant="default" className="rotate-1">
              <h3 className={`text-2xl ${isAr ? 'font-bold' : 'font-kalam'} mb-4`}>{about.moreTitle}</h3>
              <ul className="space-y-3 text-lg leading-relaxed list-disc list-inside marker:text-pen">
                {about.more.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </Card>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-24 scroll-mt-24">
          <div className="flex items-center gap-4 mb-10">
            <h2 className={`text-4xl md:text-5xl ${isAr ? 'font-bold' : 'font-kalam'} inline-block border-b-4 border-marker border-dashed pb-2`}>
              {projects.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.items.map((project, idx) => (
              <Card key={idx} decoration={idx % 2 === 0 ? 'tape' : 'tack'} className={idx % 2 === 0 ? 'rotate-1' : '-rotate-1'} variant={idx === 1 ? 'postit' : 'default'}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 border-2 border-pencil rounded-wobbly bg-paper text-pencil">
                    <FolderOpen size={24} className="text-pen" />
                  </div>
                  <h3 className={`text-2xl ${isAr ? 'font-bold' : 'font-kalam'}`}>{project.title}</h3>
                </div>
                <p className="text-lg mb-6 text-pencil/80">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-sm px-2 py-1 border-2 border-pencil rounded-wobbly bg-paper text-pencil">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a href={contact.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-pencil hover:text-marker font-bold underline decoration-wavy underline-offset-4">
                    <Code size={18} /> {projects.viewCode}
                  </a>
                  <a href="#" className="flex items-center gap-1 text-pencil hover:text-pen font-bold underline decoration-wavy underline-offset-4">
                    <ExternalLink size={18} /> {projects.viewLive}
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="mb-24 scroll-mt-24">
          <div className="flex items-center gap-4 mb-10">
            <h2 className={`text-4xl md:text-5xl ${isAr ? 'font-bold' : 'font-kalam'} inline-block border-b-4 border-pen border-dashed pb-2`}>
              {experience.title}
            </h2>
          </div>

          <div className={`relative ${isAr ? 'border-r-[3px] mr-4 md:mr-8 pr-8 md:pr-12' : 'border-l-[3px] ml-4 md:ml-8 pl-8 md:pl-12'} border-dashed border-pencil space-y-12`}>

            {experience.jobs.map((job, idx) => (
              <div key={idx} className="relative w-full max-w-full">
                <div className={`absolute ${isAr ? '-right-[45px] md:-right-[61px]' : '-left-[45px] md:-left-[61px]'} top-4 w-6 h-6 bg-marker border-2 border-pencil rounded-full z-10`}></div>

                <Card variant="postit" decoration="tape" className={idx % 2 === 0 ? "-rotate-1" : "rotate-1"}>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                    <h3 className={`text-2xl md:text-3xl ${isAr ? 'font-bold' : 'font-kalam'} flex items-center gap-2`}>
                      <Briefcase size={24} className="text-pencil shrink-0" /> {job.title}
                    </h3>
                    <span className="text-xl border-2 border-pencil rounded-wobbly px-3 py-1 bg-paper text-pencil inline-block mt-2 md:mt-0 w-fit">{job.duration}</span>
                  </div>
                  <p className="text-xl mb-3 font-bold">{job.subtitle}</p>
                  <ul className="space-y-2 text-lg list-disc list-inside marker:text-marker">
                    {job.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>{renderBoldText(bullet)}</li>
                    ))}
                  </ul>
                </Card>
              </div>
            ))}

          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="mb-24 scroll-mt-24">
          <div className="text-center mb-12">
            <h2 className={`text-4xl md:text-5xl ${isAr ? 'font-bold' : 'font-kalam'} inline-block relative`}>
              {skills.title}
              <div className={`absolute ${isAr ? '-left-12' : '-right-12'} -top-8 text-pen rotate-12`}>
                <Star size={32} />
              </div>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Backend Skills */}
            <Card decoration="tack" className="-rotate-1">
              <div className="flex items-center gap-3 mb-6 border-b-[3px] border-pencil pb-3">
                <Database size={32} className="text-pen shrink-0" />
                <h3 className={`text-3xl ${isAr ? 'font-bold' : 'font-kalam'}`}>{skills.backend}</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xl font-bold bg-muted text-pencil inline-block px-2 rounded-wobbly mb-2">{skills.laravelTitle}</h4>
                  <ul className="list-disc list-inside text-lg marker:text-pen">
                    {skills.laravel.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-bold bg-postit text-postit-text inline-block px-2 rounded-wobbly mb-2">{skills.mysqlTitle}</h4>
                  <ul className="list-disc list-inside text-lg marker:text-marker">
                    {skills.mysql.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            {/* Frontend Skills */}
            <Card decoration="tape" className="rotate-1">
              <div className="flex items-center gap-3 mb-6 border-b-[3px] border-pencil pb-3">
                <LayoutTemplate size={32} className="text-marker shrink-0" />
                <h3 className={`text-3xl ${isAr ? 'font-bold' : 'font-kalam'}`}>{skills.frontend}</h3>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {skills.technologies.map(skill => (
                  <span key={skill} className="text-lg px-3 py-1 border-2 border-pencil rounded-wobbly bg-paper text-pencil cursor-help relative group transition-transform hover:scale-110 hover:z-50 hover:bg-emerald-100 dark:hover:bg-emerald-900">
                    {skill}
                    {/* Tiny Sticky Note */}
                    <div className="absolute left-1/2 bottom-full -translate-x-1/2 mb-2 w-max max-w-[150px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                      <div className={`bg-postit dark:bg-amber-800 text-black dark:text-white border-2 border-pencil text-pencil px-2 py-1 text-sm font-kalam rounded-sm shadow-hard transform ${Math.random() > 0.5 ? 'rotate-2' : '-rotate-2'}`}>
                        {isAr ? `جامد جداً في الـ ${skill} 🤩` : `${skill} master! 🤩`}
                      </div>
                    </div>
                  </span>
                ))}
              </div>

              <ul className="list-disc list-inside text-lg space-y-2 marker:text-pen">
                {skills.frontendBullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </Card>

            {/* Tools */}
            <Card variant="postit" className="md:col-span-2 shadow-hard-lg">
              <div className="flex items-center gap-3 mb-6">
                <Settings size={28} className="shrink-0" />
                <h3 className={`text-2xl ${isAr ? 'font-bold' : 'font-kalam'}`}>{skills.tools}</h3>
              </div>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {skills.toolsList.map(tool => (
                  <div key={tool.name} className="flex items-center gap-2 text-xl px-4 py-2 border-2 border-pencil bg-paper text-pencil rounded-wobblyMd hover:-translate-y-1 hover:shadow-hard transition-all">
                    {toolIcons[tool.iconType]} <span dir="ltr">{tool.name}</span>
                  </div>
                ))}
              </div>
            </Card>

          </div>
        </section>

        {/* GitHub Graph */}
        {githubGraph && (
          <section className="mb-24 scroll-mt-24">
            <Suspense fallback={<div className="h-64 animate-pulse bg-muted rounded-wobbly w-full"></div>}>
              <GithubGraph title={githubGraph.title} />
            </Suspense>
          </section>
        )}

        {/* Testimonials */}
        {testimonials && (
          <section className="mb-24">
            <div className="text-center mb-12">
              <h2 className={`text-4xl md:text-5xl ${isAr ? 'font-bold' : 'font-kalam'} inline-block border-b-4 border-pen border-dashed pb-2`}>
                {testimonials.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.items.map((item, idx) => (
                <Card
                  key={idx}
                  variant="postit"
                  decoration="tack"
                  className={`${idx === 0 ? '-rotate-3' : idx === 1 ? 'rotate-2' : '-rotate-1'} transform hover:scale-105 transition-transform`}
                >
                  <p className={`text-xl mb-4 ${isAr ? '' : 'font-kalam'} opacity-90`}>"{item.text}"</p>
                  <div className="border-t-2 border-pencil/30 pt-4 mt-auto">
                    <strong className="block text-xl">{item.name}</strong>
                    <span className="text-sm opacity-70">{item.role}</span>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Doodle Pad Easter Egg */}
        <section className="mb-24">
          <Suspense fallback={<div className="h-64 animate-pulse bg-muted rounded-wobbly w-full"></div>}>
            <DoodlePad title={doodle.title} subtitle={doodle.subtitle} clearText={doodle.clear} />
          </Suspense>
        </section>

        {/* Contact Section */}
        <section id="contact" className="max-w-4xl mx-auto mb-12">
          <Card className="p-8 md:p-12 bg-muted rounded-wobbly">
            <div className="text-center mb-10">
              <h2 className={`text-4xl md:text-5xl ${isAr ? 'font-bold' : 'font-kalam'} mb-4`}>{contact.title}</h2>
              <p className="text-xl">{contact.subtitle}</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <a href={`mailto:${contact.email}`} className="w-full md:w-auto" onClick={playPopSound}>
                <Button variant="secondary" className="w-full flex items-center justify-center gap-3 px-8">
                  <Mail size={20} /> {contact.emailText}
                </Button>
              </a>
              <a href={contact.github} target="_blank" rel="noreferrer" className="w-full md:w-auto" onClick={playPopSound}>
                <Button variant="secondary" className="w-full flex items-center justify-center gap-3 bg-paper px-8">
                  <Code size={20} /> {contact.githubText}
                </Button>
              </a>
              <a href={contact.linkedin} target="_blank" rel="noreferrer" className="w-full md:w-auto" onClick={playPopSound}>
                <Button variant="secondary" className="w-full flex items-center justify-center gap-3 bg-paper px-8">
                  <LinkIcon size={20} /> {contact.linkedinText}
                </Button>
              </a>
            </div>
          </Card>
        </section>

        {/* Footer */}
        <footer className="text-center text-lg text-pencil/60 pb-8 border-t-[3px] border-dashed border-pencil/20 pt-8 mt-12">
          <p>{footer.text}</p>
          <p className="mt-2">© {new Date().getFullYear()} {hero.name} {hero.lastName}. {footer.rights}</p>
        </footer>

      </div>

      {/* Floating Lo-Fi Music Player */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleAudio}
          className={`flex items-center gap-3 px-4 py-3 border-4 border-pencil bg-paper shadow-hard rounded-wobbly hover:shadow-hard-lg hover:-translate-y-1 transition-all ${isPlaying ? 'animate-pulse border-pen' : ''}`}
          title="Vibe Coding Music"
        >
          {isPlaying ? (
            <>
              <Pause className="text-pen" />
              <span className={`font-bold text-pen hidden sm:inline ${isAr ? '' : 'font-kalam'}`}>{isAr ? 'بنروّق...' : 'Vibing...'}</span>
            </>
          ) : (
            <>
              <Music className="text-pencil" />
              <span className={`font-bold hidden sm:inline ${isAr ? '' : 'font-kalam'}`}>{isAr ? 'شغّل مزيكا' : 'Start the Vibe'}</span>
            </>
          )}
        </button>
      </div>

      {/* Folded Corner (Scroll to Top) */}
      <div
        onClick={() => { playPaperSound(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className={`fixed bottom-0 left-0 w-16 h-16 md:w-20 md:h-20 cursor-pointer group z-50 overflow-hidden flex items-end justify-start`}
        title={isAr ? "ارجع لفوق" : "Scroll to Top"}
      >
        <svg
          viewBox="0 0 100 100"
          className={`w-full h-full drop-shadow-lg transition-transform duration-300 group-hover:scale-110 origin-bottom-left`}
        >
          <g>
            {/* Bottom-Left Fold */}
            <polygon points="0,0 0,100 100,100" className="fill-pencil dark:fill-pencil" />
            <polygon points="0,0 100,0 100,100" className="fill-paper" />
            <polyline points="0,0 100,0 100,100" className="stroke-pencil fill-none" strokeWidth="4" strokeLinejoin="round" />
          </g>
        </svg>
      </div>
    </div>

    <div id="formal-cv" className="hidden print:block absolute top-0 left-0 w-full bg-white z-[9999] m-0 p-0 text-black">
      <Suspense fallback={null}>
        <FormalCV data={data} isAr={isAr} />
      </Suspense>
    </div>
  </>
  );
}

export default App;
