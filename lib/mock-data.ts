import type { Alert, Doc, Task } from "./types";

// ===================== ESPACE HOME (particulier) =====================
export const homeUser = { firstName: "Julie" };

export const homeProject = {
  name: "Maison Julie & Marc",
  address: "12 Chemin des Tilleuls, 33170 Gradignan",
  builder: "Constructions Dupont",
  startDate: "3 mars 2026",
  progress: 42,
  step: "Second œuvre",
  nextStep: {
    title: "Réception des fondations",
    deadline: "12 septembre 2026",
    advice: "Votre maçon doit vous inviter à valider les fondations avant de couler la dalle. C'est le moment de vérifier deux points essentiels avant de donner votre accord.",
  },
};

export const homeBudget = {
  planned: 245000,
  spent: 138400,
  remaining: 106600,
};

export const homeAlerts: Alert[] = [
  { id: "1", level: "rouge", title: "Attestation décennale manquante", detail: "Conseil du fondateur : ne jamais couler de dalle sans l'attestation en cours de validité en main." },
  { id: "2", level: "orange", title: "Appel de fonds n°4 à régler", detail: "Échéance dans 5 jours — un retard de paiement peut décaler tout le planning du chantier." },
  { id: "3", level: "vert", title: "Isolation posée", detail: "Conforme au DTU, rien à signaler." },
];

// Frise imagée du prototype Opéris — vision simplifiée et rassurante du chantier
export const homeFrise = [
  { icon: "🌱", label: "Terrain", done: true },
  { icon: "🧱", label: "Fondations", done: true },
  { icon: "🧱", label: "Murs", done: true },
  { icon: "🏗️", label: "Charpente", done: false, current: true },
  { icon: "🪟", label: "Menuiseries", done: false },
  { icon: "🎨", label: "Finitions", done: false },
  { icon: "🔑", label: "Remise des clés", done: false },
];

export const homeTasks: Task[] = [
  { id: "1", title: "Transmettre le RIB pour l'appel de fonds", done: false, due: "5 sept." },
  { id: "2", title: "Valider le choix des menuiseries", done: false, due: "10 sept." },
  { id: "3", title: "Relire le compte-rendu de chantier", done: true },
];

export const homeDocuments: Doc[] = [
  { id: "1", name: "Permis de construire", category: "Permis", status: "conforme" },
  { id: "2", name: "Devis lot menuiseries", category: "Devis", status: "conforme" },
  { id: "3", name: "Contrat de construction (CCMI)", category: "Contrats", status: "conforme" },
  { id: "4", name: "Attestation décennale maçon", category: "Assurances", status: "manquant" },
  { id: "5", name: "Plans d'exécution", category: "Plans", status: "conforme" },
];

export const homeStakeholders = [
  { name: "Constructions Dupont", role: "Constructeur", phone: "05 56 00 00 00" },
  { name: "Cabinet Lenoir", role: "Architecte", phone: "05 56 11 11 11" },
  { name: "SARL Petit Frères", role: "Maçonnerie", phone: "05 56 22 22 22" },
  { name: "Électricité Moreau", role: "Électricien", phone: "05 56 33 33 33" },
];

export const homePlanning = [
  { step: "Terrain", status: "done" },
  { step: "Financement", status: "done" },
  { step: "Permis de construire", status: "done" },
  { step: "Ouverture de chantier", status: "done" },
  { step: "Gros œuvre", status: "done" },
  { step: "Second œuvre", status: "current" },
  { step: "Finitions", status: "todo" },
  { step: "Réception", status: "todo" },
  { step: "Livraison", status: "todo" },
];

// ===================== ESPACE PRO (constructeur) =====================
export const proUser = { firstName: "Alexandre" };

export const proStats = {
  chantiers: 25,
  alertesImportantes: 3,
  caPrevisionnel: "6 240 000 €",
  margeMoyenne: "16,8 %",
};

export const proAlerts: Alert[] = [
  { id: "1", level: "rouge", title: "Chantier Martin : retard fournisseur", detail: "Livraison charpente décalée de 3 semaines." },
  { id: "2", level: "rouge", title: "Client Dupont : document manquant", detail: "Attestation décennale non transmise." },
  { id: "3", level: "orange", title: "Budget chantier Lefort : dépassement probable", detail: "Second œuvre +6% vs devis initial." },
];

export const proClients = [
  { name: "Famille Martin", project: "Maison à Mérignac", step: "Charpente", level: "rouge" as const },
  { name: "Famille Dupont", project: "Maison à Pessac", step: "Gros œuvre", level: "rouge" as const },
  { name: "Famille Lefort", project: "Maison à Talence", step: "Second œuvre", level: "orange" as const },
  { name: "Famille Girard", project: "Maison à Cenon", step: "Finitions", level: "vert" as const },
  { name: "Famille Roux", project: "Maison à Bègles", step: "Fondations", level: "vert" as const },
];

export const proChantiers = proClients.map((c, i) => ({
  ...c,
  progress: [58, 44, 62, 88, 15][i],
  coutPrevu: [245000, 268000, 231000, 252000, 239000][i],
  coutReel: [201000, 178000, 210000, 233000, 38000][i],
}));

export const proTasksAuto = [
  "Relance client Dupont — document manquant",
  "Compte rendu hebdomadaire — Chantier Lefort",
  "Mail fournisseur — confirmation nouvelle date charpente",
];

// ===================== ESPACE PROMOTEUR =====================
export const promoteurUser = { firstName: "Sophie" };

export const promoteurStats = {
  operations: 9,
  caPrevisionnel: "14 200 000 €",
  margeMoyenne: "21,6 %",
  alertes: 3,
};

export const promoteurAlerts: Alert[] = [
  { id: "1", level: "rouge", title: "Retard VRD — Lotissement Val Fleuri", detail: "Impact planning estimé : 6 semaines." },
  { id: "2", level: "rouge", title: "Dépassement budget lot 4 — Les Ateliers", detail: "Écart de +180 000 € vs budget initial." },
  { id: "3", level: "orange", title: "Garantie financière d'achèvement à renouveler", detail: "Échéance le 14 septembre 2026." },
];

export const promoteurOperations = [
  { name: "Les Terrasses du Lac", type: "Promotion — 42 lots", status: "Commercialisation", progress: 68, engage: "3,1 M€", budget: "4,4 M€", level: "vert" as const },
  { name: "Lotissement Val Fleuri", type: "Aménagement — 18 lots", status: "Travaux VRD", progress: 45, engage: "1,2 M€", budget: "2,0 M€", level: "orange" as const },
  { name: "Résidence Les Cèdres", type: "Promotion — 30 lots", status: "Permis purgé", progress: 20, engage: "0,4 M€", budget: "3,8 M€", level: "vert" as const },
  { name: "Programme Les Ateliers", type: "MOD — équipement public", status: "Gros œuvre", progress: 55, engage: "2,7 M€", budget: "5,1 M€", level: "rouge" as const },
];

export const promoteurLots = [
  { operation: "Les Terrasses du Lac", total: 42, reserves: 22, vendus: 18, disponibles: 2 },
  { operation: "Résidence Les Cèdres", total: 30, reserves: 4, vendus: 0, disponibles: 26 },
];

export const promoteurAdmin = [
  { item: "Permis de construire — Les Ateliers", status: "conforme" as const },
  { item: "Acte notarié — Val Fleuri", status: "conforme" as const },
  { item: "Garantie bancaire — Les Cèdres", status: "manquant" as const },
  { item: "Convention partenaire foncier", status: "conforme" as const },
];
