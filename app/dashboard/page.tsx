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
    <div>
      <h1>Welcome, {session.user.email}</h1>
      <CreateProjectForm />

      <ProjectList projects={projects} />

      {/* role based access */}
      {session.user.role === "admin" && (
        <div>
          <h2>Admin Panel</h2>
          <p>Manage users and projects</p>
        </div>
      )}
      <SignoutBtn />
    </div>
  );
}
