"use client";

import { useEffect, useState } from "react";

export default function WardName() {
  const [wardName, setWardName] = useState<string | null>(null);

  useEffect(() => {
    function updateWardName() {
      setWardName(localStorage.getItem("wardName"));
    }

    window.addEventListener("wardNameChanged", updateWardName);
    updateWardName();

    return () => {
      window.removeEventListener("wardNameChanged", updateWardName);
    };
  }, []);

  return (
    <h1 className="text-2xl font-bold tracking-tight">
      {wardName || "Tu Barrio"}
    </h1>
  );
}
