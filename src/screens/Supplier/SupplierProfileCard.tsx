"use client";

import { useEffect, useState } from "react";
import {
  supplierService,
  type SupplierProfile,
} from "@/lib/services/supplier.service";

export default function SupplierProfileCard() {
  const [profile, setProfile] = useState<SupplierProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const data = await supplierService.getMyProfile(token);
        setProfile(data);
      } catch (error: any) {
        setError(error.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="w-full bg-white shadow-xs rounded-md p-6 border">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Supplier Profile
      </h2>

      <div className="space-y-3 text-sm sm:text-base">
        <p>
          <strong>Name:</strong> {profile?.name}
        </p>
        <p>
          <strong>Email:</strong> {profile?.email}
        </p>
        <p>
          <strong>Role:</strong> {profile?.role}
        </p>

        <p>
          <strong>Status:</strong>
          <span
            className={`ml-2 px-2 py-1 rounded text-xs ${
              profile?.status === "APPROVED"
                ? "bg-green-100 text-green-600"
                : profile?.status === "REJECTED"
                  ? "bg-red-100 text-red-600"
                  : "bg-yellow-100 text-yellow-600"
            }`}
          >
            {profile?.status}
          </span>
        </p>

        <p>
          <strong>Joined:</strong>{" "}
          {new Date(profile?.createdAt || "").toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
