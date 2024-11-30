import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MarkdownEditor from './editor/MarkdownEditor';
import PageMetadata from './editor/PageMetadata';
import PreviewPane from './editor/PreviewPane';
import StatusMessage from './editor/StatusMessage';

const ContentEditor = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    metaDescription: '',
    slug: ''
  });
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchPage = async () => {
      if (slug === 'new') {
        setLoading(false);
        return;
      }
      
      try {
        const response = await axios.get(`/api/cms/${slug}`, {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setFormData(response.data);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch page content');
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      if (slug === 'new') {
        await axios.post('/api/cms', formData, {
          headers: { 'x-auth-token': token }
        });
        setSuccess('Page created successfully');
      } else {
        await axios.put(`/api/cms/${slug}`, formData, {
          headers: { 'x-auth-token': token }
        });
        setSuccess('Page updated successfully');
      }
      setTimeout(() => navigate('/admin/pages'), 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save page');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {slug === 'new' ? 'Create New Page' : 'Edit Page'}
        </h1>
        <button
          onClick={() => setPreview(!preview)}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          {preview ? 'Edit' : 'Preview'}
        </button>
      </div>

      <StatusMessage error={error} success={success} />

      {preview ? (
        <PreviewPane title={formData.title} content={formData.content} />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <PageMetadata
            title={formData.title}
            metaDescription={formData.metaDescription}
            slug={formData.slug}
            isNew={slug === 'new'}
            onChange={handleChange}
          />

          <MarkdownEditor
            content={formData.content}
            onChange={handleChange}
          />

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/admin/pages')}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-500"
            >
              Save Page
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContentEditor;