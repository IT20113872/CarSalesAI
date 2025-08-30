"use client";

import { useState, useEffect, useRef } from "react";
import CarFilters, { Filters } from "@/components/general/CarFilters";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";

type Car = {
  id: number;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  city: string;
  state: string;
  odometer: number;
  transmission: string;
  fuel_type: string;
  condition: string;
  full_path: string;
};

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const isFetchingRef = useRef(false);

  // Initialize filters from URL
  const initialFilters: Filters = {
    make: searchParams.get("make") || "",
    model: searchParams.get("model") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    city: searchParams.get("city") || "",
    bodyType: searchParams.get("bodyType") || "",
  };

  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [cars, setCars] = useState<Car[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Fetch cars from API
  const fetchCars = async (cursor?: number) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    setLoading(true);

    const query = new URLSearchParams({
      ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v)),
      limit: "12",
    });
    if (cursor) query.append("cursor", cursor.toString());

    try {
      const res = await fetch(`/api/cars?${query.toString()}`);
      const data = await res.json();

      // Ensure cars is always an array
      const fetchedCars: Car[] = Array.isArray(data.cars) ? data.cars : [];

      setCars((prev) => (cursor ? [...prev, ...fetchedCars] : fetchedCars));
      setNextCursor(data.nextCursor ?? null);
    } catch (error) {
      console.error("Failed to fetch cars", error);
      setCars([]);
      setNextCursor(null);
    } finally {
      setLoading(false);
      setInitialLoading(false);
      isFetchingRef.current = false;
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchCars();
  }, []);

  // Refetch when filters change
  useEffect(() => {
    fetchCars();
  }, [filters]);

  // Update filters when URL changes
  useEffect(() => {
    const urlFilters: Filters = {
      make: searchParams.get("make") || "",
      model: searchParams.get("model") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      city: searchParams.get("city") || "",
      bodyType: searchParams.get("bodyType") || "",
    };
    setFilters(urlFilters);
  }, [searchParams]);

  const handleFilter = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 lg:p-8">
      {/* Filter Bar */}
      <div className="overflow-x-auto mb-6">
        <div className="inline-flex gap-4">
          <CarFilters onFilter={handleFilter} initialFilters={filters} />
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Skeleton loader */}
        {initialLoading &&
          Array.from({ length: 12 }).map((_, idx) => (
            <div
              key={idx}
              className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl h-64 w-full"
            ></div>
          ))}

        {/* Car Cards */}
        <AnimatePresence>
          {(cars || []).map((car) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              layout
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 p-6 flex flex-col gap-3 min-h-[300px]"
            >
              <h2 className="font-bold text-lg text-gray-900 dark:text-gray-100">{car.title}</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {car.year} • {car.make} • {car.model}
              </p>
              <p className="text-red-600 dark:text-red-400 font-semibold text-lg">
                ${car.price.toLocaleString()}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {car.city}, {car.state} | {car.odometer.toLocaleString()} km
              </p>

              <div className="flex flex-wrap gap-1 mt-1">
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs">
                  {car.transmission}
                </span>
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs">
                  {car.fuel_type}
                </span>
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs">
                  {car.condition}
                </span>
              </div>

              <a
                href={car.full_path}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 text-center px-5 py-2 border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-300 rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-blue-900 transition-all duration-300"
              >
                See Details
              </a>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* No results */}
        {!initialLoading && (cars || []).length === 0 && (
          <p className="text-gray-700 dark:text-gray-300 text-center col-span-full">
            No cars found.
          </p>
        )}
      </div>

      {/* Load More Button */}
      {nextCursor && !loading && (
        <div className="flex justify-center mt-8">
          <button
            className="px-6 py-2 border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-300 rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-blue-900 hover:shadow-lg transition-all duration-300"
            onClick={() => fetchCars(nextCursor)}
          >
            Load More
          </button>
        </div>
      )}

      {/* Loading indicator */}
      {loading && !initialLoading && (
        <div className="flex justify-center mt-8 text-gray-700 dark:text-gray-300">Loading...</div>
      )}
    </div>
  );
}





// "use client";

// import { useState, useEffect, useRef } from "react";
// import CarFilters, { Filters } from "@/components/general/CarFilters";
// import { motion, AnimatePresence } from "framer-motion";
// import { useSearchParams } from "next/navigation";

// type Car = {
//   id: number;
//   title: string;
//   make: string;
//   model: string;
//   year: number;
//   price: number;
//   city: string;
//   state: string;
//   odometer: number;
//   transmission: string;
//   fuel_type: string;
//   condition: string;
//   full_path: string;
// };

// export default function ResultsPage() {
//   const searchParams = useSearchParams();
//   const isFetchingRef = useRef(false);

//   const initialFilters: Filters = {
//     make: searchParams.get("make") || "",
//     model: searchParams.get("model") || "",
//     minPrice: searchParams.get("minPrice") || "",
//     maxPrice: searchParams.get("maxPrice") || "",
//     city: searchParams.get("city") || "",
//     bodyType: searchParams.get("bodyType") || "",
//   };

//   const [filters, setFilters] = useState<Filters>(initialFilters);
//   const [cars, setCars] = useState<Car[]>([]);
//   const [nextCursor, setNextCursor] = useState<number | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(true);

//   const fetchCars = async (cursor?: number) => {
//     if (isFetchingRef.current) return;
//     isFetchingRef.current = true;
//     setLoading(true);

//     const query = new URLSearchParams({
//       ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v)),
//       limit: "12",
//     });
//     if (cursor) query.append("cursor", cursor.toString());

//     try {
//       const res = await fetch(`/api/cars?${query.toString()}`);
//       const data = await res.json();
//       setCars((prev) => (cursor ? [...prev, ...data.cars] : data.cars));
//       setNextCursor(data.nextCursor);
//     } catch (error) {
//       console.error("Failed to fetch cars", error);
//     } finally {
//       setLoading(false);
//       setInitialLoading(false);
//       isFetchingRef.current = false;
//     }
//   };

//   useEffect(() => {
//     fetchCars();
//   }, []);

//   useEffect(() => {
//     fetchCars();
//   }, [filters]);

//   useEffect(() => {
//     const urlFilters: Filters = {
//       make: searchParams.get("make") || "",
//       model: searchParams.get("model") || "",
//       minPrice: searchParams.get("minPrice") || "",
//       maxPrice: searchParams.get("maxPrice") || "",
//       city: searchParams.get("city") || "",
//       bodyType: searchParams.get("bodyType") || "",
//     };
//     setFilters(urlFilters);
//   }, [searchParams]);

//   const handleFilter = (newFilters: Filters) => {
//     setFilters(newFilters);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 lg:p-8">
//       {/* Horizontal Filter Bar */}
//       <div className="overflow-x-auto">
//         <div className="inline-flex gap-4">
//           <CarFilters onFilter={handleFilter} initialFilters={filters} />
//         </div>
//       </div>

//       {/* Results Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
//         {/* Skeleton loader */}
//         {initialLoading &&
//           Array.from({ length: 12 }).map((_, idx) => (
//             <div
//               key={idx}
//               className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl h-64 w-full"
//             ></div>
//           ))}

//         {/* Car Cards */}
//         <AnimatePresence>
//           {cars.map((car) => (
//             <motion.div
//               key={car.id}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0 }}
//               layout
//               className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 p-6 flex flex-col gap-3 min-h-[300px]"
//             >
//               <h2 className="font-bold text-lg text-gray-900 dark:text-gray-100">
//                 {car.title}
//               </h2>
//               <p className="text-gray-500 dark:text-gray-400 text-sm">
//                 {car.year} • {car.make} • {car.model}
//               </p>
//               <p className="text-red-600 dark:text-red-400 font-semibold text-lg">
//                 ${car.price.toLocaleString()}
//               </p>
//               <p className="text-gray-600 dark:text-gray-300 text-sm">
//                 {car.city}, {car.state} | {car.odometer.toLocaleString()} km
//               </p>

//               {/* Badges */}
//               <div className="flex flex-wrap gap-1 mt-1">
//                 <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs">
//                   {car.transmission}
//                 </span>
//                 <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs">
//                   {car.fuel_type}
//                 </span>
//                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs">
//                   {car.condition}
//                 </span>
//               </div>

//               {/* Transparent Button with Thick Border */}
//               <a
//                 href={car.full_path}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="mt-3 text-center px-5 py-2 border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-300 rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-blue-900 transition-all duration-300"
//               >
//                 See Details
//               </a>
//             </motion.div>
//           ))}
//         </AnimatePresence>

//         {/* No results */}
//         {!initialLoading && cars.length === 0 && (
//           <p className="text-gray-700 dark:text-gray-300 text-center col-span-full">
//             No cars found.
//           </p>
//         )}
//       </div>

//       {/* Load More Button */}
//       {nextCursor && !loading && (
//         <div className="flex justify-center mt-8">
//           <button
//             className="px-6 py-2 border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-300 rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-blue-900 hover:shadow-lg transition-all duration-300"
//             onClick={() => fetchCars(nextCursor)}
//           >
//             Load More
//           </button>
//         </div>
//       )}

//       {loading && !initialLoading && (
//         <div className="flex justify-center mt-8 text-gray-700 dark:text-gray-300">
//           Loading...
//         </div>
//       )}
//     </div>
//   );
// }






// // // // // // "use client";

// // // // // // import { useState, useEffect } from "react";
// // // // // // import { useSearchParams } from "next/navigation";
// // // // // // import CarFilters from "@/components/general/CarFilters";

// // // // // // type Filters = {
// // // // // //   make?: string;
// // // // // //   year?: string;
// // // // // //   minPrice?: string;
// // // // // //   maxPrice?: string;
// // // // // //   city?: string;
// // // // // // };

// // // // // // export default function ResultsPage() {
// // // // // //   const searchParams = useSearchParams();
// // // // // //   const [filters, setFilters] = useState<Filters>({
// // // // // //     make: searchParams.get("make") || "",
// // // // // //     year: searchParams.get("year") || "",
// // // // // //     minPrice: searchParams.get("minPrice") || "",
// // // // // //     maxPrice: searchParams.get("maxPrice") || "",
// // // // // //     city: searchParams.get("city") || "",
// // // // // //   });

// // // // // //   const [cars, setCars] = useState<any[]>([]);
// // // // // //   const [page, setPage] = useState(1);
// // // // // //   const [totalPages, setTotalPages] = useState(1);
// // // // // //   const limit = 12;

// // // // // //   const fetchCars = async (filters: Filters = {}, pageNum = 1) => {
// // // // // //     const query = new URLSearchParams({ ...filters, page: pageNum.toString(), limit: limit.toString() }).toString();
// // // // // //     const res = await fetch(`/api/cars?${query}`);
// // // // // //     const data = await res.json();
// // // // // //     setCars(data.cars);
// // // // // //     setTotalPages(Math.ceil(data.total / limit));
// // // // // //     setPage(data.page);
// // // // // //   };

// // // // // //   useEffect(() => {
// // // // // //     fetchCars(filters, page);
// // // // // //   }, [filters, page]);

// // // // // //   const handleFilter = (newFilters: Filters) => {
// // // // // //     setFilters(newFilters);
// // // // // //     setPage(1);
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="p-8 font-sans bg-gray-50 dark:bg-gray-900 min-h-screen">
// // // // // //       <CarFilters onFilter={handleFilter} initialFilters={filters} />

// // // // // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
// // // // // //         {cars.length === 0 && (
// // // // // //           <p className="text-gray-700 dark:text-gray-300 text-center col-span-full">
// // // // // //             No cars found.
// // // // // //           </p>
// // // // // //         )}

// // // // // //         {cars.map((car) => (
// // // // // //           <div key={car.id} className="bg-white dark:bg-gray-800 border border-blue-100 dark:border-blue-700 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition p-6 flex flex-col justify-between">
// // // // // //             <div>
// // // // // //               <h2 className="text-2xl font-bold mb-2 text-blue-800 dark:text-blue-300">{car.title}</h2>
// // // // // //               <p className="text-gray-700 dark:text-gray-300 mb-1">{car.year} {car.make} {car.model}</p>
// // // // // //               <p className="text-gray-700 dark:text-gray-300 mb-1">
// // // // // //                 Price: <span className="text-blue-600 dark:text-blue-400">${car.price}</span>
// // // // // //               </p>
// // // // // //               <p className="text-gray-700 dark:text-gray-300 mb-1">
// // // // // //                 Location: {car.city}, {car.state} | Odometer: {car.odometer} km
// // // // // //               </p>
// // // // // //               <div className="flex flex-wrap gap-2 mt-2">
// // // // // //                 <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm">{car.transmission}</span>
// // // // // //                 <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm">{car.fuel_type}</span>
// // // // // //                 <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm">{car.condition}</span>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //             <a href={car.full_path} target="_blank" rel="noopener noreferrer"
// // // // // //               className="mt-4 w-full text-center px-4 py-2 bg-blue-600 dark:bg-black text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-gray-700 transition">
// // // // // //               See Details
// // // // // //             </a>
// // // // // //           </div>
// // // // // //         ))}
// // // // // //       </div>

// // // // // //       {totalPages > 1 && (
// // // // // //         <div className="flex justify-center mt-8 gap-2">
// // // // // //           <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50">
// // // // // //             Prev
// // // // // //           </button>
// // // // // //           {Array.from({ length: totalPages }, (_, i) => (
// // // // // //             <button key={i + 1} onClick={() => setPage(i + 1)} className={`px-4 py-2 rounded-lg ${page === i + 1 ? "bg-blue-600 dark:bg-blue-400 text-white" : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"}`}>
// // // // // //               {i + 1}
// // // // // //             </button>
// // // // // //           ))}
// // // // // //           <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50">
// // // // // //             Next
// // // // // //           </button>
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // }


// // // // // "use client";

// // // // // import { useState, useEffect, useRef, useCallback } from "react";
// // // // // import { useSearchParams } from "next/navigation";
// // // // // import CarFilters from "@/components/general/CarFilters";

// // // // // type Car = {
// // // // //   id: string;
// // // // //   title: string;
// // // // //   year: string;
// // // // //   make: string;
// // // // //   model: string;
// // // // //   price: number;
// // // // //   city: string;
// // // // //   state: string;
// // // // //   odometer: number;
// // // // //   transmission?: string;
// // // // //   fuel_type?: string;
// // // // //   condition?: string;
// // // // //   full_path: string;
// // // // // };

// // // // // type Filters = {
// // // // //   state?: string;
// // // // //   make?: string;
// // // // //   model?: string;
// // // // //   city?: string;
// // // // //   bodyType?: string;
// // // // //   minPrice?: string;
// // // // //   maxPrice?: string;
// // // // //   ai?: string;
// // // // // };

// // // // // export default function ResultsPage() {
// // // // //   const searchParams = useSearchParams();

// // // // //   const [filters, setFilters] = useState<Filters>({
// // // // //     state: searchParams.get("state") || "",
// // // // //     make: searchParams.get("make") || "",
// // // // //     model: searchParams.get("model") || "",
// // // // //     city: searchParams.get("city") || "",
// // // // //     bodyType: searchParams.get("bodyType") || "",
// // // // //     minPrice: searchParams.get("minPrice") || "",
// // // // //     maxPrice: searchParams.get("maxPrice") || "",
// // // // //     ai: searchParams.get("ai") || "",
// // // // //   });

// // // // //   const [cars, setCars] = useState<Car[]>([]);
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [nextCursor, setNextCursor] = useState<string | null>(null);
// // // // //   const [hasMore, setHasMore] = useState(true);

// // // // //   const observer = useRef<IntersectionObserver | null>(null);
// // // // //   const lastCarRef = useCallback(
// // // // //     (node: HTMLDivElement | null) => {
// // // // //       if (loading) return;
// // // // //       if (observer.current) observer.current.disconnect();

// // // // //       observer.current = new IntersectionObserver((entries) => {
// // // // //         if (entries[0].isIntersecting && hasMore) {
// // // // //           fetchCars(filters, nextCursor);
// // // // //         }
// // // // //       });

// // // // //       if (node) observer.current.observe(node);
// // // // //     },
// // // // //     [loading, hasMore, filters, nextCursor]
// // // // //   );

// // // // //   const fetchCars = async (appliedFilters: Filters = {}, cursor: string | null = null) => {
// // // // //     setLoading(true);

// // // // //     const params = new URLSearchParams(
// // // // //       Object.fromEntries(Object.entries(appliedFilters).filter(([_, v]) => v))
// // // // //     );
// // // // //     if (cursor) params.append("cursor", cursor);

// // // // //     const res = await fetch(`/api/cars?${params.toString()}`);
// // // // //     const data = await res.json();

// // // // //     if (data.cars.length === 0) {
// // // // //       setHasMore(false);
// // // // //     } else {
// // // // //       setCars((prev) => [...prev, ...data.cars]);
// // // // //       setNextCursor(data.nextCursor || null);
// // // // //       setHasMore(!!data.nextCursor);
// // // // //     }

// // // // //     setLoading(false);
// // // // //   };

// // // // //   // When filters change → reset list
// // // // //   useEffect(() => {
// // // // //     setCars([]);
// // // // //     setNextCursor(null);
// // // // //     setHasMore(true);
// // // // //     fetchCars(filters, null);
// // // // //   }, [filters]);

// // // // //   const handleFilter = (newFilters: Filters) => {
// // // // //     setFilters(newFilters);
// // // // //   };

// // // // //   return (
// // // // //     <div className="p-8 font-sans bg-gray-50 dark:bg-gray-900 min-h-screen">
// // // // //       {/* Top Filter Component */}
// // // // //       <CarFilters onFilter={handleFilter} initialFilters={filters} />

// // // // //       {/* Cars Grid */}
// // // // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
// // // // //         {cars.length === 0 && !loading && (
// // // // //           <p className="text-gray-700 dark:text-gray-300 text-center col-span-full">
// // // // //             No cars found.
// // // // //           </p>
// // // // //         )}

// // // // //         {cars.map((car, idx) => {
// // // // //           const isLast = idx === cars.length - 1;
// // // // //           return (
// // // // //             <div
// // // // //               key={car.id}
// // // // //               ref={isLast ? lastCarRef : null}
// // // // //               className="bg-white dark:bg-gray-800 border border-blue-100 dark:border-blue-700 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition p-6 flex flex-col justify-between"
// // // // //             >
// // // // //               <div>
// // // // //                 <h2 className="text-2xl font-bold mb-2 text-blue-800 dark:text-blue-300">
// // // // //                   {car.title}
// // // // //                 </h2>
// // // // //                 <p className="text-gray-700 dark:text-gray-300 mb-1">
// // // // //                   {car.year} {car.make} {car.model}
// // // // //                 </p>
// // // // //                 <p className="text-gray-700 dark:text-gray-300 mb-1">
// // // // //                   Price:{" "}
// // // // //                   <span className="text-blue-600 dark:text-blue-400">
// // // // //                     ${car.price}
// // // // //                   </span>
// // // // //                 </p>
// // // // //                 <p className="text-gray-700 dark:text-gray-300 mb-1">
// // // // //                   Location: {car.city}, {car.state} | Odometer: {car.odometer} km
// // // // //                 </p>
// // // // //                 <div className="flex flex-wrap gap-2 mt-2">
// // // // //                   {car.transmission && (
// // // // //                     <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm">
// // // // //                       {car.transmission}
// // // // //                     </span>
// // // // //                   )}
// // // // //                   {car.fuel_type && (
// // // // //                     <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm">
// // // // //                       {car.fuel_type}
// // // // //                     </span>
// // // // //                   )}
// // // // //                   {car.condition && (
// // // // //                     <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm">
// // // // //                       {car.condition}
// // // // //                     </span>
// // // // //                   )}
// // // // //                 </div>
// // // // //               </div>
// // // // //               <a
// // // // //                 href={car.full_path}
// // // // //                 target="_blank"
// // // // //                 rel="noopener noreferrer"
// // // // //                 className="mt-4 w-full text-center px-4 py-2 bg-blue-600 dark:bg-black text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-gray-700 transition"
// // // // //               >
// // // // //                 See Details
// // // // //               </a>
// // // // //             </div>
// // // // //           );
// // // // //         })}
// // // // //       </div>

// // // // //       {/* Loading Indicator */}
// // // // //       {loading && (
// // // // //         <div className="flex justify-center mt-6">
// // // // //           <p className="text-gray-600 dark:text-gray-300">Loading more cars…</p>
// // // // //         </div>
// // // // //       )}

// // // // //       {/* No More Results */}
// // // // //       {!hasMore && !loading && cars.length > 0 && (
// // // // //         <p className="text-center mt-6 text-gray-500 dark:text-gray-400">
// // // // //           You’ve reached the end of results.
// // // // //         </p>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }


// // // // "use client";

// // // // import { useState, useEffect, useRef } from "react";
// // // // import CarFilters, { Filters } from "@/components/general/CarFilters";
// // // // import { motion, AnimatePresence } from "framer-motion";

// // // // type Car = {
// // // //   id: number;
// // // //   title: string;
// // // //   make: string;
// // // //   model: string;
// // // //   year: number;
// // // //   price: number;
// // // //   city: string;
// // // //   state: string;
// // // //   odometer: number;
// // // //   transmission: string;
// // // //   fuel_type: string;
// // // //   condition: string;
// // // //   full_path: string;
// // // // };

// // // // export default function ResultsPage() {
// // // //   const [filters, setFilters] = useState<Filters>({});
// // // //   const [cars, setCars] = useState<Car[]>([]);
// // // //   const [nextCursor, setNextCursor] = useState<number | null>(null);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [initialLoading, setInitialLoading] = useState(true);

// // // //   const isFetchingRef = useRef(false);

// // // //   const fetchCars = async (cursor?: number) => {
// // // //     if (isFetchingRef.current) return;
// // // //     isFetchingRef.current = true;
// // // //     setLoading(true);

// // // //     const query = new URLSearchParams({
// // // //       ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v)),
// // // //       limit: "12",
// // // //     });
// // // //     if (cursor) query.append("cursor", cursor.toString());

// // // //     try {
// // // //       const res = await fetch(`/api/cars?${query.toString()}`);
// // // //       const data = await res.json();
// // // //       setCars((prev) => (cursor ? [...prev, ...data.cars] : data.cars));
// // // //       setNextCursor(data.nextCursor);
// // // //     } catch (error) {
// // // //       console.error("Failed to fetch cars", error);
// // // //     } finally {
// // // //       setLoading(false);
// // // //       setInitialLoading(false);
// // // //       isFetchingRef.current = false;
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchCars();
// // // //   }, [filters]);

// // // //   const handleFilter = (newFilters: Filters) => {
// // // //     setFilters(newFilters);
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 lg:p-8">
// // // //       {/* Horizontal Filter Bar */}
// // // //       <div className="overflow-x-auto">
// // // //         <div className="inline-flex gap-4">
// // // //           <CarFilters onFilter={handleFilter} initialFilters={filters} />
// // // //         </div>
// // // //       </div>

// // // //       {/* Results Grid */}
// // // //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
// // // //         {/* Skeleton loader */}
// // // //         {initialLoading &&
// // // //           Array.from({ length: 12 }).map((_, idx) => (
// // // //             <div
// // // //               key={idx}
// // // //               className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl h-48 w-full"
// // // //             ></div>
// // // //           ))}

// // // //         {/* Car Cards */}
// // // //         <AnimatePresence>
// // // //           {cars.map((car) => (
// // // //             <motion.div
// // // //               key={car.id}
// // // //               initial={{ opacity: 0, y: 10 }}
// // // //               animate={{ opacity: 1, y: 0 }}
// // // //               exit={{ opacity: 0 }}
// // // //               layout
// // // //               className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 p-4 flex flex-col gap-2"
// // // //             >
// // // //               <h2 className="font-bold text-lg text-gray-900 dark:text-gray-100">
// // // //                 {car.title}
// // // //               </h2>
// // // //               <p className="text-gray-500 dark:text-gray-400 text-sm">
// // // //                 {car.year} • {car.make} • {car.model}
// // // //               </p>
// // // //               <p className="text-red-600 dark:text-red-400 font-semibold text-lg">
// // // //                 ${car.price.toLocaleString()}
// // // //               </p>
// // // //               <p className="text-gray-600 dark:text-gray-300 text-sm">
// // // //                 {car.city}, {car.state} | {car.odometer.toLocaleString()} km
// // // //               </p>

// // // //               {/* Badges */}
// // // //               <div className="flex flex-wrap gap-1 mt-1">
// // // //                 <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs">
// // // //                   {car.transmission}
// // // //                 </span>
// // // //                 <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs">
// // // //                   {car.fuel_type}
// // // //                 </span>
// // // //                 <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-full text-xs">
// // // //                   {car.condition}
// // // //                 </span>
// // // //               </div>

// // // //               <a
// // // //                 href={car.full_path}
// // // //                 target="_blank"
// // // //                 rel="noopener noreferrer"
// // // //                 className="mt-2 text-center px-4 py-2 bg-red-500 dark:bg-red-600 text-white rounded-lg font-medium hover:bg-red-600 dark:hover:bg-red-700 transition"
// // // //               >
// // // //                 See Details
// // // //               </a>
// // // //             </motion.div>
// // // //           ))}
// // // //         </AnimatePresence>

// // // //         {/* No results */}
// // // //         {!initialLoading && cars.length === 0 && (
// // // //           <p className="text-gray-700 dark:text-gray-300 text-center col-span-full">
// // // //             No cars found.
// // // //           </p>
// // // //         )}
// // // //       </div>

// // // //       {/* Load More Button */}
// // // //       {nextCursor && !loading && (
// // // //         <div className="flex justify-center mt-8">
// // // //           <button
// // // //             className="px-6 py-2 bg-red-500 dark:bg-red-600 text-white rounded-lg font-medium hover:bg-red-600 dark:hover:bg-red-700 transition"
// // // //             onClick={() => fetchCars(nextCursor)}
// // // //           >
// // // //             Load More
// // // //           </button>
// // // //         </div>
// // // //       )}

// // // //       {loading && !initialLoading && (
// // // //         <div className="flex justify-center mt-8 text-gray-700 dark:text-gray-300">
// // // //           Loading...
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // "use client";

// // // import { useState, useEffect, useRef } from "react";
// // // import CarFilters, { Filters } from "@/components/general/CarFilters";
// // // import { motion, AnimatePresence } from "framer-motion";

// // // type Car = {
// // //   id: number;
// // //   title: string;
// // //   make: string;
// // //   model: string;
// // //   year: number;
// // //   price: number;
// // //   city: string;
// // //   state: string;
// // //   odometer: number;
// // //   transmission: string;
// // //   fuel_type: string;
// // //   condition: string;
// // //   full_path: string;
// // // };

// // // export default function ResultsPage() {
// // //   const [filters, setFilters] = useState<Filters>({});
// // //   const [cars, setCars] = useState<Car[]>([]);
// // //   const [nextCursor, setNextCursor] = useState<number | null>(null);
// // //   const [loading, setLoading] = useState(false);
// // //   const [initialLoading, setInitialLoading] = useState(true);

// // //   const isFetchingRef = useRef(false);

// // //   const fetchCars = async (cursor?: number) => {
// // //     if (isFetchingRef.current) return;
// // //     isFetchingRef.current = true;
// // //     setLoading(true);

// // //     const query = new URLSearchParams({
// // //       ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v)),
// // //       limit: "12",
// // //     });
// // //     if (cursor) query.append("cursor", cursor.toString());

// // //     try {
// // //       const res = await fetch(`/api/cars?${query.toString()}`);
// // //       const data = await res.json();
// // //       setCars((prev) => (cursor ? [...prev, ...data.cars] : data.cars));
// // //       setNextCursor(data.nextCursor);
// // //     } catch (error) {
// // //       console.error("Failed to fetch cars", error);
// // //     } finally {
// // //       setLoading(false);
// // //       setInitialLoading(false);
// // //       isFetchingRef.current = false;
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchCars();
// // //   }, [filters]);

// // //   const handleFilter = (newFilters: Filters) => {
// // //     setFilters(newFilters);
// // //     setNextCursor(null); // reset pagination when filters change
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 lg:p-8">
// // //       {/* Horizontal Filter Bar */}
// // //       <div className="overflow-x-auto">
// // //         <div className="inline-flex gap-4">
// // //           <CarFilters onFilter={handleFilter} initialFilters={filters} />
// // //         </div>
// // //       </div>

// // //       {/* Results Grid */}
// // //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
// // //         {/* Skeleton loader */}
// // //         {initialLoading &&
// // //           Array.from({ length: 12 }).map((_, idx) => (
// // //             <div
// // //               key={idx}
// // //               className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl h-48 w-full"
// // //             ></div>
// // //           ))}

// // //         {/* Car Cards */}
// // //         <AnimatePresence>
// // //           {cars.map((car) => (
// // //             <motion.div
// // //               key={car.id}
// // //               initial={{ opacity: 0, y: 10 }}
// // //               animate={{ opacity: 1, y: 0 }}
// // //               exit={{ opacity: 0 }}
// // //               layout
// // //               className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 p-4 flex flex-col gap-2"
// // //             >
// // //               <h2 className="font-bold text-lg text-gray-900 dark:text-gray-100">
// // //                 {car.title}
// // //               </h2>
// // //               <p className="text-gray-500 dark:text-gray-400 text-sm">
// // //                 {car.year} • {car.make} • {car.model}
// // //               </p>
// // //               <p className="text-red-600 dark:text-red-400 font-semibold text-lg">
// // //                 ${car.price.toLocaleString()}
// // //               </p>
// // //               <p className="text-gray-600 dark:text-gray-300 text-sm">
// // //                 {car.city}, {car.state} | {car.odometer.toLocaleString()} km
// // //               </p>

// // //               {/* Badges */}
// // //               <div className="flex flex-wrap gap-1 mt-1">
// // //                 <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs">
// // //                   {car.transmission}
// // //                 </span>
// // //                 <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs">
// // //                   {car.fuel_type}
// // //                 </span>
// // //                 <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-full text-xs">
// // //                   {car.condition}
// // //                 </span>
// // //               </div>

// // //               <a
// // //                 href={car.full_path}
// // //                 target="_blank"
// // //                 rel="noopener noreferrer"
// // //                 className="mt-2 text-center px-4 py-2 bg-red-500 dark:bg-red-600 text-white rounded-lg font-medium hover:bg-red-600 dark:hover:bg-red-700 transition"
// // //               >
// // //                 See Details
// // //               </a>
// // //             </motion.div>
// // //           ))}
// // //         </AnimatePresence>

// // //         {/* No results */}
// // //         {!initialLoading && cars.length === 0 && (
// // //           <p className="text-gray-700 dark:text-gray-300 text-center col-span-full">
// // //             No cars found.
// // //           </p>
// // //         )}
// // //       </div>

// // //       {/* Load More Button */}
// // //       {nextCursor && !loading && (
// // //         <div className="flex justify-center mt-8">
// // //           <button
// // //             className="px-6 py-2 bg-red-500 dark:bg-red-600 text-white rounded-lg font-medium hover:bg-red-600 dark:hover:bg-red-700 transition"
// // //             onClick={() => fetchCars(nextCursor)}
// // //           >
// // //             Load More
// // //           </button>
// // //         </div>
// // //       )}

// // //       {loading && !initialLoading && (
// // //         <div className="flex justify-center mt-8 text-gray-700 dark:text-gray-300">
// // //           Loading...
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // "use client";

// // import { useState, useEffect, useRef } from "react";
// // import CarFilters, { Filters } from "@/components/general/CarFilters";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { useSearchParams } from "next/navigation";

// // type Car = {
// //   id: number;
// //   title: string;
// //   make: string;
// //   model: string;
// //   year: number;
// //   price: number;
// //   city: string;
// //   state: string;
// //   odometer: number;
// //   transmission: string;
// //   fuel_type: string;
// //   condition: string;
// //   full_path: string;
// // };

// // export default function ResultsPage() {
// //   const searchParams = useSearchParams();

// //   const [filters, setFilters] = useState<Filters>({});
// //   const [cars, setCars] = useState<Car[]>([]);
// //   const [nextCursor, setNextCursor] = useState<number | null>(null);
// //   const [loading, setLoading] = useState(false);
// //   const [initialLoading, setInitialLoading] = useState(true);

// //   const isFetchingRef = useRef(false);

// //   // Initialize filters from URL query
// //   useEffect(() => {
// //     const urlFilters: Filters = {
// //       make: searchParams.get("make") || "",
// //       model: searchParams.get("model") || "",
// //       minPrice: searchParams.get("minPrice") || "",
// //       maxPrice: searchParams.get("maxPrice") || "",
// //       city: searchParams.get("city") || "",
// //       bodyType: searchParams.get("bodyType") || "",
// //     };
// //     setFilters(urlFilters);
// //   }, [searchParams]);

// //   const fetchCars = async (cursor?: number) => {
// //     if (isFetchingRef.current) return;
// //     isFetchingRef.current = true;
// //     setLoading(true);

// //     const query = new URLSearchParams({
// //       ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v)),
// //       limit: "12",
// //     });

// //     if (cursor) query.append("cursor", cursor.toString());

// //     try {
// //       const res = await fetch(`/api/cars?${query.toString()}`);
// //       const data = await res.json();
// //       setCars((prev) => (cursor ? [...prev, ...data.cars] : data.cars));
// //       setNextCursor(data.nextCursor);
// //     } catch (error) {
// //       console.error("Failed to fetch cars", error);
// //     } finally {
// //       setLoading(false);
// //       setInitialLoading(false);
// //       isFetchingRef.current = false;
// //     }
// //   };

// //   // Fetch cars whenever filters change
// //   useEffect(() => {
// //     fetchCars();
// //   }, [filters]);

// //   const handleFilter = (newFilters: Filters) => {
// //     setFilters(newFilters);
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 lg:p-8">
// //       {/* Horizontal Filter Bar */}
// //       <div className="overflow-x-auto">
// //         <div className="inline-flex gap-4">
// //           <CarFilters onFilter={handleFilter} initialFilters={filters} />
// //         </div>
// //       </div>

// //       {/* Results Grid */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
// //         {/* Skeleton loader */}
// //         {initialLoading &&
// //           Array.from({ length: 12 }).map((_, idx) => (
// //             <div
// //               key={idx}
// //               className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl h-48 w-full"
// //             ></div>
// //           ))}

// //         {/* Car Cards */}
// //         <AnimatePresence>
// //           {cars.map((car) => (
// //             <motion.div
// //               key={car.id}
// //               initial={{ opacity: 0, y: 10 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               exit={{ opacity: 0 }}
// //               layout
// //               className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 p-4 flex flex-col gap-2"
// //             >
// //               <h2 className="font-bold text-lg text-gray-900 dark:text-gray-100">
// //                 {car.title}
// //               </h2>
// //               <p className="text-gray-500 dark:text-gray-400 text-sm">
// //                 {car.year} • {car.make} • {car.model}
// //               </p>
// //               <p className="text-red-600 dark:text-red-400 font-semibold text-lg">
// //                 ${car.price.toLocaleString()}
// //               </p>
// //               <p className="text-gray-600 dark:text-gray-300 text-sm">
// //                 {car.city}, {car.state} | {car.odometer.toLocaleString()} km
// //               </p>

// //               {/* Badges */}
// //               <div className="flex flex-wrap gap-1 mt-1">
// //                 <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs">
// //                   {car.transmission}
// //                 </span>
// //                 <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs">
// //                   {car.fuel_type}
// //                 </span>
// //                 <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-full text-xs">
// //                   {car.condition}
// //                 </span>
// //               </div>

// //               <a
// //                 href={car.full_path}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 className="mt-2 text-center px-4 py-2 bg-red-500 dark:bg-red-600 text-white rounded-lg font-medium hover:bg-red-600 dark:hover:bg-red-700 transition"
// //               >
// //                 See Details
// //               </a>
// //             </motion.div>
// //           ))}
// //         </AnimatePresence>

// //         {/* No results */}
// //         {!initialLoading && cars.length === 0 && (
// //           <p className="text-gray-700 dark:text-gray-300 text-center col-span-full">
// //             No cars found.
// //           </p>
// //         )}
// //       </div>

// //       {/* Load More Button */}
// //       {nextCursor && !loading && (
// //         <div className="flex justify-center mt-8">
// //           <button
// //             className="px-6 py-2 bg-red-500 dark:bg-red-600 text-white rounded-lg font-medium hover:bg-red-600 dark:hover:bg-red-700 transition"
// //             onClick={() => fetchCars(nextCursor)}
// //           >
// //             Load More
// //           </button>
// //         </div>
// //       )}

// //       {loading && !initialLoading && (
// //         <div className="flex justify-center mt-8 text-gray-700 dark:text-gray-300">
// //           Loading...
// //         </div>
// //       )}
// //     </div>
// //   );
// // }


// "use client";

// import { useState, useEffect, useRef } from "react";
// import CarFilters, { Filters } from "@/components/general/CarFilters";
// import { motion, AnimatePresence } from "framer-motion";
// import { useSearchParams } from "next/navigation";

// type Car = {
//   id: number;
//   title: string;
//   make: string;
//   model: string;
//   year: number;
//   price: number;
//   city: string;
//   state: string;
//   odometer: number;
//   transmission: string;
//   fuel_type: string;
//   condition: string;
//   full_path: string;
// };

// export default function ResultsPage() {
//   const searchParams = useSearchParams();
//   const isFetchingRef = useRef(false);

//   // Initialize filters from URL query params
//   const initialFilters: Filters = {
//     make: searchParams.get("make") || "",
//     model: searchParams.get("model") || "",
//     minPrice: searchParams.get("minPrice") || "",
//     maxPrice: searchParams.get("maxPrice") || "",
//     city: searchParams.get("city") || "",
//     bodyType: searchParams.get("bodyType") || "",
//   };

//   const [filters, setFilters] = useState<Filters>(initialFilters);
//   const [cars, setCars] = useState<Car[]>([]);
//   const [nextCursor, setNextCursor] = useState<number | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(true);

//   // Fetch cars function
//   const fetchCars = async (cursor?: number) => {
//     if (isFetchingRef.current) return;
//     isFetchingRef.current = true;
//     setLoading(true);

//     const query = new URLSearchParams({
//       ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v)),
//       limit: "12",
//     });
//     if (cursor) query.append("cursor", cursor.toString());

//     try {
//       const res = await fetch(`/api/cars?${query.toString()}`);
//       const data = await res.json();
//       setCars((prev) => (cursor ? [...prev, ...data.cars] : data.cars));
//       setNextCursor(data.nextCursor);
//     } catch (error) {
//       console.error("Failed to fetch cars", error);
//     } finally {
//       setLoading(false);
//       setInitialLoading(false);
//       isFetchingRef.current = false;
//     }
//   };

//   // Fetch on first render
//   useEffect(() => {
//     fetchCars();
//   }, []);

//   // Fetch when filters change
//   useEffect(() => {
//     fetchCars();
//   }, [filters]);

//   // Update filters if URL query changes manually
//   useEffect(() => {
//     const urlFilters: Filters = {
//       make: searchParams.get("make") || "",
//       model: searchParams.get("model") || "",
//       minPrice: searchParams.get("minPrice") || "",
//       maxPrice: searchParams.get("maxPrice") || "",
//       city: searchParams.get("city") || "",
//       bodyType: searchParams.get("bodyType") || "",
//     };
//     setFilters(urlFilters);
//   }, [searchParams]);

//   const handleFilter = (newFilters: Filters) => {
//     setFilters(newFilters);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 lg:p-8">
//       {/* Horizontal Filter Bar */}
//       <div className="overflow-x-auto">
//         <div className="inline-flex gap-4">
//           <CarFilters onFilter={handleFilter} initialFilters={filters} />
//         </div>
//       </div>

//       {/* Results Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
//         {/* Skeleton loader */}
//         {initialLoading &&
//           Array.from({ length: 12 }).map((_, idx) => (
//             <div
//               key={idx}
//               className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl h-48 w-full"
//             ></div>
//           ))}

//         {/* Car Cards */}
//         <AnimatePresence>
//           {cars.map((car) => (
//             <motion.div
//               key={car.id}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0 }}
//               layout
//               className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 p-4 flex flex-col gap-2"
//             >
//               <h2 className="font-bold text-lg text-gray-900 dark:text-gray-100">
//                 {car.title}
//               </h2>
//               <p className="text-gray-500 dark:text-gray-400 text-sm">
//                 {car.year} • {car.make} • {car.model}
//               </p>
//               <p className="text-red-600 dark:text-red-400 font-semibold text-lg">
//                 ${car.price.toLocaleString()}
//               </p>
//               <p className="text-gray-600 dark:text-gray-300 text-sm">
//                 {car.city}, {car.state} | {car.odometer.toLocaleString()} km
//               </p>

//               {/* Badges */}
//               <div className="flex flex-wrap gap-1 mt-1">
//                 <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs">
//                   {car.transmission}
//                 </span>
//                 <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs">
//                   {car.fuel_type}
//                 </span>
//                 <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-full text-xs">
//                   {car.condition}
//                 </span>
//               </div>

//               <a
//                 href={car.full_path}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="mt-2 text-center px-4 py-2 bg-red-500 dark:bg-red-600 text-white rounded-lg font-medium hover:bg-red-600 dark:hover:bg-red-700 transition"
//               >
//                 See Details
//               </a>
//             </motion.div>
//           ))}
//         </AnimatePresence>

//         {/* No results */}
//         {!initialLoading && cars.length === 0 && (
//           <p className="text-gray-700 dark:text-gray-300 text-center col-span-full">
//             No cars found.
//           </p>
//         )}
//       </div>

//       {/* Load More Button */}
//       {nextCursor && !loading && (
//         <div className="flex justify-center mt-8">
//           <button
//             className="px-6 py-2 bg-red-500 dark:bg-red-600 text-white rounded-lg font-medium hover:bg-red-600 dark:hover:bg-red-700 transition"
//             onClick={() => fetchCars(nextCursor)}
//           >
//             Load More
//           </button>
//         </div>
//       )}

//       {loading && !initialLoading && (
//         <div className="flex justify-center mt-8 text-gray-700 dark:text-gray-300">
//           Loading...
//         </div>
//       )}
//     </div>
//   );
// }


// src\app\(mainLayout)\results\ResultsPage.tsx

// "use client";

// import { useState, useEffect, useRef } from "react";
// import CarFilters, { Filters } from "@/components/general/CarFilters";
// import { motion, AnimatePresence } from "framer-motion";
// import { useSearchParams } from "next/navigation";

// type Car = {
//   id: number;
//   title: string;
//   make: string;
//   model: string;
//   year: number;
//   price: number;
//   city: string;
//   state: string;
//   odometer: number;
//   transmission: string;
//   fuel_type: string;
//   condition: string;
//   full_path: string;
// };

// export default function ResultsPage() {
//   const searchParams = useSearchParams();
//   const isFetchingRef = useRef(false);

//   // Initialize filters from URL query params
//   const initialFilters: Filters = {
//     make: searchParams.get("make") || "",
//     model: searchParams.get("model") || "",
//     minPrice: searchParams.get("minPrice") || "",
//     maxPrice: searchParams.get("maxPrice") || "",
//     city: searchParams.get("city") || "",
//     bodyType: searchParams.get("bodyType") || "",
//   };

//   const [filters, setFilters] = useState<Filters>(initialFilters);
//   const [cars, setCars] = useState<Car[]>([]);
//   const [nextCursor, setNextCursor] = useState<number | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(true);

//   // Fetch cars function
//   const fetchCars = async (cursor?: number) => {
//     if (isFetchingRef.current) return;
//     isFetchingRef.current = true;
//     setLoading(true);

//     const query = new URLSearchParams({
//       ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v)),
//       limit: "12",
//     });
//     if (cursor) query.append("cursor", cursor.toString());

//     try {
//       const res = await fetch(`/api/cars?${query.toString()}`);
//       const data = await res.json();
//       setCars((prev) => (cursor ? [...prev, ...data.cars] : data.cars));
//       setNextCursor(data.nextCursor);
//     } catch (error) {
//       console.error("Failed to fetch cars", error);
//     } finally {
//       setLoading(false);
//       setInitialLoading(false);
//       isFetchingRef.current = false;
//     }
//   };

//   // Fetch on first render
//   useEffect(() => {
//     fetchCars();
//   }, []);

//   // Fetch when filters change
//   useEffect(() => {
//     fetchCars();
//   }, [filters]);

//   // Update filters if URL query changes manually
//   useEffect(() => {
//     const urlFilters: Filters = {
//       make: searchParams.get("make") || "",
//       model: searchParams.get("model") || "",
//       minPrice: searchParams.get("minPrice") || "",
//       maxPrice: searchParams.get("maxPrice") || "",
//       city: searchParams.get("city") || "",
//       bodyType: searchParams.get("bodyType") || "",
//     };
//     setFilters(urlFilters);
//   }, [searchParams]);

//   const handleFilter = (newFilters: Filters) => {
//     setFilters(newFilters);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 lg:p-8">
//       {/* Horizontal Filter Bar */}
//       <div className="overflow-x-auto">
//         <div className="inline-flex gap-4">
//           <CarFilters onFilter={handleFilter} initialFilters={filters} />
//         </div>
//       </div>

//       {/* Results Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
//         {/* Skeleton loader */}
//         {initialLoading &&
//           Array.from({ length: 12 }).map((_, idx) => (
//             <div
//               key={idx}
//               className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl h-48 w-full"
//             ></div>
//           ))}

//         {/* Car Cards */}
//         <AnimatePresence>
//           {cars.map((car) => (
//             <motion.div
//               key={car.id}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0 }}
//               layout
//               className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 p-4 flex flex-col gap-2"
//             >
//               <h2 className="font-bold text-lg text-gray-900 dark:text-gray-100">
//                 {car.title}
//               </h2>
//               <p className="text-gray-500 dark:text-gray-400 text-sm">
//                 {car.year} • {car.make} • {car.model}
//               </p>
//               <p className="text-red-600 dark:text-red-400 font-semibold text-lg">
//                 ${car.price.toLocaleString()}
//               </p>
//               <p className="text-gray-600 dark:text-gray-300 text-sm">
//                 {car.city}, {car.state} | {car.odometer.toLocaleString()} km
//               </p>

//               {/* Badges */}
//               <div className="flex flex-wrap gap-1 mt-1">
//                 <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs">
//                   {car.transmission}
//                 </span>
//                 <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs">
//                   {car.fuel_type}
//                 </span>
//                 <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-full text-xs">
//                   {car.condition}
//                 </span>
//               </div>

//               <a
//                 href={car.full_path}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="mt-2 text-center px-4 py-2 bg-red-500 dark:bg-red-600 text-white rounded-lg font-medium hover:bg-red-600 dark:hover:bg-red-700 transition"
//               >
//                 See Details
//               </a>
//             </motion.div>
//           ))}
//         </AnimatePresence>

//         {/* No results */}
//         {!initialLoading && cars.length === 0 && (
//           <p className="text-gray-700 dark:text-gray-300 text-center col-span-full">
//             No cars found.
//           </p>
//         )}
//       </div>

//       {/* Load More Button */}
//       {nextCursor && !loading && (
//         <div className="flex justify-center mt-8">
//           <button
//             className="px-6 py-2 bg-red-500 dark:bg-red-600 text-white rounded-lg font-medium hover:bg-red-600 dark:hover:bg-red-700 transition"
//             onClick={() => fetchCars(nextCursor)}
//           >
//             Load More
//           </button>
//         </div>
//       )}

//       {loading && !initialLoading && (
//         <div className="flex justify-center mt-8 text-gray-700 dark:text-gray-300">
//           Loading...
//         </div>
//       )}
//     </div>
//   );
// }
