import { Link } from "wouter";
import { CheckCircle, ArrowRight, Star, Zap, Globe, Smartphone, ShoppingCart, FileText } from "lucide-react";

const services = [
  {
    name: "Starter Site",
    price: "$49",
    priceUSD: 49,
    period: "one-time",
    desc: "Perfect for personal portfolios, simple business pages, and information sites.",
    icon: FileText,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    features: [
      "1-3 pages",
      "Mobile responsive",
      "Basic SEO setup",
      "Contact form",
      "Social media links",
      "1 round of revisions",
      "Free hosting guide",
    ],
    popular: false,
  },
  {
    name: "Business Pro",
    price: "$99",
    priceUSD: 99,
    period: "one-time",
    desc: "Ideal for small businesses, restaurants, churches, and service providers.",
    icon: Globe,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    features: [
      "Up to 6 pages",
      "Mobile responsive",
      "Advanced SEO",
      "Contact & booking form",
      "Google Maps integration",
      "Social media integration",
      "Gallery/Portfolio section",
      "3 rounds of revisions",
      "Free domain advice",
      "2 weeks support",
    ],
    popular: true,
  },
  {
    name: "E-Commerce Basic",
    price: "$149",
    priceUSD: 149,
    period: "one-time",
    desc: "Online store with product listings, cart, and payment integration.",
    icon: ShoppingCart,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    features: [
      "Full e-commerce store",
      "Up to 20 products",
      "Payment gateway setup",
      "Order management",
      "Mobile optimized",
      "SEO optimized",
      "Social media shop links",
      "5 rounds of revisions",
      "30 days support",
    ],
    popular: false,
  },
  {
    name: "Premium Brand Site",
    price: "$249",
    priceUSD: 249,
    period: "one-time",
    desc: "Full-featured brand websites with animations, custom design, and premium features.",
    icon: Star,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    features: [
      "Up to 15 pages",
      "Custom animations",
      "Advanced SEO & analytics",
      "Multi-language support",
      "Newsletter integration",
      "Blog/News section",
      "Live chat integration",
      "Unlimited revisions",
      "60 days support",
      "Monthly maintenance",
    ],
    popular: false,
  },
  {
    name: "Mobile Web App",
    price: "$199",
    priceUSD: 199,
    period: "one-time",
    desc: "Progressive web apps that work like native apps on all mobile devices.",
    icon: Smartphone,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    features: [
      "Progressive Web App",
      "Offline capability",
      "Push notifications",
      "App-like experience",
      "Cross-platform",
      "Fast loading",
      "App store guides",
      "3 rounds of revisions",
      "30 days support",
    ],
    popular: false,
  },
  {
    name: "Rush Delivery",
    price: "$79",
    priceUSD: 79,
    period: "add-on",
    desc: "Get your website delivered in 48-72 hours instead of the standard 7-10 days.",
    icon: Zap,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    features: [
      "48-72 hour delivery",
      "Priority support",
      "Daily progress updates",
      "Same quality guarantee",
    ],
    popular: false,
  },
];

const samples = [
  { name: "Restaurant Website", img: "🍽️", desc: "Menu, booking, location & reviews" },
  { name: "Church Website", img: "⛪", desc: "Events, sermons, giving & contact" },
  { name: "Portfolio Site", img: "🎨", desc: "Work showcase, bio & contact form" },
  { name: "School Website", img: "🎓", desc: "Admissions, news & faculty info" },
  { name: "Law Firm Site", img: "⚖️", desc: "Services, team & consultation booking" },
  { name: "Medical Clinic", img: "🏥", desc: "Appointments, services & doctors" },
];

export default function ServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-semibold px-4 py-2 rounded-full mb-6">
          <Star className="w-3.5 h-3.5" />
          Professional Web Services
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
          We Build <span className="gradient-text">Stunning Websites</span>
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          SAS Tech Inc delivers professional, fast, mobile-friendly static websites for businesses, churches, schools, and individuals across Africa and beyond.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {services.map((svc) => {
          const Icon = svc.icon;
          return (
            <div
              key={svc.name}
              className={`relative bg-card border rounded-3xl p-6 flex flex-col card-hover ${
                svc.popular ? "border-primary glow-purple" : "border-border"
              }`}
            >
              {svc.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-black px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className={`w-12 h-12 ${svc.bg} rounded-2xl flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${svc.color}`} />
              </div>

              <h3 className="font-black text-xl text-foreground mb-1">{svc.name}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{svc.desc}</p>

              <div className="mb-6">
                <span className="text-3xl font-black gradient-text">{svc.price}</span>
                <span className="text-muted-foreground text-sm ml-2">{svc.period}</span>
              </div>

              <ul className="space-y-2 mb-6 flex-1">
                {svc.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className={`w-4 h-4 ${svc.color} shrink-0`} />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="https://wa.me/2347043125375"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl transition-all text-sm ${
                  svc.popular
                    ? "bg-primary hover:bg-primary/80 text-primary-foreground glow-purple"
                    : "bg-secondary hover:bg-accent text-foreground border border-border hover:border-primary/40"
                }`}
              >
                Order Now
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          );
        })}
      </div>

      {/* Sample Work */}
      <div className="mb-16">
        <h2 className="text-2xl font-black text-foreground text-center mb-3">
          What We <span className="gradient-text">Can Build</span>
        </h2>
        <p className="text-muted-foreground text-center mb-8 text-sm">
          We've built websites for all kinds of businesses. Here are some examples:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {samples.map((s) => (
            <div key={s.name} className="bg-card border border-border rounded-2xl p-5 card-hover text-center">
              <div className="text-4xl mb-3">{s.img}</div>
              <div className="font-bold text-foreground text-sm mb-1">{s.name}</div>
              <div className="text-xs text-muted-foreground">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Process */}
      <div className="bg-card border border-border rounded-3xl p-8 mb-8">
        <h2 className="text-2xl font-black text-foreground text-center mb-8">
          Our Simple <span className="gradient-text">Process</span>
        </h2>
        <div className="grid sm:grid-cols-4 gap-6">
          {[
            { step: "1", title: "Contact Us", desc: "WhatsApp us with your requirements and budget" },
            { step: "2", title: "Get Quote", desc: "We'll send you a detailed quote within 2 hours" },
            { step: "3", title: "We Build", desc: "Our team builds your website in 3-10 days" },
            { step: "4", title: "Launch", desc: "We deliver and help you go live online" },
          ].map((p) => (
            <div key={p.step} className="text-center">
              <div className="w-12 h-12 bg-primary/15 border border-primary/30 rounded-2xl flex items-center justify-center font-black text-primary text-lg mx-auto mb-3">
                {p.step}
              </div>
              <div className="font-bold text-foreground text-sm mb-1">{p.title}</div>
              <div className="text-xs text-muted-foreground">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-2xl font-black text-foreground mb-3">Ready to Get Started?</h2>
        <p className="text-muted-foreground mb-6">Contact us on WhatsApp and let's build your dream website today.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="https://wa.me/2347043125375"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-3.5 rounded-xl transition-all"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            WhatsApp Us Now
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-secondary hover:bg-accent text-foreground font-bold px-8 py-3.5 rounded-xl transition-all border border-border"
          >
            Contact Form
          </Link>
        </div>
      </div>
    </div>
  );
}
