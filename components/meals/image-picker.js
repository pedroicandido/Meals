"use client";
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
  const imageInput = useRef();
  const [inputValue, setInputValue] = useState();

  function handlePickClick() {
    imageInput.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (!file) {
      setInputValue(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      console.log(fileReader.result)
      setInputValue(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!inputValue ? (
            <p>No image picked yet.</p>
          ) : (
            <Image src={inputValue} alt="The image selected by user" fill />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id="image"
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
          required
        />
        <button
          type="button"
          className={classes.button}
          onClick={handlePickClick}
        >
          Pick an image
        </button>
      </div>
    </div>
  );
}
