interface SidebarProps {
  role: "user" | "officer";
}

const Sidebar = ({ role }: SidebarProps) => {
  return (
    <aside className="w-64 bg-gray-100 p-4">
      <ul className="space-y-2">
        {/* Shared for both roles */}
        <li>
          <a href="/profile">Profile</a>
        </li>
        <li>
          <a href="/kyc">KYC</a>
        </li>

        {/* Officer-only */}
        {role === "officer" && (
          <>
            <li>
              <a href="/clients">Client List</a>
            </li>
            <li>
              <a href="/review">Review</a>
            </li>
            <li>
              <a href="/all-results">All Results</a>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
