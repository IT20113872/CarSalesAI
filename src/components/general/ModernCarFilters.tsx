"use client";

import { useState, useEffect } from "react";
import { DollarSign, MapPin } from "lucide-react";
import { Filters } from "./CarFilters";

type ModernCarFiltersProps = {
  initialFilters?: Filters;
  onFilter: (filters: Filters) => void;
};

export default function ModernCarFilters({ initialFilters, onFilter }: ModernCarFiltersProps) {
  const [make, setMake] = useState(initialFilters?.make || "");
  const [model, setModel] = useState(initialFilters?.model || "");
  const [minPrice, setMinPrice] = useState(initialFilters?.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(initialFilters?.maxPrice || "");
  const [city, setCity] = useState(initialFilters?.city || "");
  const [bodyType, setBodyType] = useState(initialFilters?.bodyType || "");

  const [allMakes, setAllMakes] = useState<string[]>([]);
  const [allModels, setAllModels] = useState<string[]>([]);

  // Fetch makes and models dynamically
  useEffect(() => {
    fetch("/api/cars/makes")
      .then((res) => res.json())
      .then((data) => setAllMakes(data.makes));

    fetch("/api/cars/models")
      .then((res) => res.json())
      .then((data) => setAllModels(data.models));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({ make, model, minPrice, maxPrice, city, bodyType });
  };

  const handleClear = () => {
    setMake("");
    setModel("");
    setMinPrice("");
    setMaxPrice("");
    setCity("");
    setBodyType("");
    onFilter({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap items-end gap-4 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg overflow-x-auto mb-6"
    >
      {/* Make */}
      <div className="flex flex-col">
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Make</label>
        <select
          value={make}
          onChange={(e) => setMake(e.target.value)}
          className="w-32 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        >
          <option value="">Any Make</option>
          {allMakes.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* Model */}
      <div className="flex flex-col">
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Model</label>
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="w-32 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        >
          <option value="">Any Model</option>
          {allModels
            .filter((m) => !make || m.startsWith(make)) // filter models by make
            .map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
        </select>
      </div>

      {/* Min Price */}
      <div className="flex flex-col relative">
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Min Price</label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="0"
            className="w-24 pl-8 pr-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />
        </div>
      </div>

      {/* Max Price */}
      <div className="flex flex-col relative">
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Max Price</label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Any"
            className="w-24 pl-8 pr-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />
        </div>
      </div>

      {/* City */}
      <div className="flex flex-col relative">
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">City</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Any City"
            className="w-32 pl-8 pr-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />
        </div>
      </div>

      {/* Body Type */}
      <div className="flex flex-col">
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Body Type</label>
        <input
          type="text"
          value={bodyType}
          onChange={(e) => setBodyType(e.target.value)}
          placeholder="Any"
          className="w-28 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-1">
        <button type="submit" className="h-10 px-5 bg-transparent text-blue-500 font-semibold rounded-xl border-2 border-blue-500 hover:bg-blue-500 hover:text-white transition">
          Filter
        </button>
        <button type="button" onClick={handleClear} className="h-10 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition">
          Clear
        </button>
      </div>
    </form>
  );
}
