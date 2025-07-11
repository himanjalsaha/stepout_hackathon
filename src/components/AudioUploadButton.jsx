
import React, { useState, useRef } from 'react';
import { Upload, Mic, Square, Play, Pause, Trash2 } from 'lucide-react';

// Audio Upload Button Component
const AudioUploadButton = ({ onFileSelect, selectedFile, onRemoveFile }) => {
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  const handleRemoveFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onRemoveFile) {
      onRemoveFile();
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        onChange={handleFileUpload}
        className="hidden"
        id="audio-upload"
      />
      
      <button
        onClick={() => fileInputRef.current.click()}
        className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all duration-200 flex items-center space-x-2 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#21212e]"
      >
        <Upload size={16} />
        <span>Upload Audio</span>
      </button>
      
      {selectedFile && (
        <div className="flex items-center space-x-2 bg-[#1a1a2e] px-3 py-2 rounded-lg border border-gray-600">
          <span className="text-white text-sm max-w-40 truncate">{selectedFile.name}</span>
          <button
            onClick={handleRemoveFile}
            className="text-red-400 hover:text-red-300 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default AudioUploadButton;