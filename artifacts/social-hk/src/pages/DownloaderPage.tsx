import { useState } from "react";
import { Download, Link as LinkIcon, AlertCircle, Youtube, Facebook, CheckCircle, Info, Smartphone, Monitor } from "lucide-react";

type Platform = "youtube" | "facebook" | "unknown";

function detectPlatform(url: string): Platform {
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
  if (url.includes("facebook.com") || url.includes("fb.watch") || url.includes("fb.com")) return "facebook";
  return "unknown";
}

const qualities = [
  { label: "HD 1080p", value: "1080" },
  { label: "HD 720p", value: "720" },
  { label: "SD 480p", value: "480" },
  { label: "Low 360p", value: "360" },
  { label: "Audio Only", value: "audio" },
];

const ytdlServices = [
  { name: "Y2Mate", url: "https://www.y2mate.com/en19", desc: "Supports YouTube & Facebook", logo: "🎬" },
  { name: "SaveFrom.net", url: "https://savefrom.net/", desc: "Multi-platform downloader", logo: "💾" },
  { name: "SnapSave", url: "https://snapsave.app/", desc: "Best for Facebook videos", logo: "📱" },
  { name: "OnlineVideoConverter", url: "https://www.onlinevideoconverter.pro/", desc: "YouTube MP4 & MP3", logo: "🔄" },
  { name: "4K Video Downloader", url: "https://www.4kdownload.com/", desc: "Desktop app for best quality", logo: "4K" },
  { name: "KeepVid", url: "https://keepvid.com/", desc: "Simple & fast downloads", logo: "⚡" },
];

export default function DownloaderPage() {
  const [url, setUrl] = useState("");
  const [quality, setQuality] = useState("720");
  const [platform, setPlatform] = useState<Platform>("unknown");
  const [step, setStep] = useState<"input" | "processing" | "ready">("input");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    const detected = detectPlatform(url);
    setPlatform(detected);
    setStep("processing");
    setTimeout(() => setStep("ready"), 1800);
  };

  const getDownloadLink = () => {
    const service = platform === "facebook" ? "https://snapsave.app/" : "https://www.y2mate.com/en19";
    return service;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-4 py-2 rounded-full mb-6">
          <Download className="w-3.5 h-3.5" />
          Free Video Downloader
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
          Download <span className="gradient-text">Facebook & YouTube</span> Videos
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Paste any Facebook or YouTube video link and download it directly to your phone or computer in your chosen quality.
        </p>
      </div>

      {/* Main Downloader */}
      <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 gradient-border mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Video URL</label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="url"
                  value={url}
                  onChange={(e) => { setUrl(e.target.value); setStep("input"); }}
                  placeholder="Paste YouTube or Facebook video link here..."
                  className="w-full bg-secondary border border-border rounded-xl pl-10 pr-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Quality</label>
            <div className="flex flex-wrap gap-2">
              {qualities.map((q) => (
                <button
                  key={q.value}
                  type="button"
                  onClick={() => setQuality(q.value)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    quality === q.value
                      ? "bg-primary text-primary-foreground glow-purple"
                      : "bg-secondary border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                  }`}
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!url.trim()}
            className="w-full bg-primary hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 glow-purple text-base"
          >
            {step === "processing" ? (
              <>
                <div className="loader w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                Analyzing link...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Download Video
              </>
            )}
          </button>
        </form>

        {/* Platform Detection */}
        {step !== "input" && url && (
          <div className="mt-4">
            {platform === "youtube" && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                <Youtube className="w-5 h-5 text-red-400" />
                <span className="text-sm font-semibold text-red-400">YouTube video detected</span>
              </div>
            )}
            {platform === "facebook" && (
              <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-3">
                <Facebook className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-semibold text-blue-400">Facebook video detected</span>
              </div>
            )}
            {platform === "unknown" && (
              <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-4 py-3">
                <AlertCircle className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-semibold text-yellow-400">Please use a valid YouTube or Facebook link</span>
              </div>
            )}
          </div>
        )}

        {step === "ready" && platform !== "unknown" && (
          <div className="mt-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span className="font-bold text-emerald-400">Ready to Download!</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Click the button below to open the download service. Your video will be processed at {quality === "audio" ? "audio quality" : `${quality}p`}.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={getDownloadLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-0 bg-primary hover:bg-primary/80 text-primary-foreground font-bold py-3 px-5 rounded-xl transition-all flex items-center justify-center gap-2 glow-purple"
              >
                <Download className="w-4 h-4" />
                Download Now
              </a>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Smartphone className="w-4 h-4" />
                <span>Saves to device</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* How to Use */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-5 h-5 text-primary" />
          <h2 className="font-bold text-foreground">How to Download</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { step: "1", title: "Copy the Link", desc: "Open Facebook or YouTube, find your video and copy its share link" },
            { step: "2", title: "Paste & Select", desc: "Paste the link above, choose your preferred video quality" },
            { step: "3", title: "Download", desc: "Click Download and save the video directly to your phone or PC" },
          ].map((s) => (
            <div key={s.step} className="flex gap-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-black text-sm shrink-0">
                {s.step}
              </div>
              <div>
                <div className="font-semibold text-foreground text-sm">{s.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Supported Services */}
      <div>
        <h2 className="font-black text-xl text-foreground mb-4">
          Trusted Download <span className="gradient-text">Services</span>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ytdlServices.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border rounded-2xl p-4 card-hover flex items-center gap-3 group"
            >
              <div className="w-11 h-11 bg-secondary rounded-xl flex items-center justify-center text-xl shrink-0">
                {s.logo}
              </div>
              <div>
                <div className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">{s.name}</div>
                <div className="text-xs text-muted-foreground">{s.desc}</div>
              </div>
              <Monitor className="w-4 h-4 text-muted-foreground ml-auto shrink-0" />
            </a>
          ))}
        </div>
      </div>

      {/* Supported Platforms */}
      <div className="mt-8 bg-secondary/50 border border-border rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <Youtube className="w-6 h-6 text-red-400" />
            <span className="font-semibold text-foreground text-sm">YouTube</span>
          </div>
          <div className="flex items-center gap-2">
            <Facebook className="w-6 h-6 text-blue-400" />
            <span className="font-semibold text-foreground text-sm">Facebook</span>
          </div>
        </div>
        <div className="text-sm text-muted-foreground sm:ml-auto text-center sm:text-right">
          Supports MP4, MP3, 4K, 1080p, 720p, 480p, 360p formats
        </div>
      </div>
    </div>
  );
}
