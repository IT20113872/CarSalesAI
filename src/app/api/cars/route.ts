import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const limit = Number(searchParams.get("limit") || "12");
    const cursorParam = searchParams.get("cursor");
    const cursor = cursorParam ? Number(cursorParam) : undefined;

    const state = searchParams.get("state");
    const make = searchParams.get("make");
    const model = searchParams.get("model");
    const city = searchParams.get("city");
    const bodyType = searchParams.get("bodyType");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    const filters: any = {};

    if (state && state !== "All") filters.state = { contains: state };
    if (make) filters.make = { contains: make };
    if (model) filters.model = { contains: model };
    if (city) filters.city = { contains: city };
    if (bodyType) filters.body = { contains: bodyType };
    if (minPrice) filters.price = { gte: Number(minPrice) };
    if (maxPrice) filters.price = filters.price ? { ...filters.price, lte: Number(maxPrice) } : { lte: Number(maxPrice) };

    // Get total count
    const totalCount = await prisma.car.count({ where: filters });

    const cars = await prisma.car.findMany({
      where: filters,
      orderBy: { id: "asc" },
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
    });

    let nextCursor: number | null = null;
    if (cars.length > limit) {
      const nextCar = cars.pop();
      nextCursor = Number(nextCar!.id);
    }

    return NextResponse.json({ cars, nextCursor, totalCount });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}


// import { NextResponse } from "next/server";
// import { prisma } from "@/app/utils/db";

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);

//     const limit = Number(searchParams.get("limit") || "12");
//     const cursorParam = searchParams.get("cursor");
//     const cursor = cursorParam ? Number(cursorParam) : undefined;

//     const state = searchParams.get("state");
//     const make = searchParams.get("make");
//     const model = searchParams.get("model");
//     const city = searchParams.get("city");
//     const bodyType = searchParams.get("bodyType");
//     const minPrice = searchParams.get("minPrice");
//     const maxPrice = searchParams.get("maxPrice");

//     const filters: any = {};

//     if (state && state !== "All") filters.state = { contains: state };
//     if (make) filters.make = { contains: make };
//     if (model) filters.model = { contains: model };
//     if (city) filters.city = { contains: city };
//     if (bodyType) filters.body = { contains: bodyType };
//     if (minPrice) filters.price = { gte: Number(minPrice) };
//     if (maxPrice) filters.price = filters.price ? { ...filters.price, lte: Number(maxPrice) } : { lte: Number(maxPrice) };

//     const cars = await prisma.car.findMany({
//       where: filters,
//       orderBy: { id: "asc" },
//       take: limit + 1,
//       cursor: cursor ? { id: cursor } : undefined,
//       skip: cursor ? 1 : 0,
//     });

//     let nextCursor: number | null = null;
//     if (cars.length > limit) {
//       const nextCar = cars.pop();
//       nextCursor = Number(nextCar!.id);
//     }

//     return NextResponse.json({ cars, nextCursor });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
//   }
// }


// import { NextResponse } from "next/server";
// import { prisma } from "@/app/utils/db";

// // Helper to safely serialize BigInt
// const safeJson = (obj: any) => {
//   return JSON.parse(
//     JSON.stringify(obj, (_key, value) =>
//       typeof value === "bigint" ? value.toString() : value
//     )
//   );
// };

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);

//     const limit = Number(searchParams.get("limit") || "12");
//     const cursorParam = searchParams.get("cursor");
//     const cursor = cursorParam ? Number(cursorParam) : undefined;

//     const state = searchParams.get("state");
//     const make = searchParams.get("make");
//     const model = searchParams.get("model");
//     const city = searchParams.get("city");
//     const bodyType = searchParams.get("bodyType");
//     const minPrice = searchParams.get("minPrice");
//     const maxPrice = searchParams.get("maxPrice");

//     // Build dynamic filters
//     const filters: any = {};

//     if (state && state !== "All") filters.display_state = { contains: state };
//     if (make) filters.make = { contains: make };
//     if (model) filters.model = { contains: model };
//     if (city) filters.display_city = { contains: city };
//     if (bodyType) filters.body = { contains: bodyType };
//     if (minPrice) filters.price = { gte: BigInt(minPrice) };
//     if (maxPrice)
//       filters.price = filters.price
//         ? { ...filters.price, lte: BigInt(maxPrice) }
//         : { lte: BigInt(maxPrice) };

//     // Fetch cars
//     const cars = await prisma.car.findMany({
//       where: filters,
//       orderBy: { id: "asc" },
//       take: limit + 1,
//       cursor: cursor ? { id: cursor } : undefined,
//       skip: cursor ? 1 : 0,
//     });

//     // Handle cursor for pagination
//     let nextCursor: number | null = null;
//     if (cars.length > limit) {
//       const nextCar = cars.pop();
//       nextCursor = Number(nextCar!.id);
//     }

//     return NextResponse.json(safeJson({ cars, nextCursor }));
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }




// import { NextResponse } from "next/server";
// import { prisma } from "@/app/utils/db";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);

//   const page = Number(searchParams.get("page") || "1");
//   const limit = Number(searchParams.get("limit") || "12"); // default 12 cars per page
//   const skip = (page - 1) * limit;

//   const make = searchParams.get("make");
//   const year = searchParams.get("year");
//   const minPrice = searchParams.get("minPrice");
//   const maxPrice = searchParams.get("maxPrice");
//   const city = searchParams.get("city");

//   const [cars, total] = await Promise.all([
//     prisma.car.findMany({
//       where: {
//         AND: [
//           make ? { make: { contains: make, mode: "insensitive" } } : {},
//           year ? { year: Number(year) } : {},
//           minPrice ? { price: { gte: Number(minPrice) } } : {},
//           maxPrice ? { price: { lte: Number(maxPrice) } } : {},
//           city ? { city: { contains: city, mode: "insensitive" } } : {},
//         ],
//       },
//       orderBy: { createdAt: "desc" },
//       skip,
//       take: limit,
//     }),
//     prisma.car.count({
//       where: {
//         AND: [
//           make ? { make: { contains: make, mode: "insensitive" } } : {},
//           year ? { year: Number(year) } : {},
//           minPrice ? { price: { gte: Number(minPrice) } } : {},
//           maxPrice ? { price: { lte: Number(maxPrice) } } : {},
//           city ? { city: { contains: city, mode: "insensitive" } } : {},
//         ],
//       },
//     }),
//   ]);

//   return NextResponse.json({ cars, total, page, limit });
// }
// import { NextResponse } from "next/server";
// import { prisma } from "@/app/utils/db";

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);

//     const limit = Number(searchParams.get("limit") || "12");
//     const cursorParam = searchParams.get("cursor"); // cursor from frontend
//     const cursor = cursorParam ? Number(cursorParam) : undefined; // convert to number

//     const state = searchParams.get("state");
//     const make = searchParams.get("make");
//     const model = searchParams.get("model");
//     const city = searchParams.get("city");
//     const bodyType = searchParams.get("bodyType");
//     const minPrice = searchParams.get("minPrice");
//     const maxPrice = searchParams.get("maxPrice");
//     const ai = searchParams.get("ai");

//     // Build dynamic filter
//     const filters: any = {};
//     if (state && state !== "All") filters.state = { equals: state };
//     if (make) filters.make = { contains: make, mode: "insensitive" };
//     if (model) filters.model = { contains: model, mode: "insensitive" };
//     if (city) filters.city = { contains: city, mode: "insensitive" };
//     if (bodyType) filters.bodyType = { contains: bodyType, mode: "insensitive" };
//     if (minPrice) filters.price = { gte: Number(minPrice) };
//     if (maxPrice) filters.price = { ...(filters.price || {}), lte: Number(maxPrice) };
//     if (ai) {
//       filters.OR = [
//         { make: { contains: ai, mode: "insensitive" } },
//         { model: { contains: ai, mode: "insensitive" } },
//         { city: { contains: ai, mode: "insensitive" } },
//         { bodyType: { contains: ai, mode: "insensitive" } },
//       ];
//     }

//     const cars = await prisma.car.findMany({
//       where: filters,
//       orderBy: { id: "asc" },
//       take: limit + 1,
//       cursor: cursor ? { id: cursor } : undefined,
//       skip: cursor ? 1 : 0,
//     });

//     let nextCursor: number | null = null;
//     if (cars.length > limit) {
//       const nextCar = cars.pop();
//       nextCursor = nextCar!.id;
//     }

//     return NextResponse.json({ cars, nextCursor });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
//   }
// }


// import { NextResponse } from "next/server";
// import { prisma } from "@/app/utils/db";

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);

//     const limit = Number(searchParams.get("limit") || "12");
//     const cursorParam = searchParams.get("cursor");
//     const cursor = cursorParam ? Number(cursorParam) : undefined;

//     const state = searchParams.get("state");
//     const make = searchParams.getAll("make");      // <-- array
//     const model = searchParams.getAll("model");    // <-- array
//     const city = searchParams.getAll("city");      // <-- array
//     const bodyType = searchParams.getAll("bodyType"); // <-- array
//     const minPrice = searchParams.get("minPrice");
//     const maxPrice = searchParams.get("maxPrice");
//     const ai = searchParams.get("ai");

//     // Build dynamic filters
//     const filters: any = {};

//     if (state && state !== "All") filters.state = { equals: state };
    
//     if (make.length) {
//       filters.OR = make.map((m) => ({ make: { contains: m, mode: "insensitive" } }));
//     }

//     if (model.length) {
//       filters.OR = [
//         ...(filters.OR || []),
//         ...model.map((m) => ({ model: { contains: m, mode: "insensitive" } })),
//       ];
//     }

//     if (city.length) {
//       filters.OR = [
//         ...(filters.OR || []),
//         ...city.map((c) => ({ city: { contains: c, mode: "insensitive" } })),
//       ];
//     }

//     if (bodyType.length) {
//       filters.OR = [
//         ...(filters.OR || []),
//         ...bodyType.map((b) => ({ bodyType: { contains: b, mode: "insensitive" } })),
//       ];
//     }

//     if (minPrice) filters.price = { gte: Number(minPrice) };
//     if (maxPrice) filters.price = { ...(filters.price || {}), lte: Number(maxPrice) };

//     if (ai) {
//       filters.OR = [
//         ...(filters.OR || []),
//         { make: { contains: ai, mode: "insensitive" } },
//         { model: { contains: ai, mode: "insensitive" } },
//         { city: { contains: ai, mode: "insensitive" } },
//         { bodyType: { contains: ai, mode: "insensitive" } },
//       ];
//     }

//     const cars = await prisma.car.findMany({
//       where: filters,
//       orderBy: { id: "asc" },
//       take: limit + 1,
//       cursor: cursor ? { id: cursor } : undefined,
//       skip: cursor ? 1 : 0,
//     });

//     let nextCursor: number | null = null;
//     if (cars.length > limit) {
//       const nextCar = cars.pop();
//       nextCursor = nextCar!.id;
//     }

//     return NextResponse.json({ cars, nextCursor });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
//   }
// }
// import { NextResponse } from "next/server";
// import { prisma } from "@/app/utils/db";

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);

//     const limit = Number(searchParams.get("limit") || "12");
//     const cursorParam = searchParams.get("cursor");
//     const cursor = cursorParam ? Number(cursorParam) : undefined;

//     const state = searchParams.getAll("state");
//     const make = searchParams.getAll("make");
//     const model = searchParams.getAll("model");
//     const city = searchParams.getAll("city");
//     const bodyType = searchParams.getAll("bodyType");
//     const minPrice = searchParams.get("minPrice");
//     const maxPrice = searchParams.get("maxPrice");
//     const ai = searchParams.get("ai");

//     const filters: any = {};

//     if (state.length && !state.includes("All")) filters.display_state = { in: state };

//     if (make.length) {
//       filters.OR = make.map((m) => ({ make: { contains: m, mode: "insensitive" } }));
//     }

//     if (model.length) {
//       filters.OR = [...(filters.OR || []), ...model.map((m) => ({ model: { contains: m, mode: "insensitive" } }))];
//     }

//     if (city.length) {
//       filters.OR = [...(filters.OR || []), ...city.map((c) => ({ display_city: { contains: c, mode: "insensitive" } }))];
//     }

//     if (bodyType.length) {
//       filters.OR = [...(filters.OR || []), ...bodyType.map((b) => ({ body: { contains: b, mode: "insensitive" } }))];
//     }

//     if (minPrice) filters.price = { gte: BigInt(minPrice) };
//     if (maxPrice) filters.price = { ...(filters.price || {}), lte: BigInt(maxPrice) };

//     if (ai) {
//       filters.OR = [
//         ...(filters.OR || []),
//         { make: { contains: ai, mode: "insensitive" } },
//         { model: { contains: ai, mode: "insensitive" } },
//         { display_city: { contains: ai, mode: "insensitive" } },
//         { body: { contains: ai, mode: "insensitive" } },
//       ];
//     }

//     const cars = await prisma.cars.findMany({
//       where: filters,
//       orderBy: { id: "asc" },
//       take: limit + 1,
//       cursor: cursor ? { id: BigInt(cursor) } : undefined,
//       skip: cursor ? 1 : 0,
//     });

//     let nextCursor: number | null = null;
//     if (cars.length > limit) {
//       const nextCar = cars.pop();
//       nextCursor = Number(nextCar!.id);
//     }

//     // Convert BigInt fields to string for JSON serialization
//     const serializedCars = cars.map((c) => ({
//       ...c,
//       id: c.id.toString(),
//       price: c.price?.toString() ?? null,
//       odometer: c.odometer?.toString() ?? null,
//     }));

//     return NextResponse.json({ cars: serializedCars, nextCursor });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
//   }
// }
