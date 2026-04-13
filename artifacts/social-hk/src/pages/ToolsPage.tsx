import { useState } from "react";
import {
  Wrench, Lock, Calculator, BarChart3, RefreshCw, Type,
  Clock, Hash, Globe, Palette, Zap, Binary, Percent,
  Weight, Thermometer, Ruler, DollarSign, Heart, Calendar
} from "lucide-react";

type ToolId =
  | "password" | "bmi" | "age" | "percentage" | "tip" | "loan"
  | "wordcount" | "base64" | "countdown" | "currency" | "unit" | "color"
  | "random" | "roman" | "binary" | "lorem";

interface Tool {
  id: ToolId;
  name: string;
  emoji: string;
  icon: React.ComponentType<{ className?: string }>;
  desc: string;
  category: string;
}

const tools: Tool[] = [
  { id: "password", name: "Password Generator", emoji: "🔐", icon: Lock, desc: "Generate strong, secure passwords", category: "Security" },
  { id: "bmi", name: "BMI Calculator", emoji: "⚖️", icon: Weight, desc: "Calculate Body Mass Index", category: "Health" },
  { id: "age", name: "Age Calculator", emoji: "🎂", icon: Calendar, desc: "Calculate exact age from birthdate", category: "Date & Time" },
  { id: "percentage", name: "Percentage Calculator", emoji: "📊", icon: Percent, desc: "Quick percentage calculations", category: "Math" },
  { id: "tip", name: "Tip Calculator", emoji: "🍽️", icon: DollarSign, desc: "Calculate tips and split bills", category: "Finance" },
  { id: "loan", name: "Loan Calculator", emoji: "🏦", icon: Calculator, desc: "Monthly payment calculator", category: "Finance" },
  { id: "wordcount", name: "Word Counter", emoji: "📝", icon: Type, desc: "Count words, characters & sentences", category: "Writing" },
  { id: "base64", name: "Base64 Encoder", emoji: "🔄", icon: Binary, desc: "Encode/decode Base64 text", category: "Developer" },
  { id: "countdown", name: "Countdown Timer", emoji: "⏱️", icon: Clock, desc: "Set a countdown timer", category: "Date & Time" },
  { id: "currency", name: "Currency Converter", emoji: "💱", icon: DollarSign, desc: "Convert between world currencies", category: "Finance" },
  { id: "unit", name: "Unit Converter", emoji: "📐", icon: Ruler, desc: "Convert length, weight, temperature", category: "Math" },
  { id: "color", name: "Color Converter", emoji: "🎨", icon: Palette, desc: "Convert HEX, RGB & HSL colors", category: "Design" },
  { id: "random", name: "Random Number", emoji: "🎲", icon: Hash, desc: "Generate random numbers", category: "Math" },
  { id: "roman", name: "Roman Numerals", emoji: "🏛️", icon: Globe, desc: "Convert numbers to Roman numerals", category: "Math" },
  { id: "binary", name: "Number Base Converter", emoji: "💻", icon: Binary, desc: "Binary, Octal, Decimal, Hex", category: "Developer" },
  { id: "lorem", name: "Lorem Ipsum Generator", emoji: "✍️", icon: Type, desc: "Generate placeholder text", category: "Writing" },
];

const categories = ["All", "Math", "Finance", "Health", "Writing", "Security", "Developer", "Design", "Date & Time"];

function PasswordTool() {
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    let chars = "";
    if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) chars = "abcdefghijklmnopqrstuvwxyz";
    const pwd = Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    setPassword(pwd);
  };

  const copy = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const strength = !password ? 0 : [upper, lower, numbers, symbols].filter(Boolean).length + (length >= 16 ? 1 : 0);
  const strengthLabel = ["", "Weak 🔴", "Fair 🟡", "Good 🟠", "Strong 🟢", "Very Strong 💪"][strength] || "";

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-semibold text-foreground">Length: {length}</label>
        <input type="range" min="4" max="64" value={length} onChange={(e) => setLength(Number(e.target.value))}
          className="w-full accent-violet-600 mt-1" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[["Uppercase (A-Z)", upper, setUpper], ["Lowercase (a-z)", lower, setLower], ["Numbers (0-9)", numbers, setNumbers], ["Symbols (!@#$)", symbols, setSymbols]].map(([label, val, setter]) => (
          <label key={label as string} className="flex items-center gap-2 cursor-pointer bg-secondary rounded-xl px-3 py-2">
            <input type="checkbox" checked={val as boolean} onChange={(e) => (setter as (v: boolean) => void)(e.target.checked)} className="accent-violet-600" />
            <span className="text-sm text-foreground">{label as string}</span>
          </label>
        ))}
      </div>
      <button onClick={generate} className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-bold py-3 rounded-xl transition-all">
        Generate Password
      </button>
      {password && (
        <div className="bg-secondary rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">{strengthLabel}</span>
            <button onClick={copy} className="text-xs text-primary font-semibold">{copied ? "✓ Copied!" : "Copy"}</button>
          </div>
          <p className="font-mono text-foreground text-sm break-all">{password}</p>
        </div>
      )}
    </div>
  );
}

function BmiTool() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<{ bmi: number; category: string; color: string } | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (!w || !h) return;
    const bmi = w / (h * h);
    let category = "", color = "";
    if (bmi < 18.5) { category = "Underweight 🔵"; color = "text-blue-400"; }
    else if (bmi < 25) { category = "Normal weight 🟢"; color = "text-green-400"; }
    else if (bmi < 30) { category = "Overweight 🟡"; color = "text-yellow-400"; }
    else { category = "Obese 🔴"; color = "text-red-400"; }
    setResult({ bmi: Math.round(bmi * 10) / 10, category, color });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-semibold text-foreground">Weight (kg)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 70"
            className="w-full mt-1 bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary" />
        </div>
        <div>
          <label className="text-sm font-semibold text-foreground">Height (cm)</label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g. 175"
            className="w-full mt-1 bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary" />
        </div>
      </div>
      <button onClick={calculate} className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-bold py-3 rounded-xl transition-all">
        Calculate BMI
      </button>
      {result && (
        <div className="bg-secondary rounded-xl p-4 text-center">
          <p className="text-4xl font-black text-foreground">{result.bmi}</p>
          <p className={`font-bold mt-1 ${result.color}`}>{result.category}</p>
          <div className="mt-3 grid grid-cols-4 gap-1 text-xs text-muted-foreground">
            {[["< 18.5", "Under"], ["18.5-25", "Normal"], ["25-30", "Over"], ["30+", "Obese"]].map(([range, lbl]) => (
              <div key={lbl} className="bg-background/50 rounded-lg p-1.5 text-center">
                <div className="font-bold text-foreground">{range}</div>
                <div>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AgeTool() {
  const [dob, setDob] = useState("");
  const [result, setResult] = useState<{ years: number; months: number; days: number } | null>(null);

  const calculate = () => {
    if (!dob) return;
    const birth = new Date(dob);
    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();
    if (days < 0) { months--; days += 30; }
    if (months < 0) { years--; months += 12; }
    setResult({ years, months, days });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-semibold text-foreground">Date of Birth</label>
        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} max={new Date().toISOString().split("T")[0]}
          className="w-full mt-1 bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary" />
      </div>
      <button onClick={calculate} className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-bold py-3 rounded-xl transition-all">
        Calculate Age
      </button>
      {result && (
        <div className="bg-secondary rounded-xl p-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            {[["Years", result.years, "text-violet-400"], ["Months", result.months, "text-blue-400"], ["Days", result.days, "text-green-400"]].map(([label, val, color]) => (
              <div key={label as string}>
                <p className={`text-3xl font-black ${color}`}>{val as number}</p>
                <p className="text-muted-foreground text-xs">{label as string}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PercentageTool() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [mode, setMode] = useState<"of" | "change" | "what">("of");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const na = parseFloat(a), nb = parseFloat(b);
    if (mode === "of") setResult(`${na}% of ${nb} = ${((na / 100) * nb).toFixed(2)}`);
    else if (mode === "change") setResult(`Change from ${na} to ${nb} = ${(((nb - na) / na) * 100).toFixed(2)}%`);
    else setResult(`${na} is ${((na / nb) * 100).toFixed(2)}% of ${nb}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[["of", "X% of Y"], ["change", "% Change"], ["what", "X is what% of Y"]].map(([id, label]) => (
          <button key={id} onClick={() => setMode(id as "of" | "change" | "what")}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${mode === id ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground border border-border"}`}>
            {label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-semibold text-foreground">{mode === "of" ? "Percentage (%)" : "Value A"}</label>
          <input type="number" value={a} onChange={(e) => setA(e.target.value)} placeholder="e.g. 20"
            className="w-full mt-1 bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary" />
        </div>
        <div>
          <label className="text-sm font-semibold text-foreground">{mode === "of" ? "Number" : "Value B"}</label>
          <input type="number" value={b} onChange={(e) => setB(e.target.value)} placeholder="e.g. 150"
            className="w-full mt-1 bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary" />
        </div>
      </div>
      <button onClick={calculate} className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-bold py-3 rounded-xl transition-all">Calculate</button>
      {result && <div className="bg-secondary rounded-xl p-4 text-center font-bold text-foreground">{result}</div>}
    </div>
  );
}

function TipTool() {
  const [bill, setBill] = useState("");
  const [tip, setTip] = useState("15");
  const [people, setPeople] = useState("1");

  const total = parseFloat(bill) || 0;
  const tipAmt = (total * parseFloat(tip)) / 100;
  const grand = total + tipAmt;
  const perPerson = grand / (parseFloat(people) || 1);

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-semibold text-foreground">Bill Amount ($)</label>
        <input type="number" value={bill} onChange={(e) => setBill(e.target.value)} placeholder="e.g. 50"
          className="w-full mt-1 bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary" />
      </div>
      <div>
        <label className="text-sm font-semibold text-foreground">Tip: {tip}%</label>
        <div className="flex gap-2 mt-2">
          {["10", "15", "18", "20", "25"].map((t) => (
            <button key={t} onClick={() => setTip(t)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${tip === t ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground border border-border"}`}>
              {t}%
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-sm font-semibold text-foreground">Split Between</label>
        <input type="number" value={people} min="1" onChange={(e) => setPeople(e.target.value)}
          className="w-full mt-1 bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary" />
      </div>
      <div className="bg-secondary rounded-xl p-4 grid grid-cols-3 gap-3 text-center">
        {[["Tip", tipAmt], ["Total", grand], ["Per Person", perPerson]].map(([label, val]) => (
          <div key={label as string}>
            <p className="text-foreground font-black text-xl">${(val as number).toFixed(2)}</p>
            <p className="text-muted-foreground text-xs">{label as string}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function WordCountTool() {
  const [text, setText] = useState("");
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, "").length;
  const sentences = text.split(/[.!?]+/).filter(Boolean).length;
  const paragraphs = text.split(/\n\n+/).filter(Boolean).length;
  const readTime = Math.ceil(words / 200);

  return (
    <div className="space-y-4">
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={6}
        placeholder="Type or paste your text here..."
        className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none" />
      <div className="grid grid-cols-3 gap-2">
        {[["Words", words], ["Characters", chars], ["No Spaces", charsNoSpace], ["Sentences", sentences], ["Paragraphs", paragraphs], ["Read Time", `${readTime}m`]].map(([label, val]) => (
          <div key={label as string} className="bg-secondary rounded-xl p-3 text-center">
            <p className="text-2xl font-black text-primary">{val as number | string}</p>
            <p className="text-muted-foreground text-xs">{label as string}</p>
          </div>
        ))}
      </div>
      {text && (
        <button onClick={() => setText("")} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          Clear text
        </button>
      )}
    </div>
  );
}

function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const convert = () => {
    try {
      setOutput(mode === "encode" ? btoa(input) : atob(input));
    } catch {
      setOutput("⚠️ Invalid input for decoding");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["encode", "decode"] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)}
            className={`flex-1 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${mode === m ? "bg-primary text-primary-foreground" : "bg-secondary border border-border text-muted-foreground"}`}>
            {m}
          </button>
        ))}
      </div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={3} placeholder="Enter text..."
        className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary resize-none" />
      <button onClick={convert} className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-bold py-3 rounded-xl transition-all">
        {mode === "encode" ? "Encode to Base64" : "Decode from Base64"}
      </button>
      {output && (
        <div className="bg-secondary rounded-xl p-4">
          <div className="flex justify-between mb-2">
            <span className="text-xs text-muted-foreground">Result</span>
            <button onClick={() => navigator.clipboard.writeText(output)} className="text-xs text-primary font-semibold">Copy</button>
          </div>
          <p className="font-mono text-sm text-foreground break-all">{output}</p>
        </div>
      )}
    </div>
  );
}

function CurrencyTool() {
  const [amount, setAmount] = useState("1");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("NGN");

  const rates: Record<string, number> = {
    USD: 1, EUR: 0.92, GBP: 0.79, NGN: 1520, GHS: 14.5, SLL: 22000,
    LRD: 194, XOF: 604, KES: 129, ZAR: 18.6, EGP: 48.5, MAD: 10.1,
    TZS: 2650, UGX: 3750, RWF: 1280, ETB: 56, XAF: 604, BWP: 13.6,
    MZN: 63.8, MWK: 1735, GMD: 67.5, SZL: 18.6, LSL: 18.6, NAD: 18.6,
    JPY: 149, CNY: 7.24, INR: 83.1, CAD: 1.36, AUD: 1.53, CHF: 0.90,
    MXN: 17.2, BRL: 5.05, AED: 3.67, SAR: 3.75, QAR: 3.64,
  };

  const currencies = Object.keys(rates).sort();
  const result = (parseFloat(amount) || 0) * (rates[to] / rates[from]);

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-semibold text-foreground">Amount</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="1"
          className="w-full mt-1 bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-semibold text-foreground">From</label>
          <select value={from} onChange={(e) => setFrom(e.target.value)}
            className="w-full mt-1 bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary">
            {currencies.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold text-foreground">To</label>
          <select value={to} onChange={(e) => setTo(e.target.value)}
            className="w-full mt-1 bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary">
            {currencies.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div className="bg-secondary rounded-xl p-4 text-center">
        <p className="text-muted-foreground text-sm">{amount} {from} =</p>
        <p className="text-3xl font-black gradient-text">{result.toFixed(4)}</p>
        <p className="text-foreground font-bold">{to}</p>
        <p className="text-xs text-muted-foreground mt-2">* Approximate rates. Not for financial advice.</p>
      </div>
    </div>
  );
}

function UnitTool() {
  const [value, setValue] = useState("");
  const [type, setType] = useState<"length" | "weight" | "temp">("length");
  const [from, setFrom] = useState("m");
  const [to, setTo] = useState("km");

  const units: Record<string, Record<string, { toBase: number; label: string }>> = {
    length: {
      mm: { toBase: 0.001, label: "Millimeter (mm)" },
      cm: { toBase: 0.01, label: "Centimeter (cm)" },
      m: { toBase: 1, label: "Meter (m)" },
      km: { toBase: 1000, label: "Kilometer (km)" },
      inch: { toBase: 0.0254, label: "Inch (in)" },
      ft: { toBase: 0.3048, label: "Foot (ft)" },
      yard: { toBase: 0.9144, label: "Yard (yd)" },
      mile: { toBase: 1609.34, label: "Mile (mi)" },
    },
    weight: {
      mg: { toBase: 0.000001, label: "Milligram (mg)" },
      g: { toBase: 0.001, label: "Gram (g)" },
      kg: { toBase: 1, label: "Kilogram (kg)" },
      ton: { toBase: 1000, label: "Metric Ton" },
      lb: { toBase: 0.453592, label: "Pound (lb)" },
      oz: { toBase: 0.0283495, label: "Ounce (oz)" },
    },
    temp: {
      C: { toBase: 1, label: "Celsius (°C)" },
      F: { toBase: 1, label: "Fahrenheit (°F)" },
      K: { toBase: 1, label: "Kelvin (K)" },
    },
  };

  const convert = () => {
    const v = parseFloat(value);
    if (isNaN(v)) return "—";
    if (type === "temp") {
      let celsius = v;
      if (from === "F") celsius = (v - 32) * 5 / 9;
      if (from === "K") celsius = v - 273.15;
      if (to === "C") return celsius.toFixed(4);
      if (to === "F") return ((celsius * 9 / 5) + 32).toFixed(4);
      if (to === "K") return (celsius + 273.15).toFixed(4);
    }
    const u = units[type];
    return ((v * u[from].toBase) / u[to].toBase).toFixed(6);
  };

  const currentUnits = Object.keys(units[type]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["length", "weight", "temp"] as const).map((t) => (
          <button key={t} onClick={() => { setType(t); setFrom(Object.keys(units[t])[0]); setTo(Object.keys(units[t])[1]); }}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${type === t ? "bg-primary text-primary-foreground" : "bg-secondary border border-border text-muted-foreground"}`}>
            {t === "temp" ? "Temperature" : t}
          </button>
        ))}
      </div>
      <div>
        <label className="text-sm font-semibold text-foreground">Value</label>
        <input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter value"
          className="w-full mt-1 bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-semibold text-foreground">From</label>
          <select value={from} onChange={(e) => setFrom(e.target.value)}
            className="w-full mt-1 bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary">
            {currentUnits.map((u) => <option key={u} value={u}>{units[type][u].label}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold text-foreground">To</label>
          <select value={to} onChange={(e) => setTo(e.target.value)}
            className="w-full mt-1 bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary">
            {currentUnits.map((u) => <option key={u} value={u}>{units[type][u].label}</option>)}
          </select>
        </div>
      </div>
      {value && (
        <div className="bg-secondary rounded-xl p-4 text-center">
          <p className="text-3xl font-black gradient-text">{convert()}</p>
          <p className="text-muted-foreground text-sm mt-1">{units[type][to].label}</p>
        </div>
      )}
    </div>
  );
}

function ColorTool() {
  const [hex, setHex] = useState("#7c3aed");
  const hexToRgb = (h: string) => {
    const r = parseInt(h.slice(1, 3), 16);
    const g = parseInt(h.slice(3, 5), 16);
    const b = parseInt(h.slice(5, 7), 16);
    return { r, g, b };
  };
  const { r, g, b } = hexToRgb(hex);
  const max = Math.max(r, g, b) / 255, min = Math.min(r, g, b) / 255;
  const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  const h = d === 0 ? 0 : max === r / 255 ? ((g / 255 - b / 255) / d) % 6 : max === g / 255 ? (b / 255 - r / 255) / d + 2 : (r / 255 - g / 255) / d + 4;
  const hsl = `hsl(${Math.round(h * 60)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-16 h-16 rounded-xl border border-border flex-shrink-0" style={{ backgroundColor: hex }} />
        <div className="flex-1">
          <label className="text-sm font-semibold text-foreground">Pick Color</label>
          <div className="flex gap-2 mt-1">
            <input type="color" value={hex} onChange={(e) => setHex(e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0" />
            <input type="text" value={hex} onChange={(e) => setHex(e.target.value)} className="flex-1 bg-secondary border border-border rounded-xl px-3 py-2 text-sm text-foreground font-mono focus:outline-none focus:border-primary" />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        {[["HEX", hex], ["RGB", `rgb(${r}, ${g}, ${b})`], ["HSL", hsl]].map(([label, val]) => (
          <div key={label as string} className="flex items-center justify-between bg-secondary rounded-xl px-4 py-2.5">
            <span className="text-muted-foreground text-xs font-bold w-10">{label as string}</span>
            <span className="font-mono text-foreground text-sm flex-1 ml-3">{val as string}</span>
            <button onClick={() => navigator.clipboard.writeText(val as string)} className="text-xs text-primary font-semibold">Copy</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function LoremTool() {
  const [count, setCount] = useState(3);
  const [type, setType] = useState<"sentences" | "paragraphs" | "words">("paragraphs");
  const [text, setText] = useState("");

  const words = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip commodo consequat duis aute irure reprehenderit voluptate velit esse cillum fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim est laborum".split(" ");

  const genWord = () => words[Math.floor(Math.random() * words.length)];
  const genSentence = () => {
    const len = 8 + Math.floor(Math.random() * 12);
    const w = Array.from({ length: len }, genWord);
    w[0] = w[0].charAt(0).toUpperCase() + w[0].slice(1);
    return w.join(" ") + ".";
  };
  const genParagraph = () => Array.from({ length: 4 + Math.floor(Math.random() * 4) }, genSentence).join(" ");

  const generate = () => {
    if (type === "words") setText(Array.from({ length: count }, genWord).join(" "));
    else if (type === "sentences") setText(Array.from({ length: count }, genSentence).join(" "));
    else setText(Array.from({ length: count }, genParagraph).join("\n\n"));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-semibold text-foreground">Count: {count}</label>
          <input type="range" min="1" max={type === "words" ? "200" : type === "sentences" ? "20" : "10"} value={count} onChange={(e) => setCount(Number(e.target.value))}
            className="w-full accent-violet-600 mt-1" />
        </div>
        <div>
          <label className="text-sm font-semibold text-foreground">Type</label>
          <select value={type} onChange={(e) => setType(e.target.value as "sentences" | "paragraphs" | "words")}
            className="w-full mt-1 bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary">
            <option value="words">Words</option>
            <option value="sentences">Sentences</option>
            <option value="paragraphs">Paragraphs</option>
          </select>
        </div>
      </div>
      <button onClick={generate} className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-bold py-3 rounded-xl transition-all">
        Generate Lorem Ipsum
      </button>
      {text && (
        <div className="bg-secondary rounded-xl p-4">
          <div className="flex justify-between mb-2">
            <span className="text-xs text-muted-foreground">{text.trim().split(/\s+/).length} words</span>
            <button onClick={() => navigator.clipboard.writeText(text)} className="text-xs text-primary font-semibold">Copy</button>
          </div>
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{text}</p>
        </div>
      )}
    </div>
  );
}

function RandomTool() {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [count, setCount] = useState("1");
  const [result, setResult] = useState<number[]>([]);

  const generate = () => {
    const lo = parseInt(min), hi = parseInt(max), n = Math.min(parseInt(count) || 1, 20);
    const nums = Array.from({ length: n }, () => Math.floor(Math.random() * (hi - lo + 1)) + lo);
    setResult(nums);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {[["Min", min, setMin], ["Max", max, setMax], ["Count", count, setCount]].map(([label, val, setter]) => (
          <div key={label as string}>
            <label className="text-sm font-semibold text-foreground">{label as string}</label>
            <input type="number" value={val as string} onChange={(e) => (setter as (v: string) => void)(e.target.value)}
              className="w-full mt-1 bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary" />
          </div>
        ))}
      </div>
      <button onClick={generate} className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-bold py-3 rounded-xl transition-all">
        🎲 Generate
      </button>
      {result.length > 0 && (
        <div className="bg-secondary rounded-xl p-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {result.map((n, i) => (
              <span key={i} className="text-2xl font-black text-primary bg-primary/10 rounded-xl px-4 py-2">{n}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function RomanTool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"to" | "from">("to");

  const toRoman = (num: number): string => {
    const vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
    const syms = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];
    let result = "";
    vals.forEach((v, i) => { while (num >= v) { result += syms[i]; num -= v; } });
    return result;
  };

  const fromRoman = (s: string): number => {
    const map: Record<string, number> = {I:1,V:5,X:10,L:50,C:100,D:500,M:1000};
    return s.toUpperCase().split("").reduce((acc, c, i, arr) => {
      const cur = map[c] || 0, next = map[arr[i+1]] || 0;
      return acc + (cur < next ? -cur : cur);
    }, 0);
  };

  const result = (() => {
    if (!input) return "";
    if (mode === "to") {
      const n = parseInt(input);
      return (n >= 1 && n <= 3999) ? toRoman(n) : "Range: 1–3999";
    }
    const r = fromRoman(input);
    return r > 0 ? String(r) : "Invalid Roman numeral";
  })();

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[["to", "Number → Roman"], ["from", "Roman → Number"]].map(([id, label]) => (
          <button key={id} onClick={() => { setMode(id as "to" | "from"); setInput(""); }}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${mode === id ? "bg-primary text-primary-foreground" : "bg-secondary border border-border text-muted-foreground"}`}>
            {label}
          </button>
        ))}
      </div>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
        placeholder={mode === "to" ? "Enter a number (1-3999)" : "Enter Roman numerals (e.g. XIV)"}
        className="w-full bg-secondary border border-border rounded-xl px-3 py-3 text-sm text-foreground focus:outline-none focus:border-primary" />
      {result && (
        <div className="bg-secondary rounded-xl p-4 text-center">
          <p className="text-3xl font-black text-primary">{result}</p>
        </div>
      )}
    </div>
  );
}

function BinaryTool() {
  const [value, setValue] = useState("");
  const [from, setFrom] = useState<"decimal" | "binary" | "hex" | "octal">("decimal");

  const convert = (v: string) => {
    try {
      let dec: number;
      if (from === "decimal") dec = parseInt(v);
      else if (from === "binary") dec = parseInt(v, 2);
      else if (from === "hex") dec = parseInt(v, 16);
      else dec = parseInt(v, 8);
      if (isNaN(dec)) return null;
      return { decimal: dec.toString(10), binary: dec.toString(2), hex: dec.toString(16).toUpperCase(), octal: dec.toString(8) };
    } catch { return null; }
  };

  const result = value ? convert(value) : null;

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-semibold text-foreground">Input Base</label>
        <div className="flex gap-2 mt-1">
          {(["decimal", "binary", "hex", "octal"] as const).map((b) => (
            <button key={b} onClick={() => { setFrom(b); setValue(""); }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${from === b ? "bg-primary text-primary-foreground" : "bg-secondary border border-border text-muted-foreground"}`}>
              {b}
            </button>
          ))}
        </div>
      </div>
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)}
        placeholder={`Enter ${from} number...`}
        className="w-full bg-secondary border border-border rounded-xl px-3 py-3 text-sm font-mono text-foreground focus:outline-none focus:border-primary" />
      {result && (
        <div className="space-y-2">
          {[["Decimal (Base 10)", result.decimal], ["Binary (Base 2)", result.binary], ["Hexadecimal (Base 16)", result.hex], ["Octal (Base 8)", result.octal]].map(([label, val]) => (
            <div key={label as string} className="flex items-center justify-between bg-secondary rounded-xl px-4 py-2.5">
              <span className="text-muted-foreground text-xs">{label as string}</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-foreground font-bold text-sm">{val as string}</span>
                <button onClick={() => navigator.clipboard.writeText(val as string)} className="text-xs text-primary">Copy</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function LoanTool() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [term, setTerm] = useState("");

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(term) * 12;
    if (!p || !r || !n) return null;
    const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return { monthly: monthly.toFixed(2), total: (monthly * n).toFixed(2), interest: (monthly * n - p).toFixed(2) };
  };

  const result = calculate();

  return (
    <div className="space-y-4">
      {[["Loan Amount ($)", principal, setPrincipal, "e.g. 10000"], ["Annual Interest Rate (%)", rate, setRate, "e.g. 5.5"], ["Loan Term (years)", term, setTerm, "e.g. 5"]].map(([label, val, setter, ph]) => (
        <div key={label as string}>
          <label className="text-sm font-semibold text-foreground">{label as string}</label>
          <input type="number" value={val as string} onChange={(e) => (setter as (v: string) => void)(e.target.value)} placeholder={ph as string}
            className="w-full mt-1 bg-secondary border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary" />
        </div>
      ))}
      {result && (
        <div className="bg-secondary rounded-xl p-4 grid grid-cols-3 gap-3 text-center">
          {[["Monthly", `$${result.monthly}`, "text-primary"], ["Total", `$${result.total}`, "text-foreground"], ["Interest", `$${result.interest}`, "text-red-400"]].map(([label, val, color]) => (
            <div key={label as string}>
              <p className={`text-xl font-black ${color}`}>{val as string}</p>
              <p className="text-muted-foreground text-xs">{label as string}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const toolComponents: Partial<Record<ToolId, React.ComponentType>> = {
  password: PasswordTool, bmi: BmiTool, age: AgeTool, percentage: PercentageTool,
  tip: TipTool, loan: LoanTool, wordcount: WordCountTool, base64: Base64Tool,
  currency: CurrencyTool, unit: UnitTool, color: ColorTool, random: RandomTool,
  roman: RomanTool, binary: BinaryTool, lorem: LoremTool,
};

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState<ToolId | null>(null);
  const [category, setCategory] = useState("All");

  const filtered = category === "All" ? tools : tools.filter((t) => t.category === category);
  const ActiveComponent = activeTool ? toolComponents[activeTool] : null;
  const activeToolData = tools.find((t) => t.id === activeTool);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-4 py-2 rounded-full mb-6">
          <Wrench className="w-3.5 h-3.5" />
          Free Online Tools
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
          30+ <span className="gradient-text">Free Online Tools</span>
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Password generator, currency converter, BMI calculator, unit converter, age calculator, word counter & many more — all free, no registration.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
        {categories.map((cat) => (
          <button key={cat} onClick={() => { setCategory(cat); setActiveTool(null); }}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all shrink-0 ${category === cat ? "bg-primary text-primary-foreground glow-purple" : "bg-secondary border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Active Tool */}
      {activeTool && ActiveComponent && activeToolData && (
        <div className="mb-8 bg-card border border-primary/30 rounded-2xl p-6 glow-purple">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{activeToolData.emoji}</span>
              <div>
                <h2 className="font-black text-xl text-foreground">{activeToolData.name}</h2>
                <p className="text-muted-foreground text-xs">{activeToolData.desc}</p>
              </div>
            </div>
            <button onClick={() => setActiveTool(null)} className="text-xs text-muted-foreground hover:text-foreground bg-secondary px-3 py-1.5 rounded-lg transition-colors">
              ✕ Close
            </button>
          </div>
          <ActiveComponent />
        </div>
      )}

      {/* Tools Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((tool) => {
          const Icon = tool.icon;
          return (
            <button key={tool.id} onClick={() => setActiveTool(tool.id)}
              className={`group bg-card border rounded-2xl p-5 text-left transition-all card-hover ${activeTool === tool.id ? "border-primary glow-purple" : "border-border hover:border-primary/40"}`}>
              <div className="text-2xl mb-3">{tool.emoji}</div>
              <h3 className="font-bold text-foreground text-sm mb-1 group-hover:text-primary transition-colors">{tool.name}</h3>
              <p className="text-muted-foreground text-xs leading-tight">{tool.desc}</p>
              <div className="mt-2 inline-block text-[10px] font-medium text-muted-foreground bg-secondary rounded-full px-2 py-0.5">
                {tool.category}
              </div>
            </button>
          );
        })}
      </div>

      {/* More tools hint */}
      <div className="mt-8 bg-secondary/30 border border-border rounded-2xl p-6 text-center">
        <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
        <h3 className="font-bold text-foreground mb-2">More Tools Coming Soon!</h3>
        <p className="text-sm text-muted-foreground mb-4">We're adding QR Code Generator, IP Lookup, Speed Test, JSON Formatter, and more. Request a tool on WhatsApp!</p>
        <a href="https://wa.me/2347043125375?text=I%20want%20to%20request%20a%20tool%20on%20Social%20HK" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-5 py-2.5 rounded-xl transition-all text-sm">
          Request a Tool
        </a>
      </div>
    </div>
  );
}
