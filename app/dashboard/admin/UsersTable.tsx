interface User {
  _id: string;
  email: string;
  role: "user" | "admin";
  isBlocked: boolean;
  createdAt: string;
}

interface UsersTableProps {
  users: User[];
  loading: boolean;
}

export default function UsersTable({ users, loading }: UsersTableProps) {
  if (loading) return <p>Loading users...</p>;

  if (users.length === 0) {
    return <p>No users found</p>;
  }

  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.isBlocked ? "Blocked" : "Active"}</td>
            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
