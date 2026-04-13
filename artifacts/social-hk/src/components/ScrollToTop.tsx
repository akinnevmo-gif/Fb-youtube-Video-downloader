import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(pct);
      setVisible(scrollTop > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-24 right-6 z-50 w-12 h-12 rounded-full bg-violet-600 hover:bg-violet-700 shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
      aria-label="Scroll to top"
    >
      <svg className="absolute inset-0 w-12 h-12 -rotate-90" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
        <circle
          cx="24" cy="24" r="20" fill="none"
          stroke="white" strokeWidth="3"
          strokeDasharray={`${2 * Math.PI * 20}`}
          strokeDashoffset={`${2 * Math.PI * 20 * (1 - progress / 100)}`}
          strokeLinecap="round"
          className="transition-all duration-100"
        />
      </svg>
      <ArrowUp className="w-5 h-5 text-white relative z-10" />
    </button>
  );
}
