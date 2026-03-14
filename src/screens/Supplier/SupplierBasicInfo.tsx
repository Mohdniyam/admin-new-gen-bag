type AuthSupplier = {
  name: string;
  email: string;
  status: string;
};

export default function SupplierBasicInfo({
  authUser,
}: {
  authUser: AuthSupplier;
}) {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">Supplier Information</h2>

      <p>
        <strong>Name:</strong> {authUser.name}
      </p>
      <p>
        <strong>Email:</strong> {authUser.email}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        <span className="text-green-600 font-medium">{authUser.status}</span>
      </p>
    </div>
  );
}
