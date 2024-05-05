import { useScramble } from "use-scramble";

const Component1 = () => {

  // hook returns a ref
  const { ref, replay  } = useScramble({ 
    text:" Hi Everyone, I am Shamim Imran from Guwahati, Assam, India.I am currently employed as a software developer at XEOTEC E-SERVICES. I have completed MCA (Master of Computer Application) at Royal Global University (Guwahati)."
  });

  // apply the ref to a node
  return <p ref={ref} 
  onFocus={replay}
  />
}

export default Component1;