import { motion } from "framer-motion";

interface wrapper {
  children: React.ReactNode;
  x: number;
  y: number;
}

function FadeWrapper({ children, x, y }: wrapper) {
  return (
    <motion.div
      initial={{
        x,
        y,
        opacity: 0,
      }}
      whileInView={{
        x: 0,
        y: 0,
        opacity: 1,
      }}
      transition={{
        delay: 0.1,
      }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}

export default FadeWrapper;
