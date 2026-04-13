import { useState, useEffect } from "react";
import { Download, Link as LinkIcon, AlertCircle, Youtube, Facebook, CheckCircle, Info, Clipboard, Clock, Trash2, Star, ExternalLink } from "lucide-react";

type Platform = "youtube" | "facebook" | "tiktok" | "instagram" | "twitter" | "vimeo" | "reddit" | "pinterest" | "linkedin" | "dailymotion" | "unknown";

function detectPlatform(url: string): Platform {
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
  if (url.includes("facebook.com") || url.includes("fb.watch") || url.includes("fb.com")) return "facebook";
  if (url.includes("tiktok.com") || url.includes("vm.tiktok")) return "tiktok";
  if (url.includes("instagram.com")) return "instagram";
  if (url.includes("twitter.com") || url.includes("x.com") || url.includes("t.co")) return "twitter";
  if (url.includes("vimeo.com")) return "vimeo";
  if (url.includes("reddit.com") || url.includes("redd.it")) return "reddit";
  if (url.includes("pinterest.com") || url.includes("pin.it")) return "pinterest";
  if (url.includes("linkedin.com")) return "linkedin";
  if (url.includes("dailymotion.com")) return "dailymotion";
  return "unknown";
}

const platformInfo: Record<Platform, { label: string; color: string; bg: string; emoji: string; service: string }> = {
  youtube: { label: "YouTube", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20", emoji: "▶️", service: "https://yt5s.io/en68/" },
  facebook: { label: "Facebook", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20", emoji: "📘", service: "https://snapsave.app/" },
  tiktok: { label: "TikTok", color: "text-pink-400", bg: "bg-pink-500/10 border-pink-500/20", emoji: "🎵", service: "https://ssstik.io/" },
  instagram: { label: "Instagram", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20", emoji: "📸", service: "https://snapinsta.app/" },
  twitter: { label: "Twitter/X", color: "text-sky-400", bg: "bg-sky-500/10 border-sky-500/20", emoji: "🐦", service: "https://saver.direct/twitter-video-downloader/" },
  vimeo: { label: "Vimeo", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20", emoji: "🎬", service: "https://vimeodownloader.com/" },
  reddit: { label: "Reddit", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20", emoji: "🔴", service: "https://redditsave.com/" },
  pinterest: { label: "Pinterest", color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/20", emoji: "📌", service: "https://pinterestdownloader.io/" },
  linkedin: { label: "LinkedIn", color: "text-blue-300", bg: "bg-blue-400/10 border-blue-400/20", emoji: "💼", service: "https://linkedinsaver.com/" },
  dailymotion: { label: "Dailymotion", color: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/20", emoji: "🎥", service: "https://dailymotiondownloader.net/" },
  unknown: { label: "Unknown", color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20", emoji: "❓", service: "https://savefrom.net/" },
};

const qualities = [
  { label: "4K Ultra HD", value: "2160", badge: "🔥" },
  { label: "HD 1080p", value: "1080", badge: "" },
  { label: "HD 720p", value: "720", badge: "" },
  { label: "SD 480p", value: "480", badge: "" },
  { label: "Low 360p", value: "360", badge: "" },
  { label: "Audio Only (MP3)", value: "audio", badge: "🎵" },
];

const allPlatforms = [
  { name: "Facebook", emoji: "📘", desc: "Videos, Reels, Stories" },
  { name: "YouTube", emoji: "▶️", desc: "Videos, Shorts, 4K" },
  { name: "TikTok", emoji: "🎵", desc: "No watermark download" },
  { name: "Instagram", emoji: "📸", desc: "Reels, Posts, Stories" },
  { name: "Twitter/X", emoji: "🐦", desc: "Videos, GIFs" },
  { name: "Vimeo", emoji: "🎬", desc: "HD Video downloads" },
  { name: "Reddit", emoji: "🔴", desc: "Video & GIF posts" },
  { name: "Pinterest", emoji: "📌", desc: "Video Pins" },
  { name: "LinkedIn", emoji: "💼", desc: "Business videos" },
  { name: "Dailymotion", emoji: "🎥", desc: "All quality levels" },
  { name: "Twitch", emoji: "💜", desc: "Clips & highlights" },
  { name: "Rumble", emoji: "🎙️", desc: "All public videos" },
];

interface HistoryItem {
  url: string;
  platform: Platform;
  quality: string;
  timestamp: number;
}

export default function DownloaderPage() {
  const [url, setUrl] = useState("");
  const [quality, setQuality] = useState("720");
  const [platform, setPlatform] = useState<Platform>("unknown");
  const [step, setStep] = useState<"input" | "processing" | "ready">("input");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeTab, setActiveTab] = useState<"downloader" | "history">("downloader");

  useEffect(() => {
    const saved = localStorage.getItem("shk-dl-history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    const detected = detectPlatform(url);
    setPlatform(detected);
    setStep("processing");
    setTimeout(() => {
      setStep("ready");
      if (detected !== "unknown") {
        const item: HistoryItem = { url, platform: detected, quality, timestamp: Date.now() };
        const newHistory = [item, ...history].slice(0, 20);
        setHistory(newHistory);
        localStorage.setItem("shk-dl-history", JSON.stringify(newHistory));
      }
    }, 1500);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      setStep("input");
    } catch {}
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("shk-dl-history");
  };

  const info = platformInfo[platform];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-4 py-2 rounded-full mb-6">
          <Download className="w-3.5 h-3.5" />
          Free Video Downloader — 12+ Platforms
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
          Download Videos from <span className="gradient-text">Any Platform</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Paste any video link from Facebook, YouTube, TikTok, Instagram, Twitter & 7 more platforms. Download in 4K, HD, SD, or audio-only (MP3) — completely free.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { id: "downloader", label: "Downloader", icon: Download },
          { id: "history", label: `History (${history.length})`, icon: Clock },
        ].map((t) => (
          <button key={t.id} onClick={() => setActiveTab(t.id as "downloader" | "history")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === t.id ? "bg-primary text-primary-foreground glow-purple" : "bg-secondary border border-border text-muted-foreground hover:text-foreground"}`}>
            <t.icon className="w-4 h-4" />
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === "downloader" && (
        <>
          {/* Main Downloader Card */}
          <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 gradient-border mb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Video URL</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => { setUrl(e.target.value); setStep("input"); }}
                      placeholder="Paste YouTube, Facebook, TikTok, Instagram... link here"
                      className="w-full bg-secondary border border-border rounded-xl pl-10 pr-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <button type="button" onClick={handlePaste}
                    className="px-4 py-3.5 bg-secondary border border-border rounded-xl text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all flex items-center gap-2 text-sm font-medium">
                    <Clipboard className="w-4 h-4" />
                    <span className="hidden sm:inline">Paste</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Quality</label>
                <div className="flex flex-wrap gap-2">
                  {qualities.map((q) => (
                    <button key={q.value} type="button" onClick={() => setQuality(q.value)}
                      className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${quality === q.value ? "bg-primary text-primary-foreground glow-purple" : "bg-secondary border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"}`}>
                      {q.badge && <span className="mr-1">{q.badge}</span>}{q.label}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" disabled={!url.trim()}
                className="w-full bg-primary hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 glow-purple text-base">
                {step === "processing" ? (
                  <>
                    <div className="loader w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                    Detecting Platform...
                  </>
                ) : (
                  <><Download className="w-5 h-5" />Download Video</>
                )}
              </button>
            </form>

            {step !== "input" && url && (
              <div className="mt-4">
                <div className={`flex items-center gap-2 rounded-xl px-4 py-3 border ${info.bg}`}>
                  <span className="text-lg">{info.emoji}</span>
                  <span className={`text-sm font-semibold ${info.color}`}>{info.label} video detected</span>
                  {platform === "unknown" && <span className="text-yellow-300 text-xs ml-1">— please use a valid video link</span>}
                </div>
              </div>
            )}

            {step === "ready" && platform !== "unknown" && (
              <div className="mt-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="font-bold text-emerald-400">Ready to Download!</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Click the button to open the best download service for {info.label}. Your video will be processed at{" "}
                  <strong className="text-foreground">{quality === "audio" ? "MP3 Audio" : `${quality}p quality`}</strong>.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href={info.service} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-primary-foreground font-bold py-3 px-6 rounded-xl transition-all glow-purple">
                    <Download className="w-4 h-4" />
                    Download Now
                  </a>
                  <a href={`https://savefrom.net/#url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-secondary border border-border text-foreground font-semibold py-3 px-4 rounded-xl transition-all hover:border-primary/40 text-sm">
                    <ExternalLink className="w-4 h-4" />
                    Alternative
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* How It Works */}
          <div className="bg-card border border-border rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-5">
              <Info className="w-5 h-5 text-primary" />
              <h2 className="font-bold text-foreground">How to Download in 3 Steps</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                { step: "1", title: "Copy the Link", desc: "Open any social media app, find your video and tap Share → Copy Link", emoji: "📋" },
                { step: "2", title: "Paste & Choose Quality", desc: "Paste the link above, pick your quality (4K, HD, SD or MP3)", emoji: "⚙️" },
                { step: "3", title: "Click Download", desc: "Hit the Download button and save your video to your phone or PC", emoji: "💾" },
              ].map((s) => (
                <div key={s.step} className="flex gap-3">
                  <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-black text-sm shrink-0">{s.step}</div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">{s.emoji} {s.title}</div>
                    <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Supported Platforms */}
          <div>
            <h2 className="font-black text-xl text-foreground mb-5">
              Supported <span className="gradient-text">Platforms</span>
              <span className="text-muted-foreground font-normal text-base ml-2">(12+)</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {allPlatforms.map((p) => (
                <div key={p.name} className="bg-card border border-border rounded-xl p-4 flex items-center gap-3 card-hover">
                  <span className="text-2xl">{p.emoji}</span>
                  <div>
                    <div className="font-bold text-foreground text-sm">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-8 bg-secondary/30 border border-border rounded-2xl p-6">
            <h3 className="font-bold text-foreground mb-4">Frequently Asked Questions</h3>
            <div className="space-y-3">
              {[
                { q: "Is it free to download?", a: "Yes! Social HK is 100% free. No registration, no subscription, no hidden fees." },
                { q: "Will videos have watermarks?", a: "No. TikTok downloads are watermark-free. Other platforms deliver original quality." },
                { q: "What formats can I download?", a: "MP4 video (360p to 4K) and MP3 audio. Format depends on platform support." },
                { q: "Is it legal to download videos?", a: "Only download videos you own or have permission to download. Respect copyright laws." },
              ].map((f) => (
                <div key={f.q} className="border-b border-border/50 pb-3 last:border-0 last:pb-0">
                  <p className="font-semibold text-foreground text-sm mb-1">{f.q}</p>
                  <p className="text-muted-foreground text-xs leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === "history" && (
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-foreground">Download History</h2>
            {history.length > 0 && (
              <button onClick={clearHistory} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
                Clear All
              </button>
            )}
          </div>
          {history.length === 0 ? (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
              <p className="text-muted-foreground">No download history yet.</p>
              <p className="text-xs text-muted-foreground/70 mt-1">Your recent downloads will appear here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((item, i) => {
                const pInfo = platformInfo[item.platform];
                return (
                  <div key={i} className="flex items-center gap-3 bg-secondary rounded-xl p-3">
                    <span className="text-xl">{pInfo.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground text-sm font-medium truncate">{item.url}</p>
                      <p className="text-muted-foreground text-xs">
                        {pInfo.label} • {item.quality === "audio" ? "MP3" : `${item.quality}p`} • {new Date(item.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    <a href={pInfo.service} target="_blank" rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded-lg flex items-center gap-1 shrink-0">
                      <Download className="w-3 h-3" />
                      Re-download
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
