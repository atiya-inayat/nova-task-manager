import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { name, description } = await req.json();
    if (!name) {
      return NextResponse.json(
        { message: "Project name is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const newProject = await Project.create({
      name,
      description,
      owner: session?.user.id, // link project to user
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong while creating new project" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    let projects;

    // Admin sees all projects
    if (session.user.role === "admin") {
      projects = await Project.find().populate("owner", "email").lean(); //  Fetch projects and include the owner's email instead of just the owner ID - shows user email in admin panel
    } else {
      // normal user sees own projects
      projects = await Project.find({ owner: session.user.id }).lean();
    }

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    NextResponse.json(
      { message: "Something went wrong while fetching projects" },
      { status: 500 }
    );
  }
}
