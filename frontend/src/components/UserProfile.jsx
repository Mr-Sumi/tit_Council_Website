import { useState, useEffect } from "react";
import { Camera, Mail, Phone, MapPin, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UserProfilePage() {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [user, setUser] = useState(null);   // user state
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://api.studentcouncil.info/auth/me", {
          method: "GET",
          credentials: "include", // send cookies
        });
        if (res.ok) {
          const data = await res.json();
          console.log("User profile fetched successfully:", data);
          setUser(data.user);
        } else {
          console.error("Failed to fetch user profile");
          navigate("/login"); // if unauthorized, redirect
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        navigate("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setProfilePhoto(reader.result);
    reader.readAsDataURL(file);
  };

  const handleLogout = async () => {
    console.log("Logging out...");
    try {
      const res = await fetch("http://api.studentcouncil.info/auth/logout", {
        method: "GET",
        credentials: "include", // send cookies
      });

      if (res.ok) {
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        User not found
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center p-6 py-20">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Profile Picture */}
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-indigo-400 cursor-pointer hover:border-indigo-500 transition">
            {profilePhoto ? (
              <img
                src={profilePhoto}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <Camera className="text-indigo-400 w-12 h-12 m-auto mt-12" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          {/* Name & Basic Info */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl font-bold text-white">{user.username}</h1>
            <p className="text-white/70 mt-1">
              {user.branch || "Branch N/A"} | {user.college || "College N/A"}
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-2 bg-white/10 p-3 rounded-xl border border-white/20">
            <Mail className="text-blue-400" />
            <span className="text-white">{user.email}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 p-3 rounded-xl border border-white/20">
            <Phone className="text-green-400" />
            <span className="text-white">{user.phone}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 p-3 rounded-xl border border-white/20">
            <MapPin className="text-purple-400" />
            <span className="text-white">{user.college || "Not Provided"}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 p-3 rounded-xl border border-white/20">
            <span className="text-white">
              {user.dob || "DOB N/A"} | {user.gender || "Gender N/A"}
            </span>
          </div>
        </div>

        {/* About / Bio */}
        <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-2">About</h2>
          <p className="text-white/70">{user.bio || "No bio provided."}</p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-xl font-semibold shadow-lg transition">
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-xl font-semibold shadow-lg transition flex items-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
