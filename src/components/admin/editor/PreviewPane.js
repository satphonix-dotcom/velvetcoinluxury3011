import React from 'react';
import ReactMarkdown from 'react-markdown';

const PreviewPane = ({ title, content }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <div className="prose max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default PreviewPane;