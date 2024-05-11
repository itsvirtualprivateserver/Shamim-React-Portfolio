import { useScramble } from "use-scramble";

const Component1 = () => {

  // hook returns a ref
  const { ref, replay  } = useScramble({ 
    text:" Hi Everyone, I am Shamim Imran from Guwahati, Assam, India.I am currently employed as a software developer at XEOTEC E-SERVICES. I have completed MCA (Master of Computer Application) at Royal Global University (Guwahati).",
    range: [65,125],
    speed: 0.4,
    tick: 1,
    step: 1,
    scramble: 2,
    seed: 0,
    chance: 1,
    overdrive: false,
    overflow: false,
  });

  // apply the ref to a node
  return <p ref={ref} 
  onFocus={replay}
  />
}

export default Component1;