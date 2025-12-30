import RTOReturnToggle from "@/components/RTOReturnToggle";
import ReturnStatusTabs from "@/features/rto/return/ReturnStatusTabs";

const RtoPage = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mx-4 mt-6 mb-3">
        Manage RTO / Returns
      </h1>
      <div className="">
        <ReturnStatusTabs />
        <RTOReturnToggle />
        {/* Return Status Content */}
        <div className="flex items-center justify-center m-6"></div>
      </div>
    </>
  );
};

export default RtoPage;
