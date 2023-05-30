"use client";

import { store } from "@/zustand/store";
import { useEffect } from "react";

export default function SetShowChannelMenu({
  channel,
}: {
  channel: string | undefined;
}) {
  const { setShowChannelMenu } = store();

  useEffect(() => {
    setShowChannelMenu({ channel, toggle: true });
    return () => setShowChannelMenu({ channel: undefined, toggle: false });
  }, []);

  return <></>;
}
