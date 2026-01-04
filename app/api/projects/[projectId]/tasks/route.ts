import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import Task from "@/models/Task";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorize" }, { status: 401 });
  }

  const { title } = await req.json();

  if (!title) {
    return NextResponse.json(
      { message: "Task title required" },
      { status: 400 }
    );
  }

  await connectDB();

  // check project ownership
  const project = await Project.findById(params.projectId); // This line fetches one project from MongoDB whose ID comes from the URL, and stores it in the project variable.

  if (!project) {
    return NextResponse.json({ message: "Project not found" }, { status: 404 });
  }

  if (
    project.owner.toString() !== session.user.id &&
    session.user.role !== "admin"
  ) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const task = await Task.create({ title, project: project._id });

  return NextResponse.json(task, { status: 201 });
}

export async function GET(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const tasks = await Task.find({ project: params.projectId });

  return NextResponse.json(tasks);
}
