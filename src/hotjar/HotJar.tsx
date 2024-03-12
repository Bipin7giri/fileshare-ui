"use client";
import Hotjar from "@hotjar/browser";
import React, { useEffect } from "react";

export const HotJar = ({ children }: { children: any }) => {
  useEffect(() => {
    const siteId = 3902600;
    const hotjarVersion = 6;
    Hotjar.init(siteId, hotjarVersion);
  }, []);
  return <div>{children}</div>;
};
