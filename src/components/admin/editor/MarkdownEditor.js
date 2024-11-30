import React from 'react';

const MarkdownEditor = ({ content, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Content (Markdown)
      </label>
      <textarea
        name="content"
        value={content}
        onChange={onChange}
        required
        rows={20}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 font-mono"
      />
    </div>
  );
};

export default MarkdownEditor;