import LoadingSpinner from "@/components/LoadingSpinner";
import React from "react";

export default function MatchHistoryLoading() {
  return (
    <div className="bg-white flex justify-center p-2">
      <LoadingSpinner className="border-gray-300 w-10" />
    </div>
  );
}
