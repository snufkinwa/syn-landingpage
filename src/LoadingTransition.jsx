import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingTransition({ isLoading, destination }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) return;
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 10;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    if (isLoading && progress >= 90) {
      setTimeout(() => setProgress(100), 500);
    }
  }, [isLoading, progress]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-50"
        >
          <div className="text-center space-y-8">
            {/* Animated Logo */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
              animate={{ 
                scale: [0.5, 1.1, 1],
                opacity: 1,
                rotate: 0
              }}
              transition={{ 
                duration: 0.6,
                ease: "easeOut"
              }}
              className="flex justify-center"
            >
              <motion.img
                src="/synaptik-logo.png"
                alt="Synaptik"
                className="w-32 h-32 object-contain"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
