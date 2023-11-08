import { useState } from "react";
import AnimatedContainerContext from "./AnimatedContainerContext";
import { motion } from 'framer-motion';

export type AnimatedContainerProps = {
    children?: React.ReactNode;
}

function AnimatedContainer({ children }: AnimatedContainerProps) {
    const [height, setHeight] = useState<number | null>(null);
    const [transiting, setTransiting] = useState<boolean>(true);
    return (
        <AnimatedContainerContext.Provider value={{ height, setHeight, transiting, setTransiting }}>
            <div className="rounded-lg w-full max-w-md min-h-[512px] generative-container gap-5 shadow-lg border border-gray-200 backdrop-blur-3xl overflow-hidden">
                {children}
                <motion.div
                    key="animate-transiting"
                    animate={{
                        opacity: transiting ? 1 : 0,
                        visibility: transiting ? "visible" : "hidden",
                    }}
                    transition={{ duration: 0.3 }}
                    className="block absolute inset-0 bg-[#0001] backdrop-blur-sm"
                >
                    <span className="h-[5px] block w-full animate-transiting" />
                </motion.div>
            </div>
        </AnimatedContainerContext.Provider>
    );
}

export default AnimatedContainer;