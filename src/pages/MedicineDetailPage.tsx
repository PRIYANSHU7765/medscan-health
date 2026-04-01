import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Pill, Share2, Bookmark, Bot, Search, ArrowLeft, AlertTriangle, ShieldAlert, Baby } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/Layout";
import MedicineCard from "@/components/MedicineCard";
import { getMedicineById, medicines, getExpiryStatus, getExpiryColor, getExpiryLabel, getRemainingTime } from "@/data/medicines";
import { toast } from "sonner";

export default function MedicineDetailPage() {
  const { id } = useParams();
  const med = getMedicineById(id || "");

  if (!med) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <Pill className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Medicine Not Found</h1>
          <Link to="/search"><Button className="mt-4">Back to Search</Button></Link>
        </div>
      </Layout>
    );
  }

  const status = getExpiryStatus(med.expiryDate);
  const related = medicines.filter((m) => m.category === med.category && m.id !== med.id).slice(0, 4);

  const expiryCardStyle = status === "valid"
    ? "bg-success/10 border-success/30"
    : status === "expiring"
    ? "bg-warning/10 border-warning/30"
    : "bg-destructive/10 border-destructive/30";

  const expiryTitle = status === "valid" ? "✅ SAFE TO USE" : status === "expiring" ? "⚠️ EXPIRING SOON" : "❌ DO NOT USE";

  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-hero border-b">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <Link to="/search" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="h-4 w-4" /> Back to Search
          </Link>
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <Pill className="h-10 w-10 text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-1">{med.name}</h1>
              <p className="text-muted-foreground mb-1">{med.genericName}</p>
              <p className="text-sm text-muted-foreground mb-3">{med.manufacturer}</p>
              <Badge className="bg-primary/10 text-primary border-primary/20" variant="outline">{med.category}</Badge>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button variant="outline" size="sm" className="gap-1" onClick={() => toast.success("Medicine saved!")}>
                <Bookmark className="h-4 w-4" /> Save
              </Button>
              <Button variant="outline" size="sm" className="gap-1" onClick={() => toast.success("Link copied!")}>
                <Share2 className="h-4 w-4" /> Share
              </Button>
              <Link to={`/chatbot?medicine=${med.id}`}>
                <Button size="sm" className="gap-1"><Bot className="h-4 w-4" /> Ask AI</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Expiry Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-xl border-2 mb-8 ${expiryCardStyle}`}
        >
          <div className="text-center">
            <p className="text-lg font-bold mb-2">{expiryTitle}</p>
            <p className="text-2xl font-bold mb-1">
              {status === "expired" ? "Expired" : "Expires"}: {new Date(med.expiryDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </p>
            <p className="text-sm text-muted-foreground">{getRemainingTime(med.expiryDate)}</p>
            <div className="flex justify-center gap-8 mt-4 text-sm">
              <div><span className="text-muted-foreground">Mfg: </span>{new Date(med.manufactureDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</div>
              <div><span className="text-muted-foreground">Exp: </span>{new Date(med.expiryDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="mb-12">
          <TabsList className="w-full flex flex-wrap h-auto gap-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="dosage">Usage & Dosage</TabsTrigger>
            <TabsTrigger value="side-effects">Side Effects</TabsTrigger>
            <TabsTrigger value="warnings">Warnings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 space-y-6">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {med.description.split("\n\n").map((p, i) => <p key={i} className="text-muted-foreground">{p}</p>)}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                ["Strength", med.strength],
                ["Form", med.form],
                ["Pack Size", med.packSize],
                ["Dosage", med.dosageTable[0]?.dose || "—"],
                ["Prescription", med.prescription],
                ["Schedule", med.schedule],
              ].map(([label, val]) => (
                <div key={label} className="p-4 rounded-lg border bg-card">
                  <div className="text-xs text-muted-foreground mb-1">{label}</div>
                  <div className="font-semibold">{val}</div>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-lg border bg-card">
              <h4 className="font-semibold mb-3">Storage Instructions</h4>
              <div className="grid grid-cols-2 gap-2">
                {med.storageInstructions.map((s) => (
                  <div key={s} className="text-sm text-muted-foreground">{s}</div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ingredients" className="mt-6 space-y-6">
            <div className="rounded-lg border overflow-hidden">
              <table className="w-full text-sm">
                <thead><tr className="bg-muted/50"><th className="p-3 text-left">Ingredient</th><th className="p-3 text-left">Amount</th><th className="p-3 text-left">Purpose</th></tr></thead>
                <tbody>
                  {med.activeIngredients.map((ing) => (
                    <tr key={ing.name} className="border-t"><td className="p-3 font-medium">{ing.name}</td><td className="p-3">{ing.amount}</td><td className="p-3 text-muted-foreground">{ing.purpose}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Inactive Ingredients</h4>
              <div className="flex flex-wrap gap-2">
                {med.inactiveIngredients.map((ing) => (
                  <Badge key={ing} variant="secondary">{ing}</Badge>
                ))}
              </div>
            </div>
            {med.allergenWarnings && (
              <div className="p-4 rounded-lg border-2 border-destructive/30 bg-destructive/5">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <h4 className="font-semibold text-destructive">Allergen Warnings</h4>
                </div>
                <p className="text-sm">{med.allergenWarnings}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="dosage" className="mt-6 space-y-6">
            <div className="rounded-lg border overflow-hidden">
              <table className="w-full text-sm">
                <thead><tr className="bg-muted/50"><th className="p-3 text-left">Age Group</th><th className="p-3 text-left">Dose</th><th className="p-3 text-left">Frequency</th><th className="p-3 text-left">Max/Day</th></tr></thead>
                <tbody>
                  {med.dosageTable.map((row) => (
                    <tr key={row.ageGroup} className="border-t"><td className="p-3 font-medium">{row.ageGroup}</td><td className="p-3">{row.dose}</td><td className="p-3">{row.frequency}</td><td className="p-3">{row.maxPerDay}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 rounded-lg border bg-card">
              <h4 className="font-semibold mb-3">How to Take</h4>
              <ul className="space-y-2">{med.howToTake.map((h) => <li key={h} className="text-sm text-muted-foreground flex items-start gap-2"><span className="text-primary mt-1">•</span>{h}</li>)}</ul>
            </div>
            <div className="p-4 rounded-lg border bg-card">
              <h4 className="font-semibold mb-2">Missed Dose</h4>
              <p className="text-sm text-muted-foreground">{med.missedDose}</p>
            </div>
            <div className="p-4 rounded-lg border-2 border-destructive/30 bg-destructive/5">
              <div className="flex items-center gap-2 mb-2"><ShieldAlert className="h-5 w-5 text-destructive" /><h4 className="font-semibold text-destructive">Overdose Warning</h4></div>
              <p className="text-sm">{med.overdoseWarning}</p>
            </div>
          </TabsContent>

          <TabsContent value="side-effects" className="mt-6 space-y-6">
            <div>
              <h4 className="font-semibold mb-3">Common</h4>
              <div className="flex flex-wrap gap-2">{med.sideEffects.common.map((s) => <Badge key={s} className="bg-success/10 text-success border-success/20" variant="outline">{s}</Badge>)}</div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Uncommon</h4>
              <div className="flex flex-wrap gap-2">{med.sideEffects.uncommon.map((s) => <Badge key={s} className="bg-warning/10 text-warning border-warning/20" variant="outline">{s}</Badge>)}</div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Rare / Serious</h4>
              <div className="flex flex-wrap gap-2">{med.sideEffects.rare.map((s) => <Badge key={s} className="bg-destructive/10 text-destructive border-destructive/20" variant="outline">⚠️ {s}</Badge>)}</div>
            </div>
            <div className="p-4 rounded-lg border-2 border-warning/30 bg-warning/5">
              <p className="text-sm font-medium">Stop use and consult a doctor immediately if you experience serious side effects.</p>
            </div>
          </TabsContent>

          <TabsContent value="warnings" className="mt-6 space-y-6">
            <div>
              <h4 className="font-semibold mb-3">Drug Interactions</h4>
              <div className="space-y-2">
                {med.drugInteractions.map((d) => (
                  <div key={d.drug} className={`p-3 rounded-lg border flex items-center gap-3 ${d.severity === "danger" ? "border-destructive/30 bg-destructive/5" : "border-warning/30 bg-warning/5"}`}>
                    <span>{d.severity === "danger" ? "❌" : "⚠️"}</span>
                    <div><span className="font-medium">{d.drug}</span><span className="text-sm text-muted-foreground ml-2">— {d.effect}</span></div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Who Should NOT Take This</h4>
              <div className="grid gap-2">
                {med.whoShouldNotTake.map((w) => (
                  <div key={w} className="p-3 rounded-lg border border-destructive/30 bg-destructive/5 text-sm">❌ {w}</div>
                ))}
              </div>
            </div>
            <div className="p-4 rounded-lg border-2 border-warning/30 bg-warning/5">
              <div className="flex items-center gap-2 mb-2"><Baby className="h-5 w-5 text-warning" /><h4 className="font-semibold">Pregnancy & Breastfeeding</h4></div>
              <p className="text-sm text-muted-foreground">{med.pregnancyInfo}</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Bottom CTA */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <Link to={`/chatbot?medicine=${med.id}`}>
            <Button size="lg" className="gap-2 w-full sm:w-auto"><Bot className="h-4 w-4" /> Ask AI About This Medicine</Button>
          </Link>
          <Link to="/search">
            <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto"><Search className="h-4 w-4" /> Find Alternatives</Button>
          </Link>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Related Medicines</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((m, i) => <MedicineCard key={m.id} medicine={m} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
