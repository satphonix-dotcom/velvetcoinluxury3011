import React from 'react';

const PageMetadata = ({ title, metaDescription, slug, isNew, onChange }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Page Title
        </label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={onChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {isNew && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL Slug
          </label>
          <input
            type="text"
            name="slug"
            value={slug}
            onChange={onChange}
            required
            pattern="[a-z0-9-]+"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="page-url-slug"
          />
          <p className="mt-1 text-sm text-gray-500">
            Use lowercase letters, numbers, and hyphens only
          </p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Meta Description
        </label>
        <input
          type="text"
          name="metaDescription"
          value={metaDescription}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>
    </div>
  );
};

export default PageMetadata;