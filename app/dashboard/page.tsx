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
import CreateProjectSection from "../component/CreateProjectSection";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

// export default async function DashboardPage() {
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     // User is not authenticated
//     redirect("/auth/signin");
//   }
//   let rawProjects;
//   if (session.user.role === "admin") {
//     rawProjects = await Project.find().populate("owner", "email").lean();
//   } else {
//     rawProjects = await Project.find({ owner: session.user.id }).lean();
//   }

//   // JSON.stringify(rawProjects) - Converts everything to a JSON string
//   // JSON.parse(...) - Turns the JSON string back into plain JS objects
//   const projects = JSON.parse(JSON.stringify(rawProjects));

//   console.log("Dashboard projects (serialized):", projects);

//   return (
//     <div className="min-h-screen bg-linear-to-br from-[#0F172A] to-black text-white pt-20 px-4">
//       <div className="my-4 flex w-full justify-center">
//         <h1 className="   ">
//           <span className="text-4xl text-slate-300 text-shadow-black font-extrabold">
//             Welcome 👋
//           </span>
//         </h1>
//       </div>

//       <div className="   flex  flex-row items-center justify-around gap-5  border-slate-900 rounded-lg p-4 mt-1 ">
//         <div>
//           <CreateProjectForm />
//         </div>

//         {/* <div>
//           <ProjectList projects={projects} />
//         </div> */}

//         {/* role based access */}
//         {session.user.role === "admin" && (
//           <div className="border border-slate-950 p-4 rounded-lg">
//             <div className="flex justify-center">
//               <h2 className="font-bold text-3xl text-slate-300 ">
//                 Admin Panel
//               </h2>
//             </div>
//             <p className="  text-slate-500 ">Manage users and projects</p>
//             <div className="mt-4">
//               <Link href="/dashboard/admin/users">
//                 <button className="w-full bg-slate-900 border-slate-600 text-white font-semibold cursor-pointer flex justify-center border p-1 rounded-full mb-2 hover:bg-slate-800">
//                   Admin
//                 </button>
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//       <div>
//         <ProjectListClient />
//       </div>
//     </div>
//   );
// }

export default async function DashboardPage() {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  let rawProjects;
  if (session.user.role === "admin") {
    rawProjects = await Project.find().populate("owner", "email").lean();
  } else {
    rawProjects = await Project.find({ owner: session.user.id }).lean();
  }

  const projects = JSON.parse(JSON.stringify(rawProjects));

  const projectCount = projects.length; // Get count for the badge

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0F172A] to-black text-white pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* --- ADAPTIVE HEADER SECTION --- */}
        <div
          className={`
          flex flex-col md:flex-row border border-slate-800 p-8 rounded-3xl backdrop-blur-sm bg-slate-900/40
          ${session.user.role === "admin" ? "justify-between items-center text-left" : "justify-center items-center text-center"}
        `}
        >
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black text-slate-100 tracking-tight">
              Welcome 👋
            </h1>
            <p className="text-slate-400 font-medium max-w-md">
              {session.user.role === "admin"
                ? "System Administrator Access"
                : `You have ${projectCount} active ${projectCount === 1 ? "project" : "projects"} in your workspace.`}
            </p>
          </div>

          {/* Admin Quick Action - Only shows for admin */}
          {session.user.role === "admin" && (
            <Link href="/dashboard/admin/users" className="mt-6 md:mt-0">
              <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded-2xl font-bold transition-all cursor-pointer group">
                Admin Panel
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </button>
            </Link>
          )}
        </div>

        {/* --- ACTIONS BAR --- */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-200">Your Projects</h2>
            <p className="text-sm text-slate-500">
              Manage and track your latest work
            </p>
          </div>

          <div className="w-full sm:w-auto">
            <CreateProjectSection />
          </div>
        </div>

        {/* --- PROJECTS LIST --- */}
        <div className="w-full">
          <ProjectListClient />
        </div>
      </div>
    </div>
  );
}
