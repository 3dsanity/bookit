import {
  animate,
  AnimationOptions,
  motion,
  MotionStyle,
  PanInfo,
  useMotionValue,
} from 'framer-motion';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';

import Arrow from './arrow';
import Slider from './slider';
import Dots from './dots';

const transition = {
  type: 'spring',
  bounce: 0,
};

export const Carousel = ({
  children,
  renderArrowLeft,
  renderArrowRight,
  renderDots,
  autoPlay = false,
  interval = 2000,
  loop = true,
}) => {
  const x = useMotionValue();
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);

  const handleEndDrag = (e, dragProps) => {
    const clientWidth = containerRef.current?.clientWidth || 0;

    const { offset } = dragProps;

    if (offset.x > clientWidth / 4) {
      handlePrev();
    } else if (offset.x < -clientWidth / 4) {
      handleNext();
    } else {
      animate(x, calculateNewX(), transition);
    }
  };

  const childrens = React.Children.toArray(children);

  const handlePrev = () => {
    const idx = loop ? childrens.length - 1 : 0;
    setIndex(index - 1 < 0 ? idx : index - 1);
  };

  useEffect(() => {
    const calculateNewX = () => -index * containerRef.current.clientWidth || 0;

    const controls = animate(x, calculateNewX(), transition);
    return controls.stop;
  }, [index, x]);

  const handleNext = useCallback(() => {
    const idx = loop ? 0 : index;
    setIndex(index + 1 === children.length ? idx : index + 1);
  }, [children.length, index, loop]);

  useEffect(() => {
    if (!autoPlay) {
      return;
    }
    const timer = setInterval(() => handleNext(), interval);
    return () => clearInterval(timer);
  }, [interval, autoPlay, children.length, index, loop, handleNext]);

  return (
    <div ref={containerRef} className="custom-carousel">
      {childrens.map((child, i) => (
        <Slider onDragEnd={handleEndDrag} x={x} i={i} key={i}>
          {child}
        </Slider>
      ))}
      {renderArrowLeft ? (
        renderArrowLeft({ handlePrev, activeIndex: index })
      ) : (
        <Arrow left onClick={handlePrev}>
          <MdKeyboardArrowLeft />
        </Arrow>
      )}

      {/* right arrow */}
      {renderArrowRight ? (
        renderArrowRight({ handleNext, activeIndex: index })
      ) : (
        <Arrow onClick={handleNext}>
          <MdKeyboardArrowRight />
        </Arrow>
      )}

      {/* dots */}
      {renderDots ? (
        renderDots({ setActiveIndex: setIndex, activeIndex: index })
      ) : (
        <Dots
          length={childrens.length}
          setActiveIndex={setIndex}
          activeIndex={index}
        />
      )}
    </div>
  );
};
