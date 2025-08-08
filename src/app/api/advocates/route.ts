import { sql } from "drizzle-orm";
import { and, ilike, or } from "drizzle-orm/expressions";
import db from "@/db";
import { advocates } from "@/db/schema";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  // Get search and pagination parameters
  const search = searchParams.get("search")?.toLowerCase() || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "9");
  const offset = (page - 1) * limit;

  // Build search conditions
  let whereConditions = undefined;
  if (search) {
    whereConditions = or(
      ilike(advocates.firstName, `%${search}%`),
      ilike(advocates.lastName, `%${search}%`),
      ilike(advocates.city, `%${search}%`),
      ilike(advocates.degree, `%${search}%`),
      sql`${advocates.specialties}::text ILIKE ${`%${search}%`}`,
      sql`${advocates.yearsOfExperience}::text LIKE ${`%${search}%`}`
    );
  }

  // Get total count for pagination
  const totalCountResult = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(advocates)
    .where(whereConditions);
  
  const totalCount = totalCountResult[0].count;
  const totalPages = Math.ceil(totalCount / limit);

  // Get paginated and filtered data
  const data = await db
    .select()
    .from(advocates)
    .where(whereConditions)
    .limit(limit)
    .offset(offset)
    .orderBy(advocates.id);

  return Response.json({
    data,
    pagination: {
      total: totalCount,
      totalPages,
      currentPage: page,
      limit,
      hasMore: page < totalPages
    }
  });
}
