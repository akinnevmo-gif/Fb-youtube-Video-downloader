import { MessageCircle, X, Users } from "lucide-react";
import { useState } from "react";

const WA_NUMBER = "2347043125375";
const WA_GROUP = "https://chat.whatsapp.com/KMGciQZFFlYABXeEu9iFeS";

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-green-200 dark:border-green-800 w-72 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-green-600 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Social HK Support</p>
                <p className="text-green-100 text-xs">Typically replies instantly</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4 space-y-3">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3">
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                👋 Hi! Welcome to <strong>Social HK</strong> by SAS Tech Inc. How can we help you today?
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href={`https://wa.me/${WA_NUMBER}?text=Hi%20Social%20HK%2C%20I%20need%20help%20with...`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Chat with Support
              </a>
              <a
                href={WA_GROUP}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              >
                <Users className="w-4 h-4" />
                Join WhatsApp Group
              </a>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="WhatsApp Chat"
      >
        {open ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-7 h-7 text-white" />
        )}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-[9px] font-bold">1</span>
        </span>
      </button>
    </div>
  );
}
