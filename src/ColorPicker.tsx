import React, { useState } from 'react';
import styled from 'styled-components';

const CTAButton = styled.button`
  border-radius: 10;
  box-shadow: 3px 3px 5px;
  border: 2px solid black;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid grey;
  max-width: 200px;
`;

const ColorDisplay = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 5px solid hsl(0, 0%, 80%);
  border-radius: 25px;
  margin-bottom: 25px;
  transition: 0.25s ease;
`;

const ColorCode = styled.p`
  color: hsl(0, 0%, 20%);
  font-size: 1rem;
  text-align: center;
`;

const ColorSelector = styled.input`
  width: 75px;
  height: 50px;
  padding: 5px;
  border-radius: 10px;
  border: 3px solid hsl(0, 0%, 80%);
  box-shadow: 3px 3px 2px;
  margin-bottom: 20px;
`;

function ColorPicker(props) {
  const [color, setColor] = useState('#FFFFFF'); // Default color is white

  function handleColorChange(event) {
    setColor(event.target.value);
  }

  return (
    <>
      <CTAButton style={{ backgroundColor: color }}>{props.text}</CTAButton>
      <Container>
        <h4>Button Color Picker</h4>
        <ColorDisplay style={{ backgroundColor: color }}>
          <ColorCode>Selected Color: {color}</ColorCode>
        </ColorDisplay>
        <label>Select a color:</label>
        <ColorSelector type="color" value={color} onChange={handleColorChange} />
    </Container>
    </>
  );
}
export default ColorPicker;
