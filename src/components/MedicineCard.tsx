import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Pill, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Medicine, getExpiryStatus, getExpiryLabel, getExpiryColor } from "@/data/medicines";

const categoryColors: Record<string, string> = {
  Painkiller: "bg-primary/10 text-primary",
  Antibiotic: "bg-accent/10 text-accent",
  Antacid: "bg-warning/10 text-warning",
  Antihistamine: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Heart: "bg-destructive/10 text-destructive",
  Diabetes: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
};

export default function MedicineCard({ medicine, index = 0 }: { medicine: Medicine; index?: number }) {
  const status = getExpiryStatus(medicine.expiryDate);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group relative rounded-lg border bg-card p-5 hover:shadow-lg transition-all"
    >
      {status === "expired" && <div className="absolute inset-0 bg-destructive/5 rounded-lg pointer-events-none" />}
      <div className="flex items-start justify-between mb-3">
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Pill className="h-5 w-5 text-primary" />
        </div>
        <Badge variant="outline" className={getExpiryColor(status)}>
          {getExpiryLabel(status)}
        </Badge>
      </div>
      <h3 className="font-semibold text-foreground mb-1">{medicine.name}</h3>
      <p className="text-sm text-muted-foreground mb-1">{medicine.genericName}</p>
      <p className="text-xs text-muted-foreground mb-3">{medicine.manufacturer}</p>
      <div className="flex items-center justify-between">
        <Badge variant="secondary" className={categoryColors[medicine.category] || ""}>
          {medicine.category}
        </Badge>
        <Link to={`/medicine/${medicine.id}`}>
          <Button size="sm" variant="ghost" className="gap-1 text-primary">
            <Eye className="h-3.5 w-3.5" /> View
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
