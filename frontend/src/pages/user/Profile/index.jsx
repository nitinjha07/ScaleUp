import { useEffect, useState } from "react";
import { useGlobalProvider } from "../../../context/globalContext";
import { startupOwnerServices } from "../../../lib/appwrite/startupOwner.appwrite";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, setUser } = useGlobalProvider();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    phone: "",
    company: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || "",
        phone: user.phone || "",
        company: user.company || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async () => {
    try {
      await startupOwnerServices.update(formData);
      setUser({ ...user, ...formData });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update profile.");
    }
  };

  const handleLogout = async () => {
    await startupOwnerServices.logOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600"
            />
          </div>
          <div>
            <label className="block text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full px-4 py-2 rounded bg-gray-700 text-gray-500 border border-gray-600 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-gray-400">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600"
            />
          </div>
          <div>
            <label className="block text-gray-400">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-gray-400">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600"
            rows="3"
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleUpdateProfile}
            className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Save Changes
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
