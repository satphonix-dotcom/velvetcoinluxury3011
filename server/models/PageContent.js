import mongoose from 'mongoose';

const pageContentSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  metaDescription: {
    type: String,
    trim: true
  },
  modifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastModified: {
    type: Date,
    default: Date.now
  },
  published: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Add text search index
pageContentSchema.index({
  title: 'text',
  content: 'text'
});

export default mongoose.model('PageContent', pageContentSchema);