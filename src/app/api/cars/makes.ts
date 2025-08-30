import { prisma } from "@/app/utils/db";

export async function GET(req: Request) {
  const makes = await prisma.car.findMany({
    distinct: ["make"],
    select: { make: true },
  });
  return new Response(JSON.stringify({ makes: makes.map((m) => m.make) }));
}
