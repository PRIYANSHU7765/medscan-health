export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  manufacturer: string;
  category: string;
  strength: string;
  form: string;
  packSize: string;
  barcode: string;
  manufactureDate: string;
  expiryDate: string;
  prescription: string;
  schedule: string;
  description: string;
  activeIngredients: { name: string; amount: string; purpose: string }[];
  inactiveIngredients: string[];
  allergenWarnings: string;
  dosageTable: { ageGroup: string; dose: string; frequency: string; maxPerDay: string }[];
  howToTake: string[];
  missedDose: string;
  overdoseWarning: string;
  sideEffects: { common: string[]; uncommon: string[]; rare: string[] };
  drugInteractions: { drug: string; severity: "danger" | "warning"; effect: string }[];
  whoShouldNotTake: string[];
  pregnancyInfo: string;
  storageInstructions: string[];
}

export type ExpiryStatus = "valid" | "expiring" | "expired";

export function getExpiryStatus(expiryDate: string): ExpiryStatus {
  const expiry = new Date(expiryDate);
  const now = new Date();
  const diffMs = expiry.getTime() - now.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  if (diffDays < 0) return "expired";
  if (diffDays < 90) return "expiring";
  return "valid";
}

export function getExpiryLabel(status: ExpiryStatus): string {
  if (status === "valid") return "✅ Valid";
  if (status === "expiring") return "⚠️ Expiring Soon";
  return "❌ Expired";
}

export function getExpiryColor(status: ExpiryStatus): string {
  if (status === "valid") return "bg-success/10 text-success border-success/20";
  if (status === "expiring") return "bg-warning/10 text-warning border-warning/20";
  return "bg-destructive/10 text-destructive border-destructive/20";
}

export function getRemainingTime(expiryDate: string): string {
  const expiry = new Date(expiryDate);
  const now = new Date();
  const diffMs = Math.abs(expiry.getTime() - now.getTime());
  const months = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30));
  const expired = expiry < now;
  if (months === 0) return expired ? "Expired recently" : "Less than a month";
  return expired ? `${months} months ago` : `${months} months remaining`;
}

export const categories = [
  "All", "Painkiller", "Antibiotic", "Antacid", "Antihistamine",
  "Vitamins", "Diabetes", "Heart", "Skin"
];

export const medicines: Medicine[] = [
  {
    id: "paracetamol",
    name: "Paracetamol 500mg",
    genericName: "Acetaminophen",
    manufacturer: "GSK Pharmaceuticals",
    category: "Painkiller",
    strength: "500mg",
    form: "Tablet",
    packSize: "10 tablets",
    barcode: "8901234567890",
    manufactureDate: "2024-03-15",
    expiryDate: "2026-03-15",
    prescription: "Not Required",
    schedule: "H1",
    description: "Paracetamol is one of the most widely used over-the-counter pain relievers and fever reducers. It works by blocking the production of prostaglandins in the brain, which are chemicals that cause pain and inflammation.\n\nIt is commonly used for headaches, muscle aches, arthritis, backache, toothaches, colds, and fevers. Paracetamol is generally well-tolerated when used at recommended doses.",
    activeIngredients: [{ name: "Paracetamol", amount: "500mg", purpose: "Pain relief & fever reduction" }],
    inactiveIngredients: ["Microcrystalline Cellulose", "Starch", "Magnesium Stearate", "Povidone", "Sodium Starch Glycolate"],
    allergenWarnings: "Contains: Wheat Starch — not suitable for celiac patients",
    dosageTable: [
      { ageGroup: "Adults (18+)", dose: "1-2 tablets", frequency: "Every 4-6 hrs", maxPerDay: "8 tablets" },
      { ageGroup: "Children 6-12", dose: "1 tablet", frequency: "Every 6 hrs", maxPerDay: "4 tablets" },
      { ageGroup: "Under 6", dose: "Consult Doctor", frequency: "—", maxPerDay: "—" },
    ],
    howToTake: ["Take with a full glass of water", "Can be taken with or without food", "Do not crush or chew"],
    missedDose: "Take as soon as remembered. Skip if next dose is near.",
    overdoseWarning: "⚠️ Taking more than 8 tablets/day can cause serious liver damage. Seek emergency help immediately.",
    sideEffects: {
      common: ["Nausea", "Stomach upset", "Headache"],
      uncommon: ["Skin rash", "Dizziness", "Insomnia"],
      rare: ["Liver damage", "Severe allergic reaction", "Blood disorders"],
    },
    drugInteractions: [
      { drug: "Warfarin", severity: "danger", effect: "Increases bleeding risk" },
      { drug: "Alcohol", severity: "danger", effect: "Serious liver damage" },
      { drug: "Other paracetamol products", severity: "warning", effect: "Risk of overdose" },
    ],
    whoShouldNotTake: ["People with liver disease", "Heavy alcohol consumers", "Those allergic to paracetamol"],
    pregnancyInfo: "Generally safe during pregnancy in recommended doses. Consult your doctor.",
    storageInstructions: ["🌡️ Store below 25°C", "💧 Keep dry", "☀️ Away from sunlight", "🔒 Keep out of children's reach"],
  },
  {
    id: "ibuprofen",
    name: "Ibuprofen 400mg",
    genericName: "Ibuprofen",
    manufacturer: "Abbott Laboratories",
    category: "Painkiller",
    strength: "400mg",
    form: "Tablet",
    packSize: "10 tablets",
    barcode: "8901234567891",
    manufactureDate: "2022-05-01",
    expiryDate: "2024-05-01",
    prescription: "Not Required",
    schedule: "H1",
    description: "Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID) used for reducing fever and treating pain or inflammation caused by many conditions such as headache, toothache, back pain, arthritis, menstrual cramps, or minor injury.\n\nIt works by reducing hormones that cause inflammation and pain in the body.",
    activeIngredients: [{ name: "Ibuprofen", amount: "400mg", purpose: "Anti-inflammatory & pain relief" }],
    inactiveIngredients: ["Lactose Monohydrate", "Hypromellose", "Titanium Dioxide", "Macrogol"],
    allergenWarnings: "Contains: Lactose — not suitable for lactose intolerant patients",
    dosageTable: [
      { ageGroup: "Adults (18+)", dose: "1 tablet", frequency: "Every 6-8 hrs", maxPerDay: "3 tablets" },
      { ageGroup: "Children 12-17", dose: "1 tablet", frequency: "Every 8 hrs", maxPerDay: "3 tablets" },
      { ageGroup: "Under 12", dose: "Consult Doctor", frequency: "—", maxPerDay: "—" },
    ],
    howToTake: ["Take with food or milk", "Swallow whole with water", "Do not take on empty stomach"],
    missedDose: "Take as soon as remembered unless close to next dose.",
    overdoseWarning: "⚠️ Overdose can cause stomach bleeding, kidney failure. Seek emergency help.",
    sideEffects: {
      common: ["Stomach pain", "Heartburn", "Nausea"],
      uncommon: ["Headache", "Dizziness", "Fluid retention"],
      rare: ["Stomach ulcer", "Kidney problems", "Heart attack risk"],
    },
    drugInteractions: [
      { drug: "Aspirin", severity: "warning", effect: "Reduced aspirin effectiveness" },
      { drug: "Blood thinners", severity: "danger", effect: "Increased bleeding risk" },
      { drug: "Lithium", severity: "danger", effect: "Increased lithium levels" },
    ],
    whoShouldNotTake: ["People with stomach ulcers", "Those with kidney disease", "Third trimester pregnancy"],
    pregnancyInfo: "Avoid in third trimester. Consult doctor in first and second trimester.",
    storageInstructions: ["🌡️ Store below 30°C", "💧 Keep dry", "☀️ Away from direct light", "🔒 Keep out of children's reach"],
  },
  {
    id: "amoxicillin",
    name: "Amoxicillin 250mg",
    genericName: "Amoxicillin Trihydrate",
    manufacturer: "Cipla Ltd",
    category: "Antibiotic",
    strength: "250mg",
    form: "Capsule",
    packSize: "15 capsules",
    barcode: "8901234567892",
    manufactureDate: "2024-01-10",
    expiryDate: "2026-01-10",
    prescription: "Required",
    schedule: "H",
    description: "Amoxicillin is a penicillin-type antibiotic used to treat a wide variety of bacterial infections. It works by stopping the growth of bacteria.\n\nThis antibiotic treats only bacterial infections. It will not work for viral infections such as the common cold or flu.",
    activeIngredients: [{ name: "Amoxicillin Trihydrate", amount: "250mg", purpose: "Antibacterial" }],
    inactiveIngredients: ["Magnesium Stearate", "Gelatin", "Titanium Dioxide", "Iron Oxide"],
    allergenWarnings: "Contains Penicillin — do NOT take if allergic to penicillin or cephalosporins",
    dosageTable: [
      { ageGroup: "Adults (18+)", dose: "1-2 capsules", frequency: "Every 8 hrs", maxPerDay: "6 capsules" },
      { ageGroup: "Children 5-12", dose: "1 capsule", frequency: "Every 8 hrs", maxPerDay: "3 capsules" },
      { ageGroup: "Under 5", dose: "Use liquid form", frequency: "Every 8 hrs", maxPerDay: "As prescribed" },
    ],
    howToTake: ["Swallow whole with water", "Can be taken with or without food", "Complete the full course"],
    missedDose: "Take as soon as remembered. Don't double dose.",
    overdoseWarning: "⚠️ Overdose may cause nausea, vomiting, diarrhea. Contact doctor.",
    sideEffects: {
      common: ["Diarrhea", "Nausea", "Skin rash"],
      uncommon: ["Vomiting", "Headache", "Abdominal pain"],
      rare: ["Severe allergic reaction", "Liver problems", "Seizures"],
    },
    drugInteractions: [
      { drug: "Methotrexate", severity: "danger", effect: "Increased toxicity" },
      { drug: "Oral contraceptives", severity: "warning", effect: "Reduced effectiveness" },
      { drug: "Warfarin", severity: "warning", effect: "Increased bleeding risk" },
    ],
    whoShouldNotTake: ["Penicillin-allergic patients", "Those with mononucleosis", "Severe kidney impairment"],
    pregnancyInfo: "Generally considered safe. Consult doctor before use.",
    storageInstructions: ["🌡️ Store below 25°C", "💧 Keep dry", "☀️ Away from sunlight", "🔒 Keep out of children's reach"],
  },
  {
    id: "cetirizine",
    name: "Cetirizine 10mg",
    genericName: "Cetirizine Hydrochloride",
    manufacturer: "Sun Pharma",
    category: "Antihistamine",
    strength: "10mg",
    form: "Tablet",
    packSize: "10 tablets",
    barcode: "8901234567893",
    manufactureDate: "2024-06-01",
    expiryDate: "2026-12-01",
    prescription: "Not Required",
    schedule: "OTC",
    description: "Cetirizine is an antihistamine used to relieve allergy symptoms such as watery eyes, runny nose, itching eyes/nose, sneezing, hives, and itching.\n\nIt works by blocking histamine, a natural substance your body makes during an allergic reaction.",
    activeIngredients: [{ name: "Cetirizine Hydrochloride", amount: "10mg", purpose: "Antihistamine" }],
    inactiveIngredients: ["Lactose", "Microcrystalline Cellulose", "Colloidal Silicon Dioxide"],
    allergenWarnings: "Contains: Lactose",
    dosageTable: [
      { ageGroup: "Adults (12+)", dose: "1 tablet", frequency: "Once daily", maxPerDay: "1 tablet" },
      { ageGroup: "Children 6-11", dose: "½ tablet", frequency: "Twice daily", maxPerDay: "1 tablet" },
      { ageGroup: "Under 6", dose: "Consult Doctor", frequency: "—", maxPerDay: "—" },
    ],
    howToTake: ["Take with or without food", "Swallow with water", "Take at the same time daily"],
    missedDose: "Take when remembered. Skip if almost time for next dose.",
    overdoseWarning: "⚠️ Overdose may cause drowsiness, restlessness. Seek medical help.",
    sideEffects: {
      common: ["Drowsiness", "Dry mouth", "Fatigue"],
      uncommon: ["Headache", "Dizziness", "Stomach pain"],
      rare: ["Rapid heartbeat", "Severe allergic reaction", "Liver problems"],
    },
    drugInteractions: [
      { drug: "Alcohol", severity: "warning", effect: "Increased drowsiness" },
      { drug: "Sedatives", severity: "warning", effect: "Enhanced sedation" },
      { drug: "Theophylline", severity: "warning", effect: "Altered cetirizine levels" },
    ],
    whoShouldNotTake: ["Severe kidney disease", "Those allergic to hydroxyzine", "End-stage renal patients"],
    pregnancyInfo: "Consult doctor before use during pregnancy or breastfeeding.",
    storageInstructions: ["🌡️ Store below 30°C", "💧 Keep dry", "☀️ Protect from light", "🔒 Keep out of children's reach"],
  },
  {
    id: "omeprazole",
    name: "Omeprazole 20mg",
    genericName: "Omeprazole",
    manufacturer: "AstraZeneca",
    category: "Antacid",
    strength: "20mg",
    form: "Capsule",
    packSize: "14 capsules",
    barcode: "8901234567894",
    manufactureDate: "2023-02-01",
    expiryDate: "2025-08-01",
    prescription: "Required",
    schedule: "H",
    description: "Omeprazole is a proton pump inhibitor (PPI) that decreases the amount of acid produced in the stomach. It is used to treat gastroesophageal reflux disease (GERD), stomach ulcers, and other conditions involving excessive stomach acid.\n\nIt provides lasting relief from heartburn and acid reflux symptoms.",
    activeIngredients: [{ name: "Omeprazole", amount: "20mg", purpose: "Proton pump inhibitor" }],
    inactiveIngredients: ["Sugar Spheres", "Hypromellose", "Methacrylic Acid Copolymer", "Talc"],
    allergenWarnings: "Contains: Sugar spheres with sucrose and starch",
    dosageTable: [
      { ageGroup: "Adults (18+)", dose: "1 capsule", frequency: "Once daily", maxPerDay: "2 capsules" },
      { ageGroup: "Children 1-16", dose: "As prescribed", frequency: "Once daily", maxPerDay: "As prescribed" },
      { ageGroup: "Under 1", dose: "Not recommended", frequency: "—", maxPerDay: "—" },
    ],
    howToTake: ["Take before meals", "Swallow whole — do not crush", "Best taken in the morning"],
    missedDose: "Take as soon as remembered. Skip if close to next dose.",
    overdoseWarning: "⚠️ Overdose may cause confusion, drowsiness, blurred vision. Seek help.",
    sideEffects: {
      common: ["Headache", "Stomach pain", "Diarrhea"],
      uncommon: ["Dizziness", "Constipation", "Flatulence"],
      rare: ["Kidney problems", "Bone fractures", "Vitamin B12 deficiency"],
    },
    drugInteractions: [
      { drug: "Clopidogrel", severity: "danger", effect: "Reduced effectiveness" },
      { drug: "Methotrexate", severity: "danger", effect: "Increased toxicity" },
      { drug: "Iron supplements", severity: "warning", effect: "Reduced absorption" },
    ],
    whoShouldNotTake: ["Those allergic to PPIs", "Patients on high-dose methotrexate", "Severe liver disease without monitoring"],
    pregnancyInfo: "Use only if clearly needed. Discuss with your doctor.",
    storageInstructions: ["🌡️ Store below 25°C", "💧 Keep dry", "☀️ Store in original container", "🔒 Keep out of children's reach"],
  },
  {
    id: "aspirin",
    name: "Aspirin 75mg",
    genericName: "Acetylsalicylic Acid",
    manufacturer: "Bayer",
    category: "Heart",
    strength: "75mg",
    form: "Tablet",
    packSize: "30 tablets",
    barcode: "8901234567895",
    manufactureDate: "2024-02-15",
    expiryDate: "2026-02-15",
    prescription: "Not Required",
    schedule: "OTC",
    description: "Low-dose Aspirin is used as a blood thinner to prevent heart attacks and strokes in people at high risk. It works by preventing blood clots from forming.\n\nThis low dose is specifically for cardiovascular protection and should not be used for pain relief.",
    activeIngredients: [{ name: "Acetylsalicylic Acid", amount: "75mg", purpose: "Antiplatelet / Blood thinner" }],
    inactiveIngredients: ["Cellulose", "Corn Starch", "Methacrylic Acid Copolymer"],
    allergenWarnings: "Contains: Corn starch. Not suitable for aspirin-sensitive asthma patients.",
    dosageTable: [
      { ageGroup: "Adults (18+)", dose: "1 tablet", frequency: "Once daily", maxPerDay: "1 tablet" },
      { ageGroup: "Children", dose: "Not recommended", frequency: "—", maxPerDay: "—" },
    ],
    howToTake: ["Take with food", "Swallow with water", "Take at the same time daily"],
    missedDose: "Take when remembered. Skip if close to next dose. Never double dose.",
    overdoseWarning: "⚠️ Overdose can cause stomach bleeding, ringing in ears, confusion.",
    sideEffects: {
      common: ["Indigestion", "Easy bruising", "Nausea"],
      uncommon: ["Stomach pain", "Nosebleed", "Dizziness"],
      rare: ["Stomach ulcer", "Brain hemorrhage", "Severe allergic reaction"],
    },
    drugInteractions: [
      { drug: "Ibuprofen", severity: "warning", effect: "Reduced aspirin effectiveness" },
      { drug: "Warfarin", severity: "danger", effect: "High bleeding risk" },
      { drug: "SSRIs", severity: "warning", effect: "Increased bleeding risk" },
    ],
    whoShouldNotTake: ["Children under 16 (Reye's syndrome)", "Active stomach ulcers", "Bleeding disorders"],
    pregnancyInfo: "Not recommended during pregnancy, especially third trimester.",
    storageInstructions: ["🌡️ Store below 25°C", "💧 Keep dry", "☀️ Away from sunlight", "🔒 Keep out of children's reach"],
  },
  {
    id: "metformin",
    name: "Metformin 500mg",
    genericName: "Metformin Hydrochloride",
    manufacturer: "Mankind Pharma",
    category: "Diabetes",
    strength: "500mg",
    form: "Tablet",
    packSize: "20 tablets",
    barcode: "8901234567896",
    manufactureDate: "2024-05-01",
    expiryDate: "2026-11-01",
    prescription: "Required",
    schedule: "H",
    description: "Metformin is the first-line medication for treatment of type 2 diabetes. It works by decreasing glucose production in the liver and improving insulin sensitivity.\n\nIt helps control blood sugar levels and is often used alongside diet and exercise.",
    activeIngredients: [{ name: "Metformin Hydrochloride", amount: "500mg", purpose: "Antidiabetic (Biguanide)" }],
    inactiveIngredients: ["Povidone", "Magnesium Stearate", "Hypromellose", "Polyethylene Glycol"],
    allergenWarnings: "No major allergens. Rare hypersensitivity reported.",
    dosageTable: [
      { ageGroup: "Adults (18+)", dose: "1 tablet", frequency: "2-3 times daily", maxPerDay: "6 tablets" },
      { ageGroup: "Children 10-16", dose: "1 tablet", frequency: "1-2 times daily", maxPerDay: "4 tablets" },
      { ageGroup: "Under 10", dose: "Not recommended", frequency: "—", maxPerDay: "—" },
    ],
    howToTake: ["Take with meals", "Swallow whole with water", "Do not skip meals while taking"],
    missedDose: "Take with next meal. Do not double dose.",
    overdoseWarning: "⚠️ Overdose risk: lactic acidosis — a serious, potentially fatal condition.",
    sideEffects: {
      common: ["Nausea", "Diarrhea", "Stomach upset"],
      uncommon: ["Metallic taste", "Loss of appetite", "Vitamin B12 deficiency"],
      rare: ["Lactic acidosis", "Liver problems", "Severe allergic reaction"],
    },
    drugInteractions: [
      { drug: "Alcohol", severity: "danger", effect: "Lactic acidosis risk" },
      { drug: "Contrast dye", severity: "danger", effect: "Kidney damage risk" },
      { drug: "Diuretics", severity: "warning", effect: "Blood sugar changes" },
    ],
    whoShouldNotTake: ["Severe kidney disease", "Liver disease", "History of lactic acidosis"],
    pregnancyInfo: "Usually switched to insulin during pregnancy. Consult endocrinologist.",
    storageInstructions: ["🌡️ Store below 30°C", "💧 Keep dry", "☀️ Away from light", "🔒 Keep out of children's reach"],
  },
  {
    id: "azithromycin",
    name: "Azithromycin 500mg",
    genericName: "Azithromycin Dihydrate",
    manufacturer: "Pfizer Inc",
    category: "Antibiotic",
    strength: "500mg",
    form: "Tablet",
    packSize: "3 tablets",
    barcode: "8901234567897",
    manufactureDate: "2024-02-01",
    expiryDate: "2026-02-01",
    prescription: "Required",
    schedule: "H",
    description: "Azithromycin is a macrolide antibiotic used to treat various types of infections including respiratory infections, skin infections, ear infections, and sexually transmitted diseases.\n\nIt works by preventing bacteria from growing by interfering with their protein synthesis.",
    activeIngredients: [{ name: "Azithromycin Dihydrate", amount: "500mg", purpose: "Antibacterial (Macrolide)" }],
    inactiveIngredients: ["Pregelatinized Starch", "Calcium Phosphate", "Sodium Lauryl Sulfate", "Magnesium Stearate"],
    allergenWarnings: "Do not use if allergic to macrolide antibiotics (erythromycin, clarithromycin)",
    dosageTable: [
      { ageGroup: "Adults (18+)", dose: "1 tablet", frequency: "Once daily", maxPerDay: "1 tablet" },
      { ageGroup: "Children 6-17", dose: "As prescribed", frequency: "Once daily", maxPerDay: "As prescribed" },
      { ageGroup: "Under 6", dose: "Use liquid form", frequency: "Once daily", maxPerDay: "As prescribed" },
    ],
    howToTake: ["Take 1 hour before or 2 hours after meals", "Swallow whole with water", "Complete the full 3-day course"],
    missedDose: "Take as soon as possible. Don't take two doses together.",
    overdoseWarning: "⚠️ Overdose may cause nausea, vomiting, diarrhea, hearing loss. Seek help.",
    sideEffects: {
      common: ["Diarrhea", "Nausea", "Abdominal pain"],
      uncommon: ["Vomiting", "Headache", "Dizziness"],
      rare: ["Heart rhythm changes", "Liver problems", "Hearing loss"],
    },
    drugInteractions: [
      { drug: "Antacids", severity: "warning", effect: "Reduced absorption" },
      { drug: "Warfarin", severity: "warning", effect: "Increased bleeding risk" },
      { drug: "Cyclosporine", severity: "danger", effect: "Increased toxicity" },
    ],
    whoShouldNotTake: ["Allergic to macrolides", "Severe liver disease", "History of cholestatic jaundice with azithromycin"],
    pregnancyInfo: "Use only if clearly needed. Discuss risks and benefits with doctor.",
    storageInstructions: ["🌡️ Store below 30°C", "💧 Keep dry", "☀️ Away from sunlight", "🔒 Keep out of children's reach"],
  },
];

export function getMedicineById(id: string): Medicine | undefined {
  return medicines.find((m) => m.id === id);
}

export function searchMedicines(query: string, category?: string): Medicine[] {
  let results = medicines;
  if (category && category !== "All") {
    results = results.filter((m) => m.category === category);
  }
  if (query) {
    const q = query.toLowerCase();
    results = results.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.genericName.toLowerCase().includes(q) ||
        m.manufacturer.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q)
    );
  }
  return results;
}
