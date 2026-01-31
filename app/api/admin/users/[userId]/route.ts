import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ userId: string }> },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // ✅ THIS IS THE IMPORTANT PART
    const { userId } = await context.params;
    console.log("User ID received:", userId);

    const { isBlocked } = await req.json();

    if (typeof isBlocked !== "boolean") {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findByIdAndUpdate(
      userId,
      { isBlocked },
      { new: true },
    );

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User updated",
      user: {
        _id: user._id,
        email: user.email,
        isBlocked: user.isBlocked,
      },
    });
  } catch (error) {
    console.error("Block user error", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
