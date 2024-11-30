import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const DynamicPage = () => {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await axios.get(`/api/cms/${slug}`);
        setPage(response.data);
        // Update page metadata
        document.title = `${response.data.title} - VelvetCoin`;
        if (response.data.metaDescription) {
          document.querySelector('meta[name="description"]')
            .setAttribute('content', response.data.metaDescription);
        }
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to load page');
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!page) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <article className="prose max-w-none">
        <h1>{page.title}</h1>
        <ReactMarkdown>{page.content}</ReactMarkdown>
      </article>
    </div>
  );
};

export default DynamicPage;