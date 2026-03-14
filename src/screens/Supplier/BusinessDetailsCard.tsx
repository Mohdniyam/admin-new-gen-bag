type BusinessProfile = {
  _id: string;
  businessName: string;
  gstNumber: string;
  address: string;
};

export default function BusinessDetailsCard({
  business,
  onEdit,
}: {
  business: BusinessProfile;
  onEdit: () => void;
}) {
  return (
    <div className="bg-white shadow rounded-lg p-4 space-y-2">
      <h2 className="text-lg font-semibold mb-2">Business Details</h2>

      <p>
        <strong>Business Name:</strong> {business.businessName}
      </p>
      <p>
        <strong>GST Number:</strong> {business.gstNumber}
      </p>
      <p>
        <strong>Address:</strong> {business.address}
      </p>

      <button
        onClick={onEdit}
        className="bg-yellow-500 text-white px-4 py-2 rounded mt-3"
      >
        Edit Business
      </button>
    </div>
  );
}
