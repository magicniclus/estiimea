import React from "react";
import { capitalizeFirstLetter } from "../../lib/utils";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

const Tables = ({ data, onSort, sortedColumn }) => {
  const renderIcon = (column) => {
    if (sortedColumn.name !== column) {
      return <ChevronDownIcon className="w-4 h-4 ml-1 opacity-10" />;
    }

    return sortedColumn.direction === "asc" ? (
      <ChevronUpIcon className="w-4 h-4 ml-1" />
    ) : (
      <ChevronDownIcon className="w-4 h-4 ml-1" />
    );
  };

  return (
    <div className="mt-5">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    {["firstName", "adresse", "type", "date"].map((column) => (
                      <th
                        key={column}
                        scope="col"
                        className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                        onClick={() => onSort(column)}
                      >
                        <div className="flex items-center">
                          {capitalizeFirstLetter(column)}
                          {renderIcon(column)}
                        </div>
                      </th>
                    ))}
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data.map((estimation, idx) => (
                    <tr key={estimation.email + idx}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {capitalizeFirstLetter(estimation.firstName)}{" "}
                        {capitalizeFirstLetter(estimation.lastName)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {estimation.adresse}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {capitalizeFirstLetter(estimation.type)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {estimation.date}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a
                          href="#"
                          className="text-blue-500 hover:text-blue-500/60 transition-all duration-300 ease-in-out"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tables;
