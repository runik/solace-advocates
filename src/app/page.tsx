"use client";

import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { AdvocateCard } from "@/components/AdvocateCard";
import { Advocate } from "@/types/advocate";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(value) ||
        advocate.lastName.toLowerCase().includes(value) ||
        advocate.city.toLowerCase().includes(value) ||
        advocate.degree.toLowerCase().includes(value) ||
        advocate.specialties.some(s => s.toLowerCase().includes(value)) ||
        advocate.yearsOfExperience.toString().includes(value)
      );
    });

    setFilteredAdvocates(filtered);
  };

  const resetSearch = () => {
    setSearchTerm("");
    setFilteredAdvocates(advocates);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold leading-6 text-gray-900">Our Advocates</h1>
          <p className="mt-2 text-sm text-gray-700">
            Find the right advocate for your needs from our extensive network of professionals.
          </p>
        </div>
      </div>
      
      <div className="mt-6 mb-8">
        <div className="relative mt-2 flex items-center">
          <input
            type="text"
            name="search"
            value={searchTerm}
            onChange={handleSearch}
            className="block w-full rounded-md border-0 py-3 pl-4 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Search by name, city, specialties..."
          />
          <div className="absolute inset-y-0 right-0 flex py-1.5 pr-4">
            {searchTerm && (
              <button
                onClick={resetSearch}
                className="text-gray-400 hover:text-gray-500 mr-2 text-sm font-medium"
              >
                Clear
              </button>
            )}
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredAdvocates.map((advocate) => (
          <AdvocateCard key={advocate.id} advocate={advocate} />
        ))}
      </div>
      
      {filteredAdvocates.length === 0 && (
        <div className="text-center mt-12">
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No advocates found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search terms.</p>
          <div className="mt-6">
            <button
              onClick={resetSearch}
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Reset search
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
