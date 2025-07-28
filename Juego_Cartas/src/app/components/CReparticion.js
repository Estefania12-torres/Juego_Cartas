"use client";
import React, { useEffect, useRef } from "react";
import "../test/container.css";
import Baraja from "../components/CBarajado";

export default function Reparticion () {
  const containerRef = useRef(null);
  const boxRef = useRef([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  ]);

  

  const handleShuffle = () => {
    if (containerRef.current && boxRef?.current) {
      const {
        x,
        y,
        height,
        width
      } = containerRef.current?.getBoundingClientRect();

      const targetX = x + width / 2;
      const targetY = y + height / 2;

      boxRef?.current?.forEach((item, index) => {
        const {
          x: childX,
          y: childY,
          height: childHeight,
          width: childWidth
        } = item?.getBoundingClientRect();

        const distanceX = childX + childWidth / 2;
        const distanceY = childY + childHeight / 2;

        item.animate(
          {
            transform: [
              "translate(0px)",
              `translate(${targetX - distanceX}px,${targetY - distanceY}px)`,
              `translate(${targetX - distanceX}px,${targetY - distanceY}px)`,
              "translate(0px)"
            ],
            easing: ["cubic-bezier(0.68,-.55,.265,1.55)"],
            offset: [0, 0.3, 0.7, 1]
          },
          // timing options
          {
            delay: (index * 1500) / 9,
            duration: 3400
          }
        );
      });
    }
  };

  useEffect(() => {
    handleShuffle();
  }, []);

  return (
    <section>
      
      <div className="container" ref={containerRef}>
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="box" ref={(el) => (boxRef.current[index] = el)}>
             {<img src={"/assets/images/tapa.jpg"} />}
          </div>
        ))}
      </div>
     
    </section>
  );
}


