// IMPORTS

import { useState, useEffect } from "react";
import { getDataFromDatabase, sendDataToDatabase, getPercentValueFromObjectPosition } from "./functions";

import {Form, Heading, Container, Label, Select,
        Option, Input, Button, LivePreviewContainer,
        LivePreviewPhotoWrapper, LivePreviewPhoto,
        FormSectionWrapper, LivePreviewHeading} from "./styles";

  

export const ManageContent = ({ mode, actionType }) => {

  // STATE


  const [imagesArray, setImagesArray] = useState([]);

  const [imageSrc, setImageSrc] = useState("");
  const [imageId, setImageId] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [imageObjectPosition, setImageObjectPosition] = useState("50% 50%");

  const [percentX, setPercentX] = useState(50);
  const [percentY, setPercentY] = useState(50);


  // TOOL FUNCTIONS


  const resetImageValues = () => {
    setImageId(0);
    setImageSrc("");
    setImageTitle("");
    setImageObjectPosition("50% 50%");
    setPercentX(50);
    setPercentY(50);
  }
  const fetchDataFromDatabaseToImagesArray = async () => {
    setImagesArray(await getDataFromDatabase(mode));
  }
  

  // EFFECTS


  // Loads new images from database when mode is changed (photos/artworks)
  useEffect(() => { 
    fetchDataFromDatabaseToImagesArray();
    resetImageValues(); 
  }, [ mode ]);

  // Reset image values when actionType is changed (add/edit/delete)
  useEffect(() => {
    resetImageValues();
  }, [ actionType ])

  // Updates object-position to display image preview correctly when sliders are moved
  useEffect(() => { 
    setImageObjectPosition(`${ percentX }% ${ percentY }%`);
  }, [ percentX, percentY ]);
  
  // Gets image's src, title and other values from array when imageId is changed
  useEffect(() => {
    if (imageId.length) {
      setImageSrc(imagesArray[imageId].src);
      setImageTitle(imagesArray[imageId].title);

      if (imagesArray[imageId].style) {
        setImageObjectPosition(imagesArray[imageId].style.objectPosition);
        setPercentX(getPercentValueFromObjectPosition(imagesArray[imageId].style.objectPosition, "x"));
        setPercentY(getPercentValueFromObjectPosition(imagesArray[imageId].style.objectPosition, "y"));
      }
    }
  }, [ imageId ]);


  // HANDLERS


  const handleSrcOnChange = (e) => {
    setImageSrc(e.target.value);
  }
  const handleTitleChange = (e) => {
    setImageTitle(e.target.value);
  }
  const handleImageSelect = (e) => {
    resetImageValues();
    setImageId(e.target.value);
  }
  const handlePercentXChange = (e) => {
    setPercentX(e.target.value);    
  }
  const handlePercentYChange = (e) => {
    setPercentY(e.target.value);
  }
  

  // ADD IMAGE FUNCTIONS


  const handleImageAdd = async (e) => {
    e.preventDefault();
    const newArray = imagesArray;
    const newImage = {
      alt: imageTitle ? imageTitle : `Image ${imagesArray.length}`,
      src: imageSrc,
      title: imageTitle,
      style: {
        objectPosition: imageObjectPosition
      }
    }
    newArray.push(newImage);
    sendDataToDatabase(mode, newArray);
    resetImageValues();
  }
  const handleImageAddClear = (e) => {
    e.preventDefault();
    resetImageValues();
  }


  // EDIT IMAGE FUNCTIONS


  const handleImageEdit = async (e) => {
    e.preventDefault();
    const newArray = imagesArray;
    const newImage = {
      alt: imageTitle ? imageTitle : `Image ${imageId}`,
      src: imageSrc,
      title: imageTitle,
      style: {
        objectPosition: imageObjectPosition
      }
    }
    newArray[imageId] = newImage;
    sendDataToDatabase(mode, newArray);
    setImagesArray(await getDataFromDatabase(mode));
  }
  const handleImageEditReset = (e) => {
    e.preventDefault();
    resetImageValues();
    if (imageId.length) {
      setImageSrc(imagesArray[imageId].src);
      setImageTitle(imagesArray[imageId].title);

      if (imagesArray[imageId].style) {
        setImageObjectPosition(imagesArray[imageId].style.objectPosition);
        setPercentX(getPercentValueFromObjectPosition(imagesArray[imageId].style.objectPosition, "x"));
        setPercentY(getPercentValueFromObjectPosition(imagesArray[imageId].style.objectPosition, "y"));
      }
    }
  }


  // DELETE IMAGE FUNCTIONS


  const handleImageDelete = async (e) => {
    e.preventDefault();
    const newArray = imagesArray;
    newArray.splice(imageId, 1);
    sendDataToDatabase(mode, newArray);
    resetImageValues();
  }
  const handleImageDeleteCancel = (e) => {
    e.preventDefault();
    resetImageValues();
  }


  // JSX


  return (
    <FormSectionWrapper>
    <Form>
        <Heading>{actionType} {mode === "photos" ? "photo" : "artwork"}</Heading>
        { (imagesArray && actionType !== "Add") &&
          <Container>
          <Label>Select a {mode === "photos" ? "photo" : "artwork"} to {actionType}</Label>
          <Select size="5" onChange={handleImageSelect}>
            { imagesArray.map((image, index) => {
              return (
                <Option key={index} value={index}>{image.title ? image.title : image.src}</Option>
              )
              })
            }
          </Select>
        </Container>
        }

        { actionType !== "Delete" &&
          <>
          <Container>
            <Label>External URL of {mode === "photos" ? "photo" : "artwork"}</Label>
            <Input type="text" value={imageSrc} onChange={handleSrcOnChange}></Input>
          </Container>

          <Container>
            <Label>{ mode === "photos" ? "Photo" : "Artwork" } title (optional)</Label>
            <Input type="text" value={imageTitle} onChange={handleTitleChange}></Input>
          </Container>
          </>
        }
        
        { (imageSrc && actionType !== "Delete") &&
          <>                                     
          <Container>
              <Label>Set horizontal position</Label>
              <Input type="range" min="0" max="100" step="1" value={percentX} onChange={handlePercentXChange}></Input>
              <Label>{percentX}%</Label>
            </Container> 

            <Container>
              <Label>Set vertical position</Label>
              <Input type="range" min="0" max="100" step="1" value={percentY} onChange={handlePercentYChange}></Input>
              <Label>{percentY}%</Label>
            </Container>     
          </>
        }  

        { actionType === "Add" &&
          <Container row>
            <Button type="button" onClick={handleImageAdd}>Add</Button>
            <Button type="button" onClick={handleImageAddClear}>Clear</Button>
          </Container>
        }

        { actionType === "Edit" &&
          <Container row>
            <Button type="button" onClick={handleImageEdit}>Save</Button>
            <Button type="button" onClick={handleImageEditReset}>Reset</Button>
          </Container>
        }

        { actionType === "Delete" &&
          <Container row>
            <Button type="button" onClick={handleImageDelete}>Delete</Button>
            <Button type="button" onClick={handleImageDeleteCancel}>Cancel</Button>
          </Container>
        }

    </Form>

    { imageSrc &&
      <LivePreviewContainer>
        <LivePreviewHeading>Live preview</LivePreviewHeading>
        <LivePreviewPhotoWrapper>
          <LivePreviewPhoto src={imageSrc} objectPosition={imageObjectPosition} alt="Check your photo's path" />
        </LivePreviewPhotoWrapper>
      </LivePreviewContainer>
    }

    </FormSectionWrapper>
  )
}