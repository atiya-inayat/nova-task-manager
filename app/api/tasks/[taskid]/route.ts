import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Task from "@/models/Task";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface TaskPatchInput {
  params: { taskId: string };
}

export async function PATCH(req: Request, { params }: TaskPatchInput) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { status } = await req.json();

  await connectDB();

  const task = await Task.findById(params.taskId);
  if (!task) {
    return NextResponse.json({ message: "Task not found" }, { status: 404 });
  }

  task.status = status;
  await task.save();

  return NextResponse.json(task);
}

export async function DELETE(req: Request, { params }: TaskPatchInput) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  await Task.findByIdAndDelete(params.taskId);

  return NextResponse.json({ message: "Task deleted" });
}
