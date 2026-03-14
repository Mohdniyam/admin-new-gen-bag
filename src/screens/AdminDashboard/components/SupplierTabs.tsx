import { useState, useEffect } from "react";

type Supplier = {
  _id: string;
  name: string;
  email: string;
  status: string;
};

const tabs = ["PENDING", "APPROVED", "REJECTED"] as const;

const SupplierTabs = () => {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("PENDING");

  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [allSuppliers, setAllSuppliers] = useState<Supplier[]>([]);

  const [loading, setLoading] = useState(true);

  // ---------------- FETCH ALL SUPPLIERS (ONLY ONCE) ----------------
  const fetchAllSuppliers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`https://ngtest.newgeebags.com/api/suppliers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error("Failed to fetch suppliers");

      setAllSuppliers(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchAllSuppliers();
  }, []);

  // Tab switch local filtering
  useEffect(() => {
    const filtered = allSuppliers.filter(
      (supplier) => supplier.status === activeTab,
    );

    setSuppliers(filtered);
  }, [activeTab, allSuppliers]);

  // ---------------- APPROVE SUPPLIER ----------------
  const approveSupplier = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(
        `https://ngtest.newgeebags.com/api/suppliers/${id}/approve`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) throw new Error("Approval failed");

      // Update status in memory (no refetch)
      setAllSuppliers((prev) =>
        prev.map((supplier) =>
          supplier._id === id ? { ...supplier, status: "APPROVED" } : supplier,
        ),
      );
    } catch (err) {
      console.error("Approval error:", err);
    }
  };

  // ---------------- REJECT SUPPLIER ----------------
  const rejectSupplier = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const res = await fetch(
        `https://ngtest.newgeebags.com/api/suppliers/${id}/reject`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error("Reject failed");
      }

      // Optimistic UI Update
      setAllSuppliers((prev) =>
        prev.map((supplier) =>
          supplier._id === id ? { ...supplier, status: "REJECTED" } : supplier,
        ),
      );
    } catch (err) {
      console.error("Reject error:", err);
    }
  };

  return (
    <div>
      <div className="text-xl font-semibold mb-6">Supplier Requests</div>
      {/* Tabs */}
      <div className="flex gap-6 border-b mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-sm font-medium transition-all ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            {tab.charAt(0) + tab.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Empty State */}
      {!loading && suppliers.length === 0 && (
        <p className="text-gray-500">No {activeTab.toLowerCase()} suppliers</p>
      )}

      {/* Supplier List */}
      <div className="space-y-3">
        {suppliers.map((s) => (
          <div
            key={s._id}
            className="border p-4 flex justify-between items-center rounded-lg"
          >
            <div className="">
              <p className="font-medium text-sm">{s.name}</p>
              <p className="text-xs text-gray-500">{s.email}</p>
            </div>

            <div className="flex items-center gap-8">
              <span
                className={`text-xs px-3 py-1 rounded-full font-semibold ${
                  s.status === "APPROVED"
                    ? "bg-green-200 text-green-800"
                    : s.status === "REJECTED"
                      ? "bg-red-200 text-red-800"
                      : "bg-amber-200 text-amber-800"
                }`}
              >
                {s.status}
              </span>

              {/* Show Approve Button Only in Pending Tab */}
              {activeTab === "PENDING" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => approveSupplier(s._id)}
                    className="px-4 py-1 rounded text-white text-sm bg-blue-600 hover:opacity-90 cursor-pointer"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => rejectSupplier(s._id)}
                    className="px-4 py-1 rounded text-white text-sm bg-red-600 hover:opacity-90 cursor-pointer"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupplierTabs;
