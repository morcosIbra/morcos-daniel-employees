import React, { useRef } from "react";
import Papa from "papaparse";
import { FileLabel, FileInput, FileUploader } from "./CsvInput.style.js";

const CsvInput = ({ onFileSelect }) => {
  const fileInput = useRef(null);

  const clearInput = () => (fileInput.current.value = "");

  const handleFileInput = (e) => {
    const commonConfig = { delimiter: "," };
    Papa.parse(e.target.files[0], {
      ...commonConfig,
      header: true,
      complete: (result) => {
        onFileSelect(result.data);
      },
    });
  };

  return (
    <FileUploader>
      <FileLabel
        htmlFor="filePicker"
      >
        Select csv file
      </FileLabel>
      <FileInput
        id="filePicker"
        ref={fileInput}
        type="file"
        accept=".csv"
        style={{ visibility: "hidden" }}
        onClick={clearInput}
        onChange={handleFileInput}
      />
    </FileUploader>
  );
};

export default CsvInput;
