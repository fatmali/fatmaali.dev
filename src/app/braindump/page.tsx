import { BraindumpHeader } from "../../components/braindump/BraindumpHeader";
import { BraindumpGrid } from "../../components/braindump/BraindumpGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Braindump | Fatma Ali",
  description: "A creative space where I dump all my wild ideas, experiments, and works in progress. From coding experiments to design concepts and everything in between.",
};

export default function BraindumpPage() {
  return (
    <>
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 container mx-auto">
        <BraindumpHeader />
      </section>
      
      <section className="pb-32 px-4 sm:px-6 lg:px-8 container mx-auto">
        <BraindumpGrid />
      </section>
    </>
  );
}
