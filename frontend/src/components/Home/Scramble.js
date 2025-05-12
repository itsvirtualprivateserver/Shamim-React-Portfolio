import React, { useState, useEffect } from "react";
import { useScramble } from "use-scramble";

const Component = () => {
  const names = [
    "SHAMIM IMRAN",
    "शमीम इमरान",
    "شميم عمران",
    "ШАМИМ ИМРАН",
    "沙米姆·伊姆兰",
  ];
  const [currentNameIndex, setCurrentNameIndex] = useState(0);

  const { ref } = useScramble({
    text: names[currentNameIndex],
    speed: 0.5,
    tick: 1,
    step: 1,
    scramble: 4,
    seed: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNameIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % names.length;
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [names.length]); // Only depend on names.length which doesn't change

  return <h1 ref={ref} />;
};

export default Component;
