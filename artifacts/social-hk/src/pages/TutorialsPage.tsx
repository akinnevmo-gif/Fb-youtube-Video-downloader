import { useState } from "react";
import { BookOpen, Stethoscope, Cpu, Calculator, Briefcase, Beaker, Globe, Music2, Tv } from "lucide-react";

type TCategory = "all" | "nursing" | "engineering" | "business" | "technology" | "science" | "languages" | "arts";

interface Tutorial {
  title: string;
  category: TCategory;
  videoId: string;
  instructor?: string;
  duration?: string;
}

const tutorials: Tutorial[] = [
  // Nursing
  { title: "Nursing Fundamentals - Introduction", category: "nursing", videoId: "DqGN5gRioA8", instructor: "MedEd", duration: "45 min" },
  { title: "Clinical Nursing Skills", category: "nursing", videoId: "7Vw9Bz1O0vY", instructor: "NursingCare", duration: "60 min" },
  { title: "Pharmacology for Nurses", category: "nursing", videoId: "8-LBrBSf5JA", instructor: "PharmED", duration: "55 min" },
  { title: "Patient Assessment Basics", category: "nursing", videoId: "BM17sAb4cTY", instructor: "NurseTutor", duration: "40 min" },
  { title: "Anatomy & Physiology Full Course", category: "nursing", videoId: "uBGl2BujkPQ", instructor: "MedAcademy", duration: "3h 20min" },
  // Engineering
  { title: "Introduction to Civil Engineering", category: "engineering", videoId: "hFRDXr-1xfo", instructor: "EngineersHub", duration: "90 min" },
  { title: "Electrical Engineering Basics", category: "engineering", videoId: "nGCmAGRkMoY", instructor: "CircuitPro", duration: "2h 10min" },
  { title: "Mechanical Engineering Principles", category: "engineering", videoId: "GRz6uKSQxzQ", instructor: "MechLearn", duration: "75 min" },
  { title: "AutoCAD Beginner Tutorial", category: "engineering", videoId: "kBNsVG4OwcM", instructor: "CADmaster", duration: "50 min" },
  { title: "Construction Fundamentals", category: "engineering", videoId: "pHZ4BSKTV-o", instructor: "BuildRight", duration: "65 min" },
  // Business
  { title: "Business Management 101", category: "business", videoId: "FCFkPr5RXOQ", instructor: "BizSchool", duration: "80 min" },
  { title: "Marketing Fundamentals", category: "business", videoId: "tNa3b6D9WwA", instructor: "MarketPro", duration: "55 min" },
  { title: "Financial Management", category: "business", videoId: "NU0YmHQnXbs", instructor: "FinanceHub", duration: "70 min" },
  { title: "Entrepreneurship Masterclass", category: "business", videoId: "Lnk6UUQIYLY", instructor: "StartupGuru", duration: "2h" },
  { title: "Digital Marketing Strategy", category: "business", videoId: "0d3qFIv7uFs", instructor: "DigiMark", duration: "45 min" },
  // Technology
  { title: "Python Programming for Beginners", category: "technology", videoId: "rfscVS0vtbw", instructor: "CodeWith", duration: "4h" },
  { title: "Web Development Full Course", category: "technology", videoId: "Q33KBiDriJY", instructor: "WebDev101", duration: "8h" },
  { title: "Cybersecurity Basics", category: "technology", videoId: "3Kq1MIfTWCE", instructor: "SecureIT", duration: "2h 30min" },
  { title: "Data Science Introduction", category: "technology", videoId: "ua-CiDNNj30", instructor: "DataLab", duration: "3h" },
  { title: "AI & Machine Learning Basics", category: "technology", videoId: "aircAruvnKk", instructor: "AIAcademy", duration: "2h" },
  // Science
  { title: "Physics Full Course", category: "science", videoId: "b1t41Q3xRM8", instructor: "SciHub", duration: "5h" },
  { title: "Chemistry Essentials", category: "science", videoId: "3bCVC2oonZg", instructor: "ChemLearn", duration: "3h" },
  { title: "Biology for Students", category: "science", videoId: "8UYMdVEhfLE", instructor: "BioClass", duration: "2h 45min" },
  { title: "Mathematics Made Easy", category: "science", videoId: "e02j3uc0Hy8", instructor: "MathTutor", duration: "90 min" },
  // Languages
  { title: "English Grammar Mastery", category: "languages", videoId: "GSRG3XVPQ-k", instructor: "LangPro", duration: "2h" },
  { title: "French for Beginners", category: "languages", videoId: "0tsknrfBzzs", instructor: "FrenchClass", duration: "80 min" },
  { title: "Spanish Quick Course", category: "languages", videoId: "z-yCu7rlNzs", instructor: "SpanishHub", duration: "60 min" },
  { title: "Professional Communication", category: "languages", videoId: "HAnw168huqA", instructor: "SpeakWell", duration: "45 min" },
  // Arts
  { title: "Graphic Design Basics", category: "arts", videoId: "9QTCvayLhCA", instructor: "DesignLab", duration: "3h" },
  { title: "Photography Fundamentals", category: "arts", videoId: "LxO-6rlihSg", instructor: "PhotoPro", duration: "90 min" },
  { title: "Video Editing with CapCut", category: "arts", videoId: "gHkuIpkDpE0", instructor: "EditMaster", duration: "50 min" },
  { title: "Music Production Basics", category: "arts", videoId: "mJ9MxKXoMlg", instructor: "MusicPro", duration: "2h" },
];

const categories: Array<{ id: TCategory; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { id: "all", label: "All Courses", icon: Globe },
  { id: "nursing", label: "Nursing", icon: Stethoscope },
  { id: "engineering", label: "Engineering", icon: Cpu },
  { id: "business", label: "Business", icon: Briefcase },
  { id: "technology", label: "Technology", icon: Calculator },
  { id: "science", label: "Science", icon: Beaker },
  { id: "languages", label: "Languages", icon: Music2 },
  { id: "arts", label: "Arts & Media", icon: Tv },
];

export default function TutorialsPage() {
  const [activeCategory, setActiveCategory] = useState<TCategory>("all");
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);

  const filtered = activeCategory === "all" ? tutorials : tutorials.filter((t) => t.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold px-4 py-2 rounded-full mb-6">
          <BookOpen className="w-3.5 h-3.5" />
          Free Tutorial Classes
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
          Learn <span className="gradient-text">Any Course</span> Online
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Free live tutorial classes for nursing, engineering, business, technology, and more. Learn at your pace from top educators worldwide.
        </p>
      </div>

      {/* Selected Video */}
      {selectedTutorial && (
        <div className="mb-8">
          <div className="bg-card border border-primary/30 rounded-2xl overflow-hidden glow-purple">
            <div className="flex items-center justify-between px-4 py-3 bg-secondary/50">
              <div>
                <p className="font-bold text-foreground text-sm">{selectedTutorial.title}</p>
                {selectedTutorial.instructor && (
                  <p className="text-xs text-muted-foreground">{selectedTutorial.instructor} • {selectedTutorial.duration}</p>
                )}
              </div>
              <button onClick={() => setSelectedTutorial(null)} className="text-xs text-muted-foreground hover:text-foreground bg-secondary px-3 py-1.5 rounded-lg transition-colors">
                Close
              </button>
            </div>
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${selectedTutorial.videoId}?autoplay=1`}
                title={selectedTutorial.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
        {categories.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveCategory(id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all shrink-0 ${
              activeCategory === id
                ? "bg-primary text-primary-foreground glow-purple"
                : "bg-secondary border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((tutorial) => (
          <button
            key={tutorial.videoId}
            onClick={() => setSelectedTutorial(tutorial)}
            className="group bg-card border border-border rounded-2xl overflow-hidden card-hover text-left"
          >
            <div className="relative">
              <img
                src={`https://img.youtube.com/vi/${tutorial.videoId}/mqdefault.jpg`}
                alt={tutorial.title}
                className="w-full aspect-video object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${tutorial.videoId}/0.jpg`;
                }}
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-xl">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
              </div>
              {tutorial.duration && (
                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {tutorial.duration}
                </span>
              )}
            </div>
            <div className="p-3">
              <p className="text-xs font-semibold text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2 mb-1">
                {tutorial.title}
              </p>
              <div className="flex items-center justify-between">
                {tutorial.instructor && <span className="text-[10px] text-muted-foreground">{tutorial.instructor}</span>}
                <span className="inline-block text-[10px] font-medium text-muted-foreground capitalize bg-secondary rounded-full px-2 py-0.5 ml-auto">
                  {tutorial.category}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-10 bg-card border border-border rounded-2xl p-6 text-center">
        <h3 className="font-bold text-foreground mb-2">Need Personalized Tutoring?</h3>
        <p className="text-sm text-muted-foreground mb-4">Contact SAS Tech Inc for one-on-one online tutoring sessions and customized course materials.</p>
        <a
          href="https://wa.me/2347043125375"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 rounded-xl transition-all"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          Request Tutoring
        </a>
      </div>
    </div>
  );
}
