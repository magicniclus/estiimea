import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const people = [
  { id: 1, name: "Mandataire" },
  { id: 2, name: "Agent immobilier" },
  { id: 3, name: "Responsable de secteur" },
  { id: 4, name: "Gérant" },
  { id: 5, name: "Co-gérant" },
  { id: 6, name: "Agent commercial" },
  { id: 7, name: "Conseiller" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example(props) {
  const value = props.value;
  const setValue = props.setValue;

  // Recherchez une correspondance entre `value` et un élément dans `people`
  const matchingPerson = people.find((person) => person.name === value);

  // Utilisez la correspondance trouvée pour initialiser `selected`, sinon utilisez le premier élément de `people`
  const [selected, setSelected] = useState(matchingPerson || people[0]);

  useEffect(() => {
    setValue(selected.name);
  }, [selected, setValue]);

  return (
    <Listbox value={selected} onChange={setSelected} className="w-full">
      {({ open }) => (
        <>
          <div className="relative mt-2 sm:max-w-md  grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 outline-none sm:text-sm sm:leading-6 sm:col-span-4">
              <span className="block truncate">{value || selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100 "
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {people.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-gray-100" : "",
                        "relative cursor-default select-none py-2 pl-8 pr-4text-gray-700"
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {person.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-gray500",
                              "absolute inset-y-0 left-0 flex items-center pl-1.5"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
