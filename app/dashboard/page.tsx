// server - check session before rendering page
// client - redirect user based on auth state
// middleware - global route protection

// ---------------
// getServerSession - runs on the server - reads JWT from HTTP-only cookies - Verifies session securely

import CreateProjectForm from "@/app/component/CreateProjectForm";
import ProjectList from "@/app/component/ProjectList";
import { SignoutBtn } from "@/app/component/SignoutBtn";
import { authOptions } from "@/lib/auth";
import Project from "@/models/Project";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ProjectListClient from "../component/ProjectListClientside";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // User is not authenticated
    redirect("/auth/signin");
  }
  let rawProjects;
  if (session.user.role === "admin") {
    rawProjects = await Project.find().populate("owner", "email").lean();
  } else {
    rawProjects = await Project.find({ owner: session.user.id }).lean();
  }

  // JSON.stringify(rawProjects) - Converts everything to a JSON string
  // JSON.parse(...) - Turns the JSON string back into plain JS objects
  const projects = JSON.parse(JSON.stringify(rawProjects));

  console.log("Dashboard projects (serialized):", projects);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0F172A] to-black text-white pt-20 px-4">
      <div className="my-4 flex w-full justify-center">
        <h1 className="   ">
          <span className="text-4xl text-slate-300 text-shadow-black font-extrabold">
            Welcome 👋
          </span>
        </h1>
      </div>

      <div className="   flex  flex-row items-center justify-around gap-5  border-slate-900 rounded-lg p-4 mt-1 ">
        <div>
          <CreateProjectForm />
        </div>

        {/* <div>
          <ProjectList projects={projects} />
        </div> */}

        {/* role based access */}
        {session.user.role === "admin" && (
          <div className="border border-slate-950 p-4 rounded-lg">
            <div className="flex justify-center">
              <h2 className="font-bold text-3xl text-slate-300 ">
                Admin Panel
              </h2>
            </div>
            <p className="  text-slate-500 ">Manage users and projects</p>
            <div className="mt-4">
              <Link href="/dashboard/admin/users">
                <button className="w-full bg-slate-900 border-slate-600 text-white font-semibold cursor-pointer flex justify-center border p-1 rounded-full mb-2 hover:bg-slate-800">
                  Admin
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
      <div>
        <ProjectListClient />
      </div>
    </div>
  );
}
