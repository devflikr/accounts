import React from "react";
import AnimatedContainerContext, { AnimatedContainerContextValue } from "./AnimatedContainerContext";

export default function useAnimatedContainerContext(): AnimatedContainerContextValue {
    const context = React.useContext(AnimatedContainerContext);
    if (!context) throw new Error("Unable to access AnimatedContainer Context API.");
    return context;
}