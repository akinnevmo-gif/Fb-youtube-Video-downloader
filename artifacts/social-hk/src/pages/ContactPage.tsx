import { useState } from "react";
import { Send, MapPin, Phone, Mail, MessageSquare, CheckCircle, Users } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello SAS Tech Inc!%0A%0AName: ${form.name}%0AEmail: ${form.email}%0APhone: ${form.phone}%0AService: ${form.service}%0A%0AMessage: ${form.message}`;
    window.open(`https://wa.me/2347043125375?text=${msg}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-4 py-2 rounded-full mb-6">
          <MessageSquare className="w-3.5 h-3.5" />
          Get In Touch
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
          Contact <span className="gradient-text">SAS Tech Inc</span>
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Ready to build your website or have questions? Reach out to us directly — we typically respond within 30 minutes on WhatsApp.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Contact Form */}
        <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 gradient-border">
          <h2 className="font-black text-xl text-foreground mb-6">Send Us a Message</h2>

          {sent && (
            <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl p-4 mb-6">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <span className="text-sm font-semibold">Opening WhatsApp with your message!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Full Name *</label>
                <input
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">WhatsApp / Phone</label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+234 xxx xxxx xxx"
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Service Interested In</label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
              >
                <option value="">Select a service...</option>
                <option value="Starter Site ($49)">Starter Site ($49)</option>
                <option value="Business Pro ($99)">Business Pro ($99)</option>
                <option value="E-Commerce Basic ($149)">E-Commerce Basic ($149)</option>
                <option value="Premium Brand Site ($249)">Premium Brand Site ($249)</option>
                <option value="Mobile Web App ($199)">Mobile Web App ($199)</option>
                <option value="Custom Project">Custom Project (Get Quote)</option>
                <option value="General Inquiry">General Inquiry</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Message *</label>
              <textarea
                name="message"
                required
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="Describe your project, questions, or requirements..."
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-base"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Send via WhatsApp
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="font-black text-xl text-foreground mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">WhatsApp Business</div>
                  <a href="https://wa.me/2347043125375" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                    +234 704 312 5375
                  </a>
                  <div className="text-xs text-muted-foreground mt-0.5">Available 8am – 10pm (WAT)</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">Email Address</div>
                  <div className="text-primary text-sm">info@socialhk.com</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Response within 24 hours</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">Office Location</div>
                  <div className="text-muted-foreground text-sm">Monrovia, Liberia</div>
                  <div className="text-xs text-muted-foreground mt-0.5">West Africa</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-600/10 border border-green-600/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-foreground">Join Our WhatsApp Group</div>
                <div className="text-xs text-muted-foreground">Community, updates & support</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Join our active WhatsApp community to get platform updates, free tutorials, exclusive deals, and connect with thousands of members.
            </p>
            <a
              href="https://chat.whatsapp.com/KMGciQZFFlYABXeEu9iFeS?mode=gi_t"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl transition-all text-sm"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Join WhatsApp Group
            </a>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-bold text-foreground mb-3">Business Hours</h3>
            <div className="space-y-2 text-sm">
              {[
                { day: "Monday – Friday", time: "8:00 AM – 10:00 PM (WAT)" },
                { day: "Saturday", time: "9:00 AM – 8:00 PM (WAT)" },
                { day: "Sunday", time: "10:00 AM – 6:00 PM (WAT)" },
              ].map((h) => (
                <div key={h.day} className="flex items-center justify-between">
                  <span className="text-muted-foreground">{h.day}</span>
                  <span className="font-semibold text-foreground text-xs">{h.time}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-1.5">
              <div className="w-2 h-2 bg-green-400 rounded-full pulse-dot" />
              <span className="text-xs text-emerald-400 font-semibold">Currently Available</span>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-bold text-foreground mb-2">Send a Direct Message</h3>
            <p className="text-sm text-muted-foreground mb-4">The fastest way to reach us is through WhatsApp — we respond within 30 minutes.</p>
            <div className="flex gap-3">
              <a
                href="https://wa.me/2347043125375"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold py-2.5 rounded-xl transition-all text-sm"
              >
                <Send className="w-4 h-4" />
                Message Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
