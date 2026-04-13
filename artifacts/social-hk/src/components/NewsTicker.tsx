import { useEffect, useRef } from "react";
import { Zap } from "lucide-react";

const headlines = [
  "🚀 Social HK now supports 10+ video platforms — Download from Facebook, YouTube, TikTok, Instagram & more!",
  "📱 PWA Update: Install Social HK on your phone for a native app experience!",
  "💳 New Virtual Card Generator — Generate Visa, MasterCard, Verve & Amex instantly!",
  "📺 120+ Live Channels Now Available — Sports, News, Movies, Music & more streaming FREE!",
  "🌍 SAS Tech Inc — Professional Website Design starting at just $49 USD!",
  "🎓 Free Tech Tutorials — Learn web design, coding & digital marketing!",
  "☀️ Real-time weather updates — Powered by OpenWeatherMap API!",
  "💬 Join our WhatsApp Group for daily tips, deals & tech news!",
  "🔧 New Tools Added: Currency Converter, Password Generator, QR Code, BMI Calculator & more!",
  "🏆 Trusted by 50,000+ users across West Africa and beyond!",
];

export default function NewsTicker() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let pos = 0;
    const speed = 0.5;
    let raf: number;
    const animate = () => {
      pos -= speed;
      if (Math.abs(pos) >= el.scrollWidth / 2) pos = 0;
      el.style.transform = `translateX(${pos}px)`;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const content = [...headlines, ...headlines];

  return (
    <div className="bg-violet-900/60 border-b border-violet-700/40 overflow-hidden h-8 flex items-center">
      <div className="flex-shrink-0 flex items-center gap-1.5 bg-violet-600 px-3 h-full z-10">
        <Zap className="w-3 h-3 text-yellow-300" />
        <span className="text-white text-xs font-bold whitespace-nowrap">LIVE</span>
      </div>
      <div className="overflow-hidden flex-1 relative">
        <div ref={ref} className="flex whitespace-nowrap will-change-transform">
          {content.map((h, i) => (
            <span key={i} className="text-violet-100 text-xs px-8 inline-block">
              {h}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
