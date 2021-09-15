import styled from "styled-components";

export const Wrapper = styled.div`
  font-family: 'Arial', sans-serif;
  position: relative;
  z-index: 2;
  width: fit-content;
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
  width: 80px;
  background: #005994;
  height: 750px;
`;

export const FormSection = styled.section`
  width: calc(100% - 80px);
  height: 100%;
  overflow-x: hidden;
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

export const FormSectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;
export const Heading = styled.h2`
  font-weight: 100;   
  color: black;
  font-size: 26px;
  margin: 0;
  user-select: none;
  margin-bottom: 15px;
`;


// LIVE PREVIEW


export const LivePreviewContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
`;
export const LivePreviewPhotoWrapper = styled.div`
  height: 660px;
  width: 498.66px;
`;
export const LivePreviewHeading = styled.h2`
  font-weight: 100;   
  color: black;
  font-size: 26px;
  margin: 0;
  user-select: none;  
  width: 100%;
  text-align: left;
  margin-bottom: 16px;
`;
export const LivePreviewPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 1px solid black;

  ${({ objectPosition }) => objectPosition && `
    object-position: ${objectPosition};
  `}
`;

export const Form = styled.form`
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 300px;
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
  cursor: pointer;
  transition: 0.2s ease;

  ${({ isSwitchAtLeft }) => !isSwitchAtLeft && `left: 12px`}
`;

export const SwitchBackground = styled.span`
  position: absolute;
  bottom: 15px;
  width: 25px;
  height: 12px;
  background: white;
  border-radius: 20px;
  border: 2px solid black;
  cursor: pointer;
`;