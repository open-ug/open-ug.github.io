"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AuthNav() {
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    const supabase = createClient();
    void supabase.auth.getUser().then(({ data }) => setSignedIn(Boolean(data.user)));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => setSignedIn(Boolean(session)));
    return () => data.subscription.unsubscribe();
  }, []);
  return <Link href={signedIn ? "/dashboard" : "/auth/login"} className="text-xs font-bold uppercase tracking-widest hover:text-sky-600">{signedIn ? "Dashboard" : "Sign in"}</Link>;
}
