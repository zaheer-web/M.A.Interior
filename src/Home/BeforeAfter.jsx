import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const BeforeAfter = () => {

  const containerRef = useRef(null);

  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // AUTO MOTION
  useEffect(() => {

    let direction = 1;

    const interval = setInterval(() => {

      if (isDragging || isHovering) return;

      setPosition((prev) => {

        if (prev >= 80) direction = -1;
        if (prev <= 20) direction = 1;

        return prev + direction * 0.3;

      });

    }, 30);

    return () => clearInterval(interval);

  }, [isDragging, isHovering]);

  // UPDATE POSITION
  const updatePosition = (clientX) => {

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;

    const percent = (x / rect.width) * 100;

    setPosition(Math.max(0, Math.min(100, percent)));

  };

  // MOUSE MOVE
  const handleMouseMove = (e) => {
    if (isDragging) updatePosition(e.clientX);
  };

  // TOUCH MOVE
  const handleTouchMove = (e) => {
    if (isDragging) updatePosition(e.touches[0].clientX);
  };

  return (

    <section className="py-10 bg-gradient-to-b from-black via-gray-900 to-black text-white">

      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-bold">
            Before <span className="text-yellow-500">&</span> After
          </h2>

          <p className="text-gray-400 mt-4">
            See how we transform ordinary spaces into beautiful interiors
          </p>

        </div>

        {/* SLIDER */}

        <div
          ref={containerRef}
          className="relative w-full h-[420px] rounded-2xl overflow-hidden shadow-2xl select-none"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseUp={() => setIsDragging(false)}
          onTouchEnd={() => setIsDragging(false)}
        >

          {/* AFTER IMAGE */}

          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6"
            className="absolute w-full h-full object-cover"
            alt=""
          />

          {/* BEFORE IMAGE */}

          <div
            className="absolute top-0 left-0 h-full overflow-hidden"
            style={{ width: `${position}%` }}
          >

            <img
              src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
              className="w-full h-full object-cover"
              alt=""
            />

          </div>

          {/* HANDLE */}

          <motion.div
            className="absolute top-0 h-full flex items-center justify-center cursor-ew-resize"
            style={{ left: `${position}%` }}
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
          >

            <div className="w-[3px] h-full bg-white"></div>

            <div className="absolute w-10 h-10 rounded-full bg-yellow-500 border-4 border-white shadow-lg"></div>

          </motion.div>

        </div>

      </div>

    </section>

  );

};

export default BeforeAfter;