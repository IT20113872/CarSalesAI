"use client";

import { useState, useEffect } from "react";

type Filters = {
  make?: string;
  year?: string;
  minPrice?: string;
  maxPrice?: string;
  city?: string;
};

type CarFiltersProps = {
  onFilter: (filters: Filters) => void;
  initialFilters?: Filters;
};

export default function CarFilters({ onFilter, initialFilters }: CarFiltersProps) {
  const [make, setMake] = useState(initialFilters?.make || "");
  const [year, setYear] = useState(initialFilters?.year || "");
  const [minPrice, setMinPrice] = useState(initialFilters?.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(initialFilters?.maxPrice || "");
  const [city, setCity] = useState(initialFilters?.city || "");

  useEffect(() => {
    if (initialFilters) {
      setMake(initialFilters.make || "");
      setYear(initialFilters.year || "");
      setMinPrice(initialFilters.minPrice || "");
      setMaxPrice(initialFilters.maxPrice || "");
      setCity(initialFilters.city || "");
    }
  }, [initialFilters]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({ make, year, minPrice, maxPrice, city });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex flex-wrap gap-4 items-end mb-6"
    >
      {/* Make */}
      <div className="flex flex-col">
        <label className="text-gray-700 dark:text-gray-300 font-semibold">Make</label>
        <input
          type="text"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          placeholder="All"
          className="border border-gray-300 dark:border-gray-700 rounded px-3 py-1 dark:bg-gray-900 dark:text-white"
        />
      </div>

      {/* Year */}
      <div className="flex flex-col">
        <label className="text-gray-700 dark:text-gray-300 font-semibold">Year</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="All"
          className="border border-gray-300 dark:border-gray-700 rounded px-3 py-1 dark:bg-gray-900 dark:text-white"
        />
      </div>

      {/* Min Price */}
      <div className="flex flex-col">
        <label className="text-gray-700 dark:text-gray-300 font-semibold">Min Price</label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="All"
          className="border border-gray-300 dark:border-gray-700 rounded px-3 py-1 dark:bg-gray-900 dark:text-white"
        />
      </div>

      {/* Max Price */}
      <div className="flex flex-col">
        <label className="text-gray-700 dark:text-gray-300 font-semibold">Max Price</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="All"
          className="border border-gray-300 dark:border-gray-700 rounded px-3 py-1 dark:bg-gray-900 dark:text-white"
        />
      </div>

      {/* City */}
      <div className="flex flex-col">
        <label className="text-gray-700 dark:text-gray-300 font-semibold">City</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="All"
          className="border border-gray-300 dark:border-gray-700 rounded px-3 py-1 dark:bg-gray-900 dark:text-white"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 dark:bg-black text-white rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-gray-700 transition"
      >
        Filter
      </button>
    </form>
  );
}
