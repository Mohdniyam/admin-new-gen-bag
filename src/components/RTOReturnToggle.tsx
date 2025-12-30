import { useState } from "react";

type FlowType = "RTO" | "RETURN";

export default function RTOReturnToggle() {
  const [activeFlow, setActiveFlow] = useState<FlowType>("RETURN");

  return (
    <div className="inline-flex rounded-3xl border border-gray-300 p-1">
      <button
        onClick={() => setActiveFlow("RETURN")}
        className={`px-4 py-1.5 text-sm font-medium rounded-3xl transition cursor-pointer
          ${
            activeFlow === "RETURN"
              ? "bg-blue-600 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }
        `}
      >
        RTO
      </button>

      <button
        onClick={() => setActiveFlow("RTO")}
        className={`px-4 py-1.5 text-sm font-medium rounded-3xl transition 
          ${
            activeFlow === "RTO"
              ? "bg-blue-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }
        `}
      >
        Return
      </button>
    </div>
  );
}
