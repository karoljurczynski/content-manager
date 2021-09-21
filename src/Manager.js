// IMPORTS

import { useState, useEffect } from "react";
import { Switch } from './Switch';
import { getDataFromDatabase, sendDataToDatabase, getPercentValueFromObjectPosition } from "./functions";

import { Form, Heading, Container, Label, Select,
         Option, Input, Button, LivePreviewContainer,
         LivePreviewPhotoWrapper, LivePreviewPhoto,
         FormSectionWrapper, LivePreviewHeading,
         DragListContainer, DragListItem } from "./styles";

  

export const Manager = ({ mode, actionType, setIsOrderButtonDisabled }) => {

  // STATE


  const [imagesArray, setImagesArray] = useState([]);
  const [isDesktopPreview, setIsDesktopPreview] = useState(true);
  const [isRandomOrderOn, setIsRandomOrderOn] = useState(true);

  const [imageSrc, setImageSrc] = useState("");
  const [imageId, setImageId] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [imageDesktopObjectPosition, setImageDesktopObjectPosition] = useState("50% 50%");
  const [imageMobileObjectPosition, setImageMobileObjectPosition] = useState("50% 50%");

  const [percentXDesktop, setPercentXDesktop] = useState(50);
  const [percentXMobile, setPercentXMobile] = useState(50);

  const [draggableObject, setDraggableObject] = useState({});
  const [dropLocation, setDropLocation] = useState(null);


  // TOOL FUNCTIONS


  const resetImageValues = () => {
    setImageId(0);
    setImageSrc("");
    setImageTitle("");
    setImageDesktopObjectPosition("50% 50%");
    setImageMobileObjectPosition("50% 50%");
    setPercentXDesktop(50);
    setPercentXMobile(50);
  }
  const blockAllButtons = () => {
    console.log(document.querySelectorAll("button"));
    document.querySelectorAll("button").forEach(button => {
      button.disabled = true;
    });
  }
  const fetchDataFromDatabaseToImagesArray = async () => {
    const databaseData = await getDataFromDatabase(mode);
    setImagesArray(databaseData);
    if (!databaseData.length) {
      blockAllButtons();
      window.location.reload();
    }  
  }
  const unselectAllImages = () => {
    document.querySelectorAll("option").forEach(option => {
      option.selected = false;
    });
  }
  

  // EFFECTS


  // Loads new images from database when mode is changed (photos/artworks)
  useEffect(() => { 
    fetchDataFromDatabaseToImagesArray();
    setIsDesktopPreview(true);
    setIsRandomOrderOn(true);
    resetImageValues();
    unselectAllImages(); 
  }, [ mode ]);

  // Reset image values and preview when actionType is changed (add/edit/delete)
  useEffect(() => {
    setIsDesktopPreview(true);
    resetImageValues();
    unselectAllImages();
  }, [ actionType ]);

  // Updates object-position for desktop to display image preview correctly when sliders are moved
  useEffect(() => { 
    setImageDesktopObjectPosition(`${ percentXDesktop }% 50%`);
  }, [ percentXDesktop ]);

  // Updates object-position for mobile to display image preview correctly when sliders are moved
  useEffect(() => { 
    setImageMobileObjectPosition(`${ percentXMobile }% 50%`);
  }, [ percentXMobile ]);
  
  // Gets image's src, title and other values from array when imageId is changed
  useEffect(() => {
    if (imageId.length) {
      setImageSrc(imagesArray[imageId].src);
      setImageTitle(imagesArray[imageId].title);

      if (imagesArray[imageId].style) {
        setImageDesktopObjectPosition(imagesArray[imageId].style.objectPosition);
        setPercentXDesktop(getPercentValueFromObjectPosition(imagesArray[imageId].style.objectPosition, "x"));
      }

      if (imagesArray[imageId].mobileStyles) {
        setImageMobileObjectPosition(imagesArray[imageId].mobileStyles.objectPosition);
        setPercentXMobile(getPercentValueFromObjectPosition(imagesArray[imageId].mobileStyles.objectPosition, "x"));
      }
    }
  }, [ imageId ]);

  // Disables order menu button when random order is true
  useEffect(() => {
    isRandomOrderOn ? setIsOrderButtonDisabled(true) : setIsOrderButtonDisabled(false);
  }, [ isRandomOrderOn ])


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
  const handlePercentXDesktopChange = (e) => {
    setPercentXDesktop(e.target.value);    
  }
  const handlePercentXMobileChange = (e) => {
    setPercentXMobile(e.target.value);    
  }
  const handleRandomOrderCheckbox = (e) => {
    setIsRandomOrderOn(e.target.checked);
  }
  const changePreviewType = () => {
    setIsDesktopPreview(!isDesktopPreview);
  }  


  // ADD IMAGE FUNCTIONS


  const handleImageAdd = async (e) => {
    e.preventDefault();
    if (imageSrc.length) {
      const newArray = imagesArray;
      const newImage = {
        alt: imageTitle ? imageTitle : `Image ${imagesArray.length}`,
        src: imageSrc,
        title: imageTitle,
        style: {
          objectPosition: imageDesktopObjectPosition
        },
        mobileStyles: {
          objectPosition: imageMobileObjectPosition
        }
      }
      newArray.push(newImage);
      sendDataToDatabase(mode, newArray);
      resetImageValues();
    }
    else {
      alert("Image source field cannot be empty!");
    }
  }
  const handleImageAddClear = (e) => {
    e.preventDefault();
    resetImageValues();
  }


  // EDIT IMAGE FUNCTIONS


  const handleImageEdit = async (e) => {
    e.preventDefault();
    if (imageSrc.length) {
      const newArray = imagesArray;
      const newImage = {
        alt: imageTitle ? imageTitle : `Image ${imageId}`,
        src: imageSrc,
        title: imageTitle,
        style: {
          objectPosition: imageDesktopObjectPosition
        },
        mobileStyles: {
          objectPosition: imageMobileObjectPosition
        }
      }
      newArray[imageId] = newImage;
      sendDataToDatabase(mode, newArray);
      fetchDataFromDatabaseToImagesArray();
    }
  }
  const handleImageEditReset = (e) => {
    e.preventDefault();
    setImageSrc(imagesArray[imageId].src);
    setImageTitle(imagesArray[imageId].title);

    if (imagesArray[imageId].style) {
      setImageDesktopObjectPosition(imagesArray[imageId].style.objectPosition);
      setPercentXDesktop(getPercentValueFromObjectPosition(imagesArray[imageId].style.objectPosition, "x"));
    }

    if (imagesArray[imageId].mobileStyles) {
      setImageMobileObjectPosition(imagesArray[imageId].mobileStyles.objectPosition);
      setPercentXMobile(getPercentValueFromObjectPosition(imagesArray[imageId].mobileStyles.objectPosition, "x"));
    }
    fetchDataFromDatabaseToImagesArray();
  }


  // DELETE IMAGE FUNCTIONS


  const handleImageDelete = async (e) => {
    e.preventDefault();
    const newArray = imagesArray;
    newArray.splice(imageId, 1);
    sendDataToDatabase(mode, newArray);
    setImagesArray(await getDataFromDatabase(mode));
  }
  const handleImageDeleteCancel = (e) => {
    e.preventDefault();
    resetImageValues();
  }


  // ORDER IMAGE FUNCTIONS


  const handleDragStart = (e) => {
    imagesArray.forEach((image, index) => {
      if (image.title === e.target.textContent) {
        setDraggableObject(imagesArray[index]);
      }
    });
    setDropLocation(Number(e.target.id));
    
    e.target.style.fontWeight = "bold";
  }
  const handleDragEnd = (e) => {
    let newArray = imagesArray;
    const dragIndex = Number(e.target.id);
    const dropIndex = Number(dropLocation);
    
    if (dragIndex > dropIndex) {
      for (let i = dragIndex; i > dropIndex; i--)
        newArray[i] = newArray[i - 1];
    }
    if (dragIndex < dropIndex) {
      for (let i = dragIndex; i < dropIndex; i++)
        newArray[i] = newArray[i + 1];
    }

    newArray[dropIndex] = draggableObject;
    setImagesArray(newArray);
    setDraggableObject({});
    setDropLocation(null);
    e.target.style.fontWeight = "normal";
  }
  const handleDragEnter = (e) => {
    setDropLocation(Number(e.target.id));
    e.target.style.borderTop = "2px solid red";
  }
  const handleDragLeave = (e) => {
    e.target.style.borderTop = "none";
  }
  const handlePreview = (e) => {
    imagesArray.forEach((image, index) => {
      if (image.title === e.target.textContent) {
        setImageId(String(index));
      }
    });
  }
  const handleImagesOrderSave = (e) => {
    e.preventDefault();
    resetImageValues();
    sendDataToDatabase(mode, imagesArray);
    fetchDataFromDatabaseToImagesArray();
  }
  const handleImagesOrderReset = (e) => {
    e.preventDefault();
    resetImageValues();
    fetchDataFromDatabaseToImagesArray();
  }

  
  // JSX


  return (
    <FormSectionWrapper>
    <Form>
        <Heading>{actionType} {mode === "photos" ? "photo" : "artwork"}</Heading>
        { (imagesArray && ((actionType !== "Add") && (actionType !== "Order"))) &&
            <Container>
              <Label htmlFor="imageSelect">Select a {mode === "photos" ? "photo" : "artwork"} to {actionType.toLowerCase()}</Label>
              <Select name="imageSelect" size="5" onChange={handleImageSelect}>
                { imagesArray.map((image, index) => {
                  return (
                    <Option key={index} value={index}>{image.title ? image.title : image.src}</Option>
                  )
                  })
                }
              </Select>
            </Container>
        }

        { ((actionType !== "Delete") && (actionType !== "Order")) &&
          <>
            <Container>
              <Label htmlFor="srcInput">External URL of {mode === "photos" ? "photo" : "artwork"}</Label>
              <Input type="text" name="srcInput" value={imageSrc} onChange={handleSrcOnChange} required></Input>
            </Container>

            <Container>
              <Label htmlFor="titleInput">{ mode === "photos" ? "Photo" : "Artwork" } title (optional)</Label>
              <Input type="text" name="titleInput" value={imageTitle} onChange={handleTitleChange}></Input>
            </Container>
          </>
        }
        
        { (imageSrc && ((actionType !== "Delete") && (actionType !== "Order")) && isDesktopPreview) &&
          <>                                     
            <Container>
              <Label htmlFor="percentXDesktopSlider">Set {mode === "photos" ? "photo's" : "artwork's"} position on desktop</Label>
              <Input type="range" name="percentXDesktopSlider" min="0" max="100" step="1" value={percentXDesktop} onChange={handlePercentXDesktopChange}></Input>
              <Label>{percentXDesktop}%</Label>
            </Container>
          </>
        }

        { (imageSrc && ((actionType !== "Delete") && (actionType !== "Order")) && !isDesktopPreview) &&
          <>                               
            <Container>
              <Label htmlFor="percentXMobileSlider">Set {mode === "photos" ? "photo's" : "artwork's"} position on mobile</Label>
              <Input type="range" name="percentXMobileSlider" min="0" max="100" step="1" value={percentXMobile} onChange={handlePercentXMobileChange}></Input>
              <Label>{percentXMobile}%</Label>
            </Container>
          </>
        }

        { actionType === "Edit" &&
            <Container>
              <Label>Display {mode} in random order</Label>
              <Input type="checkbox" name="isImagesLoadRandomly" onChange={handleRandomOrderCheckbox} checked={isRandomOrderOn}></Input>
            </Container>
        }
        { (imagesArray && actionType === "Order") &&
          <Container>
            <Label>Set {mode} order</Label>
            <DragListContainer>
              { imagesArray.map((image, index) => {
                  return (
                    <DragListItem
                      key={index}
                      id={index}
                      draggable={true}
                      onPointerEnter={handlePreview}
                      onDragStart={handleDragStart}
                      onDragEnter={handleDragEnter}
                      onDragLeave={handleDragLeave}
                      onDragEnd={handleDragEnd}>
                      {image.title}
                    </DragListItem>
                  )
                })
              }
            </DragListContainer>
          </Container>
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
        { actionType === "Order" &&
          <Container row>
            <Button type="button" onClick={handleImagesOrderSave}>Save</Button>
            <Button type="button" onClick={handleImagesOrderReset}>Reset</Button>
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
        <LivePreviewHeading>{isDesktopPreview ? "Desktop" : "Mobile"} preview</LivePreviewHeading>
        <Switch previewChanger onClickFunction={changePreviewType} />
        <LivePreviewPhotoWrapper mode={mode} isDesktopPreview={isDesktopPreview}>
          <LivePreviewPhoto src={imageSrc} objectPosition={isDesktopPreview ? imageDesktopObjectPosition : imageMobileObjectPosition} alt="Check your image's path" />
        </LivePreviewPhotoWrapper>
      </LivePreviewContainer>
    }

    </FormSectionWrapper>
  )
}