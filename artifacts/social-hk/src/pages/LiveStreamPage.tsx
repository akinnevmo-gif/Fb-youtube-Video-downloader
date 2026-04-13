import { useState } from "react";
import { Tv, Film, Music, Trophy, Globe, BookOpen, Radio } from "lucide-react";

type Category = "all" | "movies" | "sports" | "news" | "music" | "education" | "entertainment";

interface Stream {
  title: string;
  category: Category;
  videoId: string;
  isLive: boolean;
  badge?: string;
}

const liveStreams: Stream[] = [
  // YouTube Live Streams provided by user
  { title: "Global News 24/7", category: "news", videoId: "36YnV9STBqc", isLive: true, badge: "LIVE" },
  { title: "Entertainment Live", category: "entertainment", videoId: "7f7MgaME7Sc", isLive: true, badge: "LIVE" },
  { title: "Music Hits Live", category: "music", videoId: "CkchxBUtXu4", isLive: true, badge: "LIVE" },
  { title: "Sports Action Live", category: "sports", videoId: "0FBiyFpV__g", isLive: true, badge: "LIVE" },
  { title: "Movies & Cinema", category: "movies", videoId: "IkmLXvBfVv0", isLive: true, badge: "LIVE" },
  { title: "World Radio Live", category: "news", videoId: "rEKifG2XUZg", isLive: true, badge: "LIVE" },
  { title: "Hip Hop & Afrobeats", category: "music", videoId: "vuTY4FDAbpA", isLive: true, badge: "LIVE" },
  { title: "Documentary Channel", category: "education", videoId: "C96oohpWBGw", isLive: true, badge: "LIVE" },
  { title: "Action Movies Live", category: "movies", videoId: "e2gC37ILQmk", isLive: true, badge: "LIVE" },
  { title: "Tech & Science", category: "education", videoId: "imQGaX_ZdiI", isLive: true, badge: "LIVE" },
  { title: "Pop Music 24/7", category: "music", videoId: "0uaZ30NEHLU", isLive: true, badge: "LIVE" },
  { title: "Movie Classics", category: "movies", videoId: "Eiw4fp8EKMs", isLive: false },
  { title: "Comedy TV", category: "entertainment", videoId: "UEyEs8AE1ss", isLive: true, badge: "LIVE" },
  { title: "Football Live", category: "sports", videoId: "iipR5yUp36o", isLive: true, badge: "LIVE" },
  { title: "Drama Series", category: "movies", videoId: "G43NInZfoPE", isLive: true, badge: "LIVE" },
  { title: "World Music Live", category: "music", videoId: "zcnkA83gBp0", isLive: true, badge: "LIVE" },
  { title: "Live Sports Show", category: "sports", videoId: "XWq5kBlakcQ", isLive: true, badge: "LIVE" },
  // Additional global streams
  { title: "Africa News Live", category: "news", videoId: "kMItKpXgFYY", isLive: true, badge: "LIVE" },
  { title: "USA News Live", category: "news", videoId: "vOTiJkg1voo", isLive: true, badge: "LIVE" },
  { title: "BBC World News", category: "news", videoId: "w_Ma8oQLmSM", isLive: true, badge: "LIVE" },
  { title: "Latino Music Live", category: "music", videoId: "MmKHwYoMwJQ", isLive: true, badge: "LIVE" },
  { title: "NBA Basketball", category: "sports", videoId: "4z8Uq4mOhDg", isLive: true, badge: "LIVE" },
  { title: "Cricket Live", category: "sports", videoId: "n4KEF37JDnw", isLive: true, badge: "LIVE" },
  { title: "Bollywood Movies", category: "movies", videoId: "VSjfE_gIstU", isLive: true, badge: "LIVE" },
  { title: "Animation & Cartoon", category: "entertainment", videoId: "DRhpxQXFQO4", isLive: true, badge: "LIVE" },
  { title: "Gospel Music Live", category: "music", videoId: "8mMqLVt7XLI", isLive: true, badge: "LIVE" },
  { title: "Science Discovery", category: "education", videoId: "F2WKuKCyKks", isLive: true, badge: "LIVE" },
  { title: "Nature Documentary", category: "education", videoId: "WLyfgzpEW1Q", isLive: true, badge: "LIVE" },
  { title: "Afrobeats Music", category: "music", videoId: "1-yQkFpLOUI", isLive: true, badge: "LIVE" },
  { title: "Tennis Live", category: "sports", videoId: "YhBexKRHjKo", isLive: true, badge: "LIVE" },
  { title: "Thriller Movies", category: "movies", videoId: "jfKfPfyJRdk", isLive: true, badge: "LIVE" },
  { title: "Horror Movies", category: "movies", videoId: "Zm7prVSmOq8", isLive: true, badge: "LIVE" },
  { title: "R&B Music Stream", category: "music", videoId: "3oZfAXXxfn0", isLive: true, badge: "LIVE" },
  { title: "Kids Education", category: "education", videoId: "TddFqZj1JXo", isLive: true, badge: "LIVE" },
  { title: "Cooking Shows", category: "entertainment", videoId: "LXb3EKWsInQ", isLive: true, badge: "LIVE" },
  { title: "Fashion Live", category: "entertainment", videoId: "uK72S6HtFzA", isLive: true, badge: "LIVE" },
  { title: "Jazz Music Live", category: "music", videoId: "neV3EPgvZ3g", isLive: true, badge: "LIVE" },
  { title: "African Movies", category: "movies", videoId: "BhkHqwjmCWg", isLive: true, badge: "LIVE" },
  { title: "European Football", category: "sports", videoId: "JJCBOkN_j_s", isLive: true, badge: "LIVE" },
  { title: "Classic Movies", category: "movies", videoId: "ZsIwFMhWFAI", isLive: true, badge: "LIVE" },
  { title: "Gaming Streams", category: "entertainment", videoId: "72bUOKrCJ5o", isLive: true, badge: "LIVE" },
  { title: "Rap & Hip Hop", category: "music", videoId: "9bZkp7q19f0", isLive: true, badge: "LIVE" },
  { title: "Documentary World", category: "education", videoId: "7n9Ctu0yBuE", isLive: true, badge: "LIVE" },
  { title: "Nollywood Live", category: "movies", videoId: "QAKSs7K8bxA", isLive: true, badge: "LIVE" },
  { title: "Mixed Martial Arts", category: "sports", videoId: "Fmwfmee4ZQo", isLive: true, badge: "LIVE" },
  { title: "Country Music Live", category: "music", videoId: "HgzGwKwLmgM", isLive: true, badge: "LIVE" },
  { title: "Talk Shows Live", category: "entertainment", videoId: "9h3FzEyRRKc", isLive: true, badge: "LIVE" },
  { title: "Anime Stream", category: "entertainment", videoId: "6nYOJ5MqGv0", isLive: true, badge: "LIVE" },
  { title: "History Channel", category: "education", videoId: "WGiA5mFP_Bs", isLive: true, badge: "LIVE" },
  { title: "Romance Movies", category: "movies", videoId: "ZdJSi_OQPCE", isLive: true, badge: "LIVE" },
];

const categories: Array<{ id: Category; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { id: "all", label: "All", icon: Globe },
  { id: "movies", label: "Movies", icon: Film },
  { id: "sports", label: "Sports", icon: Trophy },
  { id: "music", label: "Music", icon: Music },
  { id: "news", label: "News", icon: Radio },
  { id: "education", label: "Education", icon: BookOpen },
  { id: "entertainment", label: "Entertainment", icon: Tv },
];

export default function LiveStreamPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null);

  const filtered = activeCategory === "all" ? liveStreams : liveStreams.filter((s) => s.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold px-4 py-2 rounded-full mb-6">
          <div className="w-2 h-2 bg-red-500 rounded-full pulse-dot" />
          Live Streaming
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
          Watch <span className="gradient-text">Live TV & Movies</span>
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          50+ live YouTube channels and free public license streams — movies, sports, music, news, and more. No subscription needed.
        </p>
      </div>

      {/* Selected Stream Player */}
      {selectedStream && (
        <div className="mb-8">
          <div className="bg-card border border-primary/30 rounded-2xl overflow-hidden glow-purple">
            <div className="flex items-center justify-between px-4 py-3 bg-secondary/50">
              <div className="flex items-center gap-2">
                {selectedStream.isLive && (
                  <span className="flex items-center gap-1 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 bg-white rounded-full pulse-dot" />
                    LIVE
                  </span>
                )}
                <span className="font-bold text-foreground text-sm">{selectedStream.title}</span>
              </div>
              <button
                onClick={() => setSelectedStream(null)}
                className="text-muted-foreground hover:text-foreground text-xs bg-secondary px-3 py-1.5 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${selectedStream.videoId}?autoplay=1&mute=0`}
                title={selectedStream.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
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

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filtered.map((stream) => (
          <button
            key={stream.videoId}
            onClick={() => setSelectedStream(stream)}
            className="group bg-card border border-border rounded-2xl overflow-hidden card-hover text-left relative"
          >
            <div className="relative">
              <img
                src={`https://img.youtube.com/vi/${stream.videoId}/mqdefault.jpg`}
                alt={stream.title}
                className="w-full aspect-video object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${stream.videoId}/0.jpg`;
                }}
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-xl">
                  <Tv className="w-6 h-6 text-white" />
                </div>
              </div>
              {stream.isLive && (
                <span className="absolute top-2 left-2 flex items-center gap-1 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 bg-white rounded-full pulse-dot" />
                  LIVE
                </span>
              )}
            </div>
            <div className="p-3">
              <p className="text-xs font-semibold text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2">
                {stream.title}
              </p>
              <span className="inline-block mt-1.5 text-[10px] font-medium text-muted-foreground capitalize bg-secondary rounded-full px-2 py-0.5">
                {stream.category}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 bg-card border border-border rounded-2xl p-6 text-center">
        <p className="text-muted-foreground text-sm">
          Showing <span className="text-primary font-bold">{filtered.length}</span> streams. All streams are publicly available YouTube content.
          Click any channel to start watching live.
        </p>
      </div>
    </div>
  );
}
