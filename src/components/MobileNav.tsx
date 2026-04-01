import { Link, useLocation } from "react-router-dom";
import { Home, Search, Scan, Bot, User } from "lucide-react";

const items = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/search", icon: Search, label: "Search" },
  { to: "/scanner", icon: Scan, label: "Scan" },
  { to: "/chatbot", icon: Bot, label: "Chat" },
  { to: "/dashboard", icon: User, label: "Profile" },
];

export default function MobileNav() {
  const { pathname } = useLocation();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass border-t">
      <div className="flex justify-around items-center h-16">
        {items.map((item) => {
          const active = pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center gap-0.5 text-xs transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
