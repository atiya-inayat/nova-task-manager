import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface RouteParams {
  params: {
    userId: string;
  };
}

export async function PATCH(req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { isBlocked } = await req.json();

    if (typeof isBlocked !== "boolean") {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findByIdAndUpdate(
      params.userId,
      { isBlocked },
      { new: true },
    );

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User updated",
      user: { _id: user._id, email: user.email, isBlocked: user.isBlocked },
    });
  } catch (error) {
    console.error("Block user error", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
