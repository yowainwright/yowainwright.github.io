import React, { type ReactNode } from "react";
import { ScrollyCode } from "../../../ScrollyCode";
import { STEPS, TITLE } from "./constants";

export function OverrideExample({ children }: { children: ReactNode }) {
  return (
    <ScrollyCode title={TITLE} steps={STEPS}>
      {children}
    </ScrollyCode>
  );
}
