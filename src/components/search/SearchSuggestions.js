import React from 'react';
import { Link } from 'react-router-dom';

const SearchSuggestions = ({ suggestions, onSelect }) => {
  if (!suggestions.length) return null;

  return (
    <div className="absolute z-50 w-full bg-white mt-1 rounded-md shadow-lg">
      <ul className="max-h-96 overflow-auto">
        {suggestions.map((suggestion, index) => (
          <li key={index}>
            <Link
              to={`/products/${suggestion._id}`}
              className="flex items-center px-4 py-2 hover:bg-gray-100"
              onClick={() => onSelect(suggestion)}
            >
              <img
                src={suggestion.imageUrl}
                alt={suggestion.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900">
                  {suggestion.name}
                </div>
                <div className="text-sm text-gray-500">
                  ${suggestion.price.toFixed(2)}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchSuggestions;