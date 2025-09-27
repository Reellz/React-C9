import { useUser, useClerk } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user, isSignedIn, isLoaded } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);

  // Determine the active user (Clerk or localStorage)
  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn) {
        setCurrentUser(user);
      } else {
        const localUser = JSON.parse(localStorage.getItem("currentUser"));
        const isLocalLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        if (isLocalLoggedIn && localUser) {
          setCurrentUser(localUser);
        } else {
          navigate("/login");
        }
      }
    }
  }, [isLoaded, isSignedIn, user, navigate]);

  // Show loading while checking user
  if (!isLoaded || !currentUser) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-xl font-medium text-gray-600 animate-pulse">
          Loading Dashboard...
        </h1>
      </div>
    );
  }

  // Logout handler supporting both Clerk and localStorage users
  const handleLogout = () => {
    if (isSignedIn) {
      signOut(() => navigate("/login"));
    } else {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("currentUser");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome, {currentUser.fullName || currentUser.firstName} 👋
          </h1>
          <p className="text-gray-600">
            Email: {currentUser.email || currentUser.primaryEmailAddress?.emailAddress}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Profile Card */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-lg font-semibold text-gray-700">Your Profile</h2>
            <p className="mb-2 text-sm text-gray-600">
              <span className="font-medium">Name:</span> {currentUser.fullName || currentUser.firstName}
            </p>
            <p className="mb-2 text-sm text-gray-600">
              <span className="font-medium">Email:</span> {currentUser.email || currentUser.primaryEmailAddress?.emailAddress}
            </p>
            {currentUser.id && (
              <p className="text-sm text-gray-600">
                <span className="font-medium">User ID:</span> {currentUser.id}
              </p>
            )}
          </div>

          {/* Quick Actions */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-lg font-semibold text-gray-700">Quick Actions</h2>
            <div className="flex flex-col gap-3">
              <button className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700">
                Update Profile
              </button>
              <button className="w-full rounded-md bg-green-600 py-2 text-white hover:bg-green-700">
                View Settings
              </button>
              <button
                className="w-full rounded-md bg-red-600 py-2 text-white hover:bg-red-700"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          </div>

          {/* Stats Placeholder */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-lg font-semibold text-gray-700">Your Stats</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✅ Tasks Completed: <span className="font-medium">12</span></li>
              <li>📅 Last Login: <span className="font-medium">Today</span></li>
              <li>⭐ Membership Level: <span className="font-medium">Free</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
