import { SpeakerModel } from "../models/speakerModel";

export const getSpeakers = async (req: any, res: any) => {
    try {
        const speakers = await SpeakerModel.find();
        res.status(200).json(speakers);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const addSpeaker = async (req: any, res: any) => {
    try {
        const { name, description, imageUrl, linkedInUrl } = req.body;
        if (!name || !description || !imageUrl || !linkedInUrl) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const speaker = new SpeakerModel({
            name,
            description,
            imageUrl,
            linkedInUrl
        });
        await speaker.save();
        return res.status(201).json({ message: "Speaker added successfully", speaker });
    } catch (error: any) {
        console.error('Error adding speaker:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


export const updateSpeaker = async (req: any, res: any) => {
    try {
        const speakerId = req.params.id;
        const { name, description, imageUrl, linkedInUrl } = req.body;
        if (!name || !description || !imageUrl || !linkedInUrl) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const speaker = await SpeakerModel.findById(speakerId);
        if (!speaker) {
            return res.status(404).json({ error: "Speaker not found" });
        }
        speaker.name = name;
        speaker.description = description;
        speaker.imageUrl = imageUrl;
        speaker.linkedInUrl = linkedInUrl;
        await speaker.save();
        return res.status(200).json({ message: "Speaker updated successfully", speaker });
    } catch (error: any) {
        console.error('Error updating speaker:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


export const deleteSpeaker = async (req: any, res: any) => {
    try {
        const speakerId = req.params.id;
        const speaker = await SpeakerModel.findById(speakerId);
        if (!speaker) {
            return res.status(404).json({ error: "Speaker not found" });
        }
        await speaker.deleteOne();
        return res.status(200).json({ message: "Speaker deleted successfully" });
    } catch (error: any) {
        console.error('Error deleting speaker:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}