"use client";
import WaitlistForm from "@/components/WaitlistForm";
import WaitlistTable from "@/components/WaitlistTable";

const Waitlists = () => {
  return (
    <div className="h-screen justify-between items-center  flex flex-col ">
      <WaitlistForm />
      <WaitlistTable />
    </div>
  );
};

export default Waitlists;
