import React, { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import axios from "axios";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [convert, setConvert] = useState("");
  const [downloadError, setDownloadError] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleConvert = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setConvert("Please select a file");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:3001convertFile",
        formData,
        {
          responseType: "blob",
        }
      );
      console.log("Response: ", response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        selectedFile.name.replace(/\.[^\.]+$/, "") + ".pdf"
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      setSelectedFile(null);
      setDownloadError("");
      setConvert("File converted successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center w-full max-w-md border-2 border-dashed border-gray-600">
        <h2 className="text-2xl font-semibold text-white mb-2">
          Convert Word to PDF Online
        </h2>
        <p className="text-gray-400 mb-6">
          Easily convert Word documents to PDF format online, without having to
          install any software.
        </p>

        {/* File Input */}
        <label className="block mb-4">
          <div className="flex items-center justify-center bg-gray-700 rounded-lg py-4 px-6 cursor-pointer">
            <FaFileUpload className="text-2xl text-white mr-2" />
            <span className="text-white">
              {selectedFile ? selectedFile?.name : "CHOOSE FILE"}
            </span>
            <input type="file" className="hidden" onClick={handleFileChange} />
          </div>
        </label>

        {/* Convert Button */}
        <button
          onClick={handleConvert}
          disabled={!selectedFile}
          className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg"
        >
          Convert File
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
