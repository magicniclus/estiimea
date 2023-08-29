import { StarIcon } from "@heroicons/react/20/solid";
import React from "react";
import { useSelector } from "react-redux";

const Stars = (props) => {
  const primaryColor = useSelector((state) => state?.user?.settings?.fontColor);
  const secondaryColor = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );

  const note = props.notation;

  // Calculez le nombre d'étoiles complètes à afficher
  const fullStars = Math.floor(note);

  // Calculez la partie fractionnaire pour le remplissage de la dernière étoile
  const partialFill = (note - fullStars) * 100;

  return (
    <div className="mt-7">
      <h3 style={{ color: primaryColor }}>Niveau de confiance:</h3>
      <div className="flex">
        {[...Array(5)].map((_, index) => {
          if (index < fullStars) {
            // Étoile complète
            return <StarIcon key={index} className="h-6 w-6 text-yellow-500" />;
          } else if (index === fullStars && partialFill > 0) {
            // Étoile partiellement remplie
            return (
              <div key={index} className="relative h-6 w-6">
                <StarIcon className="h-6 w-6 text-gray-300" />
                <div
                  style={{ width: `${partialFill}%` }}
                  className="absolute top-0 overflow-hidden h-6 text-yellow-500"
                >
                  <StarIcon className="h-6 w-6" />
                </div>
              </div>
            );
          } else {
            // Étoile vide
            return <StarIcon key={index} className="h-6 w-6 text-gray-300" />;
          }
        })}
      </div>
    </div>
  );
};

export default Stars;
