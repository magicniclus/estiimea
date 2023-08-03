import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Accueil | Inscription",
  description:
    "Estiimea, l'outil ultime pour proposer des estimations immobilieres à vos prospects",
};

export default function AccueilLayout({ children }) {
  return (
    <body className={cn(" text-slate-600  font-sans", inter.className)}>
      {children}
    </body>
  );
}
