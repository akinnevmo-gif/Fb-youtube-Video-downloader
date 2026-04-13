import { useState } from "react";
import { CreditCard, RefreshCw, Copy, CheckCircle, Shield, Info } from "lucide-react";

type CardType = "visa" | "mastercard" | "amex" | "discover" | "unionpay" | "verve";

interface CardData {
  type: CardType;
  number: string;
  name: string;
  expiry: string;
  cvv: string;
  bank: string;
  color: string;
  gradient: string;
}

function luhnGenerate(prefix: string, length: number): string {
  let number = prefix;
  while (number.length < length - 1) {
    number += Math.floor(Math.random() * 10).toString();
  }
  let sum = 0;
  let isEven = true;
  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number[i], 10);
    if (isEven) { digit *= 2; if (digit > 9) digit -= 9; }
    sum += digit;
    isEven = !isEven;
  }
  const checkDigit = (10 - (sum % 10)) % 10;
  return number + checkDigit.toString();
}

function formatCardNumber(num: string, type: CardType): string {
  if (type === "amex") return num.replace(/(\d{4})(\d{6})(\d{5})/, "$1 $2 $3");
  return num.replace(/(\d{4})/g, "$1 ").trim();
}

const cardConfigs: Record<CardType, { prefix: string; length: number; cvvLen: number; banks: string[] }> = {
  visa: { prefix: "4", length: 16, cvvLen: 3, banks: ["Chase Bank", "Bank of America", "Wells Fargo", "Citibank"] },
  mastercard: { prefix: "52", length: 16, cvvLen: 3, banks: ["HSBC", "Barclays", "Deutsche Bank", "Santander"] },
  amex: { prefix: "37", length: 15, cvvLen: 4, banks: ["American Express", "Goldman Sachs", "Navy Federal"] },
  discover: { prefix: "6011", length: 16, cvvLen: 3, banks: ["Discover Financial", "Synchrony Bank"] },
  unionpay: { prefix: "62", length: 16, cvvLen: 3, banks: ["Bank of China", "ICBC", "China Construction Bank"] },
  verve: { prefix: "650", length: 16, cvvLen: 3, banks: ["First Bank Nigeria", "Zenith Bank", "GTBank", "UBA"] },
};

const cardVisuals: Record<CardType, { gradient: string; textColor: string; logo: string }> = {
  visa: { gradient: "from-blue-700 via-blue-600 to-indigo-700", textColor: "text-white", logo: "VISA" },
  mastercard: { gradient: "from-red-700 via-orange-600 to-red-600", textColor: "text-white", logo: "MC" },
  amex: { gradient: "from-teal-700 via-teal-600 to-cyan-700", textColor: "text-white", logo: "AMEX" },
  discover: { gradient: "from-orange-600 via-amber-500 to-orange-600", textColor: "text-white", logo: "DISC" },
  unionpay: { gradient: "from-red-800 via-red-700 to-rose-700", textColor: "text-white", logo: "UP" },
  verve: { gradient: "from-green-700 via-emerald-600 to-green-700", textColor: "text-white", logo: "VERVE" },
};

const names = ["James Wilson", "Sarah Johnson", "Michael Brown", "Emma Davis", "David Martinez", "Aisha Koroma", "Kwame Mensah", "Fatima Al-Hassan"];
const months = ["01","02","03","04","05","06","07","08","09","10","11","12"];

function generateCard(type: CardType): CardData {
  const config = cardConfigs[type];
  const visual = cardVisuals[type];
  const number = luhnGenerate(config.prefix, config.length);
  const year = (new Date().getFullYear() + Math.floor(Math.random() * 5) + 1).toString().slice(-2);
  const month = months[Math.floor(Math.random() * 12)];
  const cvv = Array.from({ length: config.cvvLen }, () => Math.floor(Math.random() * 10)).join("");
  const bank = config.banks[Math.floor(Math.random() * config.banks.length)];
  const name = names[Math.floor(Math.random() * names.length)];
  return { type, number, name, expiry: `${month}/${year}`, cvv, bank, color: visual.logo, gradient: visual.gradient };
}

export default function VirtualCardPage() {
  const [selectedType, setSelectedType] = useState<CardType>("visa");
  const [card, setCard] = useState<CardData>(() => generateCard("visa"));
  const [copied, setCopied] = useState<string | null>(null);
  const [flipped, setFlipped] = useState(false);

  const handleGenerate = () => {
    setCard(generateCard(selectedType));
    setFlipped(false);
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const visual = cardVisuals[card.type];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold px-4 py-2 rounded-full mb-6">
          <CreditCard className="w-3.5 h-3.5" />
          Virtual Card Generator
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
          Generate <span className="gradient-text">Virtual Cards</span>
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Generate realistic virtual credit card numbers for testing, privacy, and development purposes. All cards are randomly generated and not linked to real accounts.
        </p>
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4 flex gap-3 mb-8">
        <Info className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
        <p className="text-sm text-yellow-300">
          <strong>Disclaimer:</strong> These virtual card numbers are generated for testing and educational purposes only. They are mathematically valid but not linked to any real bank account or payment system. Do not use them for actual purchases.
        </p>
      </div>

      {/* Card Type Selector */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {(Object.keys(cardConfigs) as CardType[]).map((type) => (
          <button
            key={type}
            onClick={() => { setSelectedType(type); setCard(generateCard(type)); }}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all capitalize ${
              selectedType === type
                ? "bg-primary text-primary-foreground glow-purple"
                : "bg-secondary border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
            }`}
          >
            {type === "amex" ? "AmEx" : type === "unionpay" ? "UnionPay" : type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Card Visual */}
      <div className="flex justify-center mb-8">
        <div
          className="relative w-full max-w-sm cursor-pointer"
          style={{ perspective: "1000px" }}
          onClick={() => setFlipped(!flipped)}
        >
          <div
            className="relative w-full transition-transform duration-700"
            style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
          >
            {/* Front */}
            <div className={`bg-gradient-to-br ${visual.gradient} rounded-3xl p-6 shadow-2xl aspect-[1.586/1] flex flex-col justify-between select-none`}
              style={{ backfaceVisibility: "hidden" }}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-white/60 text-xs mb-1">{card.bank}</div>
                  <div className="text-white font-black text-lg tracking-wide">{visual.logo}</div>
                </div>
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-yellow-400/80 rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-white/40 rounded-full" />
                  ))}
                </div>
                <div className="text-white font-mono font-bold text-lg tracking-widest mb-4">
                  {formatCardNumber(card.number, card.type)}
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-white/50 text-[10px] uppercase tracking-wider mb-0.5">Card Holder</div>
                    <div className="text-white font-semibold text-sm">{card.name}</div>
                  </div>
                  <div>
                    <div className="text-white/50 text-[10px] uppercase tracking-wider mb-0.5">Expires</div>
                    <div className="text-white font-semibold text-sm">{card.expiry}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Back */}
            <div
              className={`bg-gradient-to-br ${visual.gradient} rounded-3xl shadow-2xl aspect-[1.586/1] flex flex-col justify-center absolute inset-0`}
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <div className="h-12 bg-black/40 w-full my-4" />
              <div className="px-6">
                <div className="bg-white/20 rounded-lg px-4 py-2 flex items-center justify-between">
                  <span className="text-white/60 text-xs">CVV</span>
                  <span className="text-white font-mono font-bold tracking-widest">{card.cvv}</span>
                </div>
              </div>
              <div className="px-6 mt-3 text-center">
                <span className="text-white/40 text-xs">Click to flip back</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-muted-foreground text-xs mb-8">Click card to see CVV</p>

      {/* Card Details */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-6">
        <h3 className="font-bold text-foreground mb-4">Card Details</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { label: "Card Number", value: formatCardNumber(card.number, card.type), field: "number" },
            { label: "Card Holder", value: card.name, field: "name" },
            { label: "Expiry Date", value: card.expiry, field: "expiry" },
            { label: "CVV", value: card.cvv, field: "cvv" },
            { label: "Bank Name", value: card.bank, field: "bank" },
            { label: "Card Type", value: card.type.toUpperCase(), field: "type" },
          ].map(({ label, value, field }) => (
            <div key={field} className="bg-secondary rounded-xl p-3 flex items-center justify-between">
              <div>
                <div className="text-xs text-muted-foreground mb-0.5">{label}</div>
                <div className="font-mono font-semibold text-foreground text-sm">{value}</div>
              </div>
              <button
                onClick={() => copyToClipboard(value.replace(/\s/g, ""), field)}
                className="p-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-primary"
              >
                {copied === field ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleGenerate}
        className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 glow-purple text-base"
      >
        <RefreshCw className="w-5 h-5" />
        Generate New Card
      </button>

      <div className="mt-6 flex items-center gap-2 justify-center text-muted-foreground text-xs">
        <Shield className="w-4 h-4 text-emerald-400" />
        All generated cards use the Luhn algorithm for mathematical validity
      </div>
    </div>
  );
}
