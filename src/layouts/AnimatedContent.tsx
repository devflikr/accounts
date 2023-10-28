import { motion } from "framer-motion";
import useAnimatedContainerContext from "./AnimatedContainer/useAnimatedContainerContext";

export type HeightAnimatedChildProps = {
    element?: React.ReactNode;
}
function AnimatedContent({ element }: HeightAnimatedChildProps) {
    const { setTransiting } = useAnimatedContainerContext();
    return (
        <motion.div
            onAnimationStart={() => setTransiting(true)}
            onAnimationComplete={() => setTransiting(false)}
            initial={{
                x: "-25%",
                opacity: 0,
                scale: 0.75,
            }}
            animate={{
                x: 0,
                opacity: 1,
                scale: 1,
                transition: {
                    delay: 0,
                    x: { duration: 0.15, delay: 0.075 },
                    opacity: { duration: 0.15, delay: 0.075 },
                    scale: { duration: 0.15, delay: 0.15 },
                },
            }}
            exit={{
                scale: 0.75,
                x: "25%",
                opacity: 0,
                transition: {
                    delay: 0,
                    scale: { duration: 0.15, delay: 0.075 },
                    x: { duration: 0.15, delay: 0.15 },
                    opacity: { duration: 0.15, delay: 0.15 },
                },
            }}
        >{element}</motion.div>
    );
}

export default AnimatedContent;