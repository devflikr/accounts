import React from "react";

export type AnimatedContainerContextValue = {
    height: number | null;
    setHeight: React.Dispatch<React.SetStateAction<number | null>>;
    transiting: boolean;
    setTransiting: React.Dispatch<React.SetStateAction<boolean>>;
};

const AnimatedContainerContext = React.createContext<AnimatedContainerContextValue>({
    height: null,
    setHeight: () => { },
    transiting: true,
    setTransiting: () => { },
});

export default AnimatedContainerContext;

