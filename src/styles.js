import styled from "styled-components";

export const Wrapper = styled.div`
  font-family: 'Arial', sans-serif;
  position: relative;
  z-index: 2;
  width: 600px;
  height: 600px;
  margin: 0 50%;
  transform: translateX(-50%);
  box-sizing: border-box;
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  border-radius: 10px;
`;

export const ButtonsSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px 0 0 10px;
  width: 20%;
  height: 600px;
  background: #005994;
`;

export const FormSection = styled.section`
  width: 80%;
  height: 100%;
  padding: 15px;
  max-height: calc(100% - 30px);
  overflow-x: hidden;
  overflow-y: scroll;
`;

export const RoundButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  border: none;
  outline: none;
  cursor: pointer;
  margin-top: 10px;
  user-select: none;

  img {
    width: 70%;
    height: auto;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`;
export const Heading = styled.h2`
  font-weight: 100;   
  color: black;
  font-size: 26px;
  margin: 0;
  user-select: none;
  margin-bottom: 15px;
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  
  ${({ row }) => row && `
    flex-direction: row;
  `}

  * > & {
    margin-bottom: 15px;
  }
`;

export const Input = styled.input`
  padding: 5px;
  font-size: 18px;
  width: 250px;
`;

export const Label = styled.label`
  font-size: 16px;
  margin-bottom: 2px;
`;

export const Button = styled.button`
  font-size: 24px;
  margin-bottom: 50px;
  margin-right: 10px;
  user-select: none;
`;

export const Select = styled.select`
  width: 100%;
  padding: 5px;
  max-height: 100px;
  user-select: none;
`;

export const Option = styled.option`
  width: 100%;
`;

export const Preview = styled.img`
  width: 100%;
  height: auto;
`;

export const SwitchButton = styled.button`
  position: absolute;
  left: -5px;
  top: 50%;
  bottom: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  background: white;
  border: 2px solid black;
  border-radius: 20px;
`;

export const SwitchBackground = styled.span`
  position: absolute;
  bottom: 15px;
  width: 25px;
  height: 12px;
  background: white;
  border-radius: 20px;
  border: 2px solid black;
`;