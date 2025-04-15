"use client";

import { signOut } from "next-auth/react";
import { useCallback, useEffect } from "react";

export default function LogoutPage() {
  const fetch = useCallback(async () => {
    await signOut();
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return <></>;
}
