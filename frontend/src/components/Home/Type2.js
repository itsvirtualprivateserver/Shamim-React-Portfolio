import React from "react";
import Typewriter from "typewriter-effect";

function Type2() {
  return (
    <Typewriter
      options={{
        strings: [
          "Shamim Imran",
          "شميم امران",
          "সামিম ইমৰাণ",
          "ШАМИМ ИМРАН",
          "沙米姆·伊姆兰"

        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type2;
