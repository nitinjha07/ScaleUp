import { useGlobalProvider } from "../../context/globalContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const MyStartups = () => {
  const { getMyStartups, removeStartup, user } = useGlobalProvider();
  const navigate = useNavigate();
  const [myStartups, setMyStartups] = useState([]);

  useEffect(() => {
    setMyStartups(getMyStartups());
  }, [getMyStartups]);

  const handleDelete = (id) => {
    removeStartup(id);
    setMyStartups((prev) => prev.filter((startup) => startup.$id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Startups</h1>
        <button
          onClick={() => navigate("/add-new-startup")}
          className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          + Add New Startup
        </button>
      </header>

      {myStartups.length === 0 ? (
        <p className="text-gray-400">No startups found. Start by adding one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myStartups.map((startup) => (
            <div
              key={startup.$id}
              className="bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold">{startup.name}</h3>
              <p className="text-gray-400">{startup.description}</p>

              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => navigate(`/edit-startup/${startup.$id}`)}
                  className="bg-green-500 px-3 py-1 rounded-lg hover:bg-green-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(startup.$id)}
                  className="bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyStartups;
