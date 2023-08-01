import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import ReduxProvider from "@/redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Accueil || connexion",
  description:
    "Estiimea, l'outil ultime pour proposer des estimations immobilieres à vos prospects",
};

export default function AccueilLayout({ children }) {
  return (
    <html lang="fr">
      <body className={cn(" text-slate-600  font-sans", inter.className)}>
        {children}
      </body>
    </html>
  );
}
