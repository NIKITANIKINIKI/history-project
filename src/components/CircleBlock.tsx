import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface Category {
  name: string;
  data: EventData[];
}

interface EventData {
  date: string;
  text: string;
}
interface CircleBlockProps {
  event: Category[];
  setCurrentData: (currentData: number) => void
  currentData: number;
  curentPeriod: number
}

const CircleBlock: React.FC<CircleBlockProps> = ({event, setCurrentData, currentData, curentPeriod }) => {
  const radius = 265;
  const centerX = 265;
  const centerY = 265;

  const numButtons = event.length;

  const [currentElement, setCurrentElement]=useState<HTMLDivElement>()
  const containerRef = useRef<HTMLDivElement>(null);


  useEffect(() =>{
    const firstButton=document.querySelector(".small-circle-button") as HTMLDivElement
    if(firstButton){
      handleClick(firstButton, 0);
    }

  }, [])

  useEffect(() =>{

    document.querySelectorAll('.small-circle-button').forEach((button, index) =>{
      if(index==0){
        return
      }
      const element = button as HTMLDivElement;
      delete element.dataset.initialLeft;
      delete element.dataset.initialTop;
    })

  }, [curentPeriod])

  const buttons = Array.from({ length: numButtons }, (_, i) => {
    const angle = (i / numButtons) * (2 * Math.PI) + Math.PI / 3;

    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle) - 3;

    return { x, y };
  });

    const handleClick = (element: HTMLDivElement, index: number) => {
    if(currentElement){

      handleMouseLeave(currentElement, index )  
    }
    
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        rotation: "+=360", 
        duration: 1,
        ease: "power2.out",
        onComplete:() =>{
          handleMouseEnter(element);
        setCurrentElement(element);
        setCurrentData(index);
        }
      });
    }
    
  };

  const handleMouseEnter = (element: HTMLDivElement) => {
    if (!element.dataset.initialLeft || !element.dataset.initialTop) {
      element.dataset.initialLeft = element.style.left;
      element.dataset.initialTop = element.style.top;
    }

    gsap.to(element, {
      width: 56,
      height: 56,
      backgroundColor: "#F4F5F9",
      borderRadius: "50%",
      border: "1px solid #303E5880",
      ease: "power2.out",
      duration: 0.5,
      left: `${parseFloat(element.dataset.initialLeft!) - 25}px`,
      top: `${parseFloat(element.dataset.initialTop!) - 25}px`,
    });
    gsap.to(element.querySelector("span"), {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(element.querySelector(".circle-button-text"), {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (element: HTMLDivElement, index: number) => {

    if(currentData==index){
      return
    }

    gsap.to(element, {
      width: 6,
      height: 6,
      backgroundColor: "#42567A",
      borderRadius: "50%",
      border: "none",
      ease: "power2.out",
      duration: 0.5,
      left: element.dataset.initialLeft,
      top: element.dataset.initialTop,
    });

    gsap.to(element.querySelector("span"), {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(element.querySelector(".circle-button-text"), {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div className="circle-buttons" ref={containerRef}>
      {buttons.map((button, index) => (
        <>
          <div
            key={index}
            onClick={(e) => handleClick(e.currentTarget, index)}
            className="small-circle-button"
            style={{ left: `${button.x}px`, top: `${button.y}px` }}
            onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(e.currentTarget, index)}
          >
            <span>{index+1}</span>
            <div className="circle-button-text">
              <span>{event[index].name}</span>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default CircleBlock;
