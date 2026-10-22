"use client";

import { useEffect, useRef, useState } from "react";

export default function WardName() {
  const [wardName, setWardName] = useState<string | null>(null);
  const [visible, setVisible] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function readName() {
      return localStorage.getItem("wardName");
    }

    function updateWardName() {
      const next = readName();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setVisible(false);
      timeoutRef.current = setTimeout(() => {
        setWardName(next);
        setVisible(true);
      }, 250);
    }

    timeoutRef.current = setTimeout(() => {
      setWardName(readName());
    }, 0);

    window.addEventListener("wardNameChanged", updateWardName);

    return () => {
      window.removeEventListener("wardNameChanged", updateWardName);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <h1
      className={`text-2xl font-bold tracking-tight transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
      }`}
    >
      {wardName || "Tu Barrio"}
    </h1>
  );
}
