import Link from "next/link";

const ProjectDetail = ({ projectId }: { projectId: string }) => {
  return (
    <div>
      <Link href={`/dashboard/projects/${projectId}`}>
        <button className=" text-sm py-1 px-3 bg-slate-900 border-slate-800 text-white font-semibold hover:bg-slate-700 cursor-pointer flex justify-center border p-1 rounded-lg mb-2">
          Project Detail
        </button>
      </Link>
    </div>
  );
};

export default ProjectDetail;
