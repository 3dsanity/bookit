import React from 'react';

const dotWrapStyle = {
  position: 'absolute',
  bottom: '10px',
  left: '50%',
  transform: 'translateX(-50%)',
};

const dotItemStyle = {
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  margin: '0 10px',
  display: 'inline-block',
  cursor: 'pointer',
};

const Dots = ({ length, activeIndex, setActiveIndex }) => {
  return (
    <div style={dotWrapStyle}>
      {new Array(length).fill('').map((_, i) => (
        <span
          onClick={() => setActiveIndex(i)}
          key={i}
          style={{
            ...dotItemStyle,
            background: i === activeIndex ? '#000' : '#999',
            transform: `scale(${i === activeIndex ? 1.3 : 1})`,
          }}
        ></span>
      ))}
    </div>
  );
};

export default Dots;
