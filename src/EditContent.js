import { useState, useEffect } from "react";
import { getDataFromDatabase, sendDataToDatabase } from "./functions";

import { 
  Form, 
  Heading, 
  Container, 
  Label, 
  Select,
  Option,
  Input, 
  Button,
  LivePreviewContainer,
  LivePreviewPhotoWrapper,
  LivePreviewPhoto,
  FormSectionWrapper,
  LivePreviewHeading
} from "./styles";

export const EditContent = ({ mode }) => {
  const [selectedImageSrc, setSelectedImageSrc] = useState("");
  const [selectedImageId, setSelectedImageId] = useState("");
  const [selectedImageTitle, setSelectedImageTitle] = useState("");
  const [imageObjectPosition, setImageObjectPosition] = useState("50% 50%");
  const [imagesArray, setImagesArray] = useState([]);
  const [percentX, setPercentX] = useState(50);
  const [percentY, setPercentY] = useState(50);
  
  useEffect(async () => { 
    setImagesArray(await getDataFromDatabase(mode)); 

  }, [ mode ]);

  useEffect(() => { 
    setImageObjectPosition(`${percentX}% ${percentY}%`);

  }, [percentX, percentY]);
  
  useEffect(() => {
    setSelectedImageId(0);
    setSelectedImageSrc("");
    setSelectedImageTitle("");
    setImageObjectPosition("50% 50%");
    setPercentX(50);
    setPercentY(50);
    
  }, [ imagesArray ]);

  const getPercentValueFromObjectPosition = (objectPosition, axis) => {
    return objectPosition.split(" ")[axis === "x" ? 0 : 1].split("%")[0];
  }
  

  useEffect(() => {
    if (selectedImageId.length) {
      setSelectedImageSrc(imagesArray[selectedImageId].src);
      setSelectedImageTitle(imagesArray[selectedImageId].title);

      if (imagesArray[selectedImageId].style) {
        setImageObjectPosition(imagesArray[selectedImageId].style.objectPosition);
        setPercentX(getPercentValueFromObjectPosition(imagesArray[selectedImageId].style.objectPosition, "x"));
        setPercentY(getPercentValueFromObjectPosition(imagesArray[selectedImageId].style.objectPosition, "y"));
      }
    }

    return () => {
      setSelectedImageSrc("");
      setSelectedImageTitle("");
      setImageObjectPosition("50% 50%");
      setPercentX(50);
      setPercentY(50);
    }
     
  }, [ selectedImageId ])

  const handleImageSelect = (e) => {
    setSelectedImageId(e.target.value);
  }
  const handleUrlOnChange = (e) => {
    setSelectedImageSrc(e.target.value);
  }
  const handleTitleOnChange = (e) => {
    setSelectedImageTitle(e.target.value);
  }
  const handlePercentXChange = (e) => {
    setPercentX(e.target.value);    
  }
  const handlePercentYChange = (e) => {
    setPercentY(e.target.value);
  }
  const handleImageEdit = async (e) => {
    e.preventDefault();
    const newArray = imagesArray;
    const newImage = {
      alt: selectedImageTitle ? selectedImageTitle : `Photo ${selectedImageId}`,
      src: selectedImageSrc,
      title: selectedImageTitle,
      style: {
        objectPosition: imageObjectPosition
      }
    }
    newArray[selectedImageId] = newImage;
    sendDataToDatabase(mode, newArray);
  }
  const handleImageEditCanceled = (e) => {
    e.preventDefault();
    if (selectedImageId.length) {
      setSelectedImageSrc(imagesArray[selectedImageId].src);
      setSelectedImageTitle(imagesArray[selectedImageId].title);

      if (imagesArray[selectedImageId].style) {
        setImageObjectPosition(imagesArray[selectedImageId].style.objectPosition);
        setPercentX(getPercentValueFromObjectPosition(imagesArray[selectedImageId].style.objectPosition, "x"));
        setPercentY(getPercentValueFromObjectPosition(imagesArray[selectedImageId].style.objectPosition, "y"));
      }
    }
  }

  return (
    <FormSectionWrapper>
    <Form>
        <Heading>Edit { mode === "photos" ? "photo" : "artwork" }</Heading>
        { imagesArray &&
          <Container>
          <Label>Select a { mode === "photos" ? "photo" : "artwork" } to edit</Label>
          <Select size="5" onChange={ handleImageSelect }>
            { imagesArray.map((image, index) => {
              return (
                <Option key={ index } value={ index }>{ image.title ? image.title : image.src }</Option>
              )
              })
            }
          </Select>
        </Container>
        }
        
        <Container>
          <Label>External URL of { mode === "photos" ? "photo" : "artwork" }</Label>
          <Input type="text" value={ selectedImageSrc } onChange={ handleUrlOnChange }></Input>
        </Container>

        <Container>
          <Label>{ mode === "photos" ? "Photo" : "Artwork" } title (optional)</Label>
          <Input type="text" value={ selectedImageTitle } onChange={ handleTitleOnChange }></Input>
        </Container>

        { selectedImageId.length &&
          <>                                     
          <Container>
              <Label>Set horizontal position</Label>
              <Input type="range" min="0" max="100" step="1" value={ percentX } onChange={ handlePercentXChange }></Input>
              <Label>{ percentX }%</Label>
            </Container> 

            <Container>
              <Label>Set vertical position</Label>
              <Input type="range" min="0" max="100" step="1" value={ percentY } onChange={ handlePercentYChange }></Input>
              <Label>{ percentY }%</Label>
            </Container>     
          </>
        }  

        <Container row>
          <Button type="button" onClick={ handleImageEdit }>Save</Button>
          <Button type="button" onClick={ handleImageEditCanceled }>Cancel</Button>
        </Container>   

    </Form>

    { selectedImageSrc &&
      <LivePreviewContainer>
        <LivePreviewHeading>Live preview</LivePreviewHeading>
        <LivePreviewPhotoWrapper>
          <LivePreviewPhoto src={ selectedImageSrc } objectPosition={ imageObjectPosition } alt="Check your photo's path" />
        </LivePreviewPhotoWrapper>
      </LivePreviewContainer>
    }

    </FormSectionWrapper>
  )
}