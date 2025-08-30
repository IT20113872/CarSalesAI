"use client";

import { useState, useEffect } from "react";
import { Car, MapPin, DollarSign } from "lucide-react";

export type Filters = {
  make?: string;
  model?: string;
  minPrice?: string;
  maxPrice?: string;
  city?: string;
  bodyType?: string;
};

type ModernCarFiltersProps = {
  initialFilters?: Filters;
  onFilter: (filters: Filters) => void;
};

// Example options
const makes = ["Toyota", "Honda", "Ford", "BMW"];
const models = ["Corolla", "Camry", "Civic", "Accord"];
const cities = ["New York", "Los Angeles", "Chicago", "Houston"];
const bodyTypes = ["SUV", "Sedan", "Hatchback", "Coupe"];

export default function ModernCarFilters({ initialFilters, onFilter }: ModernCarFiltersProps) {
  const [make, setMake] = useState(initialFilters?.make || "");
  const [model, setModel] = useState(initialFilters?.model || "");
  const [minPrice, setMinPrice] = useState(initialFilters?.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(initialFilters?.maxPrice || "");
  const [city, setCity] = useState(initialFilters?.city || "");
  const [bodyType, setBodyType] = useState(initialFilters?.bodyType || "");

  useEffect(() => {
    setMake(initialFilters?.make || "");
    setModel(initialFilters?.model || "");
    setMinPrice(initialFilters?.minPrice || "");
    setMaxPrice(initialFilters?.maxPrice || "");
    setCity(initialFilters?.city || "");
    setBodyType(initialFilters?.bodyType || "");
  }, [initialFilters]);

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
      className="flex flex-wrap items-end gap-4 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg justify-start overflow-x-auto mb-6"
    >
      {/* Make */}
      <div className="flex flex-col">
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Make</label>
        <input
          list="makes"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          placeholder="Any Make"
          className="w-32 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        />
        <datalist id="makes">
          {makes.map((m) => (
            <option key={m} value={m} />
          ))}
        </datalist>
      </div>

      {/* Model */}
      <div className="flex flex-col">
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Model</label>
        <input
          list="models"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Any Model"
          className="w-32 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        />
        <datalist id="models">
          {models.map((m) => (
            <option key={m} value={m} />
          ))}
        </datalist>
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
        <input
          list="cities"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Any City"
          className="w-32 pl-8 pr-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        />
        <datalist id="cities">
          {cities.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </div>

      {/* Body Type */}
      <div className="flex flex-col">
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Body Type</label>
        <input
          list="bodyTypes"
          value={bodyType}
          onChange={(e) => setBodyType(e.target.value)}
          placeholder="Any"
          className="w-28 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        />
        <datalist id="bodyTypes">
          {bodyTypes.map((b) => (
            <option key={b} value={b} />
          ))}
        </datalist>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-1">
        <button
          type="submit"
          className="h-10 px-5 bg-transparent text-blue-500 font-semibold rounded-xl border-2 border-blue-500 hover:bg-blue-500 hover:text-white transition"
        >
          Filter
        </button>

        <button
          type="button"
          onClick={handleClear}
          className="h-10 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          Clear
        </button>
      </div>
    </form>
  );
}




// "use client";

// import { useState, useEffect } from "react";
// import { Car, MapPin, DollarSign } from "lucide-react";

// export type Filters = {
//   make?: string;
//   model?: string;
//   minPrice?: string;
//   maxPrice?: string;
//   city?: string;
//   bodyType?: string;
// };

// type ModernCarFiltersProps = {
//   initialFilters?: Filters;
//   onFilter: (filters: Filters) => void;
// };

// export default function ModernCarFilters({ initialFilters, onFilter }: ModernCarFiltersProps) {
//   const [make, setMake] = useState(initialFilters?.make || "");
//   const [model, setModel] = useState(initialFilters?.model || "");
//   const [minPrice, setMinPrice] = useState(initialFilters?.minPrice || "");
//   const [maxPrice, setMaxPrice] = useState(initialFilters?.maxPrice || "");
//   const [city, setCity] = useState(initialFilters?.city || "");
//   const [bodyType, setBodyType] = useState(initialFilters?.bodyType || "");

//   useEffect(() => {
//     setMake(initialFilters?.make || "");
//     setModel(initialFilters?.model || "");
//     setMinPrice(initialFilters?.minPrice || "");
//     setMaxPrice(initialFilters?.maxPrice || "");
//     setCity(initialFilters?.city || "");
//     setBodyType(initialFilters?.bodyType || "");
//   }, [initialFilters]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onFilter({ make, model, minPrice, maxPrice, city, bodyType });
//   };

//   const handleClear = () => {
//     setMake("");
//     setModel("");
//     setMinPrice("");
//     setMaxPrice("");
//     setCity("");
//     setBodyType("");
//     onFilter({});
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="flex flex-wrap items-end gap-4 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg justify-start overflow-x-auto mb-6"
//     >
//       {/* Make */}
//       <div className="flex flex-col">
//         <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Make</label>
//         <input
//           type="text"
//           value={make}
//           onChange={(e) => setMake(e.target.value)}
//           placeholder="Any Make"
//           className="w-32 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
//         />
//       </div>

//       {/* Model */}
//       <div className="flex flex-col">
//         <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Model</label>
//         <input
//           type="text"
//           value={model}
//           onChange={(e) => setModel(e.target.value)}
//           placeholder="Any Model"
//           className="w-32 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
//         />
//       </div>

//       {/* Min Price */}
//       <div className="flex flex-col relative">
//         <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Min Price</label>
//         <div className="relative">
//           <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
//           <input
//             type="number"
//             value={minPrice}
//             onChange={(e) => setMinPrice(e.target.value)}
//             placeholder="0"
//             className="w-24 pl-8 pr-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
//           />
//         </div>
//       </div>

//       {/* Max Price */}
//       <div className="flex flex-col relative">
//         <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Max Price</label>
//         <div className="relative">
//           <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
//           <input
//             type="number"
//             value={maxPrice}
//             onChange={(e) => setMaxPrice(e.target.value)}
//             placeholder="Any"
//             className="w-24 pl-8 pr-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
//           />
//         </div>
//       </div>

//       {/* City */}
//       <div className="flex flex-col relative">
//         <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">City</label>
//         <div className="relative">
//           <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
//           <input
//             type="text"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             placeholder="Any City"
//             className="w-32 pl-8 pr-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
//           />
//         </div>
//       </div>

//       {/* Body Type */}
//       <div className="flex flex-col">
//         <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Body Type</label>
//         <input
//           type="text"
//           value={bodyType}
//           onChange={(e) => setBodyType(e.target.value)}
//           placeholder="Any"
//           className="w-28 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
//         />
//       </div>

//       {/* Buttons */}
//       <div className="flex gap-2 mt-1">
//         <button
//           type="submit"
//           className="h-10 px-5 bg-transparent text-blue-500 font-semibold rounded-xl border-2 border-blue-500 hover:bg-blue-500 hover:text-white transition"
//         >
//           Filter
//         </button>

//         <button
//           type="button"
//           onClick={handleClear}
//           className="h-10 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition"
//         >
//           Clear
//         </button>
//       </div>
//     </form>
//   );
// }


// // // "use client";

// // // import { useState, useEffect } from "react";

// // // type Filters = {
// // //   make?: string;
// // //   year?: string;
// // //   minPrice?: string;
// // //   maxPrice?: string;
// // //   city?: string;
// // // };

// // // type CarFiltersProps = {
// // //   onFilter: (filters: Filters) => void;
// // //   initialFilters?: Filters;
// // // };

// // // export default function CarFilters({ onFilter, initialFilters }: CarFiltersProps) {
// // //   const [make, setMake] = useState(initialFilters?.make || "");
// // //   const [year, setYear] = useState(initialFilters?.year || "");
// // //   const [minPrice, setMinPrice] = useState(initialFilters?.minPrice || "");
// // //   const [maxPrice, setMaxPrice] = useState(initialFilters?.maxPrice || "");
// // //   const [city, setCity] = useState(initialFilters?.city || "");

// // //   useEffect(() => {
// // //     if (initialFilters) {
// // //       setMake(initialFilters.make || "");
// // //       setYear(initialFilters.year || "");
// // //       setMinPrice(initialFilters.minPrice || "");
// // //       setMaxPrice(initialFilters.maxPrice || "");
// // //       setCity(initialFilters.city || "");
// // //     }
// // //   }, [initialFilters]);

// // //   const handleSubmit = (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     onFilter({ make, year, minPrice, maxPrice, city });
// // //   };

// // //   return (
// // //     <form
// // //       onSubmit={handleSubmit}
// // //       className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex flex-wrap gap-4 items-end mb-6"
// // //     >
// // //       {/* Make */}
// // //       <div className="flex flex-col">
// // //         <label className="text-gray-700 dark:text-gray-300 font-semibold">Make</label>
// // //         <input
// // //           type="text"
// // //           value={make}
// // //           onChange={(e) => setMake(e.target.value)}
// // //           placeholder="All"
// // //           className="border border-gray-300 dark:border-gray-700 rounded px-3 py-1 dark:bg-gray-900 dark:text-white"
// // //         />
// // //       </div>

// // //       {/* Year */}
// // //       <div className="flex flex-col">
// // //         <label className="text-gray-700 dark:text-gray-300 font-semibold">Year</label>
// // //         <input
// // //           type="number"
// // //           value={year}
// // //           onChange={(e) => setYear(e.target.value)}
// // //           placeholder="All"
// // //           className="border border-gray-300 dark:border-gray-700 rounded px-3 py-1 dark:bg-gray-900 dark:text-white"
// // //         />
// // //       </div>

// // //       {/* Min Price */}
// // //       <div className="flex flex-col">
// // //         <label className="text-gray-700 dark:text-gray-300 font-semibold">Min Price</label>
// // //         <input
// // //           type="number"
// // //           value={minPrice}
// // //           onChange={(e) => setMinPrice(e.target.value)}
// // //           placeholder="All"
// // //           className="border border-gray-300 dark:border-gray-700 rounded px-3 py-1 dark:bg-gray-900 dark:text-white"
// // //         />
// // //       </div>

// // //       {/* Max Price */}
// // //       <div className="flex flex-col">
// // //         <label className="text-gray-700 dark:text-gray-300 font-semibold">Max Price</label>
// // //         <input
// // //           type="number"
// // //           value={maxPrice}
// // //           onChange={(e) => setMaxPrice(e.target.value)}
// // //           placeholder="All"
// // //           className="border border-gray-300 dark:border-gray-700 rounded px-3 py-1 dark:bg-gray-900 dark:text-white"
// // //         />
// // //       </div>

// // //       {/* City */}
// // //       <div className="flex flex-col">
// // //         <label className="text-gray-700 dark:text-gray-300 font-semibold">City</label>
// // //         <input
// // //           type="text"
// // //           value={city}
// // //           onChange={(e) => setCity(e.target.value)}
// // //           placeholder="All"
// // //           className="border border-gray-300 dark:border-gray-700 rounded px-3 py-1 dark:bg-gray-900 dark:text-white"
// // //         />
// // //       </div>

// // //       <button
// // //         type="submit"
// // //         className="px-4 py-2 bg-blue-600 dark:bg-black text-white rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-gray-700 transition"
// // //       >
// // //         Filter
// // //       </button>
// // //     </form>
// // //   );
// // // }


// // "use client";

// // import { useState } from "react";
// // import { Car, MapPin, DollarSign } from "lucide-react";

// // // Type for filters
// // export type Filters = {
// //   make?: string;
// //   model?: string;
// //   minPrice?: string;
// //   maxPrice?: string;
// //   city?: string;
// //   bodyType?: string;
// // };

// // type ModernCarFiltersProps = {
// //   initialFilters?: Filters;
// //   onFilter: (filters: Filters) => void;
// // };

// // export default function ModernCarFilters({ initialFilters, onFilter }: ModernCarFiltersProps) {
// //   const [make, setMake] = useState(initialFilters?.make || "");
// //   const [model, setModel] = useState(initialFilters?.model || "");
// //   const [minPrice, setMinPrice] = useState(initialFilters?.minPrice || "");
// //   const [maxPrice, setMaxPrice] = useState(initialFilters?.maxPrice || "");
// //   const [city, setCity] = useState(initialFilters?.city || "");
// //   const [bodyType, setBodyType] = useState(initialFilters?.bodyType || "");

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     onFilter({ make, model, minPrice, maxPrice, city, bodyType });
// //   };

// //   return (
// //     <form
// //       onSubmit={handleSubmit}
// //       className="flex flex-wrap items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-md justify-start overflow-x-auto mb-6"
// //     >
// //       {/* Make */}
// //       <div className="flex flex-col">
// //         <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Make</label>
// //         <input
// //           type="text"
// //           value={make}
// //           onChange={(e) => setMake(e.target.value)}
// //           placeholder="Any Make"
// //           className="w-32 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-1 focus:ring-red-500"
// //         />
// //       </div>

// //       {/* Model */}
// //       <div className="flex flex-col">
// //         <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Model</label>
// //         <input
// //           type="text"
// //           value={model}
// //           onChange={(e) => setModel(e.target.value)}
// //           placeholder="Any Model"
// //           className="w-32 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-1 focus:ring-red-500"
// //         />
// //       </div>

// //       {/* Min Price */}
// //       <div className="flex flex-col relative">
// //         <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Min Price</label>
// //         <div className="relative">
// //           <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
// //           <input
// //             type="number"
// //             value={minPrice}
// //             onChange={(e) => setMinPrice(e.target.value)}
// //             placeholder="0"
// //             className="w-24 pl-6 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-1 focus:ring-red-500"
// //           />
// //         </div>
// //       </div>

// //       {/* Max Price */}
// //       <div className="flex flex-col relative">
// //         <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Max Price</label>
// //         <div className="relative">
// //           <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
// //           <input
// //             type="number"
// //             value={maxPrice}
// //             onChange={(e) => setMaxPrice(e.target.value)}
// //             placeholder="Any"
// //             className="w-24 pl-6 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-1 focus:ring-red-500"
// //           />
// //         </div>
// //       </div>

// //       {/* City */}
// //       <div className="flex flex-col relative">
// //         <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">City</label>
// //         <div className="relative">
// //           <MapPin className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
// //           <input
// //             type="text"
// //             value={city}
// //             onChange={(e) => setCity(e.target.value)}
// //             placeholder="Any City"
// //             className="w-32 pl-6 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-1 focus:ring-red-500"
// //           />
// //         </div>
// //       </div>

// //       {/* Body Type */}
// //       <div className="flex flex-col">
// //         <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Body Type</label>
// //         <input
// //           type="text"
// //           value={bodyType}
// //           onChange={(e) => setBodyType(e.target.value)}
// //           placeholder="Any"
// //           className="w-28 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-1 focus:ring-red-500"
// //         />
// //       </div>

// //       {/* Submit */}
// //       <button
// //         type="submit"
// //         className="h-10 px-5 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 dark:hover:bg-red-700 transition self-end"
// //       >
// //         Filter
// //       </button>
// //     </form>
// //   );
// // }


// "use client";

// import { useState, useEffect } from "react";
// import { Car, MapPin, DollarSign } from "lucide-react";

// // Type for filters
// export type Filters = {
//   make?: string;
//   model?: string;
//   minPrice?: string;
//   maxPrice?: string;
//   city?: string;
//   bodyType?: string;
// };

// type ModernCarFiltersProps = {
//   initialFilters?: Filters;
//   onFilter: (filters: Filters) => void;
// };

// export default function ModernCarFilters({ initialFilters, onFilter }: ModernCarFiltersProps) {
//   const [make, setMake] = useState(initialFilters?.make || "");
//   const [model, setModel] = useState(initialFilters?.model || "");
//   const [minPrice, setMinPrice] = useState(initialFilters?.minPrice || "");
//   const [maxPrice, setMaxPrice] = useState(initialFilters?.maxPrice || "");
//   const [city, setCity] = useState(initialFilters?.city || "");
//   const [bodyType, setBodyType] = useState(initialFilters?.bodyType || "");

//   useEffect(() => {
//     // Sync state when initialFilters change
//     setMake(initialFilters?.make || "");
//     setModel(initialFilters?.model || "");
//     setMinPrice(initialFilters?.minPrice || "");
//     setMaxPrice(initialFilters?.maxPrice || "");
//     setCity(initialFilters?.city || "");
//     setBodyType(initialFilters?.bodyType || "");
//   }, [initialFilters]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onFilter({ make, model, minPrice, maxPrice, city, bodyType });
//   };

//   const handleClear = () => {
//     setMake("");
//     setModel("");
//     setMinPrice("");
//     setMaxPrice("");
//     setCity("");
//     setBodyType("");
//     onFilter({});
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="flex flex-wrap items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-md justify-start overflow-x-auto mb-6"
//     >
//       {/* Make */}
//       <div className="flex flex-col">
//         <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Make</label>
//         <input
//           type="text"
//           value={make}
//           onChange={(e) => setMake(e.target.value)}
//           placeholder="Any Make"
//           className="w-32 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-1 focus:ring-red-500"
//         />
//       </div>

//       {/* Model */}
//       <div className="flex flex-col">
//         <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Model</label>
//         <input
//           type="text"
//           value={model}
//           onChange={(e) => setModel(e.target.value)}
//           placeholder="Any Model"
//           className="w-32 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-1 focus:ring-red-500"
//         />
//       </div>

//       {/* Min Price */}
//       <div className="flex flex-col relative">
//         <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Min Price</label>
//         <div className="relative">
//           <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
//           <input
//             type="number"
//             value={minPrice}
//             onChange={(e) => setMinPrice(e.target.value)}
//             placeholder="0"
//             className="w-24 pl-6 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-1 focus:ring-red-500"
//           />
//         </div>
//       </div>

//       {/* Max Price */}
//       <div className="flex flex-col relative">
//         <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Max Price</label>
//         <div className="relative">
//           <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
//           <input
//             type="number"
//             value={maxPrice}
//             onChange={(e) => setMaxPrice(e.target.value)}
//             placeholder="Any"
//             className="w-24 pl-6 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-1 focus:ring-red-500"
//           />
//         </div>
//       </div>

//       {/* City */}
//       <div className="flex flex-col relative">
//         <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">City</label>
//         <div className="relative">
//           <MapPin className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
//           <input
//             type="text"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             placeholder="Any City"
//             className="w-32 pl-6 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-1 focus:ring-red-500"
//           />
//         </div>
//       </div>

//       {/* Body Type */}
//       <div className="flex flex-col">
//         <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Body Type</label>
//         <input
//           type="text"
//           value={bodyType}
//           onChange={(e) => setBodyType(e.target.value)}
//           placeholder="Any"
//           className="w-28 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-1 focus:ring-red-500"
//         />
//       </div>

//       {/* Submit */}
//       <button
//         type="submit"
//         className="h-10 px-5 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 dark:hover:bg-red-700 transition self-end"
//       >
//         Filter
//       </button>

//       {/* Clear */}
//       <button
//         type="button"
//         onClick={handleClear}
//         className="h-10 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition self-end"
//       >
//         Clear
//       </button>
//     </form>
//   );
// }


// // src\components\general\CarFilters.tsx

// "use client";

// import { useState, useEffect } from "react";
// import { Car, MapPin, DollarSign } from "lucide-react";

// // Type for filters
// export type Filters = {
//   make?: string;
//   model?: string;
//   minPrice?: string;
//   maxPrice?: string;
//   city?: string;
//   bodyType?: string;
// };

// type ModernCarFiltersProps = {
//   initialFilters?: Filters;
//   onFilter: (filters: Filters) => void;
// };

// export default function ModernCarFilters({ initialFilters, onFilter }: ModernCarFiltersProps) {
//   const [make, setMake] = useState(initialFilters?.make || "");
//   const [model, setModel] = useState(initialFilters?.model || "");
//   const [minPrice, setMinPrice] = useState(initialFilters?.minPrice || "");
//   const [maxPrice, setMaxPrice] = useState(initialFilters?.maxPrice || "");
//   const [city, setCity] = useState(initialFilters?.city || "");
//   const [bodyType, setBodyType] = useState(initialFilters?.bodyType || "");

//   useEffect(() => {
//     // Sync state when initialFilters change
//     setMake(initialFilters?.make || "");
//     setModel(initialFilters?.model || "");
//     setMinPrice(initialFilters?.minPrice || "");
//     setMaxPrice(initialFilters?.maxPrice || "");
//     setCity(initialFilters?.city || "");
//     setBodyType(initialFilters?.bodyType || "");
//   }, [initialFilters]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onFilter({ make, model, minPrice, maxPrice, city, bodyType });
//   };

//   const handleClear = () => {
//     setMake("");
//     setModel("");
//     setMinPrice("");
//     setMaxPrice("");
//     setCity("");
//     setBodyType("");
//     onFilter({});
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="flex flex-wrap items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-md justify-start overflow-x-auto mb-6"
//     >
//       {/* Make */}
//       <div className="flex flex-col">
//         <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Make</label>
//         <input
//           type="text"
//           value={make}
//           onChange={(e) => setMake(e.target.value)}
//           placeholder="Any Make"
//           className="w-32 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-1 focus:ring-red-500"
//         />
//       </div>

//       {/* Model */}
//       <div className="flex flex-col">
//         <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Model</label>
//         <input
//           type="text"
//           value={model}
//           onChange={(e) => setModel(e.target.value)}
//           placeholder="Any Model"
//           className="w-32 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-1 focus:ring-red-500"
//         />
//       </div>

//       {/* Min Price */}
//       <div className="flex flex-col relative">
//         <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Min Price</label>
//         <div className="relative">
//           <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
//           <input
//             type="number"
//             value={minPrice}
//             onChange={(e) => setMinPrice(e.target.value)}
//             placeholder="0"
//             className="w-24 pl-6 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-1 focus:ring-red-500"
//           />
//         </div>
//       </div>

//       {/* Max Price */}
//       <div className="flex flex-col relative">
//         <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Max Price</label>
//         <div className="relative">
//           <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
//           <input
//             type="number"
//             value={maxPrice}
//             onChange={(e) => setMaxPrice(e.target.value)}
//             placeholder="Any"
//             className="w-24 pl-6 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-1 focus:ring-red-500"
//           />
//         </div>
//       </div>

//       {/* City */}
//       <div className="flex flex-col relative">
//         <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">City</label>
//         <div className="relative">
//           <MapPin className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
//           <input
//             type="text"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             placeholder="Any City"
//             className="w-32 pl-6 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-1 focus:ring-red-500"
//           />
//         </div>
//       </div>

//       {/* Body Type */}
//       <div className="flex flex-col">
//         <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Body Type</label>
//         <input
//           type="text"
//           value={bodyType}
//           onChange={(e) => setBodyType(e.target.value)}
//           placeholder="Any"
//           className="w-28 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-1 focus:ring-red-500"
//         />
//       </div>

//       {/* Submit */}
//       <button
//         type="submit"
//         // className="h-10 px-5 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 dark:hover:bg-red-700 transition self-end"
//       className="h-10 px-5 bg-transparent text-blue-500 font-semibold rounded-lg border-2 border-blue-500 hover:bg-blue-500 hover:text-white transition self-end"

//       >
//         Filter
//       </button>

//       {/* Clear */}
//       <button
//         type="button"
//         onClick={handleClear}
//         className="h-10 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition self-end"
//       >
//         Clear
//       </button>
//     </form>
//   );
// }
