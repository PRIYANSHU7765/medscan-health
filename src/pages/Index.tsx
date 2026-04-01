import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  Camera, Search, CalendarCheck, Pill, Bot, Bell,
  ArrowRight, Star, Shield, Zap, ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Layout from "@/components/Layout";
import MedicineCard from "@/components/MedicineCard";
import { medicines } from "@/data/medicines";

function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(end / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [inView, end]);
  return <div ref={ref} className="text-3xl md:text-4xl font-bold text-gradient">{count.toLocaleString()}{suffix}</div>;
}

const features = [
  { icon: Camera, title: "Barcode & QR Scanner", desc: "Scan any medicine packaging instantly" },
  { icon: Search, title: "Smart Medicine Search", desc: "Search by name, generic name, or brand" },
  { icon: CalendarCheck, title: "Expiry Date Alert", desc: "Instantly know if medicine is safe" },
  { icon: Pill, title: "Full Medicine Details", desc: "Dosage, side effects, warnings" },
  { icon: Bot, title: "AI Medicine Chatbot", desc: "Ask any medicine query 24/7" },
  { icon: Bell, title: "Expiry Reminders", desc: "Get alerts before medicines expire" },
];

const testimonials = [
  { name: "Sarah Johnson", role: "Registered Nurse", text: "As a nurse, MedScan saves me time daily. I can quickly verify medicine details and check for interactions.", avatar: "SJ" },
  { name: "Mark Davis", role: "Parent", text: "Scanned an expired medicine before giving it to my child. This app is a lifesaver — literally!", avatar: "MD" },
  { name: "Dr. James Carter", role: "Physician", text: "The AI chatbot answers questions accurately and quickly. I recommend it to all my patients.", avatar: "JC" },
];

const faqs = [
  { q: "Is MedScan free to use?", a: "Yes! MedScan offers a free tier with unlimited medicine searches and barcode scanning. Premium features like AI chatbot and advanced analytics are available with a subscription." },
  { q: "How accurate is the barcode scanner?", a: "Our barcode scanner has a 98% accuracy rate. It supports all major barcode formats including EAN-13, UPC-A, QR codes, and Data Matrix codes commonly used on medicine packaging." },
  { q: "Can I check expiry dates of any medicine?", a: "Yes, you can check expiry dates by scanning the barcode, searching for the medicine, or manually entering the barcode number. Our database covers 10,000+ medicines." },
  { q: "Is the AI chatbot medically verified?", a: "Our AI chatbot provides general medicine information based on verified pharmaceutical databases. However, it is not a substitute for professional medical advice. Always consult your doctor." },
  { q: "Does it work offline?", a: "Basic medicine search works offline with cached data. Barcode scanning and AI chatbot features require an internet connection for the best experience." },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20" variant="outline">
                <Zap className="h-3 w-3 mr-1" /> Trusted by 50,000+ Users
              </Badge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-4"
            >
              Know Your Medicine —{" "}
              <span className="text-gradient">Scan, Search & Stay Safe</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Instantly fetch medicine details, expiry dates, side effects and warnings
              by scanning any barcode or QR code.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Link to="/scanner">
                <Button size="lg" className="gap-2 w-full sm:w-auto">
                  <Camera className="h-4 w-4" /> Scan a Medicine
                </Button>
              </Link>
              <Link to="/search">
                <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                  <Search className="h-4 w-4" /> Search Medicine
                </Button>
              </Link>
            </motion.div>
            {/* Floating badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-3 mt-10"
            >
              {["✅ Expiry Check", "🤖 AI Chatbot", "📊 10K+ Medicines"].map((b) => (
                <Badge key={b} variant="secondary" className="animate-float text-sm py-1.5 px-3">
                  {b}
                </Badge>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-card">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { end: 10000, suffix: "+", label: "Medicines" },
              { end: 50000, suffix: "+", label: "Scans Completed" },
              { end: 98, suffix: "%", label: "Accuracy" },
              { end: 24, suffix: "/7", label: "AI Support" },
            ].map((s) => (
              <div key={s.label}>
                <Counter end={s.end} suffix={s.suffix} />
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Powerful Features</h2>
            <p className="text-muted-foreground">Everything you need to manage your medicines safely</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-lg border bg-card hover:shadow-lg transition-all group"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-card border-y">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">How It Works</h2>
            <p className="text-muted-foreground">Three simple steps to safer medicine use</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            {[
              { icon: Camera, step: "1", title: "Scan or Search", desc: "Scan barcode or search by name" },
              { icon: Pill, step: "2", title: "View Details", desc: "See complete medicine information" },
              { icon: Bot, step: "3", title: "Ask AI", desc: "Get answers to any question" },
            ].map((s, i) => (
              <div key={s.step} className="flex items-center gap-4 md:gap-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="text-center"
                >
                  <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <s.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-xs font-semibold text-primary mb-1">Step {s.step}</div>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </motion.div>
                {i < 2 && <ArrowRight className="hidden md:block h-6 w-6 text-muted-foreground" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Medicines */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Popular Medicines</h2>
            <Link to="/search">
              <Button variant="ghost" className="gap-1 text-primary">
                View all <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {medicines.slice(0, 4).map((m, i) => (
              <MedicineCard key={m.id} medicine={m} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-card border-y">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">What People Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-lg border bg-background"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Frequently Asked Questions</h2>
          </div>
          <Accordion type="single" collapsible>
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`q-${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Know Your Medicine?</h2>
          <p className="text-muted-foreground mb-6">Start scanning, searching and staying safe — all for free.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/scanner"><Button size="lg" className="gap-2"><Camera className="h-4 w-4" /> Start Scanning</Button></Link>
            <Link to="/signup"><Button size="lg" variant="outline" className="gap-2"><Shield className="h-4 w-4" /> Create Free Account</Button></Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
