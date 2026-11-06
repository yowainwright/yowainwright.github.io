import React, { Children, isValidElement, type ReactNode } from "react";
import { ScrollyCode } from "../../../ScrollyCode";
import { STEPS, TITLE } from "./constants";

export function BeforeAfterExample({ children }: { children: ReactNode }) {
  const frames = Children.toArray(children).filter(isValidElement<{ children: ReactNode }>);
  const sections = frames.map((frame, index) => {
    const step = STEPS[index];
    return (
      <section key={step["data-title"]} {...step}>
        {frame.props.children}
      </section>
    );
  });
  return <ScrollyCode title={TITLE}>{sections}</ScrollyCode>;
}
