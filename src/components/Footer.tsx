import { Link } from "react-router-dom";

const footerLinks = {
  Products: [
    { label: "Medicine Search", to: "/search" },
    { label: "Barcode Scanner", to: "/scanner" },
    { label: "AI Chatbot", to: "/chatbot" },
    { label: "Dashboard", to: "/dashboard" },
  ],
  Company: [
    { label: "About Us", to: "#" },
    { label: "Careers", to: "#" },
    { label: "Blog", to: "#" },
    { label: "Contact", to: "#" },
  ],
  Support: [
    { label: "Help Center", to: "#" },
    { label: "FAQ", to: "#" },
    { label: "Community", to: "#" },
    { label: "Status", to: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", to: "#" },
    { label: "Terms of Service", to: "#" },
    { label: "Cookie Policy", to: "#" },
    { label: "Disclaimer", to: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 font-bold text-lg mb-3">
              <span className="text-xl">💊</span>
              <span className="text-gradient">MedScan</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Reliable Medicine Info — Anytime, Anywhere
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-3">{title}</h4>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2025 MedScan. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            ⚠️ MedScan is for informational purposes only. Always consult a healthcare professional.
          </p>
        </div>
      </div>
    </footer>
  );
}
