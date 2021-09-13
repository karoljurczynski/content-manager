import { useState } from "react";
import { getDataFromDatabase, sendDataToDatabase } from "./functions";

import { 
  Form, 
  Heading, 
  Container, 
  Label,
  Select,
  Option, 
  Input, 
  Button 
} from "./styles"


export const AddContent = ({ mode }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [imageObjectFit, setImageObjectFit] = useState("");
  const [imageObjectPosition, setImageObjectPosition] = useState("");
  

  const handleUrlOnChange = (e) => {
    setImageUrl(e.target.value);
  }
  const handleTitleOnChange = (e) => {
    setImageTitle(e.target.value);
  }
  const handleObjectFitSelect = (e) => {
    setImageObjectFit(e.target.value);
  }
  const handleObjectPositionSelect = (e) => {
    setImageObjectPosition(e.target.value);
  }
  const handleImageAdd = async (e) => {
    e.preventDefault();

    const newArray = await getDataFromDatabase(mode)
    const newImage = {
      alt: imageTitle ? imageTitle : `Photo ${newArray.length}`,
      src: imageUrl,
      title: imageTitle,
      style: {
        objectFit: imageObjectFit,
        objectPosition: imageObjectPosition
      }
    }
    newArray.push(newImage);
    sendDataToDatabase(mode, newArray);
  }

  return (
    <Form>
        <Heading>Add { mode === "photos" ? "photo" : "artwork" }</Heading>

        <Container>
          <Label>Enter a external URL of { mode === "photos" ? "photo" : "artwork" }</Label>
          <Input type="text" value={ imageUrl } onChange={ handleUrlOnChange }></Input>
        </Container>

        <Container>
          <Label>Enter a title of { mode === "photos" ? "photo" : "artwork" } (optional)</Label>
          <Input type="text" value={ imageTitle } onChange={ handleTitleOnChange }></Input>
        </Container>

        <Container>
          <Label>Select a object-fit (optional)</Label>
          <Select size="1" onChange={ handleObjectFitSelect }>
            <Option value="contain">Contain</Option>
            <Option value="cover">Cover</Option>
            <Option value="fill">Fill</Option>
            <Option value="none">None</Option>
            <Option value="scale-down">Scale-down</Option>
          </Select>
        </Container>

        <Container>
          <Label>Select a object-position (optional)</Label>
          <Select size="1" onChange={ handleObjectPositionSelect }>
            <Option value="contain">Contain</Option>
            <Option value="cover">Cover</Option>
            <Option value="fill">Fill</Option>
            <Option value="none">None</Option>
            <Option value="scale-down">Scale-down</Option>
          </Select>
        </Container>

        <Container row>
          <Button type="button" onClick={ handleImageAdd }>Add</Button>
          <Button type="button">Clear</Button>
        </Container>
    </Form>
  )
}