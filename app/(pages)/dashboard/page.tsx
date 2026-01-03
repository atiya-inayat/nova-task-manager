// server - check session before rendering page
// client - redirect user based on auth state
// middleware - global route protection

// ---------------
// getServerSession - runs on the server - reads JWT from HTTP-only cookies - Verifies session securely

import { SignoutBtn } from "@/app/component/SignoutBtn";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // User is not authenticated
    redirect("/auth/signin");
  }

  return (
    <div>
      <h1>Welcome, {session.user.email}</h1>

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
