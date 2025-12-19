import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";
import { BiEditAlt } from "react-icons/bi";
import { useState } from "react";
const Profile = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : {};
  const personalInfoFields = [
    {
      label: "User Name",
      key: "name",
      showInProfileCard: true,
      profileClassName: "text-blue-700 font-semibold",
    },
    {
      label: "User Role",
      key: "role",
      showInProfileCard: true,
      profileClassName: "text-sm text-gray-500",
    },
    { label: "Email Address", key: "email" },
  ];

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleEditToggle = () => {
    if (isEditing) {
      // SAVE
      localStorage.setItem("user", JSON.stringify(formData));
    }
    setIsEditing(!isEditing);
  };

  return (
    <>
      <div className="w-screen h-screen bg-[#f2f4f6] p-4">
        <div className="flex items-center gap-3 ">
          <h2 className="font-semibold text-blue-700 text-lg my-2">
            My Profile
          </h2>
          <div className="grow border-t-2 border-gray-200 mx-3" />
        </div>

        <div className="grid gap-4">
          {/* Profile Card */}
          <div className="flex items-center justify-start border bg-white rounded-2xl w-full min-h-32 mt-2 p-4">
            <div className="flex gap-4">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                <Image />
              </div>

              <div className="flex flex-col justify-center">
                {personalInfoFields
                  .filter((field) => field.showInProfileCard)
                  .map((field) => (
                    <div key={field.key} className={field.profileClassName}>
                      {user[field.key] || "-"}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Personal info Card */}
          <div className="border bg-white rounded-2xl w-full min-h-60 p-4 overflow-auto ">
            <div className="flex justify-between mb-2 mx-4">
              <h3 className="text-blue-700 text-lg font-semibold">
                Personal Information
              </h3>
              <Button
                onClick={handleEditToggle}
                className="flex gap-1 bg-blue-600 hover:bg-blue-700 cursor-pointer"
              >
                {isEditing ? "Save" : "Edit"} <BiEditAlt />
              </Button>
            </div>
            <div className="flex justify-between gap-4 flex-wrap h-px bg-gray-200 my-3 mx-4">
              {personalInfoFields.map((field) => (
                <div key={field.key} className="grid min-w-35 mt-6">
                  <label className="text-sm text-gray-500">{field.label}</label>

                  {isEditing ? (
                    <input
                      className="border rounded-md px-2 py-1"
                      value={formData[field.key] || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [field.key]: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <div className="font-medium">{user[field.key] || "-"}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
