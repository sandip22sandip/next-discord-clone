import { Loader2 } from "lucide-react";
import React from "react";

export default function loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1E1F22] text-white">
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Please Wait...
        </p>
      </div>
    </div>
  );
}
