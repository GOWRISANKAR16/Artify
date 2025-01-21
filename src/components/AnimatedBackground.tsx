import React from 'react';
import { motion } from "framer-motion"

const AnimatedBackground = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[-1] bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute inset-0 opacity-50"
        animate={{
          background: [
            "radial-gradient(circle, #4B0082 0%, transparent 60%)",
            "radial-gradient(circle, #800080 0%, transparent 60%)",
            "radial-gradient(circle, #4B0082 0%, transparent 60%)",
          ],
        }}
        transition={{
          duration: 10,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
    </motion.div>
  )
}

export default AnimatedBackground

