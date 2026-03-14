// "use client";

// import { useEffect, useState } from "react";
// import SupplierProfileCard from "./SupplierProfileCard";

// type AuthSupplier = {
//   name: string;
//   email: string;
//   status: string;
// };

// type BusinessProfile = {
//   _id: string;
//   businessName: string;
//   gstNumber: string;
//   address: string;
// };

// export default function SupplierProfile() {
//   const [authUser, setAuthUser] = useState<AuthSupplier | null>(null);
//   const [business, setBusiness] = useState<BusinessProfile | null>(null);

//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);

//   const [formData, setFormData] = useState({
//     businessName: "",
//     gstNumber: "",
//     address: "",
//   });

//   useEffect(() => {
//     const token = localStorage.getItem("supplierToken");
//     if (!token) {
//       setLoading(false);
//       return;
//     }

//     async function fetchData() {
//       try {
//         // 1. Fetch auth user
//         const authRes = await fetch(
//           "https://ngtest.newgeebags.com/api/auth/me",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           },
//         );

//         if (!authRes.ok) {
//           setLoading(false);
//           return;
//         }

//         const authData = await authRes.json();
//         setAuthUser(authData);

//         // 2. Fetch business profile
//         const profileRes = await fetch(
//           "https://ngtest.newgeebags.com/api/suppliers/profile",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           },
//         );

//         if (profileRes.ok) {
//           const profileData = await profileRes.json();
//           setBusiness(profileData);

//           setFormData({
//             businessName: profileData.businessName,
//             gstNumber: profileData.gstNumber,
//             address: profileData.address,
//           });
//         }
//       } catch (error) {
//         console.log("Error fetching data", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, []);

//   const handleSubmit = async () => {
//     const token = localStorage.getItem("supplierToken");
//     if (!token) return;

//     const method = business ? "PUT" : "POST";

//     try {
//       const res = await fetch(
//         "https://ngtest.newgeebags.com/api/suppliers/profile",
//         {
//           method,
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(formData),
//         },
//       );

//       if (!res.ok) return;

//       const data = await res.json();
//       setBusiness(data);
//       setIsEditing(false);
//     } catch (error) {
//       console.log("Error saving profile", error);
//     }
//   };

//   if (loading) return <p className="p-6">Loading...</p>;

//   return (
//     <div className="p-6 max-w-xl mx-auto space-y-6">
//       {/* Supplier Basic Info */}
//       {authUser && (
//         <div className="bg-white shadow rounded-lg p-4">
//           <h2 className="text-lg font-semibold mb-2">Supplier Information</h2>
//           <p>
//             <strong>Name:</strong> {authUser.name}
//           </p>
//           <p>
//             <strong>Email:</strong> {authUser.email}
//           </p>
//           <p>
//             <strong>Status:</strong>{" "}
//             <span className="text-green-600 font-medium">
//               {authUser.status}
//             </span>
//           </p>
//         </div>
//       )}

//       {/* Business Section */}
//       {!business && !isEditing && (
//         <button
//           onClick={() => setIsEditing(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Add Business
//         </button>
//       )}

//       {business && !isEditing && (
//         <div className="bg-white shadow rounded-lg p-4 space-y-2">
//           <h2 className="text-lg font-semibold mb-2">Business Details</h2>
//           <p>
//             <strong>Business Name:</strong> {business.businessName}
//           </p>
//           <p>
//             <strong>GST Number:</strong> {business.gstNumber}
//           </p>
//           <p>
//             <strong>Address:</strong> {business.address}
//           </p>

//           <button
//             onClick={() => setIsEditing(true)}
//             className="bg-yellow-500 text-white px-4 py-2 rounded mt-3"
//           >
//             Edit Business
//           </button>
//         </div>
//       )}

//       {/* Form */}
//       {isEditing && (
//         <div className="bg-white shadow rounded-lg p-4 space-y-3">
//           <h2 className="text-lg font-semibold">
//             {business ? "Edit Business" : "Create Business"}
//           </h2>

//           <input
//             type="text"
//             placeholder="Business Name"
//             value={formData.businessName}
//             onChange={(e) =>
//               setFormData({ ...formData, businessName: e.target.value })
//             }
//             className="border p-2 w-full rounded"
//           />

//           <input
//             type="text"
//             placeholder="GST Number"
//             value={formData.gstNumber}
//             onChange={(e) =>
//               setFormData({ ...formData, gstNumber: e.target.value })
//             }
//             className="border p-2 w-full rounded"
//           />

//           <input
//             type="text"
//             placeholder="Address"
//             value={formData.address}
//             onChange={(e) =>
//               setFormData({ ...formData, address: e.target.value })
//             }
//             className="border p-2 w-full rounded"
//           />

//           <div className="flex gap-3">
//             <button
//               onClick={handleSubmit}
//               className="bg-green-600 text-white px-4 py-2 rounded"
//             >
//               {business ? "Update Business" : "Create Business"}
//             </button>

//             <button
//               onClick={() => setIsEditing(false)}
//               className="bg-gray-400 text-white px-4 py-2 rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//       <div>
//         <SupplierProfileCard />
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import SupplierBasicInfo from "@/screens/Supplier/SupplierBasicInfo";
import BusinessDetailsCard from "@/screens/Supplier/BusinessDetailsCard";
import BusinessForm from "@/screens/Supplier/BusinessForm";
import AddBusinessButton from "@/screens/Supplier/AddBusinessButton";
import SupplierProfileCard from "@/screens/Supplier/SupplierProfileCard";

export default function SupplierProfile() {
  const [authUser, setAuthUser] = useState<any>(null);
  const [business, setBusiness] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    businessName: "",
    gstNumber: "",
    address: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("supplierToken");
    if (!token) {
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        const authRes = await fetch(
          "https://ngtest.newgeebags.com/api/auth/me",
          { headers: { Authorization: `Bearer ${token}` } },
        );

        if (authRes.ok) {
          const authData = await authRes.json();
          setAuthUser(authData);
        }

        const profileRes = await fetch(
          "https://ngtest.newgeebags.com/api/suppliers/profile",
          { headers: { Authorization: `Bearer ${token}` } },
        );

        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setBusiness(profileData);
          setFormData(profileData);
        }
      } catch (err) {
        console.log("Error fetching data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleSubmit = async () => {
    const token = localStorage.getItem("supplierToken");
    if (!token) return;

    const method = business ? "PUT" : "POST";

    const res = await fetch(
      "https://ngtest.newgeebags.com/api/suppliers/profile",
      {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      },
    );

    if (res.ok) {
      const data = await res.json();
      setBusiness(data);
      setIsEditing(false);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="flex flex-row w-full">
      <div className="w-2/3 flex items-center justify-center p-6">
        <SupplierProfileCard />
      </div>
      <div className="w-1/3 flex items-start justify-center p-6">
        {authUser && <SupplierBasicInfo authUser={authUser} />}

        {!business && !isEditing && (
          <AddBusinessButton onClick={() => setIsEditing(true)} />
        )}

        {business && !isEditing && (
          <BusinessDetailsCard
            business={business}
            onEdit={() => setIsEditing(true)}
          />
        )}

        {isEditing && (
          <BusinessForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            onCancel={() => setIsEditing(false)}
            isEdit={!!business}
          />
        )}
      </div>
    </div>
  );
}
