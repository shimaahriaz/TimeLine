import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Timeline = () => {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step < 5) {
      const timeout = setTimeout(() => {
        setProgress((step + 1) * 20); // Update progress
        setTimeout(() => {
          setStep((prev) => prev + 1); // Move to the next step after 1.2 seconds
        }, 1200);
      }, 2000); // Delay before each step

      return () => clearTimeout(timeout); // Cleanup timeout on component unmount
    }
  }, [step]);

  // Reset the animation and progress
  const handleReturn = () => {
    setProgress(0); // Reset progress
    setStep(0); // Reset step
  };

  const events = [
    { year: 2019, text: "Sunt nostrud amet sint do" },
    { year: 2020, text: "Exercitation veniam consequat" },
    { year: 2021, text: "Velit officia consequat duis" },
    { year: 2022, text: "Ullamco est sit aliqua dolor" },
  ];

  return (
    <div className="relative flex flex-col items-center mt-10">
      {/* Title Section */}
      <h2 className="text-2xl font-bold mb-13" style={{ marginBottom: "13rem" }}>
        TIMELINE
      </h2>

      {/* Timeline Container */}
      <div className="relative w-full flex items-center justify-center">
        {/* Animated Timeline Line */}
        <motion.div
          className="absolute top-1/2 left-0 h-1"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 2, ease: "easeInOut" }}
          style={{ width: "0%", height: "2px", background: "#00A9CE" }}
        ></motion.div>

        {/* Events */}
        {events.map((event, index) => (
          <div
            key={index}
            className={`absolute flex flex-col items-center ${
              index % 2 === 0 ? "" : "flex-col-reverse"
            }`}
            style={{
              left: `${(index + 1) * 20}%`,
              transform: "translateX(-50%)",
            }}
          >
            {/* Year */}
            <motion.p
              initial={{ opacity: 0, y: index % 2 === 0 ? -10 : 10 }}
              animate={step > index ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-bold text-center relative"
              style={index % 2 === 0 ? { bottom: "-32px" } : { top: "-32px" }}
            >
              {event.year}
            </motion.p>

            {/* Circle */}
            <motion.div
              initial={{ scale: 0 }}
              animate={step > index ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-6 h-6 rounded-full relative flex items-center justify-center"
              style={{
                top: index % 2 === 0 ? "35px" : "-33px",
                border: "2px solid #23dee9",
              }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ height: "16px", width: "17px", background: "#23dee9" }}
              ></div>
            </motion.div>

            {/* Vertical Line */}
            <motion.div
              initial={{ height: 0 }}
              animate={step > index ? { height: "40px" } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="h-6 bg-gray-400 relative mb-5"
              style={{ top: index % 2 === 0 ? "55px" : "-22px", width: "1px" }}
            ></motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={step > index ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-2 text-sm text-center relative"
              style={index % 2 === 0 ? { top: "30px" } : { bottom: "30px" }}
            >
              {event.text}
            </motion.p>
          </div>
        ))}
      </div>

      {/* Conditionally Render the Reload Button */}
      {progress === 100 && (
        <motion.button
          className="bg-blue-600 text-white text-lg font-semibold rounded-full hover:opacity-90 transition mb-4 flex items-center"
          onClick={handleReturn}
          style={{ padding: "10px 50px", marginTop: "13rem" }}
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }} // Slower hover effect
          whileTap={{ scale: 0.95, transition: { duration: 0.3 } }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 mr-2 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          Reload
        </motion.button>
      )}

      {/* Follow Button */}
      <motion.button
        className="bg-blue-600 text-white text-lg font-semibold rounded-full hover:opacity-90 transition"
        style={{ padding: "12px 105px", marginTop: progress === 100 ? "0rem" : "13rem"  }}
        whileHover={{ scale: 1.05, transition: { duration: 0.3 } }} // Slower hover effect
        whileTap={{ scale: 0.95, transition: { duration: 0.3 } }}
      >
        Follow
      </motion.button>
    </div>
  );
};

export default Timeline;
