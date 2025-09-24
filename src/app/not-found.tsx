import { Suspense } from "react";
import { NotFoundClient } from "../components/NotFoundClient";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center mt-20">
      <Suspense fallback={
        <div className="text-2xl">Loading...</div>
      }>
        <NotFoundClient />
      </Suspense>
    </div>
  );
}