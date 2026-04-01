import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Upload, Keyboard, Lightbulb, Smartphone, Eraser, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import MedicineCard from "@/components/MedicineCard";
import { medicines, getExpiryStatus, getExpiryLabel } from "@/data/medicines";

export default function ScannerPage() {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [detected, setDetected] = useState(false);
  const [manualCode, setManualCode] = useState("");

  const handleScan = () => {
    setScanning(true);
    setDetected(false);
    setTimeout(() => {
      setScanning(false);
      setDetected(true);
      setTimeout(() => navigate("/medicine/paracetamol"), 2000);
    }, 2500);
  };

  const handleManual = () => {
    if (manualCode.trim()) {
      navigate("/medicine/paracetamol");
    }
  };

  const recentScans = medicines.slice(0, 4);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Scan Medicine Barcode or QR Code</h1>
          <p className="text-muted-foreground">Point your camera at any medicine barcode or QR code to instantly fetch details</p>
        </div>

        {/* Scanner */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative aspect-square max-w-sm mx-auto rounded-2xl overflow-hidden bg-foreground/5 border-2 border-dashed border-border mb-4">
            {/* Crosshair corners */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary rounded-tl" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary rounded-tr" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary rounded-bl" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary rounded-br" />

            {scanning && (
              <div className="absolute left-4 right-4 h-0.5 bg-accent shadow-[0_0_8px] shadow-accent animate-scan-line" />
            )}

            <div className="absolute inset-0 flex items-center justify-center">
              {!scanning && !detected && (
                <div className="text-center">
                  <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Waiting for barcode...</p>
                </div>
              )}
              {scanning && (
                <p className="text-sm text-accent font-medium animate-pulse">Scanning...</p>
              )}
            </div>
          </div>

          <AnimatePresence>
            {detected && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-success/10 border border-success/20 text-center mb-4"
              >
                <CheckCircle2 className="h-6 w-6 text-success mx-auto mb-2" />
                <p className="font-semibold text-success">✅ Barcode Detected!</p>
                <p className="text-sm text-muted-foreground mt-1">Code: 8901234567890</p>
                <p className="text-xs text-muted-foreground">Redirecting to medicine details...</p>
              </motion.div>
            )}
          </AnimatePresence>

          <Button onClick={handleScan} disabled={scanning} className="w-full gap-2 mb-6" size="lg">
            <Camera className="h-4 w-4" /> {scanning ? "Scanning..." : "Start Camera Scan"}
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
            <div className="relative flex justify-center text-xs"><span className="bg-background px-2 text-muted-foreground">OR</span></div>
          </div>

          <div className="space-y-4">
            <Button variant="outline" className="w-full gap-2">
              <Upload className="h-4 w-4" /> Upload Barcode Image
            </Button>
            <div className="flex gap-2">
              <Input
                placeholder="Enter barcode: 8901234567890"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleManual()}
              />
              <Button onClick={handleManual} className="gap-1">
                <Keyboard className="h-4 w-4" /> Search
              </Button>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="max-w-lg mx-auto mb-12">
          <h3 className="font-semibold mb-4 text-center">Scanning Tips</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Lightbulb, tip: "Ensure good lighting" },
              { icon: Smartphone, tip: "Hold camera steady for 2s" },
              { icon: Eraser, tip: "Clean the barcode if smudged" },
            ].map((t) => (
              <div key={t.tip} className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                <t.icon className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm">{t.tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Recently Scanned</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentScans.map((m, i) => (
              <MedicineCard key={m.id} medicine={m} index={i} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
