// // "use client";

// // import { useState, useEffect } from "react";
// // import { useRouter } from "next/navigation";
// // import Image from "next/image";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { Search, Car, MapPin, DollarSign, X } from "lucide-react";

// // // Filters arrays
// // const states = ["All", "ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"];
// // const makes = ["Toyota", "Ford", "Honda", "BMW", "Mercedes", "Tesla"];
// // const models = ["Corolla", "Camry", "Civic", "Mustang", "Model 3", "X5"];
// // const cities = ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"];
// // const bodyTypes = ["Sedan", "SUV", "Hatchback", "Coupe", "Convertible"];
// // const minPrices = ["10000", "20000", "30000", "40000", "50000"];
// // const maxPrices = ["50000", "100000", "150000", "200000", "250000"];

// // // Background images in public folder
// // const bgImages = ["/background.png", "/background (2).png", "/backgroundx.png"];

// // export default function SearchPage() {
// //   const router = useRouter();
// //   const [activeState, setActiveState] = useState("All");
// //   const [make, setMake] = useState("");
// //   const [model, setModel] = useState("");
// //   const [city, setCity] = useState("");
// //   const [bodyType, setBodyType] = useState("");
// //   const [minPrice, setMinPrice] = useState("");
// //   const [maxPrice, setMaxPrice] = useState("");
// //   const [aiSearch, setAiSearch] = useState("");
// //   const [suggestions, setSuggestions] = useState<string[]>([]);
// //   const [bgIndex, setBgIndex] = useState(0);

// //   // AI mock suggestions
// //   useEffect(() => {
// //     if (aiSearch.length > 2) {
// //       const mockSuggestions = [
// //         `Used ${aiSearch} in ${city || "Sydney"}`,
// //         `${aiSearch} under ${maxPrice || "100000"}`,
// //         `New ${aiSearch} ${bodyType || "Sedan"}`,
// //       ].filter((s) => s.toLowerCase().includes(aiSearch.toLowerCase()));
// //       setSuggestions(mockSuggestions.slice(0, 3));
// //     } else {
// //       setSuggestions([]);
// //     }
// //   }, [aiSearch, city, maxPrice, bodyType]);

// //   // Background slideshow every 5s
// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setBgIndex((prev) => (prev + 1) % bgImages.length);
// //     }, 5000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   const handleSubmit = () => {
// //     const queryParams = new URLSearchParams();
// //     if (activeState !== "All") queryParams.append("state", activeState);
// //     if (make) queryParams.append("make", make);
// //     if (model) queryParams.append("model", model);
// //     if (city) queryParams.append("city", city);
// //     if (bodyType) queryParams.append("bodyType", bodyType);
// //     if (minPrice) queryParams.append("minPrice", minPrice);
// //     if (maxPrice) queryParams.append("maxPrice", maxPrice);
// //     if (aiSearch) queryParams.append("ai", aiSearch);
// //     router.push(`/results?${queryParams.toString()}`);
// //   };

// //   const handleShowAll = () => router.push("/results");
// //   const handleSuggestionClick = (s: string) => {
// //     setAiSearch(s);
// //     setSuggestions([]);
// //   };

// //   // Clear filters handler
// //   const handleClearFilters = () => {
// //     setActiveState("All");
// //     setMake("");
// //     setModel("");
// //     setCity("");
// //     setBodyType("");
// //     setMinPrice("");
// //     setMaxPrice("");
// //     setAiSearch("");
// //     setSuggestions([]);
// //   };


// //   const activeFilters = [
// //     make && { label: make, setter: setMake },
// //     model && { label: model, setter: setModel },
// //     city && { label: city, setter: setCity },
// //     bodyType && { label: bodyType, setter: setBodyType },
// //     minPrice && { label: `Min $${minPrice}`, setter: setMinPrice },
// //     maxPrice && { label: `Max $${maxPrice}`, setter: setMaxPrice },
// //   ].filter(Boolean) as { label: string; setter: (v: string) => void }[];

// //   return (
// //     <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
// //       {/* Background slideshow */}
// //       <AnimatePresence mode="wait">
// //         <motion.div
// //           key={bgIndex}
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //           exit={{ opacity: 0 }}
// //           transition={{ duration: 1 }}
// //           className="absolute inset-0 -z-10 w-full h-full"
// //         >
// //           <Image
// //             src={bgImages[bgIndex]}
// //             alt={`Background ${bgIndex}`}
// //             fill
// //             style={{ objectFit: "cover" }}
// //             priority
// //           />
// //         </motion.div>
// //       </AnimatePresence>

// //       {/* Dark overlay */}
// //       <div className="absolute inset-0 bg-black/40"></div>

// //       {/* Main card */}
// //       <motion.div
// //         initial={{ opacity: 0, scale: 0.97 }}
// //         animate={{ opacity: 1, scale: 1 }}
// //         transition={{ duration: 0.3 }}
// //         className="relative w-full max-w-4xl backdrop-blur-xl bg-white/40 dark:bg-gray-900/50 rounded-3xl shadow-2xl p-8 border border-white/20 z-10"
// //       >
// //         <h1 className="text-3xl font-extrabold text-center text-gray-100 mb-8">
// //           Find Your Dream Vehicle
// //         </h1>

// //         {/* States */}
// //         <div className="flex flex-wrap justify-center gap-2 mb-6">
// //           {states.map((state) => (
// //             <button
// //               key={state}
// //               className={`px-4 py-2 rounded-full text-sm font-medium transition ${
// //                 activeState === state
// //                   ? "bg-red-500 text-white"
// //                   : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
// //               }`}
// //               onClick={() => setActiveState(state)}
// //             >
// //               {state}
// //             </button>
// //           ))}
// //         </div>

// //         {/* Filters Grid */}
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
// //           {([
// //             ["Make", makes, make, setMake, Car],
// //             ["Model", models, model, setModel, Car],
// //             ["City", cities, city, setCity, MapPin],
// //             ["Body Type", bodyTypes, bodyType, setBodyType, Car],
// //             ["Min. Price", minPrices, minPrice, setMinPrice, DollarSign],
// //             ["Max. Price", maxPrices, maxPrice, setMaxPrice, DollarSign],
// //           ] as [string, string[], string, React.Dispatch<React.SetStateAction<string>>, any][]).map(
// //             ([label, options, value, setter, Icon]) => (
// //               <div key={label} className="relative">
// //                 <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-200" size={18} />
// //                 <select
// //                   value={value}
// //                   onChange={(e) => setter(e.target.value)}
// //                   className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-white/60 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-red-500"
// //                 >
// //                   <option value="">{label}</option>
// //                   {options.map((opt) => (
// //                     <option key={opt} value={opt}>
// //                       {opt}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>
// //             )
// //           )}
// //         </div>

// //         {/* Active Filters */}
// //         {activeFilters.length > 0 && (
// //           <div className="flex flex-wrap gap-2 mb-6">
// //             {activeFilters.map((f, i) => (
// //               <div
// //                 key={i}
// //                 className="flex items-center gap-1 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-200 px-3 py-1 rounded-full text-xs font-medium"
// //               >
// //                 {f.label}
// //                 <X size={14} className="cursor-pointer" onClick={() => f.setter("")} />
// //               </div>
// //             ))}
// //           </div>
// //         )}

// //         {/* AI Search */}
// //         <div className="relative mb-6">
// //           <div className="flex gap-3">
// //             <div className="relative flex-grow">
// //               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-200" size={18} />
// //               <input
// //                 type="text"
// //                 placeholder="AI Search e.g. 'Red Tesla in Sydney'"
// //                 value={aiSearch}
// //                 onChange={(e) => setAiSearch(e.target.value)}
// //                 className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-white/60 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-red-500"
// //               />
// //             </div>
// //               <button
// //                className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg font-medium hover:bg-gray-400 dark:hover:bg-gray-500 transition"
// //                   onClick={handleClearFilters}
// //                 >
// //                 Clear Filters
// //               </button>
// //             <button
// //               className="bg-red-500 hover:bg-red-600 text-white px-6 rounded-lg text-sm font-semibold"
// //               onClick={handleSubmit}
// //             >
// //               Search
// //             </button>
// //           </div>

// //           {/* Suggestions */}
// //           <AnimatePresence>
// //             {suggestions.length > 0 && (
// //               <motion.div
// //                 initial={{ opacity: 0, y: -6 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 exit={{ opacity: 0, y: -6 }}
// //                 className="absolute z-20 w-full mt-2 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700"
// //               >
// //                 {suggestions.map((s, i) => (
// //                   <div
// //                     key={i}
// //                     onClick={() => handleSuggestionClick(s)}
// //                     className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-800 dark:text-white"
// //                   >
// //                     {s}
// //                   </div>
// //                 ))}
// //               </motion.div>
// //             )}
// //           </AnimatePresence>
// //         </div>

// //         {/* Show All */}
// //         <button
// //           className="w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-300 dark:hover:bg-gray-600"
// //           onClick={handleShowAll}
// //         >
// //           Show All Cars
// //         </button>
// //       </motion.div>
// //     </div>
// //   );
// // }



// // // import { JobFilters } from "@/components/general/JobFilters";
// // // import JobListings from "@/components/general/JobListings";
// // // import JobListingsLoading from "@/components/general/JobListingsLoading";
// // // import { Suspense } from "react";

// // // type SearchParamsProps = {
// // //   searchParams: Promise<{
// // //     page?: string;
// // //     jobTypes?: string;
// // //     location?: string;
// // //     minSalary?: string;
// // //     maxSalary?: string;
// // //   }>;
// // // };

// // // export default async function Home({ searchParams }: SearchParamsProps) {
// // //   const params = await searchParams;
// // //   const pageNum = Number(params.page);
// // //   const currentPage = isNaN(pageNum) || pageNum < 1 ? 1 : pageNum; // Fallback to page 1 if invalid
// // //   const jobTypes = params.jobTypes?.split(",").filter(Boolean) || []; // Remove empty strings
// // //   const location = params.location || "";
// // //   const minSalary = params.minSalary || "";
// // //   const maxSalary = params.maxSalary || "";

// // //   // Create a composite key from all filter parameters
// // //   const filterKey = `page=${currentPage};types=${jobTypes.join(
// // //     ","
// // //   )};location=${location};minSalary=${minSalary};maxSalary=${maxSalary}`;

// // //   return (
// // //     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// // //       <JobFilters />
// // //       <div className="col-span-1 md:col-span-2 flex flex-col gap-5">
// // //         <Suspense key={filterKey} fallback={<JobListingsLoading />}>
// // //           <JobListings
// // //             currentPage={currentPage}
// // //             jobTypes={jobTypes}
// // //             location={location}
// // //             minSalary={minSalary}
// // //             maxSalary={maxSalary}
// // //           />
// // //         </Suspense>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // // import { prisma } from "../utils/db"; // <- import Prisma client

// // // // Ensure fresh data on each request
// // // export const dynamic = "force-dynamic";

// // // export default async function Home() {
// // //   // Fetch all job posts
// // //   const jobPosts = await prisma.jobPost.findMany({
// // //     orderBy: {
// // //       createdAt: "desc",
// // //     },
// // //   });

// // //   return (
// // //     <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
// // //       <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Job Posts</h1>

// // //       {jobPosts.length === 0 ? (
// // //         <p>No job posts available.</p>
// // //       ) : (
// // //         <ul
// // //           style={{
// // //             listStyle: "none",
// // //             padding: 0,
// // //             display: "grid",
// // //             gap: "1.5rem",
// // //           }}
// // //         >
// // //           {jobPosts.map((job) => (
// // //             <li
// // //               key={job.id}
// // //               style={{
// // //                 padding: "1rem",
// // //                 border: "1px solid #ccc",
// // //                 borderRadius: "0.5rem",
// // //                 boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
// // //               }}
// // //             >
// // //               <h2 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
// // //                 {job.jobTitle}
// // //               </h2>
// // //               <p>
// // //                 <strong>Location:</strong> {job.location}
// // //               </p>
// // //               <p>
// // //                 <strong>Salary:</strong> ${job.salaryFrom} - ${job.salaryTo}
// // //               </p>
// // //               <p>
// // //                 <strong>Employment Type:</strong> {job.employmentType}
// // //               </p>
// // //               <p>
// // //                 <strong>Benefits:</strong> {job.benefits.join(", ")}
// // //               </p>
// // //               <p style={{ marginTop: "0.5rem" }}>{job.jobDescription}</p>
// // //               <p style={{ fontSize: "0.85rem", color: "#555" }}>
// // //                 Posted on:{" "}
// // //                 {new Date(job.createdAt).toLocaleDateString("en-US", {
// // //                   year: "numeric",
// // //                   month: "long",
// // //                   day: "numeric",
// // //                 })}
// // //               </p>
// // //             </li>
// // //           ))}
// // //         </ul>
// // //       )}
// // //     </div>
// // //   );
// // // }
// // // "use client";
// // // import { useState, useEffect } from "react";
// // // import CarFilters from "@/components/general/CarFilters";

// // // export default function HomePage() {
// // //   const [cars, setCars] = useState<any[]>([]);
// // //   const [page, setPage] = useState(1);
// // //   const [totalPages, setTotalPages] = useState(1);
// // //   const limit = 12; // cars per page
// // //   const [filters, setFilters] = useState({});

// // //   const fetchCars = async (filters: any = {}, pageNum: number = 1) => {
// // //     const query = new URLSearchParams({ ...filters, page: pageNum.toString(), limit: limit.toString() }).toString();
// // //     const res = await fetch(`/api/cars?${query}`);
// // //     const data = await res.json();
// // //     setCars(data.cars);
// // //     setTotalPages(Math.ceil(data.total / limit));
// // //     setPage(data.page);
// // //   };

// // //   useEffect(() => {
// // //     fetchCars(filters, page);
// // //   }, [filters, page]);

// // //   const handleFilter = (newFilters: any) => {
// // //     setFilters(newFilters);
// // //     setPage(1); // reset page when filters change
// // //   };

// // //   return (
// // //     <div className="p-8 font-sans bg-gray-50 dark:bg-gray-900 min-h-screen">
// // //       <h1 className="text-4xl font-bold mb-6 text-blue-700 dark:text-blue-400 text-center">
// // //         Car Listings
// // //       </h1>

// // //       <CarFilters onFilter={handleFilter} />

// // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
// // //         {cars.length === 0 && (
// // //           <p className="text-gray-700 dark:text-gray-300 text-center col-span-full">
// // //             No cars found.
// // //           </p>
// // //         )}

// // //         {cars.map((car) => (
// // //           <div
// // //             key={car.id}
// // //             className="bg-white dark:bg-gray-800 border border-blue-100 dark:border-blue-700 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition p-6 flex flex-col justify-between"
// // //           >
// // //             <div>
// // //               <h2 className="text-2xl font-bold mb-2 text-blue-800 dark:text-blue-300">
// // //                 {car.title}
// // //               </h2>
// // //               <p className="text-gray-700 dark:text-gray-300 mb-1">
// // //                 {car.year} {car.make} {car.model}
// // //               </p>
// // //               <p className="text-gray-700 dark:text-gray-300 mb-1">
// // //                 Price: <span className="text-blue-600 dark:text-blue-400">${car.price}</span>
// // //               </p>
// // //               <p className="text-gray-700 dark:text-gray-300 mb-1">
// // //                 Location: {car.city}, {car.state} | Odometer: {car.odometer} km
// // //               </p>
// // //               <div className="flex flex-wrap gap-2 mt-2">
// // //                 <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm">
// // //                   {car.transmission}
// // //                 </span>
// // //                 <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm">
// // //                   {car.fuel_type}
// // //                 </span>
// // //                 <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm">
// // //                   {car.condition}
// // //                 </span>
// // //               </div>
// // //             </div>

// // //             <a
// // //               href={car.full_path}
// // //               target="_blank"
// // //               rel="noopener noreferrer"
// // //               className="mt-4 w-full text-center px-4 py-2 bg-blue-600 dark:bg-black text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-gray-700 transition"
// // //             >
// // //               See Details
// // //             </a>
// // //           </div>
// // //         ))}
// // //       </div>

// // //       {/* Pagination */}
// // //       {totalPages > 1 && (
// // //         <div className="flex justify-center mt-8 gap-2">
// // //           <button
// // //             disabled={page === 1}
// // //             onClick={() => setPage(page - 1)}
// // //             className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
// // //           >
// // //             Prev
// // //           </button>
// // //           {Array.from({ length: totalPages }, (_, i) => (
// // //             <button
// // //               key={i + 1}
// // //               onClick={() => setPage(i + 1)}
// // //               className={`px-4 py-2 rounded-lg ${
// // //                 page === i + 1
// // //                   ? "bg-blue-600 dark:bg-blue-400 text-white"
// // //                   : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
// // //               }`}
// // //             >
// // //               {i + 1}
// // //             </button>
// // //           ))}
// // //           <button
// // //             disabled={page === totalPages}
// // //             onClick={() => setPage(page + 1)}
// // //             className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
// // //           >
// // //             Next
// // //           </button>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }
// // // //////////////////////////////////////////////////////
// // // "use client"; // ← Add this at the very top

// // // import { useState, useEffect } from "react";
// // // import CarFilters from "@/components/general/CarFilters";

// // // export default function HomePage() {
// // //   const [cars, setCars] = useState<any[]>([]);
// // //   const [page, setPage] = useState(1);
// // //   const [totalPages, setTotalPages] = useState(1);
// // //   const limit = 12;
// // //   const [filters, setFilters] = useState({});

// // //   const fetchCars = async (filters: any = {}, pageNum: number = 1) => {
// // //     const query = new URLSearchParams({ ...filters, page: pageNum.toString(), limit: limit.toString() }).toString();
// // //     const res = await fetch(`/api/cars?${query}`);
// // //     const data = await res.json();
// // //     setCars(data.cars);
// // //     setTotalPages(Math.ceil(data.total / limit));
// // //     setPage(data.page);
// // //   };

// // //   useEffect(() => {
// // //     fetchCars(filters, page);
// // //   }, [filters, page]);

// // //   const handleFilter = (newFilters: any) => {
// // //     setFilters(newFilters);
// // //     setPage(1);
// // //   };

// // //   return (
// // //     <div className="p-8 font-sans bg-gray-50 dark:bg-gray-900 min-h-screen">
 
// // //       <CarFilters onFilter={handleFilter} />

// // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
// // //         {cars.length === 0 && (
// // //           <p className="text-gray-700 dark:text-gray-300 text-center col-span-full">
// // //             No cars found.
// // //           </p>
// // //         )}

// // //         {cars.map((car) => (
// // //           <div
// // //             key={car.id}
// // //             className="bg-white dark:bg-gray-800 border border-blue-100 dark:border-blue-700 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition p-6 flex flex-col justify-between"
// // //           >
// // //             <div>
// // //               <h2 className="text-2xl font-bold mb-2 text-blue-800 dark:text-blue-300">
// // //                 {car.title}
// // //               </h2>
// // //               <p className="text-gray-700 dark:text-gray-300 mb-1">
// // //                 {car.year} {car.make} {car.model}
// // //               </p>
// // //               <p className="text-gray-700 dark:text-gray-300 mb-1">
// // //                 Price: <span className="text-blue-600 dark:text-blue-400">${car.price}</span>
// // //               </p>
// // //               <p className="text-gray-700 dark:text-gray-300 mb-1">
// // //                 Location: {car.city}, {car.state} | Odometer: {car.odometer} km
// // //               </p>
// // //               <div className="flex flex-wrap gap-2 mt-2">
// // //                 <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm">
// // //                   {car.transmission}
// // //                 </span>
// // //                 <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm">
// // //                   {car.fuel_type}
// // //                 </span>
// // //                 <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm">
// // //                   {car.condition}
// // //                 </span>
// // //               </div>
// // //             </div>

// // //             <a
// // //               href={car.full_path}
// // //               target="_blank"
// // //               rel="noopener noreferrer"
// // //               className="mt-4 w-full text-center px-4 py-2 bg-blue-600 dark:bg-black text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-gray-700 transition"
// // //             >
// // //               See Details
// // //             </a>
// // //           </div>
// // //         ))}
// // //       </div>

// // //       {/* Pagination */}
// // //       {totalPages > 1 && (
// // //         <div className="flex justify-center mt-8 gap-2">
// // //           <button
// // //             disabled={page === 1}
// // //             onClick={() => setPage(page - 1)}
// // //             className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
// // //           >
// // //             Prev
// // //           </button>
// // //           {Array.from({ length: totalPages }, (_, i) => (
// // //             <button
// // //               key={i + 1}
// // //               onClick={() => setPage(i + 1)}
// // //               className={`px-4 py-2 rounded-lg ${
// // //                 page === i + 1
// // //                   ? "bg-blue-600 dark:bg-blue-400 text-white"
// // //                   : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
// // //               }`}
// // //             >
// // //               {i + 1}
// // //             </button>
// // //           ))}
// // //           <button
// // //             disabled={page === totalPages}
// // //             onClick={() => setPage(page + 1)}
// // //             className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
// // //           >
// // //             Next
// // //           </button>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // "use client";

// // // import { useState } from "react";
// // // import { useRouter } from "next/navigation";
// // // import CarFilters from "@/components/general/CarFilters";

// // // type Filters = {
// // //   make?: string;
// // //   year?: string;
// // //   minPrice?: string;
// // //   maxPrice?: string;
// // //   city?: string;
// // // };

// // // export default function SearchPage() {
// // //   const router = useRouter();
// // //   const [filters, setFilters] = useState<Filters>({});

// // //   const handleFilter = (newFilters: Filters) => {
// // //     setFilters(newFilters);

// // //     const queryParams = new URLSearchParams();
// // //     Object.entries(newFilters).forEach(([key, value]) => {
// // //       if (value) queryParams.append(key, value);
// // //     });

// // //     router.push(`/results?${queryParams.toString()}`);
// // //   };

// // //   return (
// // //     <div className="p-8 font-sans bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col items-center">
// // //       <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-300 mb-6">
// // //         Search for Cars
// // //       </h1>
// // //       <div className="w-full max-w-2xl">
// // //         <CarFilters onFilter={handleFilter} initialFilters={filters} />
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // // "use client";

// // // import { useState } from "react";
// // // import { useRouter } from "next/navigation";
// // // import CarFilters from "@/components/general/CarFilters";

// // // type Filters = {
// // //   state?: string;
// // //   make?: string;
// // //   model?: string;
// // //   city?: string;
// // //   bodyType?: string;
// // //   minPrice?: string;
// // //   maxPrice?: string;
// // //   aiSearch?: string;
// // // };

// // // const states = ["All", "ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"];
// // // const bodyTypes = ["All", "Sedan", "SUV", "Hatchback", "Truck", "Coupe", "Convertible"];

// // // export default function SearchPage() {
// // //   const router = useRouter();

// // //   const [filters, setFilters] = useState<Filters>({
// // //     state: "All",
// // //     make: "",
// // //     model: "",
// // //     city: "",
// // //     bodyType: "All",
// // //     minPrice: "",
// // //     maxPrice: "",
// // //     aiSearch: "",
// // //   });

// // //   const handleFilterChange = (key: keyof Filters, value: string) => {
// // //     setFilters((prev) => ({ ...prev, [key]: value }));
// // //   };

// // //   const handleSubmit = (e: React.FormEvent) => {
// // //     e.preventDefault();

// // //     const queryParams = new URLSearchParams();
// // //     Object.entries(filters).forEach(([key, value]) => {
// // //       if (value && value !== "All") queryParams.append(key, value);
// // //     });

// // //     router.push(`/results?${queryParams.toString()}`);
// // //   };

// // //   return (
// // //     <div className="p-8 font-sans bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col items-center">
// // //       <h1 className="text-4xl font-bold text-blue-800 dark:text-blue-300 mb-8 text-center">
// // //         Car Buying Just Got Smarter
// // //       </h1>

// // //       <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex flex-col gap-4">
// // //         {/* State */}
// // //         <div className="flex flex-col md:flex-row gap-4">
// // //           <div className="flex-1 flex flex-col">
// // //             <label className="font-semibold text-gray-700 dark:text-gray-300">State</label>
// // //             <select
// // //               value={filters.state}
// // //               onChange={(e) => handleFilterChange("state", e.target.value)}
// // //               className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 dark:bg-gray-900 dark:text-white"
// // //             >
// // //               {states.map((state) => (
// // //                 <option key={state} value={state}>{state}</option>
// // //               ))}
// // //             </select>
// // //           </div>

// // //           {/* Make */}
// // //           <div className="flex-1 flex flex-col">
// // //             <label className="font-semibold text-gray-700 dark:text-gray-300">Make</label>
// // //             <input
// // //               type="text"
// // //               value={filters.make}
// // //               onChange={(e) => handleFilterChange("make", e.target.value)}
// // //               placeholder="Toyota, Honda..."
// // //               className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 dark:bg-gray-900 dark:text-white"
// // //             />
// // //           </div>

// // //           {/* Model */}
// // //           <div className="flex-1 flex flex-col">
// // //             <label className="font-semibold text-gray-700 dark:text-gray-300">Model</label>
// // //             <input
// // //               type="text"
// // //               value={filters.model}
// // //               onChange={(e) => handleFilterChange("model", e.target.value)}
// // //               placeholder="Corolla, Civic..."
// // //               className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 dark:bg-gray-900 dark:text-white"
// // //             />
// // //           </div>
// // //         </div>

// // //         {/* City and Body Type */}
// // //         <div className="flex flex-col md:flex-row gap-4">
// // //           {/* City */}
// // //           <div className="flex-1 flex flex-col">
// // //             <label className="font-semibold text-gray-700 dark:text-gray-300">City</label>
// // //             <input
// // //               type="text"
// // //               value={filters.city}
// // //               onChange={(e) => handleFilterChange("city", e.target.value)}
// // //               placeholder="Colombo..."
// // //               className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 dark:bg-gray-900 dark:text-white"
// // //             />
// // //           </div>

// // //           {/* Body Type */}
// // //           <div className="flex-1 flex flex-col">
// // //             <label className="font-semibold text-gray-700 dark:text-gray-300">Body Type</label>
// // //             <select
// // //               value={filters.bodyType}
// // //               onChange={(e) => handleFilterChange("bodyType", e.target.value)}
// // //               className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 dark:bg-gray-900 dark:text-white"
// // //             >
// // //               {bodyTypes.map((type) => (
// // //                 <option key={type} value={type}>{type}</option>
// // //               ))}
// // //             </select>
// // //           </div>
// // //         </div>

// // //         {/* Min and Max Price */}
// // //         <div className="flex flex-col md:flex-row gap-4">
// // //           <div className="flex-1 flex flex-col">
// // //             <label className="font-semibold text-gray-700 dark:text-gray-300">Min. Price</label>
// // //             <input
// // //               type="number"
// // //               value={filters.minPrice}
// // //               onChange={(e) => handleFilterChange("minPrice", e.target.value)}
// // //               placeholder="10000"
// // //               className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 dark:bg-gray-900 dark:text-white"
// // //             />
// // //           </div>

// // //           <div className="flex-1 flex flex-col">
// // //             <label className="font-semibold text-gray-700 dark:text-gray-300">Max. Price</label>
// // //             <input
// // //               type="number"
// // //               value={filters.maxPrice}
// // //               onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
// // //               placeholder="50000"
// // //               className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 dark:bg-gray-900 dark:text-white"
// // //             />
// // //           </div>
// // //         </div>

// // //         {/* AI Search */}
// // //         <div className="flex flex-col">
// // //           <label className="font-semibold text-gray-700 dark:text-gray-300">AI</label>
// // //           <input
// // //             type="text"
// // //             value={filters.aiSearch}
// // //             onChange={(e) => handleFilterChange("aiSearch", e.target.value)}
// // //             placeholder="I am looking for a..."
// // //             className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 dark:bg-gray-900 dark:text-white"
// // //           />
// // //         </div>

// // //         {/* Submit */}
// // //         <button
// // //           type="submit"
// // //           className="w-full py-3 mt-2 bg-blue-600 dark:bg-black text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-gray-700 transition"
// // //         >
// // //           Search
// // //         </button>

// // //         <button
// // //           type="button"
// // //           onClick={() => router.push("/results")}
// // //           className="w-full py-3 mt-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
// // //         >
// // //           Show All Cars
// // //         </button>
// // //       </form>
// // //     </div>
// // //   );
// // // }


// // // 1st
// // // "use client";

// // // import { useState } from "react";
// // // import { useRouter } from "next/navigation";

// // // const states = ["All", "ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"];
// // // const makes = ["Toyota", "Ford", "Honda"];
// // // const models = ["Corolla", "Camry"];
// // // const cities = ["Sydney", "Melbourne"];
// // // const bodyTypes = ["Sedan", "SUV"];
// // // const minPrices = ["10000", "20000"];
// // // const maxPrices = ["50000", "100000"];

// // // export default function SearchPage() {
// // //   const router = useRouter();

// // //   const [activeState, setActiveState] = useState("All");
// // //   const [make, setMake] = useState("");
// // //   const [model, setModel] = useState("");
// // //   const [city, setCity] = useState("");
// // //   const [bodyType, setBodyType] = useState("");
// // //   const [minPrice, setMinPrice] = useState("");
// // //   const [maxPrice, setMaxPrice] = useState("");
// // //   const [aiSearch, setAiSearch] = useState("");

// // //   const handleSubmit = () => {
// // //     const queryParams = new URLSearchParams();
// // //     if (activeState !== "All") queryParams.append("state", activeState);
// // //     if (make) queryParams.append("make", make);
// // //     if (model) queryParams.append("model", model);
// // //     if (city) queryParams.append("city", city);
// // //     if (bodyType) queryParams.append("bodyType", bodyType);
// // //     if (minPrice) queryParams.append("minPrice", minPrice);
// // //     if (maxPrice) queryParams.append("maxPrice", maxPrice);
// // //     if (aiSearch) queryParams.append("ai", aiSearch);

// // //     router.push(`/results?${queryParams.toString()}`);
// // //   };

// // //   const handleShowAll = () => router.push("/results");

// // //   return (

// // //      <div
// // //       className="h-screen w-screen bg-cover bg-center flex items-center justify-center relative"
// // //       style={{
// // //         backgroundImage: `url('/background.png')`,
// // //       }}
// // //      >

// // //     <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg mt-10">

      
// // //       {/* State Tabs */}
// // //       <div className="flex flex-wrap border-b-2 border-gray-200 dark:border-gray-700 mb-6">
// // //         {states.map((state) => (
// // //           <div
// // //             key={state}
// // //             className={`px-4 py-2 cursor-pointer font-semibold relative ${
// // //               activeState === state
// // //                 ? "text-red-500 dark:text-red-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-red-500 dark:after:bg-red-400 after:rounded-t"
// // //                 : "text-gray-500 dark:text-gray-400"
// // //             }`}
// // //             onClick={() => setActiveState(state)}
// // //           >
// // //             {state}
// // //           </div>
// // //         ))}
// // //       </div>

// // //       {/* Filters Grid */}
// // //       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
// // //         {[["Make", makes, make, setMake],
// // //           ["Model", models, model, setModel],
// // //           ["City", cities, city, setCity],
// // //           ["Body Type", bodyTypes, bodyType, setBodyType],
// // //           ["Min. Price", minPrices, minPrice, setMinPrice],
// // //           ["Max. Price", maxPrices, maxPrice, setMaxPrice]
// // //         ].map(([label, options, value, setter]: any) => (
// // //           <select
// // //             key={label}
// // //             value={value}
// // //             onChange={(e) => setter(e.target.value)}
// // //             className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-400 focus:border-red-400"
// // //           >
// // //             <option value="">{label}</option>
// // //             {options.map((opt: string) => (
// // //               <option key={opt} value={opt.toLowerCase()}>{opt}</option>
// // //             ))}
// // //           </select>
// // //         ))}
// // //       </div>

// // //       {/* Show All Button */}
// // //       <div className="mb-4">
// // //         <button
// // //           // className="bg-red-500 dark:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 dark:hover:bg-red-500 transition"
// // //         className="bg-blue-500 dark:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 dark:hover:bg-blue-500 transition"

// // //           onClick={handleShowAll}
// // //         >
// // //           Show All Cars
// // //         </button>
// // //       </div>

// // //       {/* AI Search */}
// // //       <div className="flex flex-col md:flex-row gap-4 items-center">
// // //         <div className="flex-grow relative">
// // //           {/* <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl">🤖</span> */}
// // //           <input
// // //             type="text"
// // //             placeholder="AI I am looking for a..."
// // //             value={aiSearch}
// // //             onChange={(e) => setAiSearch(e.target.value)}
// // //             className="w-full pl-10 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // //           />
// // //         </div>
// // //         <button
// // //           className="bg-blue-500 dark:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold relative hover:bg-blue-600 dark:hover:bg-blue-600 transition"
// // //           onClick={handleSubmit}
// // //         >
// // //           Search
// // //           {/* <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
// // //             BETA
// // //           </span> */}
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // // "use client";

// // // import { useState } from "react";
// // // import { useRouter } from "next/navigation";

// // // const states = ["All", "ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"];
// // // const makes = ["Toyota", "Ford", "Honda"];
// // // const models = ["Corolla", "Camry"];
// // // const cities = ["Sydney", "Melbourne"];
// // // const bodyTypes = ["Sedan", "SUV"];
// // // const minPrices = ["10000", "20000"];
// // // const maxPrices = ["50000", "100000"];

// // // export default function SearchPage() {
// // //   const router = useRouter();

// // //   const [activeState, setActiveState] = useState("All");
// // //   const [make, setMake] = useState("");
// // //   const [model, setModel] = useState("");
// // //   const [city, setCity] = useState("");
// // //   const [bodyType, setBodyType] = useState("");
// // //   const [minPrice, setMinPrice] = useState("");
// // //   const [maxPrice, setMaxPrice] = useState("");
// // //   const [aiSearch, setAiSearch] = useState("");

// // //   const handleSubmit = () => {
// // //     const queryParams = new URLSearchParams();
// // //     if (activeState !== "All") queryParams.append("state", activeState);
// // //     if (make) queryParams.append("make", make);
// // //     if (model) queryParams.append("model", model);
// // //     if (city) queryParams.append("city", city);
// // //     if (bodyType) queryParams.append("bodyType", bodyType);
// // //     if (minPrice) queryParams.append("minPrice", minPrice);
// // //     if (maxPrice) queryParams.append("maxPrice", maxPrice);
// // //     if (aiSearch) queryParams.append("ai", aiSearch);

// // //     router.push(`/results?${queryParams.toString()}`);
// // //   };

// // //   const handleShowAll = () => router.push("/results");

// // //   return (
// // //     // <div
// // //     //   className="min-h-screen w-screen bg-cover bg-center flex justify-center items-start relative"
// // //     //   style={{
// // //     //     backgroundImage: `url('/background (2).png')`,
// // //     //   }}
// // //     // >
// // //     // <div
// // //     //   className="min-h-screen w-screen flex justify-center items-start relative"
// // //     //   style={{
// // //     //     backgroundImage: "url('/backgroundx.png')",
// // //     //     backgroundSize: "cover",   // fills screen, crops edges if needed
// // //     //     backgroundPosition: "center", // keeps image centered
// // //     //     backgroundRepeat: "no-repeat", // prevent tiling
// // //     //   }}
// // //     // >

// // //       <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg mt-20 w-full">
// // //         {/* State Tabs */}
// // //         <div className="flex flex-wrap border-b-2 border-gray-200 dark:border-gray-700 mb-6">
// // //           {states.map((state) => (
// // //             <div
// // //               key={state}
// // //               className={`px-4 py-2 cursor-pointer font-semibold relative ${
// // //                 activeState === state
// // //                   ? "text-red-500 dark:text-red-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-red-500 dark:after:bg-red-400 after:rounded-t"
// // //                   : "text-gray-500 dark:text-gray-400"
// // //               }`}
// // //               onClick={() => setActiveState(state)}
// // //             >
// // //               {state}
// // //             </div>
// // //           ))}
// // //         </div>

// // //         {/* Filters Grid */}
// // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
// // //           {([
// // //             ["Make", makes, make, setMake],
// // //             ["Model", models, model, setModel],
// // //             ["City", cities, city, setCity],
// // //             ["Body Type", bodyTypes, bodyType, setBodyType],
// // //             ["Min. Price", minPrices, minPrice, setMinPrice],
// // //             ["Max. Price", maxPrices, maxPrice, setMaxPrice],
// // //           ] as [string, string[], string, React.Dispatch<React.SetStateAction<string>>][]).map(
// // //             ([label, options, value, setter]) => (
// // //               <div key={label}>
// // //                 <label className="sr-only">{label}</label>
// // //                 <select
// // //                   value={value}
// // //                   onChange={(e) => setter(e.target.value)}
// // //                   className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-400 focus:border-red-400 w-full"
// // //                 >
// // //                   <option value="">{label}</option>
// // //                   {options.map((opt) => (
// // //                     <option key={opt} value={opt}>
// // //                       {opt}
// // //                     </option>
// // //                   ))}
// // //                 </select>
// // //               </div>
// // //             )
// // //           )}
// // //         </div>

// // //         {/* Show All Button */}
// // //         <div className="mb-4">
// // //           <button
// // //             className="bg-red-500 dark:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 dark:hover:bg-red-500 transition"
// // //             onClick={handleShowAll}
// // //           >
// // //             Show All Cars
// // //           </button>
// // //         </div>

// // //         {/* AI Search */}
// // //         <div className="flex flex-col md:flex-row gap-4 items-center">
// // //           <div className="flex-grow relative">
// // //             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl">🤖</span>
// // //             <input
// // //               type="text"
// // //               placeholder="AI I am looking for a..."
// // //               value={aiSearch}
// // //               onChange={(e) => setAiSearch(e.target.value)}
// // //               className="w-full pl-10 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-400 focus:border-red-400"
// // //             />
// // //           </div>
// // //           <button
// // //             className="bg-red-500 dark:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold relative hover:bg-red-600 dark:hover:bg-red-600 transition"
// // //             onClick={handleSubmit}
// // //           >
// // //             Search
// // //           </button>
// // //         </div>
// // //       </div>
// // //     // </div>
// // //   );
// // // }

// // // "use client";

// // // import { useState, useEffect } from "react";
// // // import { useRouter } from "next/navigation";
// // // import { motion, AnimatePresence } from "framer-motion";
// // // import { Search, Car, MapPin, DollarSign } from "lucide-react";

// // // const states = ["All", "ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"];
// // // const makes = ["Toyota", "Ford", "Honda", "BMW", "Mercedes", "Tesla"];
// // // const models = ["Corolla", "Camry", "Civic", "Mustang", "Model 3", "X5"];
// // // const cities = ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"];
// // // const bodyTypes = ["Sedan", "SUV", "Hatchback", "Coupe", "Convertible"];
// // // const minPrices = ["10000", "20000", "30000", "40000", "50000"];
// // // const maxPrices = ["50000", "100000", "150000", "200000", "250000"];

// // // export default function SearchPage() {
// // //   const router = useRouter();
// // //   const [activeState, setActiveState] = useState("All");
// // //   const [make, setMake] = useState("");
// // //   const [model, setModel] = useState("");
// // //   const [city, setCity] = useState("");
// // //   const [bodyType, setBodyType] = useState("");
// // //   const [minPrice, setMinPrice] = useState("");
// // //   const [maxPrice, setMaxPrice] = useState("");
// // //   const [aiSearch, setAiSearch] = useState("");
// // //   const [suggestions, setSuggestions] = useState<string[]>([]);

// // //   // Mock AI suggestions based on input
// // //   useEffect(() => {
// // //     if (aiSearch.length > 2) {
// // //       const mockSuggestions = [
// // //         `Used ${aiSearch} in ${city || "Sydney"}`,
// // //         `${aiSearch} under ${maxPrice || "100000"}`,
// // //         `New ${aiSearch} ${bodyType || "Sedan"}`,
// // //       ].filter((s) => s.toLowerCase().includes(aiSearch.toLowerCase()));
// // //       setSuggestions(mockSuggestions.slice(0, 3));
// // //     } else {
// // //       setSuggestions([]);
// // //     }
// // //   }, [aiSearch, city, maxPrice, bodyType]);

// // //   const handleSubmit = () => {
// // //     const queryParams = new URLSearchParams();
// // //     if (activeState !== "All") queryParams.append("state", activeState);
// // //     if (make) queryParams.append("make", make);
// // //     if (model) queryParams.append("model", model);
// // //     if (city) queryParams.append("city", city);
// // //     if (bodyType) queryParams.append("bodyType", bodyType);
// // //     if (minPrice) queryParams.append("minPrice", minPrice);
// // //     if (maxPrice) queryParams.append("maxPrice", maxPrice);
// // //     if (aiSearch) queryParams.append("ai", aiSearch);

// // //     router.push(`/results?${queryParams.toString()}`);
// // //   };

// // //   const handleShowAll = () => router.push("/results");

// // //   const handleSuggestionClick = (suggestion: string) => {
// // //     setAiSearch(suggestion);
// // //     setSuggestions([]);
// // //   };

// // //   return (
// // //     <div className="min-h-screen w-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-800 dark:via-gray-900 dark:to-black flex items-center justify-center p-4">
// // //       <motion.div
// // //         initial={{ opacity: 0, y: 20 }}
// // //         animate={{ opacity: 1, y: 0 }}
// // //         transition={{ duration: 0.5 }}
// // //         className="max-w-5xl w-full bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8"
// // //       >
// // //         {/* Header */}
// // //         <motion.h1
// // //           initial={{ opacity: 0 }}
// // //           animate={{ opacity: 1 }}
// // //           transition={{ delay: 0.2 }}
// // //           className="text-3xl font-bold text-gray-900 dark:text-white mb-6"
// // //         >
// // //           Find Your Perfect Car
// // //         </motion.h1>

// // //         {/* State Tabs */}
// // //         <div className="flex flex-wrap gap-2 mb-8">
// // //           {states.map((state) => (
// // //             <motion.button
// // //               key={state}
// // //               whileHover={{ scale: 1.05 }}
// // //               whileTap={{ scale: 0.95 }}
// // //               className={`px-4 py-2 rounded-full font-medium text-sm transition-colors ${
// // //                 activeState === state
// // //                   ? "bg-red-500 text-white dark:bg-red-600"
// // //                   : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
// // //               }`}
// // //               onClick={() => setActiveState(state)}
// // //             >
// // //               {state}
// // //             </motion.button>
// // //           ))}
// // //         </div>

// // //         {/* Filters Grid */}
// // //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
// // //           {([
// // //             ["Make", makes, make, setMake, Car],
// // //             ["Model", models, model, setModel, Car],
// // //             ["City", cities, city, setCity, MapPin],
// // //             ["Body Type", bodyTypes, bodyType, setBodyType, Car],
// // //             ["Min. Price", minPrices, minPrice, setMinPrice, DollarSign],
// // //             ["Max. Price", maxPrices, maxPrice, setMaxPrice, DollarSign],
// // //           ] as [string, string[], string, React.Dispatch<React.SetStateAction<string>>, any][]).map(
// // //             ([label, options, value, setter, Icon]) => (
// // //               <div key={label} className="relative">
// // //                 <label className="sr-only">{label}</label>
// // //                 <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
// // //                 <select
// // //                   value={value}
// // //                   onChange={(e) => setter(e.target.value)}
// // //                   className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
// // //                 >
// // //                   <option value="">{label}</option>
// // //                   {options.map((opt) => (
// // //                     <option key={opt} value={opt}>
// // //                       {opt}
// // //                     </option>
// // //                   ))}
// // //                 </select>
// // //               </div>
// // //             )
// // //           )}
// // //         </div>

// // //         {/* AI Search with Suggestions */}
// // //         <div className="relative mb-6">
// // //           <div className="flex items-center gap-4">
// // //             <div className="relative flex-grow">
// // //               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
// // //               <input
// // //                 type="text"
// // //                 placeholder="AI Search: e.g., 'Red Tesla Model 3 in Sydney'"
// // //                 value={aiSearch}
// // //                 onChange={(e) => setAiSearch(e.target.value)}
// // //                 className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
// // //               />
// // //             </div>
// // //             <motion.button
// // //               whileHover={{ scale: 1.05 }}
// // //               whileTap={{ scale: 0.95 }}
// // //               className="bg-red-500 dark:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 dark:hover:bg-red-700 transition"
// // //               onClick={handleSubmit}
// // //             >
// // //               Search
// // //             </motion.button>
// // //           </div>
// // //           <AnimatePresence>
// // //             {suggestions.length > 0 && (
// // //               <motion.div
// // //                 initial={{ opacity: 0, y: -10 }}
// // //                 animate={{ opacity: 1, y: 0 }}
// // //                 exit={{ opacity: 0, y: -10 }}
// // //                 className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
// // //               >
// // //                 {suggestions.map((suggestion, index) => (
// // //                   <div
// // //                     key={index}
// // //                     className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-900 dark:text-white"
// // //                     onClick={() => handleSuggestionClick(suggestion)}
// // //                   >
// // //                     {suggestion}
// // //                   </div>
// // //                 ))}
// // //               </motion.div>
// // //             )}
// // //           </AnimatePresence>
// // //         </div>

// // //         {/* Show All Button */}
// // //         <motion.button
// // //           whileHover={{ scale: 1.05 }}
// // //           whileTap={{ scale: 0.95 }}
// // //           className="w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition"
// // //           onClick={handleShowAll}
// // //         >
// // //           Show All Cars
// // //         </motion.button>
// // //       </motion.div>
// // //     </div>
// // //   );
// // // }



// // // "use client";

// // // import { useState, useEffect } from "react";
// // // import { useRouter } from "next/navigation";
// // // import { motion, AnimatePresence } from "framer-motion";
// // // import { Search, Car, MapPin, DollarSign, X } from "lucide-react";

// // // const states = ["All", "ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"];
// // // const makes = ["Toyota", "Ford", "Honda", "BMW", "Mercedes", "Tesla"];
// // // const models = ["Corolla", "Camry", "Civic", "Mustang", "Model 3", "X5"];
// // // const cities = ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"];
// // // const bodyTypes = ["Sedan", "SUV", "Hatchback", "Coupe", "Convertible"];
// // // const minPrices = ["10000", "20000", "30000", "40000", "50000"];
// // // const maxPrices = ["50000", "100000", "150000", "200000", "250000"];

// // // export default function SearchPage() {
// // //   const router = useRouter();
// // //   const [activeState, setActiveState] = useState("All");
// // //   const [make, setMake] = useState("");
// // //   const [model, setModel] = useState("");
// // //   const [city, setCity] = useState("");
// // //   const [bodyType, setBodyType] = useState("");
// // //   const [minPrice, setMinPrice] = useState("");
// // //   const [maxPrice, setMaxPrice] = useState("");
// // //   const [aiSearch, setAiSearch] = useState("");
// // //   const [suggestions, setSuggestions] = useState<string[]>([]);

// // //   useEffect(() => {
// // //     if (aiSearch.length > 2) {
// // //       const mockSuggestions = [
// // //         `Used ${aiSearch} in ${city || "Sydney"}`,
// // //         `${aiSearch} under ${maxPrice || "100000"}`,
// // //         `New ${aiSearch} ${bodyType || "Sedan"}`,
// // //       ].filter((s) => s.toLowerCase().includes(aiSearch.toLowerCase()));
// // //       setSuggestions(mockSuggestions.slice(0, 3));
// // //     } else {
// // //       setSuggestions([]);
// // //     }
// // //   }, [aiSearch, city, maxPrice, bodyType]);

// // //   const handleSubmit = () => {
// // //     const queryParams = new URLSearchParams();
// // //     if (activeState !== "All") queryParams.append("state", activeState);
// // //     if (make) queryParams.append("make", make);
// // //     if (model) queryParams.append("model", model);
// // //     if (city) queryParams.append("city", city);
// // //     if (bodyType) queryParams.append("bodyType", bodyType);
// // //     if (minPrice) queryParams.append("minPrice", minPrice);
// // //     if (maxPrice) queryParams.append("maxPrice", maxPrice);
// // //     if (aiSearch) queryParams.append("ai", aiSearch);

// // //     router.push(`/results?${queryParams.toString()}`);
// // //   };

// // //   const handleShowAll = () => router.push("/results");
// // //   const handleSuggestionClick = (s: string) => {
// // //     setAiSearch(s);
// // //     setSuggestions([]);
// // //   };

// // //   const activeFilters = [
// // //     make && { label: make, setter: setMake },
// // //     model && { label: model, setter: setModel },
// // //     city && { label: city, setter: setCity },
// // //     bodyType && { label: bodyType, setter: setBodyType },
// // //     minPrice && { label: `Min $${minPrice}`, setter: setMinPrice },
// // //     maxPrice && { label: `Max $${maxPrice}`, setter: setMaxPrice },
// // //   ].filter(Boolean) as { label: string; setter: (v: string) => void }[];

// // //   return (
// // //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 dark:from-gray-900 dark:via-gray-950 dark:to-black p-6">
// // //       <motion.div
// // //         initial={{ opacity: 0, scale: 0.97 }}
// // //         animate={{ opacity: 1, scale: 1 }}
// // //         transition={{ duration: 0.3 }}
// // //         className="w-full max-w-4xl backdrop-blur-xl bg-white/40 dark:bg-gray-900/50 rounded-3xl shadow-2xl p-8 border border-white/20"
// // //       >
// // //         {/* Title */}
// // //         <h1 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-8">
// // //           🚗 Find Your Dream Car
// // //         </h1>

// // //         {/* States */}
// // //         <div className="flex flex-wrap justify-center gap-2 mb-6">
// // //           {states.map((state) => (
// // //             <button
// // //               key={state}
// // //               className={`px-4 py-2 rounded-full text-sm font-medium transition ${
// // //                 activeState === state
// // //                   ? "bg-red-500 text-white"
// // //                   : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
// // //               }`}
// // //               onClick={() => setActiveState(state)}
// // //             >
// // //               {state}
// // //             </button>
// // //           ))}
// // //         </div>

// // //         {/* Filters */}
// // //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
// // //           {([
// // //             ["Make", makes, make, setMake, Car],
// // //             ["Model", models, model, setModel, Car],
// // //             ["City", cities, city, setCity, MapPin],
// // //             ["Body Type", bodyTypes, bodyType, setBodyType, Car],
// // //             ["Min. Price", minPrices, minPrice, setMinPrice, DollarSign],
// // //             ["Max. Price", maxPrices, maxPrice, setMaxPrice, DollarSign],
// // //           ] as [string, string[], string, React.Dispatch<React.SetStateAction<string>>, any][]).map(
// // //             ([label, options, value, setter, Icon]) => (
// // //               <div key={label} className="relative">
// // //                 <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
// // //                 <select
// // //                   value={value}
// // //                   onChange={(e) => setter(e.target.value)}
// // //                   className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-white/80 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-red-500"
// // //                 >
// // //                   <option value="">{label}</option>
// // //                   {options.map((opt) => (
// // //                     <option key={opt} value={opt}>
// // //                       {opt}
// // //                     </option>
// // //                   ))}
// // //                 </select>
// // //               </div>
// // //             )
// // //           )}
// // //         </div>

// // //         {/* Active Filters */}
// // //         {activeFilters.length > 0 && (
// // //           <div className="flex flex-wrap gap-2 mb-6">
// // //             {activeFilters.map((f, i) => (
// // //               <div
// // //                 key={i}
// // //                 className="flex items-center gap-1 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-200 px-3 py-1 rounded-full text-xs font-medium"
// // //               >
// // //                 {f.label}
// // //                 <X size={14} className="cursor-pointer" onClick={() => f.setter("")} />
// // //               </div>
// // //             ))}
// // //           </div>
// // //         )}

// // //         {/* AI Search */}
// // //         <div className="relative mb-6">
// // //           <div className="flex gap-3">
// // //             <div className="relative flex-grow">
// // //               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
// // //               <input
// // //                 type="text"
// // //                 placeholder="AI Search e.g. 'Red Tesla in Sydney'"
// // //                 value={aiSearch}
// // //                 onChange={(e) => setAiSearch(e.target.value)}
// // //                 className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-white/80 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-red-500"
// // //               />
// // //             </div>
// // //             <button
// // //               className="bg-red-500 hover:bg-red-600 text-white px-6 rounded-lg text-sm font-semibold"
// // //               onClick={handleSubmit}
// // //             >
// // //               Search
// // //             </button>
// // //           </div>

// // //           {/* Suggestions */}
// // //           <AnimatePresence>
// // //             {suggestions.length > 0 && (
// // //               <motion.div
// // //                 initial={{ opacity: 0, y: -6 }}
// // //                 animate={{ opacity: 1, y: 0 }}
// // //                 exit={{ opacity: 0, y: -6 }}
// // //                 className="absolute z-20 w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
// // //               >
// // //                 {suggestions.map((s, i) => (
// // //                   <div
// // //                     key={i}
// // //                     onClick={() => handleSuggestionClick(s)}
// // //                     className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-800 dark:text-white"
// // //                   >
// // //                     {s}
// // //                   </div>
// // //                 ))}
// // //               </motion.div>
// // //             )}
// // //           </AnimatePresence>
// // //         </div>

// // //         {/* Show All */}
// // //         <button
// // //           className="w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-300 dark:hover:bg-gray-600"
// // //           onClick={handleShowAll}
// // //         >
// // //           Show All Cars
// // //         </button>
// // //       </motion.div>
// // //     </div>
// // //   );
// // // }


// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
// import { Search, Car, MapPin, DollarSign, X } from "lucide-react";

// // Filters arrays
// const states = ["All", "ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"];
// const makes = ["Toyota", "Ford", "Honda", "BMW", "Mercedes", "Tesla"];
// const models = ["Corolla", "Camry", "Civic", "Mustang", "Model 3", "X5"];
// const cities = ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"];
// const bodyTypes = ["Sedan", "SUV", "Hatchback", "Coupe", "Convertible"];
// const minPrices = ["10000", "20000", "30000", "40000", "50000"];
// const maxPrices = ["50000", "100000", "150000", "200000", "250000"];

// // Background images (rename to avoid spaces)
// const bgImages = ["/background.png", "/background (2).png", "/backgroundx.png"];

// export default function SearchPage() {
//   const router = useRouter();
//   const [activeState, setActiveState] = useState("All");
//   const [make, setMake] = useState("");
//   const [model, setModel] = useState("");
//   const [city, setCity] = useState("");
//   const [bodyType, setBodyType] = useState("");
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");
//   const [aiSearch, setAiSearch] = useState("");
//   const [suggestions, setSuggestions] = useState<string[]>([]);
//   const [bgIndex, setBgIndex] = useState(0);

//   // AI mock suggestions
//   useEffect(() => {
//     if (aiSearch.length > 2) {
//       const mockSuggestions = [
//         `Used ${aiSearch} in ${city || "Sydney"}`,
//         `${aiSearch} under ${maxPrice || "100000"}`,
//         `New ${aiSearch} ${bodyType || "Sedan"}`,
//       ].filter((s) => s.toLowerCase().includes(aiSearch.toLowerCase()));
//       setSuggestions(mockSuggestions.slice(0, 3));
//     } else {
//       setSuggestions([]);
//     }
//   }, [aiSearch, city, maxPrice, bodyType]);

//   // Background slideshow every 5s
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setBgIndex((prev) => (prev + 1) % bgImages.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleSubmit = () => {
//     setSuggestions([]);
//     const queryParams = new URLSearchParams();
//     if (activeState !== "All") queryParams.append("state", activeState);
//     if (make) queryParams.append("make", make);
//     if (model) queryParams.append("model", model);
//     if (city) queryParams.append("city", city);
//     if (bodyType) queryParams.append("bodyType", bodyType);
//     if (minPrice) queryParams.append("minPrice", minPrice);
//     if (maxPrice) queryParams.append("maxPrice", maxPrice);
//     if (aiSearch) queryParams.append("ai", aiSearch);
//     router.push(`/results?${queryParams.toString()}`);
//   };

//   const handleShowAll = () => router.push("/results");

//   const handleSuggestionClick = (s: string) => {
//     setAiSearch(s);
//     setSuggestions([]);
//   };

//   const handleClearFilters = () => {
//     setActiveState("All");
//     setMake("");
//     setModel("");
//     setCity("");
//     setBodyType("");
//     setMinPrice("");
//     setMaxPrice("");
//     setAiSearch("");
//     setSuggestions([]);
//     router.push("/results");
//   };

//   const activeFilters = [
//     activeState !== "All" && { label: activeState, setter: setActiveState },
//     make && { label: make, setter: setMake },
//     model && { label: model, setter: setModel },
//     city && { label: city, setter: setCity },
//     bodyType && { label: bodyType, setter: setBodyType },
//     minPrice && { label: `Min $${minPrice}`, setter: setMinPrice },
//     maxPrice && { label: `Max $${maxPrice}`, setter: setMaxPrice },
//   ].filter(Boolean) as { label: string; setter: (v: string) => void }[];

//   return (
//     <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
//       {/* Background slideshow */}
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={bgIndex}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 1 }}
//           className="absolute inset-0 -z-10 w-full h-full"
//         >
//           <Image
//             src={bgImages[bgIndex]}
//             alt={`Background ${bgIndex}`}
//             fill
//             style={{ objectFit: "cover" }}
//             priority
//           />
//         </motion.div>
//       </AnimatePresence>

//       {/* Dark overlay */}
//       <div className="absolute inset-0 bg-black/40"></div>

//       {/* Main card */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.97 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.3 }}
//         className="relative w-full max-w-4xl backdrop-blur-xl bg-white/40 dark:bg-gray-900/50 rounded-3xl shadow-2xl p-8 border border-white/20 z-10"
//       >
//         <h1 className="text-3xl font-extrabold text-center text-gray-100 mb-8">
//           Find Your Dream Vehicle
//         </h1>

//         {/* States */}
//         <div className="flex flex-wrap justify-center gap-2 mb-6">
//           {states.map((state) => (
//             <button
//               key={state}
//               className={`px-4 py-2 rounded-full text-sm font-medium transition ${
//                 activeState === state
//                   ? "bg-red-500 text-white"
//                   : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
//               }`}
//               onClick={() => setActiveState(state)}
//             >
//               {state}
//             </button>
//           ))}
//         </div>

//         {/* Filters Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//           {([
//             ["Make", makes, make, setMake, Car],
//             ["Model", models, model, setModel, Car],
//             ["City", cities, city, setCity, MapPin],
//             ["Body Type", bodyTypes, bodyType, setBodyType, Car],
//             ["Min. Price", minPrices, minPrice, setMinPrice, DollarSign],
//             ["Max. Price", maxPrices, maxPrice, setMaxPrice, DollarSign],
//           ] as [string, string[], string, React.Dispatch<React.SetStateAction<string>>, any][]).map(
//             ([label, options, value, setter, Icon]) => (
//               <div key={label} className="relative">
//                 <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-200" size={18} />
//                 <select
//                   value={value}
//                   onChange={(e) => setter(e.target.value)}
//                   className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-white/60 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-red-500"
//                 >
//                   <option value="">{label}</option>
//                   {options.map((opt) => (
//                     <option key={opt} value={opt}>
//                       {opt}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             )
//           )}
//         </div>

//         {/* Active Filters */}
//         {activeFilters.length > 0 && (
//           <div className="flex flex-wrap gap-2 mb-6">
//             {activeFilters.map((f, i) => (
//               <div
//                 key={i}
//                 className="flex items-center gap-1 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-200 px-3 py-1 rounded-full text-xs font-medium"
//               >
//                 {f.label}
//                 <X size={14} className="cursor-pointer" onClick={() => f.setter("")} />
//               </div>
//             ))}
//           </div>
//         )}

//         {/* AI Search */}
//         <div className="relative mb-6">
//           <div className="flex gap-3">
//             <div className="relative flex-grow">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-200" size={18} />
//               <input
//                 type="text"
//                 placeholder="AI Search e.g. 'Red Tesla in Sydney'"
//                 value={aiSearch}
//                 onChange={(e) => setAiSearch(e.target.value)}
//                 className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-white/60 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-red-500"
//               />
//             </div>
//             <button
//               className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg font-medium hover:bg-gray-400 dark:hover:bg-gray-500 transition"
//               onClick={handleClearFilters}
//             >
//               Clear Filters
//             </button>
//             <button
//               className="bg-red-500 hover:bg-red-600 text-white px-6 rounded-lg text-sm font-semibold"
//               onClick={handleSubmit}
//             >
//               Search
//             </button>
//           </div>

//           {/* Suggestions */}
//           <AnimatePresence>
//             {suggestions.length > 0 && (
//               <motion.div
//                 initial={{ opacity: 0, y: -6 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -6 }}
//                 className="absolute z-20 w-full mt-2 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700"
//               >
//                 {suggestions.map((s, i) => (
//                   <div
//                     key={i}
//                     onClick={() => handleSuggestionClick(s)}
//                     className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-800 dark:text-white"
//                   >
//                     {s}
//                   </div>
//                 ))}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Show All */}
//         <button
//           className="w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-300 dark:hover:bg-gray-600"
//           onClick={handleShowAll}
//         >
//           Show All Cars
//         </button>
//       </motion.div>
//     </div>
//   );
// }


// src\app\(mainLayout)\page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Car, MapPin, DollarSign, X } from "lucide-react";

// Filters arrays
const states = ["All", "ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"];
const makes = ["Toyota", "Ford", "Honda", "BMW", "Mercedes", "Tesla"];
const models = ["Corolla", "Camry", "Civic", "Mustang", "Model 3", "X5"];
const cities = ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"];
const bodyTypes = ["Sedan", "SUV", "Hatchback", "Coupe", "Convertible"];
const minPrices = ["10000", "20000", "30000", "40000", "50000"];
const maxPrices = ["50000", "100000", "150000", "200000", "250000"];

// Background images (rename to avoid spaces)
const bgImages = ["/background.png", "/background (2).png", "/backgroundx.png"];

// Type for filters (moved here for reuse)
export type Filters = {
  make?: string;
  model?: string;
  minPrice?: string;
  maxPrice?: string;
  city?: string;
  bodyType?: string;
};

export default function SearchPage() {
  const router = useRouter();
  const [activeState, setActiveState] = useState("All");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [city, setCity] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [aiSearch, setAiSearch] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [bgIndex, setBgIndex] = useState(0);

  // AI mock suggestions
  useEffect(() => {
    if (aiSearch.length > 2) {
      const mockSuggestions = [
        `Used ${aiSearch} in ${city || "Sydney"}`,
        `${aiSearch} under ${maxPrice || "100000"}`,
        `New ${aiSearch} ${bodyType || "Sedan"}`,
      ].filter((s) => s.toLowerCase().includes(aiSearch.toLowerCase()));
      setSuggestions(mockSuggestions.slice(0, 3));
    } else {
      setSuggestions([]);
    }
  }, [aiSearch, city, maxPrice, bodyType]);

  // Background slideshow every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Function to parse AI search into filters
  const parseAiSearch = (query: string): Partial<Filters> => {
    const lowerQuery = query.toLowerCase();
    const parsed: Partial<Filters> = {};

    // Extract make/model (simple keyword match from your lists)
    for (const m of makes) {
      if (lowerQuery.includes(m.toLowerCase())) {
        parsed.make = m;
        break;
      }
    }
    for (const mod of models) {
      if (lowerQuery.includes(mod.toLowerCase())) {
        parsed.model = mod;
        break;
      }
    }

    // Extract city (e.g., "in sydney")
    const cityMatch = lowerQuery.match(/in\s+(\w+)/);
    if (cityMatch && cities.includes(cityMatch[1].charAt(0).toUpperCase() + cityMatch[1].slice(1))) {
      parsed.city = cityMatch[1].charAt(0).toUpperCase() + cityMatch[1].slice(1);
    }

    // Extract body type
    for (const bt of bodyTypes) {
      if (lowerQuery.includes(bt.toLowerCase())) {
        parsed.bodyType = bt;
        break;
      }
    }

    // Extract prices (e.g., "under 50000", "over 10000", "between 20000 and 40000")
    const underMatch = lowerQuery.match(/under\s+(\d+)/);
    if (underMatch) parsed.maxPrice = underMatch[1];

    const overMatch = lowerQuery.match(/(over|above)\s+(\d+)/);
    if (overMatch) parsed.minPrice = overMatch[2];

    const betweenMatch = lowerQuery.match(/between\s+(\d+)\s+and\s+(\d+)/);
    if (betweenMatch) {
      parsed.minPrice = betweenMatch[1];
      parsed.maxPrice = betweenMatch[2];
    }

    // You can add more rules, e.g., for color (if added to filters), year, etc.
    // For colors like "red", you'd need to add a color filter to your app and parsing logic.

    return parsed;
  };

  const handleSubmit = () => {
    setSuggestions([]);

    // If aiSearch is provided, parse it and merge with existing filters
    let mergedFilters = { make, model, city, bodyType, minPrice, maxPrice };
    if (aiSearch) {
      const parsed = parseAiSearch(aiSearch);
      mergedFilters = { ...mergedFilters, ...parsed }; // Merge, AI overrides manual if conflict
      // Update states for UI feedback
      setMake(mergedFilters.make || "");
      setModel(mergedFilters.model || "");
      setCity(mergedFilters.city || "");
      setBodyType(mergedFilters.bodyType || "");
      setMinPrice(mergedFilters.minPrice || "");
      setMaxPrice(mergedFilters.maxPrice || "");
    }

    const queryParams = new URLSearchParams();
    if (activeState !== "All") queryParams.append("state", activeState);
    if (mergedFilters.make) queryParams.append("make", mergedFilters.make);
    if (mergedFilters.model) queryParams.append("model", mergedFilters.model);
    if (mergedFilters.city) queryParams.append("city", mergedFilters.city);
    if (mergedFilters.bodyType) queryParams.append("bodyType", mergedFilters.bodyType);
    if (mergedFilters.minPrice) queryParams.append("minPrice", mergedFilters.minPrice);
    if (mergedFilters.maxPrice) queryParams.append("maxPrice", mergedFilters.maxPrice);
    // No need for ai param anymore, since we've parsed it

    router.push(`/results?${queryParams.toString()}`);
  };

  const handleShowAll = () => router.push("/results");

  const handleSuggestionClick = (s: string) => {
    setAiSearch(s);
    setSuggestions([]);
  };

  const handleClearFilters = () => {
    setActiveState("All");
    setMake("");
    setModel("");
    setCity("");
    setBodyType("");
    setMinPrice("");
    setMaxPrice("");
    setAiSearch("");
    setSuggestions([]);
    router.push("/results");
  };

  const activeFilters = [
    activeState !== "All" && { label: activeState, setter: setActiveState },
    make && { label: make, setter: setMake },
    model && { label: model, setter: setModel },
    city && { label: city, setter: setCity },
    bodyType && { label: bodyType, setter: setBodyType },
    minPrice && { label: `Min $${minPrice}`, setter: setMinPrice },
    maxPrice && { label: `Max $${maxPrice}`, setter: setMaxPrice },
  ].filter(Boolean) as { label: string; setter: (v: string) => void }[];

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={bgIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 -z-10 w-full h-full"
        >
          <Image
            src={bgImages[bgIndex]}
            alt={`Background ${bgIndex}`}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-4xl backdrop-blur-xl bg-white/40 dark:bg-gray-900/50 rounded-3xl shadow-2xl p-8 border border-white/20 z-10"
      >
        <h1 className="text-3xl font-extrabold text-center text-gray-100 mb-8">
          Find Your Dream Vehicle
        </h1>

        {/* States */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {states.map((state) => (
            <button
              key={state}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeState === state
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
              }`}
              onClick={() => setActiveState(state)}
            >
              {state}
            </button>
          ))}
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {([
            ["Make", makes, make, setMake, Car],
            ["Model", models, model, setModel, Car],
            ["City", cities, city, setCity, MapPin],
            ["Body Type", bodyTypes, bodyType, setBodyType, Car],
            ["Min. Price", minPrices, minPrice, setMinPrice, DollarSign],
            ["Max. Price", maxPrices, maxPrice, setMaxPrice, DollarSign],
          ] as [string, string[], string, React.Dispatch<React.SetStateAction<string>>, any][]).map(
            ([label, options, value, setter, Icon]) => (
              <div key={label} className="relative">
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-200" size={18} />
                <select
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-white/60 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-red-500"
                >
                  <option value="">{label}</option>
                  {options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            )
          )}
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {activeFilters.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-1 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-200 px-3 py-1 rounded-full text-xs font-medium"
              >
                {f.label}
                <X size={14} className="cursor-pointer" onClick={() => f.setter("")} />
              </div>
            ))}
          </div>
        )}

        {/* AI Search */}
        <div className="relative mb-6">
          <div className="flex gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-200" size={18} />
              <input
                type="text"
                placeholder="AI Search e.g. 'Red Tesla in Sydney'"
                value={aiSearch}
                onChange={(e) => setAiSearch(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-white/60 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-red-500"
              />
            </div>
            <button
              className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg font-medium hover:bg-gray-400 dark:hover:bg-gray-500 transition"
              onClick={handleClearFilters}
            >
              Clear Filters
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-6 rounded-lg text-sm font-semibold"
              onClick={handleSubmit}
            >
              Search
            </button>
          </div>

          {/* Suggestions */}
          <AnimatePresence>
            {suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="absolute z-20 w-full mt-2 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700"
              >
                {suggestions.map((s, i) => (
                  <div
                    key={i}
                    onClick={() => handleSuggestionClick(s)}
                    className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-800 dark:text-white"
                  >
                    {s}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Show All */}
        <button
          className="w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-300 dark:hover:bg-gray-600"
          onClick={handleShowAll}
        >
          Show All Cars
        </button>
      </motion.div>
    </div>
  );
}