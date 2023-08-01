"use client";
import React from "react";
import {
  EnvelopeIcon,
  UserIcon,
  LockClosedIcon,
} from "@heroicons/react/20/solid";
import { cn } from "@/lib/utils";

const Input = (props) => {
  const label = props.label || "Nom";
  const type = props.type || "";
  const name = props.name || "";
  const placeholder = props.placeholder || "Doe";
  const width = props.width || "w-full";
  const logo = props.logo || "";

  const selectLogo = (logo) => {
    switch (logo) {
      case "email":
        return (
          <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        );
      case "password":
        return (
          <LockClosedIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        );
      case "name":
        return (
          <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        );
      default:
        return (
          <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        );
    }
  };

  return (
    <div className={cn("px-5 py-3  text-slate-600 ", width)}>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6  text-slate-600 "
      >
        {label}
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          {selectLogo(logo)}
        </div>
        <input
          type={type}
          name={name}
          id={name}
          className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default Input;
