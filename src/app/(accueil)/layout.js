import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Estiimea",
  description:
    "Estiimea, l'outil ultime pour proposer des estimations immobilieres à vos prospects",
};

export default function AccueilLayout({ children }) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
