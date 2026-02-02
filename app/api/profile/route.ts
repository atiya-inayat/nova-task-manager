import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email }).select(
      "-password",
    );

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { image } = body;

    await connectDB();

    const updateUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { image },
      { new: true },
    ).select("-password");

    return NextResponse.json(updateUser);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update profile" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { password } = await req.json();

    connectDB();

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // prevent last admin deletion
    if (session.user.role === "admin") {
      const adminCount = await User.countDocuments({ role: "admin" });
      if (adminCount === 1) {
        return NextResponse.json(
          { message: "Cannot delete the only admin account" },
          { status: 403 },
        );
      }
    }

    if (user.provider === "credentials") {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return (NextResponse.json("Incorrect password"), { status: 400 });
      }
    }

    await User.deleteOne({ _id: user._id });

    return NextResponse.json({ message: "Account deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete account" },
      { status: 500 },
    );
  }
}
