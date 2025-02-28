import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Timeline = () => {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step < 5) {
      const timeout = setTimeout(() => {
        setProgress((step + 1) * 20);
        setTimeout(() => {
          setStep((prev) => prev + 1);
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
    { year: 2022, text: "Ullamco est sit aliqua " },
  ];

  return (
    <div className="relative flex flex-col items-center">
      {/* Title Section */}
      <h2
        className="text-2xl font-bold mb-13 mt-10 text-white"
        style={{
          marginBottom: "3rem",
          letterSpacing: "5px",
          fontSize: "30px",
          fontWeight: 700,
        }}
      >
        TIMELINE
      </h2>

      {/* Timeline Container */}
      <div
      className="w-full md:w-4/5 lg:w-3/5"
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          
          background: "#fff",
          borderRadius: "20px",
          minHeight: "65vh",
        }}
      >
        <div
          style={{
            width: " 67px",
            height: " 64px",
            borderRadius: "50%",
            position: "absolute",
            left: "17%",
            top: "154px",
            background: "linear-gradient(to right, #0072ff, #00c6ff)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        ></div>

        <div
          style={{
            width: "100%",
            margin: "0 auto",
            padding: "2rem 6rem",
            textAlign: "center",
          }}
        >
          <div className="relative w-full flex items-center justify-center ">
            {/* Animated Timeline Line */}
            <motion.div
              className="absolute top-1/2 left-0 h-1 hidden sm:block"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 2, ease: "easeInOut" }}
              style={{ width: "0%", height: "2px", background: "#00A9CE" }}
            ></motion.div>

            {/* Events */}
            {events?.map((event, index) => (
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
                  style={{
                    ...(index % 2 === 0
                      ? { bottom: "-32px" }
                      : { top: "-32px" }),
                    fontSize: "21px",
                    color: "#2c2cd6",
                    fontWeight: 700,
                  }}
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
                    top: index % 2 === 0 ? "30px" : "-30px",
                    border: "2px solid #23dee9",
                  }}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      height: "16px",
                      width: "17px",
                      background: "#23dee9",
                    }}
                  ></div>
                </motion.div>

                {/* Vertical Line */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={step > index ? { height: "40px" } : {}}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="h-6 bg-gray-400 relative mb-5"
                  style={{
                    top: index % 2 === 0 ? "55px" : "-22px",
                    width: "1px",
                  }}
                ></motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={step > index ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="mt-2 text-sm text-center relative"
                  style={{
                    ...(index % 2 === 0 ? { top: "30px" } : { bottom: "30px" }),
                    fontWeight: "400",
                    fontSize: "15px",
                    color: "#4a4747",
                  }}
                >
                  {event?.text}
                </motion.p>
              </div>
            ))}
          </div>

          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              position: "relative",

              top: "95px",
              gap: "40px",
              marginTop: "5rem",
            }}
          >
            {/* Conditionally Render the Reload Button */}

            <motion.button
              className="text-white text-lg font-semibold rounded-full hover:opacity-90 transition flex items-center"
              onClick={handleReturn}
              style={{
                border: "1px solid #c4c4c4",
                padding: "10px 30px",
                fontSize: "18px",
                fontWeight: 400,

                color: "#c4c4c4",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: progress === 100 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.5 } }}
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

            {/* Follow Button */}
            <motion.button
              className=" text-white text-lg font-semibold rounded-full hover:opacity-90 transition"
              style={{
                padding: "14px 113px",
                fontWeight: 700,
                fontSize: "18px",
                background: "linear-gradient(to right, #0072ff, #00c6ff)",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              whileHover={{ scale: 1.05, transition: { duration: 0.5 } }} // Slower hover effect
              whileTap={{ scale: 0.95, transition: { duration: 0.5 } }}
            >
              Follow
            </motion.button>
          </div>
        </div>

        <div
          style={{
            width: "140px",
            height: "139px",
            borderRadius: "50%",
            position: "absolute",
            left: "76%",
            background:
              "linear-gradient(to right, rgb(0, 114, 255), rgb(0, 198, 255))",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px",
            bottom: "60px",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Timeline;
