// =========================================================
// PROJET X PROMOTEUR — Retour d'expérience (Volet 3, Phase 1)
// Bibliothèque initiale de risques, dérivée de 7 opérations
// réelles. Structure prête pour la Phase 4 (moteur de
// rapprochement) sans encore l'implémenter.
//
// Règle absolue du document fondateur : toujours distinguer
// - retour d'expérience (ce qui a été fait avant)
// - recommandation Projet X (ce que le système suggère)
// - validation professionnelle (jamais remplacée par le système)
// =========================================================

export type ExperienceLevel = "information" | "vigilance" | "alerte" | "critique";

export type ExperienceRisk = {
  id: string;
  category: string;
  operationRef: string; // opération(s) de référence ayant vécu ce risque
  situation: string;
  risk: string;
  retourExperience: string; // ce qui a été fait, historiquement
  recommandation: string; // ce que Projet X suggère de vérifier
  level: ExperienceLevel;
};

export const experienceLevels: { key: ExperienceLevel; label: string }[] = [
  { key: "information", label: "Information" },
  { key: "vigilance", label: "Vigilance" },
  { key: "alerte", label: "Alerte" },
  { key: "critique", label: "Critique" },
];

export const experienceRisks: ExperienceRisk[] = [
  {
    id: "exp-01",
    category: "Contrôle salariés / entreprises",
    operationRef: "Les Amaryllis — Saint-Denis",
    situation: "Contrôle insuffisant des salariés présents sur l'opération.",
    risk: "Présence de salariés dont les contrats de travail n'ont pas été correctement vérifiés.",
    retourExperience: "Demande de vérification de l'ensemble des contrats de travail des entreprises intervenantes.",
    recommandation: "Vérifier les contrats de travail des salariés présents dès que plusieurs entreprises interviennent sur l'opération.",
    level: "vigilance",
  },
  {
    id: "exp-02",
    category: "Coordination de chantier",
    operationRef: "Les Amaryllis — Saint-Denis",
    situation: "Construction en lots séparés, avec architecte et coordinateur travaux.",
    risk: "Coordination insuffisante du chantier entre les différents lots.",
    retourExperience: "Renforcement du présentiel sur le chantier pour fluidifier la coordination.",
    recommandation: "Renforcer le suivi et le présentiel dès que plusieurs lots/entreprises interviennent simultanément.",
    level: "alerte",
  },
  {
    id: "exp-03",
    category: "Urbanisme / Permis",
    operationRef: "Les Villas de Bellemène, Thérèse SOA, Ange Gabriel",
    situation: "Difficultés récurrentes liées au délai d'obtention du permis de construire.",
    risk: "Retard de délivrance du permis bloquant le démarrage de l'opération.",
    retourExperience: "Prise de contact directe avec les services d'urbanisme, rendez-vous dédié, présentation directe des difficultés.",
    recommandation: "Identifier le point bloquant, contacter le service urbanisme, documenter les échanges et la décision obtenue.",
    level: "alerte",
  },
  {
    id: "exp-04",
    category: "Hydraulique / Eaux pluviales",
    operationRef: "Les Villas de Bellemène, Ange Gabriel",
    situation: "Problématiques liées à la gestion des eaux pluviales.",
    risk: "Non-conformité ou blocage lié à la loi sur l'eau et à la gestion hydraulique.",
    retourExperience: "Intervention d'un bureau d'étude hydraulique pour argumenter et sécuriser le dossier.",
    recommandation: "Consulter un bureau d'étude hydraulique dès que la problématique technique le nécessite, sans statuer soi-même sur l'applicabilité réglementaire.",
    level: "vigilance",
  },
  {
    id: "exp-05",
    category: "Foncier / Bornage",
    operationRef: "Les Villas de Bellemène",
    situation: "Mauvaise signature du bornage contradictoire.",
    risk: "Bornage non correctement sécurisé juridiquement.",
    retourExperience: "Reconvocation de l'ensemble des mitoyens pour obtenir une signature ferme.",
    recommandation: "Vérifier les signatures et les parties concernées ; reconvoquer si nécessaire ; conserver les documents dans le dossier foncier.",
    level: "critique",
  },
  {
    id: "exp-06",
    category: "Complexité / Volume",
    operationRef: "Les Restanques — Saint-Denis (100 logements)",
    situation: "Opération très dense et très complexe.",
    risk: "Retards liés à la coordination technique sur un volume important.",
    retourExperience: "Renforcement des équipes et révision de certains aspects architecturaux.",
    recommandation: "Sur une opération à forte complexité/volume, prévoir un renforcement des ressources et une revue technique/architecturale anticipée.",
    level: "vigilance",
  },
  {
    id: "exp-07",
    category: "Commercial / Financier",
    operationRef: "Jour d'été — Saint-Denis (81 logements étudiants)",
    situation: "Opération réalisée en contexte de crise financière.",
    risk: "Ralentissement ou annulation d'une partie des ventes, stock restant.",
    retourExperience: "Montage en SCI pour racheter en bloc les appartements restants (solution historique, non une recommandation fiscale automatique).",
    recommandation: "Suivre le rythme des ventes et le stock restant ; envisager des scénarios de sortie ; toute solution de montage juridique/fiscal doit être validée par un professionnel.",
    level: "alerte",
  },
  {
    id: "exp-08",
    category: "Administratif",
    operationRef: "Jour d'été",
    situation: "Problématique administrative liée à la station d'épuration.",
    risk: "Blocage du permis lié à l'assainissement.",
    retourExperience: "Dépôt d'un permis modificatif intégrant une station d'épuration autonome avant rejet dans le réseau public.",
    recommandation: "Suivre la logique Problème → Analyse → Solution envisagée → Validation → Documentation, avec les documents associés archivés.",
    level: "alerte",
  },
  {
    id: "exp-09",
    category: "VRD / Aménagement",
    operationRef: "Villele",
    situation: "Terrain divisé en trois parcelles, terrassement et chemin à réaliser.",
    risk: "Mauvais suivi du chantier concernant terrassement, parcelles, chemin et gestion des eaux.",
    retourExperience: "Changement d'intervenant pour un professionnel disposant d'une réelle expérience VRD.",
    recommandation: "Vigilance VRD renforcée dès qu'une opération combine division parcellaire, terrassement, création de chemin et gestion des eaux.",
    level: "vigilance",
  },
  {
    id: "exp-10",
    category: "Relationnel / Foncier",
    operationRef: "Villele",
    situation: "Questions d'accès et de gestion de l'eau pluviale avec les voisins.",
    risk: "Tension ou blocage avec les propriétaires mitoyens.",
    retourExperience: "Discussion directe avec les voisins concernés pour traiter les questions d'accès et d'eaux.",
    recommandation: "Identifier les sujets nécessitant une coordination avec les mitoyens ; documenter la discussion et l'accord éventuel.",
    level: "information",
  },
];
