// Show all users
// Search users by email
// filter users - all, active, blocked
// load users gradually

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET(req: Request) {
  try {
    // 1️ Auth check
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // 2️ Parse query params
    const { searchParams } = new URL(req.url); // new URL(req.url) - turns the incoming request URL into a URL object, so we can easily access parts of it like pathname or searchParams.

    const search = searchParams.get("search") || ""; // gets the value of the search parameter in the URL.
    const status = searchParams.get("status") || "all"; // gets status param; defaults to "all".
    const limit = Number(searchParams.get("limit")) || 10; // ets limit param and converts it to a number; defaults to 10 if missing.
    const skip = Number(searchParams.get("skip")) || 0; // gets skip param, converts to number, defaults to 0.

    // 3️ Build query
    const query: any = {}; // empty object to store MongoDB query.

    if (search) {
      query.email = { $regex: search, $options: "i" }; // search emails containing the text, case-insensitive.
    }

    if (status === "active") {
      query.isBlocked = false;
    }

    if (status === "blocked") {
      query.isBlocked = true;
    }

    // 4️ Connect DB
    await connectDB();

    // 5️ Fetch users
    const users = await User.find(query) // get users matching the query we built.
      .select("_id email role isBlocked createdAt") // only return the fields we need.
      .sort({ createdAt: -1 }) // newest users first.
      .skip(skip) // skip N users (pagination).
      .limit(limit + 1); // fetch one extra to see if more pages exist.

    // 6️ Determine hasMore
    // Check if there’s another page.
    // If yes, remove the extra user (we only needed it to check).
    const hasMore = users.length > limit;
    if (hasMore) users.pop();

    // 7️ Return response
    return NextResponse.json({
      users,
      hasMore,
    });
  } catch (error) {
    console.error("Admin users error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
