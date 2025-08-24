import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") || "1");
  const limit = Number(searchParams.get("limit") || "12"); // default 12 cars per page
  const skip = (page - 1) * limit;

  const make = searchParams.get("make");
  const year = searchParams.get("year");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const city = searchParams.get("city");

  const [cars, total] = await Promise.all([
    prisma.car.findMany({
      where: {
        AND: [
          make ? { make: { contains: make, mode: "insensitive" } } : {},
          year ? { year: Number(year) } : {},
          minPrice ? { price: { gte: Number(minPrice) } } : {},
          maxPrice ? { price: { lte: Number(maxPrice) } } : {},
          city ? { city: { contains: city, mode: "insensitive" } } : {},
        ],
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.car.count({
      where: {
        AND: [
          make ? { make: { contains: make, mode: "insensitive" } } : {},
          year ? { year: Number(year) } : {},
          minPrice ? { price: { gte: Number(minPrice) } } : {},
          maxPrice ? { price: { lte: Number(maxPrice) } } : {},
          city ? { city: { contains: city, mode: "insensitive" } } : {},
        ],
      },
    }),
  ]);

  return NextResponse.json({ cars, total, page, limit });
}
