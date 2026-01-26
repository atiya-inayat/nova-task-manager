import Link from "next/link";

const ProjectDetail = ({ projectId }: { projectId: string }) => {
  return (
    <div>
      <Link href={`/dashboard/projects/${projectId}`}>
        <button className=" text-sm py-1 px-2 bg-black text-white font-semibold cursor-pointer flex justify-center border p-1 rounded-md mb-2">
          Project Detail
        </button>
      </Link>
    </div>
  );
};

export default ProjectDetail;
