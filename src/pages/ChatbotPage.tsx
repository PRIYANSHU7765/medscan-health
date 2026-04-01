import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bot, Send, Mic, Camera, X, MessageSquarePlus, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import { getMedicineById } from "@/data/medicines";

interface Message {
  role: "user" | "ai";
  text: string;
}

const quickQuestions = [
  "What are the side effects?",
  "Is it safe during pregnancy?",
  "Can children take this?",
  "What's the maximum dosage?",
  "Can I take it with alcohol?",
];

const chatHistory = [
  { title: "Paracetamol side effects", time: "Today" },
  { title: "Can I take Ibuprofen with...", time: "Yesterday" },
  { title: "Amoxicillin dosage for child", time: "2 days ago" },
  { title: "Omeprazole and alcohol", time: "Last week" },
];

const initialMessages: Message[] = [
  { role: "user", text: "Can I take Paracetamol and Ibuprofen together?" },
  { role: "ai", text: "Yes, Paracetamol and Ibuprofen can generally be taken together since they work through different mechanisms:\n\n• Paracetamol works centrally to reduce pain signals\n• Ibuprofen is an anti-inflammatory (NSAID)\n\n⚠️ Important: Always follow recommended doses for each and consult your doctor before combining medicines." },
  { role: "user", text: "What is the max dose of Paracetamol per day?" },
  { role: "ai", text: "The maximum recommended dose of Paracetamol for adults:\n\n• Standard: 500mg-1000mg per dose\n• Maximum: 4000mg per day (8 tablets of 500mg)\n• Interval: At least 4 hours between doses\n\n❌ Exceeding 4g/day can cause serious liver damage." },
  { role: "user", text: "Is it safe for a 5 year old?" },
  { role: "ai", text: "For children under 6 years, always consult a doctor before giving Paracetamol. For children's Paracetamol:\n\n• Use children's formulation (liquid/suspension)\n• Dose based on body weight (15mg/kg)\n• Never give adult tablets to young children\n\n👨‍⚕️ Always consult your pediatrician first." },
];

export default function ChatbotPage() {
  const [params] = useSearchParams();
  const medId = params.get("medicine");
  const med = medId ? getMedicineById(medId) : null;
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [medContext, setMedContext] = useState(!!med);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", text: input },
      { role: "ai", text: "I understand your question about \"" + input + "\". Based on medical guidelines, I'd recommend consulting with your healthcare provider for personalized advice. In general, always follow the prescribed dosage and be aware of potential interactions with other medications you may be taking.\n\n⚠️ This is general information only." },
    ]);
    setInput("");
  };

  return (
    <Layout hideFooter>
      <div className="flex h-[calc(100vh-4rem-4rem)] md:h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            className="hidden md:flex w-[280px] border-r bg-card flex-col shrink-0"
          >
            <div className="p-4">
              <Button className="w-full gap-2" onClick={() => setMessages([])}>
                <MessageSquarePlus className="h-4 w-4" /> New Chat
              </Button>
            </div>
            <div className="flex-1 overflow-auto px-4 space-y-1">
              <p className="text-xs text-muted-foreground mb-2 font-semibold">History</p>
              {chatHistory.map((c) => (
                <button key={c.title} className="w-full text-left p-2 rounded-lg hover:bg-muted/50 text-sm transition-colors">
                  <div className="truncate">{c.title}</div>
                  <div className="text-xs text-muted-foreground">{c.time}</div>
                </button>
              ))}
            </div>
            <div className="p-4 border-t">
              <p className="text-xs text-muted-foreground font-semibold mb-2">Quick Questions</p>
              <div className="space-y-1">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    className="w-full text-left p-2 rounded-lg hover:bg-muted/50 text-xs transition-colors text-muted-foreground"
                    onClick={() => { setInput(q); }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </motion.aside>
        )}

        {/* Chat */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <div className="h-14 border-b flex items-center justify-between px-4 shrink-0">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div>
                <span className="font-semibold text-sm">MedAI Assistant</span>
                <Badge variant="secondary" className="ml-2 text-xs bg-success/10 text-success">Powered by AI</Badge>
              </div>
            </div>
            {med && medContext && (
              <Badge variant="outline" className="gap-1">
                <Pill className="h-3 w-3" /> Chatting about: {med.name}
                <button onClick={() => setMedContext(false)}><X className="h-3 w-3 ml-1" /></button>
              </Badge>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[80%] rounded-2xl p-4 text-sm whitespace-pre-line ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-card border rounded-bl-md"
                }`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t p-4 shrink-0">
            <div className="flex gap-2">
              <Input
                placeholder="Ask anything about medicines..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
              />
              <Button variant="ghost" size="icon"><Mic className="h-4 w-4" /></Button>
              <Link to="/scanner"><Button variant="ghost" size="icon"><Camera className="h-4 w-4" /></Button></Link>
              <Button size="icon" onClick={handleSend}><Send className="h-4 w-4" /></Button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              ⚠️ MedAI provides general information only. Always consult a licensed healthcare professional.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
