import { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Droplets, Thermometer, MapPin, Search } from "lucide-react";

const API_KEY = "9677ce5820af92531ed5f16a607d1df3";

interface WeatherData {
  name: string;
  sys: { country: string };
  weather: Array<{ main: string; description: string; icon: string }>;
  main: { temp: number; feels_like: number; humidity: number; temp_min: number; temp_max: number };
  wind: { speed: number };
}

function WeatherIcon({ condition }: { condition: string }) {
  const c = condition.toLowerCase();
  if (c.includes("rain") || c.includes("drizzle")) return <CloudRain className="w-8 h-8 text-blue-400" />;
  if (c.includes("snow")) return <CloudSnow className="w-8 h-8 text-blue-200" />;
  if (c.includes("cloud")) return <Cloud className="w-8 h-8 text-gray-400" />;
  if (c.includes("wind")) return <Wind className="w-8 h-8 text-teal-400" />;
  return <Sun className="w-8 h-8 text-yellow-400" />;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [city, setCity] = useState("Monrovia");
  const [inputCity, setInputCity] = useState("");

  const fetchWeather = async (cityName: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);
      setCity(cityName);
    } catch {
      setError("City not found. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather("Monrovia");
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCity.trim()) fetchWeather(inputCity.trim());
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-5 gradient-border">
      <div className="flex items-center gap-2 mb-4">
        <Sun className="w-5 h-5 text-yellow-400" />
        <h3 className="font-bold text-foreground">Live Weather</h3>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          placeholder="Search city..."
          className="flex-1 bg-secondary border border-border rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
        />
        <button
          type="submit"
          className="px-3 py-2 bg-primary hover:bg-primary/80 text-primary-foreground rounded-xl transition-all"
        >
          <Search className="w-4 h-4" />
        </button>
      </form>

      {loading && (
        <div className="flex items-center justify-center py-6">
          <div className="loader w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full" />
        </div>
      )}

      {error && <p className="text-destructive text-sm text-center py-4">{error}</p>}

      {weather && !loading && (
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-1">
                <MapPin className="w-3.5 h-3.5" />
                {weather.name}, {weather.sys.country}
              </div>
              <div className="text-4xl font-black text-foreground">{Math.round(weather.main.temp)}°C</div>
              <div className="text-sm text-muted-foreground capitalize mt-0.5">{weather.weather[0].description}</div>
            </div>
            <WeatherIcon condition={weather.weather[0].main} />
          </div>

          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="bg-secondary/50 rounded-xl p-2.5 text-center">
              <Droplets className="w-4 h-4 text-blue-400 mx-auto mb-1" />
              <div className="text-xs text-muted-foreground">Humidity</div>
              <div className="text-sm font-bold text-foreground">{weather.main.humidity}%</div>
            </div>
            <div className="bg-secondary/50 rounded-xl p-2.5 text-center">
              <Wind className="w-4 h-4 text-teal-400 mx-auto mb-1" />
              <div className="text-xs text-muted-foreground">Wind</div>
              <div className="text-sm font-bold text-foreground">{weather.wind.speed} m/s</div>
            </div>
            <div className="bg-secondary/50 rounded-xl p-2.5 text-center">
              <Thermometer className="w-4 h-4 text-orange-400 mx-auto mb-1" />
              <div className="text-xs text-muted-foreground">Feels Like</div>
              <div className="text-sm font-bold text-foreground">{Math.round(weather.main.feels_like)}°C</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
