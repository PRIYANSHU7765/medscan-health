import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, PackageOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import MedicineCard from "@/components/MedicineCard";
import { medicines, categories, searchMedicines } from "@/data/medicines";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("relevance");

  const results = useMemo(() => {
    let r = searchMedicines(query, category);
    if (sortBy === "az") r = [...r].sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "expiry") r = [...r].sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime());
    if (sortBy === "category") r = [...r].sort((a, b) => a.category.localeCompare(b.category));
    return r;
  }, [query, category, sortBy]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Medicine Search</h1>
          <p className="text-muted-foreground">Search through our database of 10,000+ medicines</p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              className="pl-10 h-12 text-base"
              placeholder="Search by medicine name, generic name or brand..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {categories.map((c) => (
            <Badge
              key={c}
              variant={category === c ? "default" : "outline"}
              className="cursor-pointer text-sm py-1.5 px-3"
              onClick={() => setCategory(c)}
            >
              {c}
            </Badge>
          ))}
        </div>

        {/* Sort + count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {results.length} of {medicines.length} medicines
          </p>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm bg-transparent border rounded-md px-2 py-1"
            >
              <option value="relevance">Relevance</option>
              <option value="az">A-Z</option>
              <option value="expiry">Expiry Date</option>
              <option value="category">Category</option>
            </select>
          </div>
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((m, i) => (
              <MedicineCard key={m.id} medicine={m} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <PackageOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No medicines found</h3>
            <p className="text-sm text-muted-foreground">Try a different search term or category</p>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
