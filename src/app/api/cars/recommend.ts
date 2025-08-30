import { prisma } from "@/app/utils/db";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const make = url.searchParams.get("make") || "";
  const model = url.searchParams.get("model") || "";

  const cars = await prisma.car.findMany({
    where: {
      make,
      model,
    },
    take: 4,
  });

  return new Response(JSON.stringify({ cars }));
}
