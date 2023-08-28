import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { gsap } from "gsap";

const AnalysePresentation = () => {
  const textValue = ["votre demande", "vos données", "le marché"];
  const primaryColor = useSelector((state) => state?.user?.settings?.fontColor);
  const secondaryColor = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );

  const spanContainerRef = useRef(null);
  const spanRef = useRef(null);
  let currentIndex = 0;

  useEffect(() => {
    const changeText = () => {
      gsap.to(spanRef.current, {
        y: "-100%",
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          spanRef.current.innerHTML =
            textValue[currentIndex % textValue.length];
          gsap.set(spanRef.current, { y: "100%" }); // Reset to the start position
          gsap.to(spanRef.current, {
            y: "0%",
            duration: 0.5,
            ease: "power2.in",
          });
          currentIndex++;
        },
      });
    };

    const intervalId = setInterval(changeText, 2000);

    return () => clearInterval(intervalId);
  }, [textValue]);

  return (
    <div className="lg:block hidden">
      <div>
        <h1
          className="text-xl lg:text-3xl lg:w-FULL lg:mt-0 mt-10 "
          style={{ color: primaryColor }}
        >
          Patientez quelques secondes, analysons{" "}
          <div
            style={{
              overflow: "hidden",
              height: "1.5em",
              display: "flex",
              alignItems: "center",
            }}
            ref={spanContainerRef}
          >
            <span
              ref={spanRef}
              className="text-xl lg:text-4xl"
              style={{
                color: secondaryColor,
                display: "block",
                transform: "translateY(0%)",
              }}
            >
              {textValue[0]}
            </span>
          </div>
        </h1>
      </div>
    </div>
  );
};

export default AnalysePresentation;
