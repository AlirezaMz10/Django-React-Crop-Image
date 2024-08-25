import "./styles.css";
import Cropper from "./Cropper";
import { useState } from 'react'
import axios from 'axios';

function App() {
  const [imgBlob, setImgBlob] = useState("")
  const sendBlob = (blob) => {
    setImgBlob(blob)
  }
  return (
    <>
      <div className="App">
        <Cropper sendBlob={sendBlob}/>
      <input value="Save" type="button" onClick={()=>{
         axios.post("http://127.0.0.1:8000/app/index/", {
          blob: imgBlob
        })
      }}/>
      </div>
    </>
  );
}

export default App;
