type FormData = {
  businessName: string;
  gstNumber: string;
  address: string;
};

export default function BusinessForm({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  isEdit,
}: {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onSubmit: () => void;
  onCancel: () => void;
  isEdit: boolean;
}) {
  return (
    <div className="bg-white shadow rounded-lg p-4 space-y-3">
      <h2 className="text-lg font-semibold">
        {isEdit ? "Edit Business" : "Create Business"}
      </h2>

      <input
        type="text"
        placeholder="Business Name"
        value={formData.businessName}
        onChange={(e) =>
          setFormData({ ...formData, businessName: e.target.value })
        }
        className="border p-2 w-full rounded"
      />

      <input
        type="text"
        placeholder="GST Number"
        value={formData.gstNumber}
        onChange={(e) =>
          setFormData({ ...formData, gstNumber: e.target.value })
        }
        className="border p-2 w-full rounded"
      />

      <input
        type="text"
        placeholder="Address"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        className="border p-2 w-full rounded"
      />

      <div className="flex gap-3">
        <button
          onClick={onSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {isEdit ? "Update Business" : "Create Business"}
        </button>

        <button
          onClick={onCancel}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
