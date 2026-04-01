import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Pill, AlertTriangle, Camera, Trash2, Eye, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import MedicineCard from "@/components/MedicineCard";
import { medicines, getExpiryStatus, getExpiryLabel } from "@/data/medicines";
import { toast } from "sonner";

const scanHistory = [
  { medicine: "Paracetamol 500mg", time: "Today, 2:30 PM", source: "Camera" },
  { medicine: "Ibuprofen 400mg", time: "Today, 11:15 AM", source: "Manual" },
  { medicine: "Amoxicillin 250mg", time: "Yesterday, 4:00 PM", source: "Upload" },
  { medicine: "Cetirizine 10mg", time: "Yesterday, 9:20 AM", source: "Camera" },
  { medicine: "Omeprazole 20mg", time: "2 days ago", source: "Camera" },
];

export default function DashboardPage() {
  const [saved, setSaved] = useState(medicines.slice(0, 6));
  const valid = saved.filter((m) => getExpiryStatus(m.expiryDate) === "valid").length;
  const expiring = saved.filter((m) => getExpiryStatus(m.expiryDate) === "expiring").length;
  const expired = saved.filter((m) => getExpiryStatus(m.expiryDate) === "expired").length;

  const removeMedicine = (id: string) => {
    setSaved((prev) => prev.filter((m) => m.id !== id));
    toast.success("Medicine removed from cabinet");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl font-bold mb-1">My Medicine Cabinet 💊</h1>
        <p className="text-muted-foreground mb-6">Your saved medicines and scan history</p>

        {expiring > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg bg-warning/10 border border-warning/30 flex items-center gap-3 mb-6"
          >
            <AlertTriangle className="h-5 w-5 text-warning shrink-0" />
            <p className="text-sm font-medium">⚠️ {expiring} medicine(s) expiring within 3 months — Review them</p>
          </motion.div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Saved", value: saved.length, icon: Package },
            { label: "Valid", value: valid, icon: Pill, color: "text-success" },
            { label: "Expiring", value: expiring, icon: AlertTriangle, color: "text-warning" },
            { label: "Expired", value: expired, icon: Pill, color: "text-destructive" },
          ].map((s) => (
            <div key={s.label} className="p-4 rounded-lg border bg-card text-center">
              <s.icon className={`h-5 w-5 mx-auto mb-2 ${s.color || "text-primary"}`} />
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Saved Medicines */}
        <h2 className="text-xl font-semibold mb-4">Saved Medicines</h2>
        {saved.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {saved.map((m, i) => (
              <div key={m.id} className="relative">
                <MedicineCard medicine={m} index={i} />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 text-destructive hover:text-destructive"
                  onClick={() => removeMedicine(m.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 mb-12">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your medicine cabinet is empty</h3>
            <Link to="/scanner"><Button className="mt-2 gap-2"><Camera className="h-4 w-4" /> Scan Your First Medicine</Button></Link>
          </div>
        )}

        {/* Scan History */}
        <h2 className="text-xl font-semibold mb-4">Scan History</h2>
        <div className="space-y-2">
          {scanHistory.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 p-3 rounded-lg border bg-card"
            >
              <Camera className="h-5 w-5 text-primary shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{s.medicine}</div>
                <div className="text-xs text-muted-foreground">{s.time}</div>
              </div>
              <Badge variant="secondary" className="text-xs">{s.source}</Badge>
              <Button variant="ghost" size="sm" className="text-primary gap-1">
                <Eye className="h-3.5 w-3.5" /> View
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
