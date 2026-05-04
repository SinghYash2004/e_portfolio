"use client";

import dynamic from "next/dynamic";

// Dynamic import must live in a Client Component when ssr:false is used
const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });

export default function ParticleFieldWrapper() {
  return <ParticleField />;
}
