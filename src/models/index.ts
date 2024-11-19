import mongoose, { Schema, Document } from 'mongoose';

export interface IVideo extends Document {
  title: string;
  description?: string;
  fileUrl: string;
  userId: string;
  size: number;
  mimetype: string;
  duration?: number;
  isPublic: boolean;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const VideoSchema: Schema = new Schema({
  title: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 100 
  },
  description: { 
    type: String, 
    maxlength: 500 
  },
  fileUrl: { 
    type: String, 
    required: true 
  },
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  size: { 
    type: Number, 
    required: true 
  },
  mimetype: { 
    type: String, 
    required: true 
  },
  duration: { 
    type: Number 
  },
  isPublic: { 
    type: Boolean, 
    default: false 
  },
  tags: [{ 
    type: String, 
    maxlength: 20 
  }]
}, {
  timestamps: true
});

VideoSchema.index({ userId: 1, createdAt: -1 });
VideoSchema.index({ tags: 1 });

export const Video = mongoose.model<IVideo>('Video', VideoSchema);