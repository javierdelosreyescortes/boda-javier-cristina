import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, Calendar, MapPin, Volume2, VolumeX, 
  Utensils, Copy, Check, X, UserCheck, Gift,
  Printer, Sparkles, Music, Disc, ExternalLink, PlusCircle,
  Hotel, Bus, Car, ChevronDown, Info
} from 'lucide-react';

const REAL_PHOTOS = {
  "2018": "/2018.jpg",
  "2019": "/2019.jpg",
  "2020": "/2020.jpg",
  "2021": "/2021.jpg",
  "2022_1": "/2022.jpg",
  "2022_2": "/2022-1.jpg",
  "2023": "/2023.jpg",
  "2024": "/2024.jpg",
  "2025": "/2025.jpg",
  "2026": "/2026.jpg"
};

function RevealOnScroll({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal-on-scroll ${isVisible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState(0); 
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState(null);
  
  const audioRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState({ días: 0, horas: 0, minutos: 0, segundos: 0 });

  useEffect(() => {
    const targetDate = new Date('2027-04-24T12:00:00');
    const updateCountdown = () => {
      const difference = +targetDate - +new Date();
      if (difference > 0) {
        setTimeLeft({
          días: Math.floor(difference / (1000 * 60 * 60 * 24)),
          horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutos: Math.floor((difference / 1000 / 60) % 60),
          segundos: Math.floor((difference / 1000) % 60)
        });
      }
    };
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  // APERTURA MULTIETAPA DEL SOBRE
  const handleOpenEnvelope = () => {
    if (step !== 0) return;
    
    setStep(1);

    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.log("Audio autoplay prevenido:", err));
    }

    setTimeout(() => {
      setStep(1.5);
    }, 600);

    setTimeout(() => {
      setStep(2);
    }, 1500);
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const timelineEvents = [
    { time: "17:30", title: "RECEPCIÓN DE INVITADOS", iconImg: "/iconos/anillos.png" },
    { time: "18:00", title: "CEREMONIA", iconImg: "/iconos/ceremonia.png" },
    { time: "19:00", title: "CÓCTEL DE BIENVENIDA", iconImg: "/iconos/coctel.png" },
    { time: "21:00", title: "BANQUETE", iconImg: "/iconos/banquete.png" },
    { time: "23:30", title: "BARRA LIBRE", iconImg: "/iconos/fiesta.png" }
  ];

  const storyTimeline = [
    { year: "2018", title: "Donde todo empezó", desc: "Nuestros primeros momentos juntos compartiendo sonrisas e ilusiones.", img: REAL_PHOTOS["2018"], rotate: "-rotate-2" },
    { year: "2019", title: "Risas compartidas", desc: "Inseparables desde las pequeñas escapadas nocturnas hasta las grandes aventuras.", img: REAL_PHOTOS["2019"], rotate: "rotate-2" },
    { year: "2020", title: "Sueños en París", desc: "Construyendo recuerdos románticos y fortaleciendo nuestra complicidad.", img: REAL_PHOTOS["2020"], rotate: "-rotate-2" },
    { year: "2021", title: "Primavera & Amor", desc: "Cada primavera a tu lado florece de una forma mágica y especial.", img: REAL_PHOTOS["2021"], rotate: "rotate-2" },
    { year: "2022", title: "Viajes e Historias", desc: "Explorando la arquitectura de ciudades históricas y disfrutando de fiestas inolvidables.", img: REAL_PHOTOS["2022_1"], rotate: "-rotate-2" },
    { year: "2023", title: "Celebrando la vida", desc: "Cenas elegantes, brindis y momentos que guardamos para siempre.", img: REAL_PHOTOS["2023"], rotate: "rotate-2" },
    { year: "2024", title: "Tardes al sol", desc: "Disfrutando de la compañía mutua entre cañas, terrazas y buenos amigos.", img: REAL_PHOTOS["2024"], rotate: "-rotate-2" },
    { year: "2025", title: "¡El Gran SÍ!", desc: "La promesa de un camino juntos para toda la vida.", img: REAL_PHOTOS["2025"], rotate: "rotate-2" },
    { year: "2026", title: "Rumbo a la boda", desc: "Preparando con ilusión el día más bonito de nuestras vidas.", img: REAL_PHOTOS["2026"], rotate: "-rotate-2" }
  ];

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    "Boda Javier & Cristina"
  )}&dates=20270424T120000/20270424T235900&details=${encodeURIComponent(
    "¡Nos casamos! Nos encantaría que nos acompañaras en el día más importante de nuestras vidas. Lugar: Finca Un Agua."
  )}&location=${encodeURIComponent("Finca Un Agua")}`;

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#4A4543] font-serif antialiased selection:bg-[#B64A4A]/20 overflow-x-hidden">
      <audio ref={audioRef} src="/musica.mp3" loop />

      {/* FILTROS DE TEXTURA PARA EL SOBRE */}
      <svg className="hidden">
        <defs>
          <filter id="paperTexture" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.15 0" in="noise" result="coloredNoise" />
            <feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="compositeNoise" />
            <feBlend mode="multiply" in="SourceGraphic" in2="compositeNoise" />
          </filter>
        </defs>
      </svg>

      {/* PANTALLA INICIAL DEL SOBRE */}
      {step < 2 && (
        <div 
          className={`fixed inset-0 z-50 w-full h-full bg-[#2A090C] overflow-hidden flex items-center justify-center transition-opacity duration-700 ${
            step === 1.5 ? 'opacity-90' : step === 2 ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="relative w-full h-full max-w-xl sm:max-w-2xl max-h-[100vh] flex items-center justify-center [perspective:1200px]">
            
            <div className="absolute inset-0 bg-[#1F0507] [filter:url(#paperTexture)]" />

            {/* TARJETA INTERIOR */}
            <div 
              className={`absolute inset-x-5 sm:inset-x-10 top-12 bottom-12 bg-[#FFFDF9] rounded-xl shadow-inner p-6 sm:p-10 text-center border border-[#D1C3B3] flex flex-col justify-between z-10 transition-all duration-700 ${
                step >= 1.5 ? 'animate-card-slide-up shadow-2xl z-35' : ''
              }`}
            >
              <div className="space-y-3 mt-4">
                <span className="text-[#6B2028] font-serif text-xs uppercase tracking-[0.3em] font-bold block">
                  NUESTRA BODA
                </span>
                <h2 className="text-4xl sm:text-6xl font-autography text-[#6B2028]">
                  Javier & Cristina
                </h2>

                <div className="w-32 sm:w-44 mx-auto my-1">
                  <img 
                    src="/iconopersonas.png" 
                    alt="Javier y Cristina" 
                    className="w-full h-auto object-contain drop-shadow-sm" 
                  />
                </div>

                <div className="w-12 h-0.5 bg-[#B64A4A] mx-auto my-2" />
                <p className="text-xs sm:text-sm font-serif uppercase tracking-widest text-[#788E75] font-semibold">
                  24 DE ABRIL DE 2027
                </p>
                <p className="text-xs font-sans italic text-[#8C827A]">
                  Finca Un Agua
                </p>
              </div>

              <div className="mb-4">
                <p className="text-xs font-serif text-[#6B6461] italic max-w-sm mx-auto">
                  "Nos encantaría que nos acompañaras en el día más importante de nuestras vidas."
                </p>
              </div>
            </div>

            {/* SOLAPAS DEL SOBRE */}
            <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none [filter:url(#paperTexture)]" preserveAspectRatio="none" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="leftFlapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#5B181E" />
                  <stop offset="100%" stopColor="#3E0F14" />
                </linearGradient>
                <linearGradient id="rightFlapGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#5B181E" />
                  <stop offset="100%" stopColor="#3E0F14" />
                </linearGradient>
                <linearGradient id="bottomFlapGrad" x1="50%" y1="100%" x2="50%" y2="0%">
                  <stop offset="0%" stopColor="#681C23" />
                  <stop offset="100%" stopColor="#411015" />
                </linearGradient>
                <filter id="bottomShadow" x="-10%" y="-10%" width="130%" height="130%">
                  <feDropShadow dx="0" dy="-3" stdDeviation="4" floodColor="#000" floodOpacity="0.6"/>
                </filter>
              </defs>

              <polygon points="0,0 0,100 50,52" fill="url(#leftFlapGrad)" />
              <polygon points="100,0 100,100 50,52" fill="url(#rightFlapGrad)" />
              <polygon points="0,100 100,100 50,50" fill="url(#bottomFlapGrad)" filter="url(#bottomShadow)" />
            </svg>

            <div 
              className={`absolute top-0 left-0 right-0 h-full origin-top transition-transform duration-700 ease-in-out ${
                step >= 1 ? '[transform:rotateX(180deg)] z-0' : 'z-30'
              }`}
            >
              <svg className="w-full h-full filter drop-shadow-2xl [filter:url(#paperTexture)]" preserveAspectRatio="none" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="topFlapGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#78242D" />
                    <stop offset="100%" stopColor="#4A1217" />
                  </linearGradient>
                </defs>

                <polygon 
                  points="0,0 100,0 50,58" 
                  fill={step >= 1 ? "#1F0507" : "url(#topFlapGrad)"} 
                />
              </svg>
            </div>

            {/* SELLO DE LACRE */}
            <div 
              onClick={handleOpenEnvelope}
              className={`absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex flex-col items-center cursor-pointer group transition-all duration-500 ${
                step >= 1 ? 'scale-0 opacity-0 pointer-events-none' : 'hover:scale-110 active:scale-95'
              }`}
            >
              <div className="relative w-22 h-22 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#8B6E32] via-[#E8C87A] to-[#A08038] shadow-[0_15px_30px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(255,255,255,0.6)] border-2 border-[#FFEBB3]/60 flex items-center justify-center transform group-hover:rotate-6 transition-transform">
                <div className="absolute inset-1.5 rounded-full border border-amber-950/40 bg-[#C09F4E]/40 backdrop-blur-[1px] flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-amber-900/50 flex flex-col items-center justify-center bg-gradient-to-br from-[#D8B660] to-[#927330] shadow-inner">
                    <span className="font-serif font-extrabold text-amber-950 text-base sm:text-xl tracking-tighter drop-shadow-sm">J | C</span>
                    <span className="text-[8px] font-sans text-amber-950/80 uppercase tracking-widest font-bold mt-0.5">24.04</span>
                  </div>
                </div>
                <div className="absolute top-2 left-4 w-6 h-3 bg-white/30 rounded-full blur-[2px] transform -rotate-45" />
              </div>

              <div className="mt-5 bg-black/30 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 whitespace-nowrap shadow-xl">
                <p className="text-xs font-serif uppercase tracking-[0.25em] text-[#FFE8A3] font-bold animate-pulse">
                  Toca el sello para abrir
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* CONTENIDO PRINCIPAL DE LA BODA */}
      <div className={`transition-all duration-1000 ${step === 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <button 
          onClick={toggleAudio} 
          className="fixed bottom-6 right-6 z-50 bg-[#7998B5] text-white p-3.5 rounded-full shadow-xl hover:bg-[#63809C] transition-all flex items-center gap-2"
          title={isPlaying ? "Pausar música" : "Reproducir música"}
        >
          {isPlaying ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5" />}
        </button>

        {/* HEADER */}
        <header className="relative min-h-screen flex flex-col justify-center items-center text-center p-4 sm:p-6 bg-gradient-to-b from-[#E8A3B0]/20 via-[#F9F7F5] to-[#788E75]/10">
          <RevealOnScroll delay={100}>
            <p className="text-[#B64A4A] font-sans tracking-widest uppercase text-xs sm:text-sm font-semibold">¡Nos Casamos!</p>
          </RevealOnScroll>
          
          <RevealOnScroll delay={250}>
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-autography text-[#6B2028] mt-3 mb-1 leading-tight tracking-tight px-2">
              Javier <span className="font-sans text-3xl sm:text-4xl text-[#E28351]">&</span> Cristina
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={320}>
            <div className="w-64 sm:w-94 md:w-94 mx-auto my-2">
              <img 
                src="/iconopersonas.png" 
                alt="Ilustración Javier y Cristina" 
                className="w-full h-auto object-contain drop-shadow-md hover:scale-105 transition-transform duration-500" 
              />
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={400}>
            <p className="text-lg sm:text-xl text-[#6B6461] font-light italic max-w-lg px-2 mt-2">"Compartir este día con vosotros lo hace mágico."</p>
          </RevealOnScroll>
          
          <RevealOnScroll delay={550}>
            <div className="pt-6 flex flex-col sm:flex-row gap-4 font-sans text-[#4A4543] items-center justify-center">
              <div className="flex items-center justify-center gap-2 bg-white px-5 py-2.5 rounded-full border border-[#D1C3B3] shadow-sm">
                <Calendar className="w-5 h-5 text-[#B64A4A]" />
                <span>24 de Abril de 2027</span>
              </div>
              
              <div className="flex items-center justify-center gap-2 bg-white px-5 py-2.5 rounded-full border border-[#D1C3B3] shadow-sm">
                <MapPin className="w-5 h-5 text-[#7998B5]" />
                <span>Finca Un Agua</span>
              </div>

              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#6B2028] hover:bg-[#52171D] text-[#FFFDF9] px-5 py-2.5 rounded-full border border-[#6B2028] shadow-sm transition-all text-sm font-semibold group"
              >
                <Calendar className="w-4 h-4 text-[#FFE8A3] group-hover:scale-110 transition-transform" />
                <span>Añadir a Google Calendar</span>
              </a>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={700}>
            <div className="pt-8 flex items-center justify-center gap-3 sm:gap-6 font-sans max-w-lg mx-auto px-2">
              {Object.entries(timeLeft).map(([unit, value], idx) => (
                <React.Fragment key={unit}>
                  <div className="flex flex-col items-center justify-center group">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/70 backdrop-blur-md border border-[#B64A4A]/25 shadow-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:border-[#B64A4A]">
                      <span className="text-2xl sm:text-3xl font-serif font-bold text-[#6B2028] tracking-tight">
                        {String(value).padStart(2, '0')}
                      </span>
                    </div>
                    <span className="mt-2 text-[10px] sm:text-xs font-serif uppercase tracking-[0.2em] text-[#788E75] font-semibold">
                      {unit}
                    </span>
                  </div>

                  {idx < 3 && (
                    <span className="text-[#B64A4A]/40 text-xl font-serif font-light -mt-6">
                      :
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </RevealOnScroll>
        </header>

        {/* ITINERARIO */}
        <section className="py-20 px-4 sm:px-6 max-w-2xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <Sparkles className="w-6 h-6 text-[#E28351] mx-auto mb-2 opacity-80" />
              <span className="text-[#B64A4A] font-sans text-xs uppercase tracking-[0.25em] font-semibold block mb-2">EL PROGRAMA</span>
              <h2 className="text-5xl sm:text-6xl font-autography text-[#2E2B2A] py-1">El gran día...</h2>
              <div className="w-16 h-0.5 bg-[#E8A3B0] mx-auto mt-4"></div>
            </div>
          </RevealOnScroll>

          <div className="relative py-4">
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#788E75] -translate-x-1/2" />

            <div className="space-y-12 sm:space-y-16">
              {timelineEvents.map((item, idx) => {
                const isRight = idx % 2 === 0;
                return (
                  <RevealOnScroll key={idx} delay={idx * 120}>
                    <div className="relative flex items-center justify-center w-full min-h-[70px]">
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-[2px] bg-[#788E75] z-0" />

                      <div className={`w-1/2 pr-6 sm:pr-8 text-right flex items-center justify-end gap-3 sm:gap-4 ${!isRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        {!isRight && (
                          <>
                            <div className="font-serif text-[#5C7059]">
                              <span className="block text-base sm:text-lg font-bold tracking-wider">{item.time}</span>
                              <span className="block text-sm sm:text-base font-semibold uppercase tracking-wider leading-tight mt-0.5">{item.title}</span>
                            </div>
                            <img src={item.iconImg} alt={item.title} className="w-9 h-9 sm:w-11 sm:h-11 object-contain shrink-0 opacity-90" />
                          </>
                        )}
                      </div>

                      <div className={`w-1/2 pl-6 sm:pl-8 text-left flex items-center justify-start gap-3 sm:gap-4 ${isRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        {isRight && (
                          <>
                            <img src={item.iconImg} alt={item.title} className="w-9 h-9 sm:w-11 sm:h-11 object-contain shrink-0 opacity-90" />
                            <div className="font-serif text-[#5C7059]">
                              <span className="block text-base sm:text-lg font-bold tracking-wider">{item.time}</span>
                              <span className="block text-sm sm:text-base font-semibold uppercase tracking-wider leading-tight mt-0.5">{item.title}</span>
                            </div>
                          </>
                        )}
                      </div>

                    </div>
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>
        </section>

        {/* NUESTRA HISTORIA ESTILO POLAROID (EN PARALELO 2 A 2) */}
        <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-16 space-y-2">
              <h2 className="text-5xl sm:text-6xl font-autography text-[#8B3A44] py-1">Nuestra historia</h2>
              <p className="text-[#6B6461] font-sans text-sm sm:text-base font-light">
                Un recorrido por los años que nos han traído hasta aquí
              </p>
            </div>
          </RevealOnScroll>

          {/* GRID PARALELO DE 2 COLUMNAS EN PANTALLAS SM/MD EN ADELANTE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-start">
            {storyTimeline.map((item, index) => (
              <RevealOnScroll key={index} delay={(index % 2) * 150}>
                <div className="flex flex-col items-center text-center">
                  
                  <div 
                    onClick={() => setSelectedImage(item)}
                    className={`group cursor-pointer bg-white p-3.5 sm:p-4 pt-3.5 pb-5 shadow-xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all duration-500 transform ${item.rotate} hover:rotate-0 hover:scale-105 rounded-xs w-full max-w-xs border border-stone-200/60`}
                  >
                    <div className="aspect-[3/4] w-full overflow-hidden bg-stone-100 rounded-2xs">
                      <img 
                        src={item.img} 
                        alt={item.title} 
                        className="w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-700 ease-out" 
                      />
                    </div>
                  </div>

                  <div className="mt-4 space-y-1">
                    <span className="text-3xl sm:text-4xl font-autography text-[#8B3A44] block">
                      {item.year}
                    </span>
                    <p className="text-xs sm:text-sm font-sans italic text-[#6B6461] max-w-xs mx-auto">
                      {item.desc}
                    </p>
                  </div>

                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        {/* MODAL DE IMAGEN COMPLETA */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4" onClick={() => setSelectedImage(null)}>
            <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => setSelectedImage(null)} 
                className="absolute -top-12 right-2 text-white bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors z-50"
              >
                <X className="w-6 h-6" />
              </button>
              
              <img 
                src={selectedImage.img} 
                alt={selectedImage.title} 
                className="w-auto h-auto max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl border border-white/10" 
              />
              <div className="mt-4 text-center text-white font-sans">
                <p className="text-sm font-semibold">{selectedImage.year} — {selectedImage.title}</p>
                <p className="text-xs text-stone-300 mt-1">{selectedImage.desc}</p>
              </div>
            </div>
          </div>
        )}

        {/* MENÚ */}
        <section className="py-20 px-4 max-w-4xl mx-auto text-center">
          <RevealOnScroll>
            <Utensils className="w-8 h-8 text-[#9e4a47] mx-auto mb-3" />
            <h2 className="text-5xl sm:text-6xl font-autography text-[#2E2B2A] py-1">Menú del Banquete</h2>
            <div className="w-16 h-0.5 bg-[#E28351] mx-auto mt-4 mb-12"></div>
          </RevealOnScroll>

          <RevealOnScroll delay={150}>
            <div className="relative bg-radial from-[#f4edd6] via-[#eae5dc] to-[#d8d0c4] p-4 sm:p-10 rounded-3xl sm:rounded-full shadow-2xl flex justify-center items-center max-w-2xl mx-auto border border-stone-300">
              <div 
                className="relative w-full max-w-[440px] min-h-[620px] bg-cover bg-center bg-no-repeat p-6 sm:p-10 shadow-2xl rounded-sm flex flex-col justify-between text-center border border-amber-950/10"
                style={{ backgroundImage: "url('/FondoMinuta.png')", backgroundColor: "#FFFDF9" }}
              >
                <div>
                  <h3 className="font-autography text-6xl sm:text-7xl text-[#9e4a47] font-normal mb-6">Menú</h3>
                </div>

                <div className="space-y-5 font-serif text-[#3a3532]">
                  <div>
                    <h4 className="font-sans text-[10px] sm:text-[11px] tracking-[3px] uppercase text-[#3a3532] font-semibold mb-1">SORBETE</h4>
                    <p className="text-base font-semibold text-[#3a3532]">Sorbete de Mandarina</p>
                  </div>

                  <div>
                    <h4 className="font-sans text-[10px] sm:text-[11px] tracking-[3px] uppercase text-[#3a3532] font-semibold mb-1">PLATO PRINCIPAL</h4>
                    <p className="text-base font-semibold text-[#3a3532]">Carrillada ibérica</p>
                    <p className="text-xs italic text-[#635d58] mb-2">Con puré de manzana y salsa de ciruela al vino</p>
                    <p className="text-base font-semibold text-[#3a3532]">Cordero lechal asado</p>
                    <p className="text-xs italic text-[#635d58]">Con patatas panaderas</p>
                  </div>

                  <div>
                    <h4 className="font-sans text-[10px] sm:text-[11px] tracking-[3px] uppercase text-[#3a3532] font-semibold mb-1">POSTRE</h4>
                    <p className="text-base font-semibold text-[#3a3532]">Torrija de pan brioche</p>
                    <p className="text-xs italic text-[#635d58] mb-2">Con crema y bola de helado</p>
                    <p className="text-base font-semibold text-[#3a3532]">Tarta de queso manchego cremosa</p>
                  </div>

                  <div>
                    <h4 className="font-sans text-[10px] sm:text-[11px] tracking-[3px] uppercase text-[#3a3532] font-semibold mb-1">BODEGA</h4>
                    <p className="text-sm font-semibold text-[#3a3532]">Vino Tinto Rioja Cune Crianza</p>
                    <p className="text-sm font-semibold text-[#3a3532] mt-0.5">Vino Blanco Cune Rioja Semidulce y Rueda Verdejo</p>
                    <p className="text-sm font-semibold text-[#3a3532] mt-0.5">Cava brut</p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-[11px] italic text-[#78716a] font-serif">Por favor, consulte sobre opciones vegetarianas o alérgenos.</p>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={250}>
            <div className="mt-8">
              <button 
                onClick={() => window.print()} 
                className="bg-[#6e806d] text-white px-8 py-3 rounded-full font-sans text-xs tracking-widest uppercase hover:bg-[#9e4a47] transition-all flex items-center gap-2 mx-auto shadow-md"
              >
                <Printer className="w-4 h-4" />
                Imprimir / Guardar en PDF
              </button>
            </div>
          </RevealOnScroll>
        </section>

        {/* SECCIÓN DE MÚSICA CON SPOTIFY Y GOOGLE FORMS */}
        <section 
          className="py-24 px-4 sm:px-6 relative bg-cover bg-center bg-no-repeat text-white overflow-hidden"
          style={{ backgroundImage: "url('/FondoDisco.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] z-0" />

          <div className="relative z-10 max-w-6xl mx-auto text-center">
            <RevealOnScroll>
              <Disc className="w-10 h-10 text-[#1DB954] mx-auto mb-3 animate-spin-slow drop-shadow-[0_0_10px_rgba(29,185,84,0.8)]" />
              <span className="text-[#1DB954] font-sans text-xs uppercase tracking-[0.25em] font-bold block mb-2 drop-shadow">
                LA BANDA SONORA DE NUESTRO DÍA
              </span>
              <h2 className="text-5xl sm:text-6xl font-autography text-white py-1 drop-shadow-md">
                ¿Qué canción no puede faltar?
              </h2>
              <p className="text-stone-200 font-sans text-sm max-w-xl mx-auto mt-2 mb-10 drop-shadow-sm">
                Queremos que la fiesta sea inolvidable. Explora la lista oficial en Spotify o sugiere tus temas mediante el formulario.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={150}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                
                {/* COLUMNA IZQUIERDA: REPRODUCTOR Y BOTÓN SPOTIFY */}
                <div className="bg-stone-900/80 backdrop-blur-md p-4 sm:p-6 rounded-3xl shadow-2xl border border-white/20 flex flex-col justify-between space-y-4">
                  <h3 className="font-sans text-xs uppercase tracking-widest font-bold text-[#1DB954]">
                    Lista Oficial en Spotify
                  </h3>
                  
                  <iframe 
                    style={{ borderRadius: "16px" }} 
                    src="https://open.spotify.com/embed/playlist/0p1CNvzdhUzIfFiT6lZ325?utm_source=generator&si=36b6f464ed444ea2" 
                    width="100%" 
                    height="480" 
                    frameBorder="0" 
                    allowFullScreen="" 
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"
                    title="Playlist de Boda Spotify"
                  ></iframe>

                  <a 
                    href="https://open.spotify.com/playlist/0p1CNvzdhUzIfFiT6lZ325?si=12d0cc5f957c472b&pt=16614db570cbb824c48162536ac5a8ed" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-[#1DB954] hover:bg-[#1AA34A] text-white py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg hover:scale-[1.02]"
                  >
                    <PlusCircle className="w-4 h-4" /> Añadir Canciones en Spotify <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>
                </div>

                {/* COLUMNA DERECHA: FORMULARIO GOOGLE FORMS */}
                <div className="bg-stone-900/80 backdrop-blur-md p-4 sm:p-6 rounded-3xl shadow-2xl border border-white/20 flex flex-col justify-between space-y-4">
                  <h3 className="font-sans text-xs uppercase tracking-widest font-bold text-[#E28351]">
                    ¿Sin Spotify? Pide tu canción aquí
                  </h3>

                  <div className="w-full h-[530px] rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                    <iframe 
                      src="https://docs.google.com/forms/d/e/1FAIpQLSfEiw3Irv_evcLrYdgqNh1vEN9lhWgIVGydTkiC6FhAupEoVw/viewform?embedded=true" 
                      width="100%" 
                      height="100%" 
                      frameBorder="0" 
                      marginHeight="0" 
                      marginWidth="0"
                      title="Sugerir canción sin Spotify"
                    >
                      Cargando…
                    </iframe>
                  </div>
                </div>

              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* UBICACIÓN */}
        <section className="py-20 px-6 bg-[#E8DED1]/40">
          <div className="max-w-4xl mx-auto text-center">
            <RevealOnScroll>
              <MapPin className="w-8 h-8 text-[#7998B5] mx-auto mb-3" />
              <h2 className="text-5xl sm:text-6xl font-autography text-[#2E2B2A] py-1">Finca Un Agua</h2>
              <p className="text-[#6B6461] font-sans text-sm mt-2 mb-8">Un espacio natural único seleccionado con cariño para celebrar este día.</p>
            </RevealOnScroll>
            
            <RevealOnScroll delay={150}>
              <div className="rounded-2xl overflow-hidden shadow-lg border border-[#D1C3B3] h-96">
                <iframe 
                  title="Ubicación Finca Un Agua"
                  src="https://maps.google.com/maps?q=Finca%20Un%20Agua&t=&z=14&ie=UTF8&iwloc=&output=embed" 
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* INFORMACIÓN DE INTERÉS (DESPLEGABLES) */}
        <section className="py-20 px-4 sm:px-6 max-w-3xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <Info className="w-8 h-8 text-[#7998B5] mx-auto mb-3" />
              <h2 className="text-5xl sm:text-6xl font-autography text-[#2E2B2A] py-1">Información de Interés</h2>
              <p className="text-[#6B6461] font-sans text-sm mt-2">Detalles útiles para facilitar tu asistencia y estancia en nuestra boda</p>
              <div className="w-16 h-0.5 bg-[#7998B5] mx-auto mt-4"></div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={150}>
            <div className="space-y-4 font-sans">
              
              {/* DESPLEGABLE 1: HOTELES Y ALOJAMIENTOS */}
              <div className="bg-white rounded-2xl border border-[#D1C3B3] shadow-sm overflow-hidden transition-all">
                <button 
                  onClick={() => toggleAccordion(0)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#F8F6F0]/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-[#788E75]/10 rounded-xl text-[#788E75]">
                      <Hotel className="w-5 h-5" />
                    </div>
                    <span className="font-serif font-semibold text-[#2E2B2A] text-base sm:text-lg">Hoteles y Alojamientos Cercanos</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-[#8C827A] transition-transform duration-300 ${activeAccordion === 0 ? 'rotate-180' : ''}`} />
                </button>

                {activeAccordion === 0 && (
                  <div className="px-6 pb-6 pt-2 text-sm text-[#6B6461] border-t border-[#D1C3B3]/40 space-y-5">
                    <p className="italic">Os dejamos las mejores opciones de alojamiento organizadas por cercanía a la finca con su ubicación directa en Google Maps:</p>
                    
                    {/* PUNTO DE REFERENCIA */}
                    <div className="bg-[#E8A3B0]/10 p-4 rounded-xl border border-[#E8A3B0]/40 space-y-1">
                      <p className="font-bold text-[#6B2028] flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#B64A4A]" />
                        Punto de Referencia: Finca Un Agua
                      </p>
                      <p className="text-xs text-[#4A4543]">Camino del Cubillo, 23, 28160 Talamanca de Jarama, Madrid</p>
                      <a 
                        href="https://www.google.com/maps/search/?api=1&query=Finca+Unagua+Camino+del+Cubillo+23+Talamanca+de+Jarama" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#B64A4A] hover:underline pt-1"
                      >
                        Ver en Google Maps <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {/* EN TALAMANCA DE JARAMA */}
                    <div className="space-y-2">
                      <h4 className="font-sans text-xs uppercase tracking-wider font-bold text-[#6B2028]">En Talamanca de Jarama (A 2–5 min en coche)</h4>
                      
                      <div className="bg-[#F8F6F0] p-4 rounded-xl border border-[#D1C3B3]/50 space-y-1">
                        <p className="font-bold text-[#2E2B2A]">Eco Alojamiento La Cartuja de Talamanca</p>
                        <p className="text-xs text-[#788E75] font-semibold">Calle de San Blas, 15, 28160 Talamanca de Jarama, Madrid</p>
                        <a 
                          href="https://www.google.com/maps/search/?api=1&query=Eco+Alojamiento+La+Cartuja+de+Talamanca+Calle+San+Blas+15+Talamanca+de+Jarama" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#6B2028] hover:underline pt-1"
                        >
                          Ver en Google Maps <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      <div className="bg-[#F8F6F0] p-4 rounded-xl border border-[#D1C3B3]/50 space-y-1">
                        <p className="font-bold text-[#2E2B2A]">Casa Rural La Muralla</p>
                        <p className="text-xs text-[#788E75] font-semibold">Casco urbano, 28160 Talamanca de Jarama, Madrid</p>
                        <a 
                          href="https://www.google.com/maps/search/?api=1&query=Casa+Rural+La+Muralla+Talamanca+de+Jarama" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#6B2028] hover:underline pt-1"
                        >
                          Ver en Google Maps <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    {/* PUEBLOS COLINDANTES */}
                    <div className="space-y-2">
                      <h4 className="font-sans text-xs uppercase tracking-wider font-bold text-[#6B2028]">Pueblos colindantes (A 5–10 min en coche)</h4>
                      
                      <div className="bg-[#F8F6F0] p-4 rounded-xl border border-[#D1C3B3]/50 space-y-1">
                        <p className="font-bold text-[#2E2B2A]">Casa Rural San Isidro (Valdepiélagos)</p>
                        <p className="text-xs text-[#788E75] font-semibold">28160 Valdepiélagos, Madrid (~3 km de la finca)</p>
                        <a 
                          href="https://www.google.com/maps/search/?api=1&query=Casa+Rural+San+Isidro+Valdepielagos" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#6B2028] hover:underline pt-1"
                        >
                          Ver en Google Maps <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      <div className="bg-[#F8F6F0] p-4 rounded-xl border border-[#D1C3B3]/50 space-y-1">
                        <p className="font-bold text-[#2E2B2A]">La Posada de Lola (El Molar)</p>
                        <p className="text-xs text-[#788E75] font-semibold">Calle de la Fuente, 2, 28710 El Molar, Madrid (~6 km)</p>
                        <a 
                          href="https://www.google.com/maps/search/?api=1&query=La+Posada+de+Lola+Calle+de+la+Fuente+2+El+Molar" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#6B2028] hover:underline pt-1"
                        >
                          Ver en Google Maps <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      <div className="bg-[#F8F6F0] p-4 rounded-xl border border-[#D1C3B3]/50 space-y-1">
                        <p className="font-bold text-[#2E2B2A]">La Cabaña de Uceda (Uceda)</p>
                        <p className="text-xs text-[#788E75] font-semibold">19187 Uceda, Guadalajara (~8 km)</p>
                        <a 
                          href="https://www.google.com/maps/search/?api=1&query=La+Cabana+de+Uceda+19187+Uceda" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#6B2028] hover:underline pt-1"
                        >
                          Ver en Google Maps <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    {/* HOTELES URBANOS */}
                    <div className="space-y-2">
                      <h4 className="font-sans text-xs uppercase tracking-wider font-bold text-[#6B2028]">Hoteles urbanos (A ~20 min por A-1)</h4>
                      <div className="bg-[#F8F6F0] p-4 rounded-xl border border-[#D1C3B3]/50 space-y-1">
                        <p className="font-bold text-[#2E2B2A]">Sercotel de los Reyes</p>
                        <p className="text-xs text-[#788E75] font-semibold">Av. de España, 34, 28701 San Sebastián de los Reyes, Madrid</p>
                        <a 
                          href="https://www.google.com/maps/search/?api=1&query=Sercotel+de+los+Reyes+Av+de+Espana+34+San+Sebastian+de+los+Reyes" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#6B2028] hover:underline pt-1"
                        >
                          Ver en Google Maps <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                  </div>
                )}
              </div>

              {/* DESPLEGABLE 2: AUTOBUSES */}
              <div className="bg-white rounded-2xl border border-[#D1C3B3] shadow-sm overflow-hidden transition-all">
                <button 
                  onClick={() => toggleAccordion(1)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#F8F6F0]/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-[#B64A4A]/10 rounded-xl text-[#B64A4A]">
                      <Bus className="w-5 h-5" />
                    </div>
                    <span className="font-serif font-semibold text-[#2E2B2A] text-base sm:text-lg">Servicio de Autobuses y Horarios</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-[#8C827A] transition-transform duration-300 ${activeAccordion === 1 ? 'rotate-180' : ''}`} />
                </button>

                {activeAccordion === 1 && (
                  <div className="px-6 pb-6 pt-2 text-sm text-[#6B6461] border-t border-[#D1C3B3]/40 space-y-4">
                    <p>Disponpondremos de servicio de autobús gratuito de ida y vuelta para todos los invitados:</p>
                    
                    <div className="space-y-3">
                      <div className="border-l-2 border-[#B64A4A] pl-3 py-1">
                        <p className="font-bold text-[#2E2B2A]">IDA A LA FINCA</p>
                        <p className="text-xs">Salida a las <span className="font-bold text-[#B64A4A]">16:45h</span> desde la Plaza Central (junto al Hotel Boutique).</p>
                      </div>

                      <div className="border-l-2 border-[#788E75] pl-3 py-1">
                        <p className="font-bold text-[#2E2B2A]">VUELTA</p>
                        <p className="text-xs">Primer autobús de regreso: <span className="font-bold">02:00h</span></p>
                        <p className="text-xs">Segundo autobús (fin de fiesta): <span className="font-bold">04:30h</span></p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* DESPLEGABLE 3: PARKING */}
              <div className="bg-white rounded-2xl border border-[#D1C3B3] shadow-sm overflow-hidden transition-all">
                <button 
                  onClick={() => toggleAccordion(2)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#F8F6F0]/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-[#E28351]/10 rounded-xl text-[#E28351]">
                      <Car className="w-5 h-5" />
                    </div>
                    <span className="font-serif font-semibold text-[#2E2B2A] text-base sm:text-lg">Aparcamiento / Parking</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-[#8C827A] transition-transform duration-300 ${activeAccordion === 2 ? 'rotate-180' : ''}`} />
                </button>

                {activeAccordion === 2 && (
                  <div className="px-6 pb-6 pt-2 text-sm text-[#6B6461] border-t border-[#D1C3B3]/40 space-y-2">
                    <p className="font-semibold text-[#2E2B2A]">¡Sí, la finca dispone de amplio parking privado gratuito!</p>
                    <p>Si decides asistir en tu vehículo privado, encontrarás aparcamiento vigilado dentro de las instalaciones de Finca Un Agua sin necesidad de reserva previa.</p>
                    <p className="text-xs italic text-[#788E75] mt-2">También es posible dejar el coche estacionado durante la noche y recogerlo al día siguiente antes de las 13:00h.</p>
                  </div>
                )}

              </div>

            </div>
          </RevealOnScroll>
        </section>

        {/* FORMULARIO RSVP OFICIAL DE GOOGLE FORMS */}
        <section className="py-20 px-4 sm:px-6 max-w-3xl mx-auto text-center">
          <RevealOnScroll>
            <UserCheck className="w-10 h-10 text-[#E28351] mx-auto mb-3" />
            <h2 className="text-5xl sm:text-6xl font-autography text-[#2E2B2A] mb-2 py-1">Confirmar Asistencia</h2>
            <p className="text-[#6B6461] font-sans text-sm mb-8">Por favor, confirma tu asistencia directamente en nuestro formulario oficial antes del 1 de Marzo de 2027.</p>
          </RevealOnScroll>

          <RevealOnScroll delay={150}>
            <div className="bg-white rounded-2xl border border-[#D1C3B3] shadow-lg overflow-hidden p-2 sm:p-4">
              <iframe 
                src="https://docs.google.com/forms/d/e/1FAIpQLSd46WxQqhSV8S1JVH5B3f-UHltzAscz1_nESOWlS1efPFUAcw/viewform?embedded=true" 
                className="w-full h-[720px] border-0"
                frameBorder="0" 
                marginHeight="0" 
                marginWidth="0"
                title="Formulario de Confirmación de Asistencia"
              >
                Cargando…
              </iframe>
            </div>
          </RevealOnScroll>
        </section>

        {/* REGALO DE BODA (AL FINAL DEL TODO) */}
        <section className="py-20 px-6 max-w-2xl mx-auto text-center">
          <RevealOnScroll>
            <Gift className="w-8 h-8 text-[#B64A4A] mx-auto mb-3" />
            <h2 className="text-5xl sm:text-6xl font-autography text-[#2E2B2A] mb-4 py-1">Regalo de Boda</h2>
            <p className="text-[#6B6461] font-sans text-sm mb-6">Ayúdanos a convertir nuestros sueños en kilómetros, hoteles y cócteles en la playa:</p>
            <div className="bg-white p-6 rounded-2xl border border-[#D1C3B3] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
              <div className="text-left">
                <span className="text-xs text-[#788E75] font-semibold block uppercase">IBAN</span>
                <span className="text-[#2E2B2A] font-mono font-bold">ES79 2100 2687 1402 1007 0394</span>
              </div>
              <button 
                onClick={() => copyToClipboard('ES7921002687140210070394')}
                className="bg-[#6B2028] text-[#FFFDF9] px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#52171D] flex items-center gap-2 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                {copied ? '¡Copiado!' : 'Copiar IBAN'}
              </button>
            </div>
          </RevealOnScroll>
        </section>

        {/* FOOTER */}
        <footer className="py-12 text-center border-t border-[#D1C3B3]/50 font-sans text-[#6B6461] text-xs">
          <Heart className="w-4 h-4 text-[#E8A3B0] mx-auto mb-2 fill-[#E8A3B0]" />
          <p className="whitespace-nowrap font-autography text-2xl text-[#6B2028]">Javier & Cristina — 24.04.2027</p>
        </footer>
      </div>
    </div>
  );
}
