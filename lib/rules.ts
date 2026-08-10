// =========================================================
// LES 50 RÈGLES OPÉRIS — couche métier centralisée
// Format : condition → niveau d'alerte → conseil du fondateur
// Source : Dossier technique Opéris Home V1, Partie 2.
// Ne pas disperser ces règles dans les composants — toute
// alerte générée dans l'app doit référencer une règle d'ici
// par son id, pour rester traçable.
// =========================================================

export type RuleCategory = "terrain" | "administratif" | "financement" | "construction" | "livraison";
export type RuleLevel = "vert" | "orange" | "rouge";

export type Rule = {
  id: string; // ex: "terrain-01"
  category: RuleCategory;
  condition: string; // la question / le déclencheur
  level: RuleLevel;
  advice: string; // conseil du fondateur
};

export const ruleCategories: { key: RuleCategory; label: string }[] = [
  { key: "terrain", label: "Terrain" },
  { key: "administratif", label: "Administratif" },
  { key: "financement", label: "Financement" },
  { key: "construction", label: "Construction" },
  { key: "livraison", label: "Livraison" },
];

export const rules: Rule[] = [
  // ---------- Terrain ----------
  { id: "terrain-01", category: "terrain", level: "rouge", condition: "Étude de sol (G1/G2) absente avant dépôt du permis", advice: "Aucune construction ne devrait être engagée sans étude géotechnique, même sur terrain « réputé bon »." },
  { id: "terrain-02", category: "terrain", level: "orange", condition: "Certificat d'urbanisme non demandé avant compromis", advice: "Toujours vérifier la constructibilité réelle avant signature." },
  { id: "terrain-03", category: "terrain", level: "rouge", condition: "Absence de raccordement viabilisation confirmé (eau, électricité, assainissement)", advice: "Un terrain non viabilisé peut faire dériver le budget de 10 à 20 %." },
  { id: "terrain-04", category: "terrain", level: "orange", condition: "Servitude ou mitoyenneté non vérifiée", advice: "Demander systématiquement l'état hypothécaire du terrain." },
  { id: "terrain-05", category: "terrain", level: "rouge", condition: "Risque de zone inondable / sismique non consulté", advice: "Consulter le PPRN avant toute signature définitive." },
  { id: "terrain-06", category: "terrain", level: "orange", condition: "Bornage du terrain non réalisé", advice: "Un bornage évite 90 % des litiges de voisinage futurs." },
  { id: "terrain-07", category: "terrain", level: "rouge", condition: "Compromis signé sans clause suspensive de financement", advice: "Toujours intégrer cette clause, sans exception." },
  { id: "terrain-08", category: "terrain", level: "orange", condition: "Nature du sol argileux non signalée à l'assureur/constructeur", advice: "Impact direct sur les fondations et l'assurance dommages-ouvrage." },
  { id: "terrain-09", category: "terrain", level: "orange", condition: "Accès chantier non confirmé (largeur voirie, servitude de passage)", advice: "Vérifier avant commande des matériaux lourds." },
  { id: "terrain-10", category: "terrain", level: "orange", condition: "Document d'arpentage manquant pour un terrain à diviser", advice: "Nécessaire pour toute division parcellaire." },

  // ---------- Administratif ----------
  { id: "admin-01", category: "administratif", level: "rouge", condition: "Permis de construire non affiché sur le terrain", advice: "Défaut d'affichage = risque de recours prolongé." },
  { id: "admin-02", category: "administratif", level: "orange", condition: "Délai de recours des tiers (2 mois) non expiré avant démarrage", advice: "Attendre la purge du délai sécurise juridiquement le chantier." },
  { id: "admin-03", category: "administratif", level: "rouge", condition: "Déclaration d'ouverture de chantier (DOC) non déposée", advice: "Obligatoire avant le premier coup de pelle." },
  { id: "admin-04", category: "administratif", level: "rouge", condition: "Absence d'assurance dommages-ouvrage", advice: "Non-négociable, à souscrire avant tout démarrage de travaux." },
  { id: "admin-05", category: "administratif", level: "rouge", condition: "Attestation d'assurance décennale des entreprises non collectée", advice: "À demander avant chaque intervention, pas après." },
  { id: "admin-06", category: "administratif", level: "orange", condition: "Permis modificatif non déposé après changement de plan", advice: "Toute modification substantielle doit être régularisée." },
  { id: "admin-07", category: "administratif", level: "orange", condition: "Non-conformité au PLU non vérifiée (hauteur, emprise au sol)", advice: "Un contrôle en amont évite une déclaration d'achèvement refusée." },
  { id: "admin-08", category: "administratif", level: "orange", condition: "Taxe d'aménagement non anticipée dans le budget", advice: "Prévoir ce coût dès le plan de financement initial." },
  { id: "admin-09", category: "administratif", level: "rouge", condition: "Contrat de construction (CCMI) non conforme à la loi de 1990", advice: "Vérifier les mentions obligatoires (délais, pénalités, garanties)." },
  { id: "admin-10", category: "administratif", level: "orange", condition: "Déclaration d'achèvement des travaux (DAACT) non déposée", advice: "Nécessaire pour purger le contrôle de conformité." },

  // ---------- Financement ----------
  { id: "finance-01", category: "financement", level: "rouge", condition: "Offre de prêt non éditée avant le début des appels de fonds", advice: "Ne jamais démarrer les paiements sans financement sécurisé." },
  { id: "finance-02", category: "financement", level: "rouge", condition: "Appel de fonds non corrélé à l'avancement réel du chantier", advice: "Toujours vérifier l'état d'avancement avant de payer un appel de fonds." },
  { id: "finance-03", category: "financement", level: "orange", condition: "Dépassement budgétaire non tracé (delta prévisionnel/réel)", advice: "Un suivi mensuel évite les mauvaises surprises en fin de chantier." },
  { id: "finance-04", category: "financement", level: "orange", condition: "Justificatif d'apport personnel absent", advice: "À fournir systématiquement à la banque avant déblocage." },
  { id: "finance-05", category: "financement", level: "rouge", condition: "Garantie financière d'achèvement (GFA) non vérifiée", advice: "Élément clé de sécurité en CCMI, à exiger du constructeur." },
  { id: "finance-06", category: "financement", level: "orange", condition: "Assurance emprunteur non confirmée", advice: "Vérifier la prise d'effet avant signature de l'acte." },
  { id: "finance-07", category: "financement", level: "orange", condition: "Retenue de garantie de 5 % non appliquée à la réception", advice: "Protection standard à ne pas négliger." },
  { id: "finance-08", category: "financement", level: "orange", condition: "Facture d'entreprise sans mention du numéro de décennale", advice: "Élément de preuve en cas de sinistre futur." },
  { id: "finance-09", category: "financement", level: "orange", condition: "Frais annexes (notaire, garantie, raccordements) sous-évalués", advice: "Prévoir 8 à 10 % de marge sur le budget global." },
  { id: "finance-10", category: "financement", level: "rouge", condition: "Échéancier de paiement non aligné sur le calendrier légal (loi 1990)", advice: "Le respect du calendrier légal protège le client des dérives de trésorerie." },

  // ---------- Construction ----------
  { id: "constr-01", category: "construction", level: "rouge", condition: "Étape non validée avant passage à l'étape suivante", advice: "Ne jamais avancer une étape sans validation formelle de la précédente." },
  { id: "constr-02", category: "construction", level: "orange", condition: "Retard de plus de 15 jours non signalé", advice: "Tout retard doit déclencher une communication écrite avec le constructeur." },
  { id: "constr-03", category: "construction", level: "orange", condition: "Intervention d'un corps de métier non planifiée", advice: "Un planning prévisionnel partagé limite les conflits d'intervenants." },
  { id: "constr-04", category: "construction", level: "rouge", condition: "Contrôle de conformité des fondations non réalisé", advice: "Étape critique à ne jamais valider sans visite terrain." },
  { id: "constr-05", category: "construction", level: "orange", condition: "Photo de suivi de chantier absente à une étape clé", advice: "La documentation photo protège en cas de litige futur." },
  { id: "constr-06", category: "construction", level: "orange", condition: "Changement de matériaux non validé par écrit", advice: "Toute substitution doit faire l'objet d'un avenant signé." },
  { id: "constr-07", category: "construction", level: "orange", condition: "Absence de compte-rendu de réunion de chantier", advice: "Formaliser systématiquement les décisions prises sur site." },
  { id: "constr-08", category: "construction", level: "rouge", condition: "Non-respect des normes RE2020 non vérifié", advice: "Vérifier la conformité énergétique avant la pose de l'isolation." },
  { id: "constr-09", category: "construction", level: "rouge", condition: "Intervention d'une entreprise sans assurance à jour", advice: "Contrôle systématique avant chaque intervention sur site." },
  { id: "constr-10", category: "construction", level: "orange", condition: "Réserves de la précédente étape non levées", advice: "Ne jamais laisser s'accumuler les réserves non traitées." },

  // ---------- Livraison ----------
  { id: "livr-01", category: "livraison", level: "rouge", condition: "Réception des travaux réalisée sans réserves formalisées par écrit", advice: "Toute réserve doit figurer sur le procès-verbal, à défaut elle est perdue." },
  { id: "livr-02", category: "livraison", level: "orange", condition: "Notices d'entretien des équipements non transmises", advice: "À exiger systématiquement à la remise des clés." },
  { id: "livr-03", category: "livraison", level: "rouge", condition: "Garanties (parfait achèvement, biennale, décennale) non archivées", advice: "Conserver ces documents pendant toute la durée légale de garantie." },
  { id: "livr-04", category: "livraison", level: "rouge", condition: "Solde final payé avant levée des réserves", advice: "Ne jamais solder l'intégralité avant la levée complète des réserves." },
  { id: "livr-05", category: "livraison", level: "rouge", condition: "Consuel (attestation électrique) non obtenu", advice: "Obligatoire avant mise en service de l'installation électrique." },
  { id: "livr-06", category: "livraison", level: "orange", condition: "Attestation de conformité assainissement non collectée (si non collectif)", advice: "Document exigé par certaines communes/SPANC." },
  { id: "livr-07", category: "livraison", level: "orange", condition: "Délai de levée des réserves non respecté par le constructeur", advice: "Relancer formellement après le délai contractuel." },
  { id: "livr-08", category: "livraison", level: "orange", condition: "Assurance habitation non souscrite avant emménagement", advice: "À anticiper avant la date de réception." },
  { id: "livr-09", category: "livraison", level: "orange", condition: "Clés et documentation technique non centralisées dans le coffre-fort", advice: "Toute documentation de livraison doit être archivée immédiatement." },
  { id: "livr-10", category: "livraison", level: "orange", condition: "Garantie de parfait achèvement (1 an) non suivie via rappel automatique", advice: "Programmer un rappel un mois avant l'échéance des 12 mois." },
];

export function getRule(id: string): Rule | undefined {
  return rules.find((r) => r.id === id);
}

export function rulesByCategory(category: RuleCategory): Rule[] {
  return rules.filter((r) => r.category === category);
}

// Pondération du score de risque global (cahier technique, Partie 4)
export const levelWeight: Record<RuleLevel, number> = { rouge: -15, orange: -5, vert: 0 };

export function computeRiskScore(triggeredLevels: RuleLevel[]): number {
  const total = triggeredLevels.reduce((sum, level) => sum + levelWeight[level], 100);
  return Math.max(0, Math.min(100, total));
}
