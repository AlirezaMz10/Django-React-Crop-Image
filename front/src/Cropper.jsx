import { Box, Modal, Slider, Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { FcAddImage } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import "./Cropper.scss";

/*-----------------------------------------
  Author: Ajay Prakash P P
  Date : 13/09/2022
  Github: https://github.com/mrAJAY1
  LinkedIn: https://www.linkedin.com/in/ajay-prakash-8767a9218/
  
  Current Domain : MERN stack
--------------------------------------------*/

// Styles
const boxStyle = {
  width: "300px",
  height: "300px",
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center"
};
const modalStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};


// Container
const Cropper = (props) => {
  const [slideValue, setSlideValue] = useState(10);
  const cropRef = useRef(null);
  // image src
  const [src, setSrc] = useState(null);

  // preview
  const [preview, setPreview] = useState(null);

  // modal state
  const [modalOpen, setModalOpen] = useState(false);

  // ref to control input element
  const inputRef = useRef(null);

  // handle Click
  const handleInputClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };
  // handle Change
  const handleImgChange = (e) => {
    setSrc(URL.createObjectURL(e.target.files[0]));
    setModalOpen(true);
  };

  return (
    <>
      <header>
        <h1>React Avatar Cropper</h1>
        <hr />
      </header>
      <main className="container">
      <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleImgChange}
        />
        <a href="/" onClick={handleInputClick}>
        <div className="img-container">
          <img
            src={
              preview
            }
            alt=""
            width="200"
            height="200"
          />
        </div>
        </a>
      </main>



      <Modal sx={modalStyle} open={modalOpen}>
        <Box sx={boxStyle}>
          <AvatarEditor
            ref={cropRef}
            image={src}
            style={{ width: "100%", height: "100%" }}
            border={50}
            borderRadius={150}
            color={[0, 0, 0, 0.72]}
            scale={slideValue / 10}
            rotate={0}
          />

          {/* MUI Slider */}
          <Slider
            min={10}
            max={50}
            sx={{
              margin: "0 auto",
              width: "80%",
              color: "cyan"
            }}
            size="medium"
            defaultValue={slideValue}
            value={slideValue}
            onChange={(e) => setSlideValue(e.target.value)}
          />
          <Box
            sx={{
              display: "flex",
              padding: "10px",
              border: "3px solid white",
              background: "black"
            }}
          >
            <Button
              size="small"
              sx={{ marginRight: "10px", color: "white", borderColor: "white" }}
              variant="outlined"
              onClick={(e) => setModalOpen(false)}
            >
              cancel
            </Button>
            <Button
              sx={{ background: "#5596e6" }}
              size="small"
              variant="contained"
              onClick={async () => {
                if (cropRef) {
                  const dataUrl = cropRef.current.getImage().toDataURL();
                  const result = await fetch(dataUrl);
                  const blob = await result.blob();
                  setPreview(URL.createObjectURL(blob));
                  setModalOpen(false);
                  props.sendBlob(dataUrl)
                }
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>

      <footer>
      </footer>
    </>
  );
};

export default Cropper;
