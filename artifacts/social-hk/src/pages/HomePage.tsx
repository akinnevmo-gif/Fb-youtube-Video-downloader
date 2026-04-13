import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import {
  Download, Tv, CreditCard, Globe, GraduationCap, MessageCircle,
  Star, ArrowRight, Play, Users, Zap, Shield, CheckCircle2, Trophy,
  Smartphone, TrendingUp, Wrench, ChevronRight, Wifi
} from "lucide-react";
import WeatherWidget from "@/components/WeatherWidget";

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

const features = [
  { icon: Download, label: "Multi-Platform Downloader", desc: "Download from Facebook, YouTube, TikTok, Instagram, Twitter & 7 more platforms in HD/4K", href: "/download", color: "from-blue-500 to-cyan-500" },
  { icon: Tv, label: "120+ Live Streams", desc: "Free News, Sports, Movies, Music & Entertainment channels — no subscription needed", href: "/live", color: "from-red-500 to-orange-500" },
  { icon: CreditCard, label: "Virtual Card Generator", desc: "Generate Visa, MasterCard, Verve, Amex & Discover virtual cards with one click", href: "/virtual-cards", color: "from-green-500 to-emerald-500" },
  { icon: Globe, label: "Website Design", desc: "Professional websites from $49 — Business, Portfolio, E-commerce & more", href: "/services", color: "from-violet-500 to-purple-500" },
  { icon: GraduationCap, label: "Free Tutorials", desc: "Web Design, Coding, Nursing, Engineering, Business & Digital Marketing", href: "/tutorials", color: "from-yellow-500 to-amber-500" },
  { icon: Wrench, label: "30+ Online Tools", desc: "Currency Converter, Password Generator, BMI, Age Calc, QR Code & more", href: "/tools", color: "from-pink-500 to-rose-500" },
];

const platforms = [
  { name: "Facebook", emoji: "📘", color: "#1877F2" },
  { name: "YouTube", emoji: "▶️", color: "#FF0000" },
  { name: "Instagram", emoji: "📸", color: "#E1306C" },
  { name: "TikTok", emoji: "🎵", color: "#010101" },
  { name: "Twitter/X", emoji: "🐦", color: "#1DA1F2" },
  { name: "Vimeo", emoji: "🎬", color: "#1AB7EA" },
  { name: "Reddit", emoji: "🔴", color: "#FF4500" },
  { name: "Pinterest", emoji: "📌", color: "#E60023" },
  { name: "LinkedIn", emoji: "💼", color: "#0A66C2" },
  { name: "Dailymotion", emoji: "🎥", color: "#0066DC" },
  { name: "Twitch", emoji: "💜", color: "#9146FF" },
  { name: "Rumble", emoji: "🎙️", color: "#85C742" },
];

const testimonials = [
  { name: "Kofi Mensah", country: "🇬🇭 Ghana", text: "Social HK is incredible! I download YouTube videos daily for my kids. The virtual card feature helped me make online purchases too.", stars: 5 },
  { name: "Amara Jalloh", country: "🇸🇱 Sierra Leone", text: "I use the live TV every day! Great African channels. SAS Tech also built my business website for just $49. Amazing value!", stars: 5 },
  { name: "Emeka Okafor", country: "🇳🇬 Nigeria", text: "The Verve card generator is exactly what I needed for testing my e-commerce site. Team responds on WhatsApp instantly!", stars: 5 },
  { name: "Fatima Kamara", country: "🇱🇷 Liberia", text: "SAS Tech built my restaurant website and taught me everything. Excellent tutorials and support. Highly recommend!", stars: 5 },
  { name: "James Kollie", country: "🇱🇷 Liberia", text: "Best tech platform in West Africa! The 30+ free tools are amazing — I use the password generator and currency converter daily.", stars: 5 },
  { name: "Adaeze Nwosu", country: "🇳🇬 Nigeria", text: "Downloaded over 200 Facebook videos without watermark. TikTok downloader is also fantastic. 10/10 would recommend!", stars: 5 },
];

const stats = [
  { value: 50000, suffix: "+", label: "Happy Users", icon: Users },
  { value: 120, suffix: "+", label: "Live Channels", icon: Tv },
  { value: 12, suffix: "+", label: "Download Platforms", icon: Download },
  { value: 30, suffix: "+", label: "Free Tools", icon: Wrench },
];

const servicePricing = [
  { name: "Landing Page", price: "$49", features: ["Responsive Design", "SEO Optimized", "Contact Form", "3 Revisions"] },
  { name: "Business Website", price: "$99", features: ["5 Pages", "Mobile Ready", "Google Analytics", "6 Revisions", "WhatsApp Chat"], popular: true },
  { name: "E-Commerce Store", price: "$199", features: ["Unlimited Products", "Payment Gateway", "Inventory System", "12 Revisions", "1yr Support"] },
];

const quickTools = [
  { name: "Password Generator", emoji: "🔐", href: "/tools" },
  { name: "Currency Converter", emoji: "💱", href: "/tools" },
  { name: "BMI Calculator", emoji: "⚖️", href: "/tools" },
  { name: "Age Calculator", emoji: "🎂", href: "/tools" },
  { name: "QR Code Generator", emoji: "📱", href: "/tools" },
  { name: "Word Counter", emoji: "📝", href: "/tools" },
  { name: "Unit Converter", emoji: "📐", href: "/tools" },
  { name: "Color Picker", emoji: "🎨", href: "/tools" },
];

export default function HomePage() {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const c0 = useCountUp(stats[0].value, 2000, statsVisible);
  const c1 = useCountUp(stats[1].value, 2000, statsVisible);
  const c2 = useCountUp(stats[2].value, 2000, statsVisible);
  const c3 = useCountUp(stats[3].value, 2000, statsVisible);
  const counts = [c0, c1, c2, c3];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center hero-bg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: "linear-gradient(rgba(139,92,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.4) 1px, transparent 1px)",
            backgroundSize: "50px 50px"
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-4 py-2 rounded-full mb-6">
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              SAS Tech Inc — Liberia 🇱🇷 @2026
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-tight mb-6">
              Your Ultimate{" "}
              <span className="gradient-text">Digital Hub</span>{" "}
              for Africa 🌍
            </h1>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Download videos from 12+ platforms, stream 120+ live TV channels, generate virtual cards, access 30+ free tools & get professional websites — all in one free platform.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <Link href="/download"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/80 text-primary-foreground px-6 py-3.5 rounded-xl font-bold transition-all glow-purple hover:scale-105 active:scale-95">
                <Download className="w-4 h-4" />
                Download Videos
              </Link>
              <Link href="/live"
                className="inline-flex items-center gap-2 bg-secondary hover:bg-accent border border-border text-foreground px-6 py-3.5 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95">
                <Play className="w-4 h-4 text-red-400" />
                Watch Live TV
              </Link>
              <a href="https://wa.me/2347043125375" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3.5 rounded-xl font-bold transition-all hover:scale-105 active:scale-95">
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {["100% Free", "No Registration", "No Watermark", "HD Quality", "PWA App"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />{t}
                </span>
              ))}
            </div>
          </div>
          <div>
            <WeatherWidget />
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { label: "Active Users", value: "50K+", icon: Users, color: "text-violet-400" },
                { label: "Downloads Today", value: "2.4K", icon: Download, color: "text-blue-400" },
                { label: "Live Viewers", value: "8.1K", icon: Wifi, color: "text-red-400" },
                { label: "Uptime", value: "99.9%", icon: TrendingUp, color: "text-green-400" },
              ].map((s) => (
                <div key={s.label} className="bg-card border border-border rounded-xl p-3 flex items-center gap-3 card-hover">
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                  <div>
                    <p className="text-foreground font-bold text-lg leading-none">{s.value}</p>
                    <p className="text-muted-foreground text-xs">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 bg-green-900/20 border border-green-700/30 rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full pulse-dot" />
                <span className="text-sm font-semibold text-foreground">Join Our WhatsApp Community</span>
              </div>
              <a href="https://chat.whatsapp.com/KMGciQZFFlYABXeEu9iFeS" target="_blank" rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-500 text-white text-xs font-bold px-3 py-2 rounded-lg transition-all shrink-0">
                Join 5K+
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms Ticker */}
      <section className="bg-secondary/50 border-y border-border py-5 overflow-hidden">
        <p className="text-center text-muted-foreground text-xs mb-3 font-medium uppercase tracking-widest">Download from 12+ platforms</p>
        <div className="overflow-hidden">
          <div className="flex gap-4 animate-scroll-x whitespace-nowrap">
            {[...platforms, ...platforms].map((p, i) => (
              <span key={i} className="inline-flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-xl text-sm font-medium text-foreground flex-shrink-0">
                <span>{p.emoji}</span>{p.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="bg-gradient-to-r from-primary/10 via-accent to-secondary py-16">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={s.label} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/15 border border-primary/20 mb-3">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-4xl font-black gradient-text">{counts[i]}{s.suffix}</p>
              <p className="text-muted-foreground text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Everything You Need</span>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mt-2">150+ Features, One Platform</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Social HK is the most complete free digital platform built for Africa and the world.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <Link key={f.label} href={f.href}
                className="group bg-card border border-border hover:border-primary/40 rounded-2xl p-6 transition-all card-hover">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} mb-4`}>
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-foreground font-bold text-lg mb-2 group-hover:text-primary transition-colors">{f.label}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                <div className="flex items-center gap-1 text-primary text-sm font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Tools Strip */}
      <section className="py-14 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-foreground">Quick <span className="gradient-text">Online Tools</span></h2>
            <Link href="/tools" className="text-primary text-sm font-semibold flex items-center gap-1 hover:underline">
              View All 30+ <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {quickTools.map((t) => (
              <Link key={t.name} href={t.href}
                className="bg-card border border-border hover:border-primary/40 rounded-xl p-3 text-center transition-all card-hover group">
                <div className="text-2xl mb-2">{t.emoji}</div>
                <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">{t.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services/Pricing */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Web Design Services</span>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mt-2">Professional Websites from $49</h2>
            <p className="text-muted-foreground mt-3">By SAS Tech Inc — serving Liberia and all of West Africa</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {servicePricing.map((s) => (
              <div key={s.name} className={`relative rounded-2xl p-6 border ${s.popular ? "border-primary glow-purple bg-primary/5" : "border-border bg-card"} card-hover`}>
                {s.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-black px-4 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-foreground font-bold text-xl mb-1">{s.name}</h3>
                <p className="text-4xl font-black gradient-text mb-6">{s.price}</p>
                <ul className="space-y-2 mb-6">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-muted-foreground text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <a href="https://wa.me/2347043125375?text=I%20want%20to%20order%20a%20website" target="_blank" rel="noopener noreferrer"
                  className={`block text-center py-3 rounded-xl font-semibold transition-all hover:scale-105 text-sm ${s.popular ? "bg-primary hover:bg-primary/80 text-primary-foreground" : "bg-secondary hover:bg-accent text-foreground border border-border"}`}>
                  Order on WhatsApp
                </a>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/services" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
              View All Plans <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-secondary/20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mt-2">Loved Across West Africa</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-5 card-hover">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-foreground font-semibold text-sm">{t.name}</p>
                    <p className="text-muted-foreground text-xs">{t.country}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-card border border-border rounded-3xl p-8 gradient-border">
            <div className="grid sm:grid-cols-3 gap-8 text-center">
              {[
                { icon: Shield, color: "text-primary", title: "100% Safe & Secure", desc: "All downloads are protected and safe for your device" },
                { icon: Zap, color: "text-yellow-400", title: "Lightning Fast", desc: "Optimized for speed — downloads start instantly" },
                { icon: Smartphone, color: "text-emerald-400", title: "Mobile First", desc: "Perfectly designed for phones — iOS & Android" },
              ].map((b) => (
                <div key={b.title} className="flex flex-col items-center gap-3">
                  <b.icon className={`w-10 h-10 ${b.color}`} />
                  <h3 className="font-bold text-foreground">{b.title}</h3>
                  <p className="text-sm text-muted-foreground">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-16 bg-green-900/10 border-y border-green-800/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <MessageCircle className="w-14 h-14 text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-3">Join Our WhatsApp Community</h2>
          <p className="text-muted-foreground mb-6">Get daily tech tips, deals, tutorials & support. Over 5,000 members and growing!</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/2347043125375" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-8 py-3.5 rounded-xl font-bold transition-all hover:scale-105">
              <MessageCircle className="w-5 h-5" />
              Chat with Us
            </a>
            <a href="https://chat.whatsapp.com/KMGciQZFFlYABXeEu9iFeS" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-secondary hover:bg-accent border border-border text-foreground px-8 py-3.5 rounded-xl font-bold transition-all hover:scale-105">
              <Users className="w-5 h-5" />
              Join Group (5K+)
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes scroll-x { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-scroll-x { animation: scroll-x 25s linear infinite; display: inline-flex; }
      `}</style>
    </div>
  );
}
