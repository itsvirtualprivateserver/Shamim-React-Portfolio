import React, { useState, useEffect } from "react";
import { ImPointRight } from "react-icons/im";
import { useScramble } from "use-scramble";

const Component2 = () => {
  const names = ["Playing Games", "Cooking", "Travelling"];
  const [currentNameIndex, setCurrentNameIndex] = useState(0);

  const { ref } = useScramble({
    text: names[currentNameIndex],
    speed: 0.3,
    tick: 1,
    step: 1,
    scramble: 4,
    seed: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNameIndex((prevIndex) => (prevIndex + 1) % names.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [names.length]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        fontFamily: "IBM Plex Mono",
      }}
    >
      <ImPointRight />
      <span>&nbsp;&nbsp; --- &nbsp;&nbsp;</span>
      <h3>
        <span ref={ref} />
        <span style={{ display: "none" }}>{names[currentNameIndex]}</span>
      </h3>
    </div>
  );
};

export default Component2;
