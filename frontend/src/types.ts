// types.ts
export interface Service {
  id: number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  features: string[];
  details?: string; // Optionnel pour la page de détails
}