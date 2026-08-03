export type AlertLevel = "vert" | "orange" | "rouge";

export type Alert = {
  id: string;
  level: AlertLevel;
  title: string;
  detail: string;
};

export type Doc = {
  id: string;
  name: string;
  category: string;
  status: "conforme" | "manquant" | "bloquant";
};

export type Task = {
  id: string;
  title: string;
  done: boolean;
  due?: string;
};
