"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useAuthStore } from "@/store/authStore";

export default function ClerkUserSync() {
  const { user } = useUser();
  const setClerkId = useAuthStore((state) => state.setClerkId);

  useEffect(() => {
    if (user) {
      console.log("✅ Clerk ID saved:", user.id);
      setClerkId(user.id);
    }
  }, [user, setClerkId]);

  return null; // no UI, logic only
}
