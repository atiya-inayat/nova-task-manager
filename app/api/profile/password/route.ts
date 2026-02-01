import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { currentPassword, newPassword } = await req.json();

    await connectDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user || user.provider !== "credentials") {
      return NextResponse.json(
        { message: "Password change not allowed" },
        { status: 403 },
      );
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Incorrect password" },
        { status: 400 },
      );
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (error) {}
}
