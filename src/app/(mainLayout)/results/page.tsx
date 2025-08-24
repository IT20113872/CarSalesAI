// "use client"; // ← Add this at the very top

// import { useState, useEffect } from "react";
// import CarFilters from "@/components/general/CarFilters";

// export default function HomePage() {
//   const [cars, setCars] = useState<any[]>([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const limit = 12;
//   const [filters, setFilters] = useState({});

//   const fetchCars = async (filters: any = {}, pageNum: number = 1) => {
//     const query = new URLSearchParams({ ...filters, page: pageNum.toString(), limit: limit.toString() }).toString();
//     const res = await fetch(`/api/cars?${query}`);
//     const data = await res.json();
//     setCars(data.cars);
//     setTotalPages(Math.ceil(data.total / limit));
//     setPage(data.page);
//   };

//   useEffect(() => {
//     fetchCars(filters, page);
//   }, [filters, page]);

//   const handleFilter = (newFilters: any) => {
//     setFilters(newFilters);
//     setPage(1);
//   };

//   return (
//     <div className="p-8 font-sans bg-gray-50 dark:bg-gray-900 min-h-screen">
 
//       <CarFilters onFilter={handleFilter} />

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
//         {cars.length === 0 && (
//           <p className="text-gray-700 dark:text-gray-300 text-center col-span-full">
//             No cars found.
//           </p>
//         )}

//         {cars.map((car) => (
//           <div
//             key={car.id}
//             className="bg-white dark:bg-gray-800 border border-blue-100 dark:border-blue-700 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition p-6 flex flex-col justify-between"
//           >
//             <div>
//               <h2 className="text-2xl font-bold mb-2 text-blue-800 dark:text-blue-300">
//                 {car.title}
//               </h2>
//               <p className="text-gray-700 dark:text-gray-300 mb-1">
//                 {car.year} {car.make} {car.model}
//               </p>
//               <p className="text-gray-700 dark:text-gray-300 mb-1">
//                 Price: <span className="text-blue-600 dark:text-blue-400">${car.price}</span>
//               </p>
//               <p className="text-gray-700 dark:text-gray-300 mb-1">
//                 Location: {car.city}, {car.state} | Odometer: {car.odometer} km
//               </p>
//               <div className="flex flex-wrap gap-2 mt-2">
//                 <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm">
//                   {car.transmission}
//                 </span>
//                 <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm">
//                   {car.fuel_type}
//                 </span>
//                 <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm">
//                   {car.condition}
//                 </span>
//               </div>
//             </div>

//             <a
//               href={car.full_path}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="mt-4 w-full text-center px-4 py-2 bg-blue-600 dark:bg-black text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-gray-700 transition"
//             >
//               See Details
//             </a>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center mt-8 gap-2">
//           <button
//             disabled={page === 1}
//             onClick={() => setPage(page - 1)}
//             className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
//           >
//             Prev
//           </button>
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i + 1}
//               onClick={() => setPage(i + 1)}
//               className={`px-4 py-2 rounded-lg ${
//                 page === i + 1
//                   ? "bg-blue-600 dark:bg-blue-400 text-white"
//                   : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//           <button
//             disabled={page === totalPages}
//             onClick={() => setPage(page + 1)}
//             className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";

// type CarFiltersProps = {
//   onFilter: (filters: {
//     make?: string;
//     year?: string;
//     minPrice?: string;
//     maxPrice?: string;
//     city?: string;
//   }) => void;
//   initialFilters?: {
//     make?: string;
//     year?: string;
//     minPrice?: string;
//     maxPrice?: string;
//     city?: string;
//   };
// };

// export const makes = ["Toyota", "Honda", "Nissan", "Mazda"];
// export const years = Array.from({ length: 31 }, (_, i) => (1995 + i).toString());
// export const transmissions = ["Automatic", "Manual"];
// export const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"];
// export const conditions = ["New", "Used"];
// export const cities = ["Colombo", "Kandy", "Galle", "Jaffna"];

// export default function CarFilters({ onFilter, initialFilters }: CarFiltersProps) {
//   const [make, setMake] = useState(initialFilters?.make || "");
//   const [year, setYear] = useState(initialFilters?.year || "");
//   const [minPrice, setMinPrice] = useState(initialFilters?.minPrice || "");
//   const [maxPrice, setMaxPrice] = useState(initialFilters?.maxPrice || "");
//   const [city, setCity] = useState(initialFilters?.city || "");

//   // when initialFilters change (e.g. navigating to results page), update state
//   useEffect(() => {
//     if (initialFilters) {
//       setMake(initialFilters.make || "");
//       setYear(initialFilters.year || "");
//       setMinPrice(initialFilters.minPrice || "");
//       setMaxPrice(initialFilters.maxPrice || "");
//       setCity(initialFilters.city || "");
//     }
//   }, [initialFilters]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onFilter({ make, year, minPrice, maxPrice, city });
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex flex-wrap gap-4 items-end mb-6"
//     >
//       <div className="flex flex-col">
//         <label className="text-gray-700 dark:text-gray-300 font-semibold">Make</label>
//         <input
//           type="text"
//           value={make}
//           onChange={(e) => setMake(e.target.value)}
//           placeholder="Toyota, Honda..."
//           className="border border-gray-300 dark:border-gray-700 rounded px-3 py-1 dark:bg-gray-900 dark:text-white"
//         />
//       </div>

//       <div className="flex flex-col">
//         <label className="text-gray-700 dark:text-gray-300 font-semibold">Year</label>
//         <input
//           type="number"
//           value={year}
//           onChange={(e) => setYear(e.target.value)}
//           placeholder="2020"
//           className="border border-gray-300 dark:border-gray-700 rounded px-3 py-1 dark:bg-gray-900 dark:text-white"
//         />
//       </div>

//       <div className="flex flex-col">
//         <label className="text-gray-700 dark:text-gray-300 font-semibold">Min Price</label>
//         <input
//           type="number"
//           value={minPrice}
//           onChange={(e) => setMinPrice(e.target.value)}
//           placeholder="10000"
//           className="border border-gray-300 dark:border-gray-700 rounded px-3 py-1 dark:bg-gray-900 dark:text-white"
//         />
//       </div>

//       <div className="flex flex-col">
//         <label className="text-gray-700 dark:text-gray-300 font-semibold">Max Price</label>
//         <input
//           type="number"
//           value={maxPrice}
//           onChange={(e) => setMaxPrice(e.target.value)}
//           placeholder="50000"
//           className="border border-gray-300 dark:border-gray-700 rounded px-3 py-1 dark:bg-gray-900 dark:text-white"
//         />
//       </div>

//       <div className="flex flex-col">
//         <label className="text-gray-700 dark:text-gray-300 font-semibold">City</label>
//         <input
//           type="text"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           placeholder="Colombo"
//           className="border border-gray-300 dark:border-gray-700 rounded px-3 py-1 dark:bg-gray-900 dark:text-white"
//         />
//       </div>

//       <button
//         type="submit"
//         className="px-4 py-2 bg-blue-600 dark:bg-black text-white rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-gray-700 transition"
//       >
//         Filter
//       </button>
//     </form>
//   );
// }

// "use client";

// import { useSearchParams } from "next/navigation";
// import { useState, useEffect } from "react";
// import CarFilters from "@/components/general/CarFilters";

// export default function ResultsPage() {
//   const searchParams = useSearchParams();
//   const [cars, setCars] = useState<any[]>([]);

//   // Convert query string to filters object
//   const filters: any = {};
//   searchParams.forEach((value, key) => {
//     filters[key] = value;
//   });

//   useEffect(() => {
//     const fetchCars = async () => {
//       const query = new URLSearchParams(filters).toString();
//       const res = await fetch(`/api/cars?${query}`);
//       const data = await res.json();
//       setCars(data.cars);
//     };
//     fetchCars();
//   }, [searchParams]);

//   // handle filter update from results page
//   const handleFilter = (newFilters: any) => {
//     const query = new URLSearchParams(newFilters).toString();
//     window.location.href = `/results?${query}`;
//   };

//   return (
//     <div className="p-8">
//       {/* Pass initialFilters so form pre-fills */}
//       <CarFilters onFilter={handleFilter} initialFilters={filters} />

//       <div className="mt-4">
//         {cars.map((car) => (
//           <div key={car.id}>{car.title}</div>
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import CarFilters from "@/components/general/CarFilters";

// type Filters = {
//   make?: string;
//   year?: string;
//   minPrice?: string;
//   maxPrice?: string;
//   city?: string;
// };

// export default function ResultsPage() {
//   const searchParams = useSearchParams();
//   const [filters, setFilters] = useState<Filters>({
//     make: searchParams.get("make") || "",
//     year: searchParams.get("year") || "",
//     minPrice: searchParams.get("minPrice") || "",
//     maxPrice: searchParams.get("maxPrice") || "",
//     city: searchParams.get("city") || "",
//   });

//   const [cars, setCars] = useState<any[]>([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const limit = 12;

//   const fetchCars = async (filters: Filters = {}, pageNum = 1) => {
//     const query = new URLSearchParams({ ...filters, page: pageNum.toString(), limit: limit.toString() }).toString();
//     const res = await fetch(`/api/cars?${query}`);
//     const data = await res.json();
//     setCars(data.cars);
//     setTotalPages(Math.ceil(data.total / limit));
//     setPage(data.page);
//   };

//   useEffect(() => {
//     fetchCars(filters, page);
//   }, [filters, page]);

//   const handleFilter = (newFilters: Filters) => {
//     setFilters(newFilters);
//     setPage(1);
//   };

//   return (
//     <div className="p-8 font-sans bg-gray-50 dark:bg-gray-900 min-h-screen">
//       <CarFilters onFilter={handleFilter} initialFilters={filters} />

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
//         {cars.length === 0 && (
//           <p className="text-gray-700 dark:text-gray-300 text-center col-span-full">
//             No cars found.
//           </p>
//         )}

//         {cars.map((car) => (
//           <div key={car.id} className="bg-white dark:bg-gray-800 border border-blue-100 dark:border-blue-700 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition p-6 flex flex-col justify-between">
//             <div>
//               <h2 className="text-2xl font-bold mb-2 text-blue-800 dark:text-blue-300">{car.title}</h2>
//               <p className="text-gray-700 dark:text-gray-300 mb-1">{car.year} {car.make} {car.model}</p>
//               <p className="text-gray-700 dark:text-gray-300 mb-1">
//                 Price: <span className="text-blue-600 dark:text-blue-400">${car.price}</span>
//               </p>
//               <p className="text-gray-700 dark:text-gray-300 mb-1">
//                 Location: {car.city}, {car.state} | Odometer: {car.odometer} km
//               </p>
//               <div className="flex flex-wrap gap-2 mt-2">
//                 <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm">{car.transmission}</span>
//                 <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm">{car.fuel_type}</span>
//                 <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm">{car.condition}</span>
//               </div>
//             </div>
//             <a href={car.full_path} target="_blank" rel="noopener noreferrer"
//               className="mt-4 w-full text-center px-4 py-2 bg-blue-600 dark:bg-black text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-gray-700 transition">
//               See Details
//             </a>
//           </div>
//         ))}
//       </div>

//       {totalPages > 1 && (
//         <div className="flex justify-center mt-8 gap-2">
//           <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50">
//             Prev
//           </button>
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button key={i + 1} onClick={() => setPage(i + 1)} className={`px-4 py-2 rounded-lg ${page === i + 1 ? "bg-blue-600 dark:bg-blue-400 text-white" : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"}`}>
//               {i + 1}
//             </button>
//           ))}
//           <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50">
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }


import { Suspense } from "react";
import ResultsPage from "./ResultsPage";

export default function ResultsWrapper() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading results...</div>}>
      <ResultsPage />
    </Suspense>
  );
}
