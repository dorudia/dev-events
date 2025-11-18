"use client";
import { useAuth, SignIn } from "@clerk/nextjs";
import { ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) return <SignIn />; // folosește pagina de signin Clerk

  return <>{children}</>;
}
