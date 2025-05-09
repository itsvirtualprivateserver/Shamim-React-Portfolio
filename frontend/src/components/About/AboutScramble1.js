import React, { useState, useEffect } from "react";
import { ImPointRight } from "react-icons/im";
import { useScramble } from "use-scramble";

const Component2 = () => {
  const names = ["Playing Games", "Cooking", "Travelling"];
  const [currentNameIndex, setCurrentNameIndex] = useState(0);

  // Hook returns a ref
  const { ref, setText } = useScramble({
    text: names[currentNameIndex],
    speed: 0.3,
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
  return (
    <div style={{ display: 'flex', alignItems: 'center' , fontFamily:"IBM Plex Mono" }}>
      <ImPointRight/> <span>&nbsp;&nbsp; --- &nbsp;&nbsp;</span>
      <h3  ref={ref} />
    </div>
  );
  
;
};

export default Component2;
