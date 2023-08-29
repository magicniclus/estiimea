import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // replace spaces with -
    .replace(/[^\w\-]+/g, "") // remove all non-word characters
    .replace(/\-\-+/g, "-"); // replace multiple dashes with single dash
};

export function capitalizeFirstLetter(str) {
  if (!str || typeof str !== "string") return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatNumberWithSpaces(num) {
  return num.toLocaleString("fr-FR");
}
