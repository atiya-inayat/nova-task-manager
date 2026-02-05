// import ProjectList from "@/app/component/ProjectList";
// import { authOptions } from "@/lib/auth";
// import Project from "@/models/Project";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";

// const ProjectListPage = async () => {
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

//   console.log(" projectsList Page (serialized):", projects);

//   return (
//     <div>
//       <ProjectList projects={projects} />
//     </div>
//   );
// };

// export default ProjectListPage;

import ProjectList from "@/app/component/ProjectList";
import { authOptions } from "@/lib/auth";
import Project from "@/models/Project";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const ProjectListPage = async () => {
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

  return (
    <main className="min-h-screen bg-linear-to-br from-[#0F172A] to-black">
      <ProjectList projects={projects} />
    </main>
  );
};

export default ProjectListPage;
