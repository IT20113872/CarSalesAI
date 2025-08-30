import { prisma } from "@/app/utils/db";

export async function GET(req: Request) {
  const models = await prisma.car.findMany({
    distinct: ["model"],
    select: { model: true },
  });
  return new Response(JSON.stringify({ models: models.map((m) => m.model) }));
}
