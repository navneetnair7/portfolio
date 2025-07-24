"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export const LoadingScreen = ({ children, duration = 7000 }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0);

  // Array of "Hello" in different languages
  const greetings = [
    { text: "Hello", lang: "English" },
    { text: "Hola", lang: "Spanish" },
    { text: "Bonjour", lang: "French" },
    { text: "Guten Tag", lang: "German" },
    { text: "Ciao", lang: "Italian" },
    { text: "こんにちは", lang: "Japanese" },
    { text: "안녕하세요", lang: "Korean" },
    { text: "你好", lang: "Chinese" },
    { text: "Привет", lang: "Russian" },
    { text: "Olá", lang: "Portuguese" },
    { text: "Hej", lang: "Swedish" },
  ];

  useEffect(() => {
    let timeoutId = null;
    
    // Function to calculate interval based on progress
    const getInterval = (progress) => {
      // Start slow (800ms), end fast (200ms)
      return 800 - (progress * 500);
    };

    const startLanguageCycle = () => {
      const startTime = Date.now();
      let currentIndex = 0;
      const cyclingDuration = duration - 1000; // Reserve last 1 second for pause

      const updateLanguage = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / cyclingDuration, 1);
        
        if (progress < 1) {
          setCurrentLanguageIndex(currentIndex % greetings.length);
          currentIndex++;
          
          const nextInterval = getInterval(progress);
          timeoutId = setTimeout(updateLanguage, nextInterval);
        } else {
          // Pause at "Hello" for the last 1 second
          setCurrentLanguageIndex(0); // Index 0 is "Hello"
        }
      };

      updateLanguage();
    };

    startLanguageCycle();

    // Main timer for loading completion
    const mainTimer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setShowContent(true), 300);
    }, duration);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      clearTimeout(mainTimer);
    };
  }, [duration, greetings.length]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          >
            <div className="text-center">
              {/* Main Greeting Text */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentLanguageIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="mb-4"
                >
                  <h1 className="text-7xl md:text-9xl font-light text-white mb-2 tracking-wide">
                    {greetings[currentLanguageIndex]?.text || "Hello"}
                  </h1>
                </motion.div>
              </AnimatePresence>

              {/* Apple-style Progress Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-12"
              >
                <div className="w-48 h-1 bg-gray-800 rounded-full mx-auto overflow-hidden">
                  <motion.div
                    className="h-full bg-white rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: duration / 1000, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>

              {/* Small loading dots (Apple style) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="flex items-center justify-center space-x-1 mt-8"
              >
                {[...Array(3)].map((_, index) => (
                  <motion.div
                    key={index}
                    className="w-2 h-2 bg-gray-600 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            </div>

            {/* Subtle background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-50" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
