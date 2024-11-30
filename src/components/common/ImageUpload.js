import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const ImageUpload = ({ onUploadSuccess, onUploadError, multiple = false }) => {
  const onDrop = useCallback(async (acceptedFiles) => {
    const formData = new FormData();
    
    if (multiple) {
      acceptedFiles.forEach(file => {
        formData.append('images', file);
      });
    } else {
      formData.append('image', acceptedFiles[0]);
    }

    try {
      const endpoint = multiple ? '/api/upload/multiple' : '/api/upload/single';
      const response = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': localStorage.getItem('token')
        }
      });
      
      onUploadSuccess(multiple ? response.data : response.data.url);
    } catch (error) {
      onUploadError(error.response?.data?.message || 'Upload failed');
    }
  }, [multiple, onUploadSuccess, onUploadError]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    multiple,
    maxSize: 5 * 1024 * 1024 // 5MB
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
        ${isDragActive ? 'border-yellow-400 bg-yellow-50' : 'border-gray-300 hover:border-yellow-400'}`}
    >
      <input {...getInputProps()} />
      <div className="space-y-2">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="text-gray-600">
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>
              Drag & drop {multiple ? 'images' : 'an image'} here, or click to select
              {multiple ? ' files' : ' a file'}
            </p>
          )}
        </div>
        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
      </div>
    </div>
  );
};

export default ImageUpload;