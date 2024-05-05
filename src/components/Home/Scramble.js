import React, { useState, useEffect } from "react";
import { useScramble } from "use-scramble";

const Component = () => {
  const names = ["SHAMIM IMRAN", "शमीम इमरान", "شميم عمران", "ШАМИМ ИМРАН" , "沙米姆·伊姆兰"];
  const [currentNameIndex, setCurrentNameIndex] = useState(0);

  // Hook returns a ref
  const { ref, setText } = useScramble({
    text: names[currentNameIndex],
    speed: 0.6,
    tick: 1,
    step: 1,
    scramble: 4,
    seed: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Change the index to display the next name
      setCurrentNameIndex((prevIndex) => (prevIndex + 1) % names.length);
      setText(names[currentNameIndex]);
    }, 3000); // Change the name every 3 seconds

    return () => clearInterval(interval);
  }, [currentNameIndex, names, setText]);

  // Apply the ref to a node
  return <h1 ref={ref} />;
};

export default Component;
