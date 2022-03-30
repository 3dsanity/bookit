import React from 'react';
import { motion } from 'framer-motion';

const pageStyle = {
  width: '100%',
  height: '100%',
  position: 'absolute',
};

const Slider = ({ x, i, onDragEnd, children }) => (
  <motion.div
    style={{
      ...pageStyle,
      x,
      left: `${i * 100}%`,
      right: `${i * 100}%`,
    }}
    drag="x"
    dragElastic={0.3}
    onDragEnd={onDragEnd}
  >
    {children}
  </motion.div>
);

export default Slider;
