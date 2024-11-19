import { Request, Response } from 'express';
import { Video } from '../models/videoModel';

interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

export const createVideo = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, description, fileUrl, tags } = req.body;
    
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const video = new Video({
      title,
      description,
      fileUrl,
      userId: req.user.id,
      size: req.body.size || 0,
      mimetype: req.body.mimetype || 'video/mp4',
      tags,
      isPublic: req.body.isPublic || false
    });

    await video.save();
    res.status(201).json(video);
  } catch (error) {
    res.status(400).json({ message: 'Error creating video', error });
  }
};

export const getVideos = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const videos = await Video.find({ userId });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching videos' });
  }
};

export const deleteVideo = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const video = await Video.findOneAndDelete({ 
      _id: id, 
      userId 
    });

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting video' });
  }
};