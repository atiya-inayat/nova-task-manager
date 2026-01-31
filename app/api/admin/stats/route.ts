// 1. Get server session
// 2. if no session return 401
// 3. if role !== admin - return 403
// 4. connectdb
// 5. query users __ . total count, .active count(isBloked: false), . blocked count(isBlocked: true)
// 6. return json

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    connectDB();

    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isBlocked: false });
    const blockedUsers = await User.countDocuments({ isBlocked: true });

    return NextResponse.json({ totalUsers, activeUsers, blockedUsers });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      { message: "Internal server error (admin panel) " },
      { status: 500 },
    );
  }
}
