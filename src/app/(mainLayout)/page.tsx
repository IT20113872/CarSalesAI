// import { JobFilters } from "@/components/general/JobFilters";
// import JobListings from "@/components/general/JobListings";
// import JobListingsLoading from "@/components/general/JobListingsLoading";
// import { Suspense } from "react";

// type SearchParamsProps = {
//   searchParams: Promise<{
//     page?: string;
//     jobTypes?: string;
//     location?: string;
//     minSalary?: string;
//     maxSalary?: string;
//   }>;
// };

// export default async function Home({ searchParams }: SearchParamsProps) {
//   const params = await searchParams;
//   const pageNum = Number(params.page);
//   const currentPage = isNaN(pageNum) || pageNum < 1 ? 1 : pageNum; // Fallback to page 1 if invalid
//   const jobTypes = params.jobTypes?.split(",").filter(Boolean) || []; // Remove empty strings
//   const location = params.location || "";
//   const minSalary = params.minSalary || "";
//   const maxSalary = params.maxSalary || "";

//   // Create a composite key from all filter parameters
//   const filterKey = `page=${currentPage};types=${jobTypes.join(
//     ","
//   )};location=${location};minSalary=${minSalary};maxSalary=${maxSalary}`;

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//       <JobFilters />
//       <div className="col-span-1 md:col-span-2 flex flex-col gap-5">
//         <Suspense key={filterKey} fallback={<JobListingsLoading />}>
//           <JobListings
//             currentPage={currentPage}
//             jobTypes={jobTypes}
//             location={location}
//             minSalary={minSalary}
//             maxSalary={maxSalary}
//           />
//         </Suspense>
//       </div>
//     </div>
//   );
// }


// import { prisma } from "../utils/db"; // <- import Prisma client

// // Ensure fresh data on each request
// export const dynamic = "force-dynamic";

// export default async function Home() {
//   // Fetch all job posts
//   const jobPosts = await prisma.jobPost.findMany({
//     orderBy: {
//       createdAt: "desc",
//     },
//   });

//   return (
//     <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
//       <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Job Posts</h1>

//       {jobPosts.length === 0 ? (
//         <p>No job posts available.</p>
//       ) : (
//         <ul
//           style={{
//             listStyle: "none",
//             padding: 0,
//             display: "grid",
//             gap: "1.5rem",
//           }}
//         >
//           {jobPosts.map((job) => (
//             <li
//               key={job.id}
//               style={{
//                 padding: "1rem",
//                 border: "1px solid #ccc",
//                 borderRadius: "0.5rem",
//                 boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//               }}
//             >
//               <h2 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
//                 {job.jobTitle}
//               </h2>
//               <p>
//                 <strong>Location:</strong> {job.location}
//               </p>
//               <p>
//                 <strong>Salary:</strong> ${job.salaryFrom} - ${job.salaryTo}
//               </p>
//               <p>
//                 <strong>Employment Type:</strong> {job.employmentType}
//               </p>
//               <p>
//                 <strong>Benefits:</strong> {job.benefits.join(", ")}
//               </p>
//               <p style={{ marginTop: "0.5rem" }}>{job.jobDescription}</p>
//               <p style={{ fontSize: "0.85rem", color: "#555" }}>
//                 Posted on:{" "}
//                 {new Date(job.createdAt).toLocaleDateString("en-US", {
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                 })}
//               </p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
// "use client";
// import { useState, useEffect } from "react";
// import CarFilters from "@/components/general/CarFilters";

// export default function HomePage() {
//   const [cars, setCars] = useState<any[]>([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const limit = 12; // cars per page
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
//     setPage(1); // reset page when filters change
//   };

//   return (
//     <div className="p-8 font-sans bg-gray-50 dark:bg-gray-900 min-h-screen">
//       <h1 className="text-4xl font-bold mb-6 text-blue-700 dark:text-blue-400 text-center">
//         Car Listings
//       </h1>

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
// //////////////////////////////////////////////////////
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

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import CarFilters from "@/components/general/CarFilters";

// type Filters = {
//   make?: string;
//   year?: string;
//   minPrice?: string;
//   maxPrice?: string;
//   city?: string;
// };

// export default function SearchPage() {
//   const router = useRouter();
//   const [filters, setFilters] = useState<Filters>({});

//   const handleFilter = (newFilters: Filters) => {
//     setFilters(newFilters);

//     const queryParams = new URLSearchParams();
//     Object.entries(newFilters).forEach(([key, value]) => {
//       if (value) queryParams.append(key, value);
//     });

//     router.push(`/results?${queryParams.toString()}`);
//   };

//   return (
//     <div className="p-8 font-sans bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col items-center">
//       <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-300 mb-6">
//         Search for Cars
//       </h1>
//       <div className="w-full max-w-2xl">
//         <CarFilters onFilter={handleFilter} initialFilters={filters} />
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import CarFilters from "@/components/general/CarFilters";

// type Filters = {
//   state?: string;
//   make?: string;
//   model?: string;
//   city?: string;
//   bodyType?: string;
//   minPrice?: string;
//   maxPrice?: string;
//   aiSearch?: string;
// };

// const states = ["All", "ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"];
// const bodyTypes = ["All", "Sedan", "SUV", "Hatchback", "Truck", "Coupe", "Convertible"];

// export default function SearchPage() {
//   const router = useRouter();

//   const [filters, setFilters] = useState<Filters>({
//     state: "All",
//     make: "",
//     model: "",
//     city: "",
//     bodyType: "All",
//     minPrice: "",
//     maxPrice: "",
//     aiSearch: "",
//   });

//   const handleFilterChange = (key: keyof Filters, value: string) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const queryParams = new URLSearchParams();
//     Object.entries(filters).forEach(([key, value]) => {
//       if (value && value !== "All") queryParams.append(key, value);
//     });

//     router.push(`/results?${queryParams.toString()}`);
//   };

//   return (
//     <div className="p-8 font-sans bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col items-center">
//       <h1 className="text-4xl font-bold text-blue-800 dark:text-blue-300 mb-8 text-center">
//         Car Buying Just Got Smarter
//       </h1>

//       <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex flex-col gap-4">
//         {/* State */}
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1 flex flex-col">
//             <label className="font-semibold text-gray-700 dark:text-gray-300">State</label>
//             <select
//               value={filters.state}
//               onChange={(e) => handleFilterChange("state", e.target.value)}
//               className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 dark:bg-gray-900 dark:text-white"
//             >
//               {states.map((state) => (
//                 <option key={state} value={state}>{state}</option>
//               ))}
//             </select>
//           </div>

//           {/* Make */}
//           <div className="flex-1 flex flex-col">
//             <label className="font-semibold text-gray-700 dark:text-gray-300">Make</label>
//             <input
//               type="text"
//               value={filters.make}
//               onChange={(e) => handleFilterChange("make", e.target.value)}
//               placeholder="Toyota, Honda..."
//               className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 dark:bg-gray-900 dark:text-white"
//             />
//           </div>

//           {/* Model */}
//           <div className="flex-1 flex flex-col">
//             <label className="font-semibold text-gray-700 dark:text-gray-300">Model</label>
//             <input
//               type="text"
//               value={filters.model}
//               onChange={(e) => handleFilterChange("model", e.target.value)}
//               placeholder="Corolla, Civic..."
//               className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 dark:bg-gray-900 dark:text-white"
//             />
//           </div>
//         </div>

//         {/* City and Body Type */}
//         <div className="flex flex-col md:flex-row gap-4">
//           {/* City */}
//           <div className="flex-1 flex flex-col">
//             <label className="font-semibold text-gray-700 dark:text-gray-300">City</label>
//             <input
//               type="text"
//               value={filters.city}
//               onChange={(e) => handleFilterChange("city", e.target.value)}
//               placeholder="Colombo..."
//               className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 dark:bg-gray-900 dark:text-white"
//             />
//           </div>

//           {/* Body Type */}
//           <div className="flex-1 flex flex-col">
//             <label className="font-semibold text-gray-700 dark:text-gray-300">Body Type</label>
//             <select
//               value={filters.bodyType}
//               onChange={(e) => handleFilterChange("bodyType", e.target.value)}
//               className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 dark:bg-gray-900 dark:text-white"
//             >
//               {bodyTypes.map((type) => (
//                 <option key={type} value={type}>{type}</option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Min and Max Price */}
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1 flex flex-col">
//             <label className="font-semibold text-gray-700 dark:text-gray-300">Min. Price</label>
//             <input
//               type="number"
//               value={filters.minPrice}
//               onChange={(e) => handleFilterChange("minPrice", e.target.value)}
//               placeholder="10000"
//               className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 dark:bg-gray-900 dark:text-white"
//             />
//           </div>

//           <div className="flex-1 flex flex-col">
//             <label className="font-semibold text-gray-700 dark:text-gray-300">Max. Price</label>
//             <input
//               type="number"
//               value={filters.maxPrice}
//               onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
//               placeholder="50000"
//               className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 dark:bg-gray-900 dark:text-white"
//             />
//           </div>
//         </div>

//         {/* AI Search */}
//         <div className="flex flex-col">
//           <label className="font-semibold text-gray-700 dark:text-gray-300">AI</label>
//           <input
//             type="text"
//             value={filters.aiSearch}
//             onChange={(e) => handleFilterChange("aiSearch", e.target.value)}
//             placeholder="I am looking for a..."
//             className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 dark:bg-gray-900 dark:text-white"
//           />
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="w-full py-3 mt-2 bg-blue-600 dark:bg-black text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-gray-700 transition"
//         >
//           Search
//         </button>

//         <button
//           type="button"
//           onClick={() => router.push("/results")}
//           className="w-full py-3 mt-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
//         >
//           Show All Cars
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const states = ["All", "ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"];
const makes = ["Toyota", "Ford", "Honda"];
const models = ["Corolla", "Camry"];
const cities = ["Sydney", "Melbourne"];
const bodyTypes = ["Sedan", "SUV"];
const minPrices = ["10000", "20000"];
const maxPrices = ["50000", "100000"];

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

  const handleSubmit = () => {
    const queryParams = new URLSearchParams();
    if (activeState !== "All") queryParams.append("state", activeState);
    if (make) queryParams.append("make", make);
    if (model) queryParams.append("model", model);
    if (city) queryParams.append("city", city);
    if (bodyType) queryParams.append("bodyType", bodyType);
    if (minPrice) queryParams.append("minPrice", minPrice);
    if (maxPrice) queryParams.append("maxPrice", maxPrice);
    if (aiSearch) queryParams.append("ai", aiSearch);

    router.push(`/results?${queryParams.toString()}`);
  };

  const handleShowAll = () => router.push("/results");

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg mt-10">
      
      {/* State Tabs */}
      <div className="flex flex-wrap border-b-2 border-gray-200 dark:border-gray-700 mb-6">
        {states.map((state) => (
          <div
            key={state}
            className={`px-4 py-2 cursor-pointer font-semibold relative ${
              activeState === state
                ? "text-red-500 dark:text-red-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-red-500 dark:after:bg-red-400 after:rounded-t"
                : "text-gray-500 dark:text-gray-400"
            }`}
            onClick={() => setActiveState(state)}
          >
            {state}
          </div>
        ))}
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {[["Make", makes, make, setMake],
          ["Model", models, model, setModel],
          ["City", cities, city, setCity],
          ["Body Type", bodyTypes, bodyType, setBodyType],
          ["Min. Price", minPrices, minPrice, setMinPrice],
          ["Max. Price", maxPrices, maxPrice, setMaxPrice]
        ].map(([label, options, value, setter]: any) => (
          <select
            key={label}
            value={value}
            onChange={(e) => setter(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-400 focus:border-red-400"
          >
            <option value="">{label}</option>
            {options.map((opt: string) => (
              <option key={opt} value={opt.toLowerCase()}>{opt}</option>
            ))}
          </select>
        ))}
      </div>

      {/* Show All Button */}
      <div className="mb-4">
        <button
          // className="bg-red-500 dark:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 dark:hover:bg-red-500 transition"
        className="bg-blue-500 dark:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 dark:hover:bg-blue-500 transition"

          onClick={handleShowAll}
        >
          Show All Cars
        </button>
      </div>

      {/* AI Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-grow relative">
          {/* <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl">🤖</span> */}
          <input
            type="text"
            placeholder="AI I am looking for a..."
            value={aiSearch}
            onChange={(e) => setAiSearch(e.target.value)}
            className="w-full pl-10 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          className="bg-blue-500 dark:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold relative hover:bg-blue-600 dark:hover:bg-blue-600 transition"
          onClick={handleSubmit}
        >
          Search
          {/* <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
            BETA
          </span> */}
        </button>
      </div>
    </div>
  );
}
