"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode, Suspense } from "react";

export default function ClerkLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div>Loading authentication...</div>}>
      <ClerkProvider>{children}</ClerkProvider>
    </Suspense>
  );
}
