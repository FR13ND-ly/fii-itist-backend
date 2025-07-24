import { Types } from "mongoose";
import { HallModel, SessionModel, TimeSlotModel } from "../models/sessionModel";
import { SpeakerModel } from "../models/speakerModel";

export const getHalls = async (req: any, res: any) => {
    try {
        const halls = await HallModel.find();
        res.status(200).json(halls);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const addHall = async (req: any, res: any) => {
    try {
        const { name, location } = req.body;
        if (!name || !location) {
            return res.status(400).json({ error: "Name and location are required" });
        }
        const hall = new HallModel({
            name,
            location
        });
        await hall.save();
        return res.status(201).json({ message: "Hall added successfully", hall });
    } catch (error: any) {
        console.error('Error adding hall:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export const updateHall = async (req: any, res: any) => {
    try {
        const hallId = req.params.id;
        const { name, location } = req.body;
        if (!name || !location) {
            return res.status(400).json({ error: "Name and location are required" });
        }
        const hall = await HallModel.findById(hallId);
        if (!hall) {
            return res.status(404).json({ error: "Hall not found" });
        }
        hall.name = name;
        hall.location = location;
        await hall.save();
        return res.status(200).json({ message: "Hall updated successfully", hall });
    } catch (error: any) {
        console.error('Error updating hall:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


export const deleteHall = async (req: any, res: any) => {
    try {
        const hallId = req.params.id;
        const hall = await HallModel.findById(hallId);
        if (!hall) {
            return res.status(404).json({ error: "Hall not found" });
        }
        const sessions = await SessionModel.find({ hallId });
        if (sessions.length > 0) {
            return res.status(400).json({ error: "Hall cannot be deleted as it is associated with existing sessions" });
        }
        await hall.deleteOne();
        return res.status(200).json({ message: "Hall deleted successfully" });
    } catch (error: any) {
        console.error('Error deleting hall:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


const dateToTimeString = (date: Date) => {
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

export const getTimeSlots = async (req: any, res: any) => {
    try {
        const timeSlots: any = await TimeSlotModel.find().sort({ startTime: 1 });
        let r: any = []
        timeSlots.map((slot: any) => {
            const s = {...slot._doc };
            s.startTime = dateToTimeString(slot.startTime);
            s.endTime = dateToTimeString(slot.endTime);
            r.push(s);
        });
        res.status(200).json(r);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const addTimeSlot = async (req: any, res: any) => {
    try {
        const { startTime, endTime, noHalls, details } = req.body;
        if (!startTime || !endTime) {
            return res.status(400).json({ error: "Start time, end time, and number of halls are required" });
        }
        const timeSlot: any = new TimeSlotModel({
            startTime,
            endTime,
            noHalls,
            details
        });
        await timeSlot.save();
        let r = {...timeSlot._doc };
        r.startTime = dateToTimeString(timeSlot.startTime);
        r.endTime = dateToTimeString(timeSlot.endTime);
        return res.status(201).json({ message: "Time slot added successfully", timeSlot: r });
    } catch (error: any) {
        console.error('Error adding time slot:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


export const updateTimeSlot = async (req: any, res: any) => {
    try {
        const timeSlotId = req.params.id;
        const { startTime, endTime, details, noHalls } = req.body;
        if (!startTime || !endTime || !details) {
            return res.status(400).json({ error: "Start time, end time, and details are required" });
        }
        const timeSlot: any = await TimeSlotModel.findById(timeSlotId);
        if (!timeSlot) {
            return res.status(404).json({ error: "Time slot not found" });
        }
        timeSlot.startTime = startTime;
        timeSlot.endTime = endTime;
        timeSlot.details = details;
        timeSlot.noHalls = noHalls;
        await timeSlot.save();
        let r = {...timeSlot._doc };
        r.startTime = dateToTimeString(timeSlot.startTime);
        r.endTime = dateToTimeString(timeSlot.endTime);
        return res.status(200).json({ message: "Time slot updated successfully", timeSlot: r });
    } catch (error: any) {
        console.error('Error updating time slot:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


export const deleteTimeSlot = async (req: any, res: any) => {
    try {
        const timeSlotId = req.params.id;
        const timeSlot = await TimeSlotModel.findById(timeSlotId);
        if (!timeSlot) {
            return res.status(404).json({ error: "Time slot not found" });
        }
        const sessions = await SessionModel.find({ timeSlotId });
        if (sessions.length > 0) {
            return res.status(400).json({ error: "Time slot cannot be deleted as it is associated with existing sessions" });
        }
        await timeSlot.deleteOne();
        return res.status(200).json({ message: "Time slot deleted successfully" });
    } catch (error: any) {
        console.error('Error deleting time slot:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


export const getSessions = async (req: any, res: any) => {
    try {
        const sessions = await SessionModel.find();
        let r: any = [];
        await Promise.all(sessions.map(async (session: any) => {
            const s = {...session._doc };
            s.speakers = await Promise.all(session.speakers.map(async (speaker: Types.ObjectId) => await SpeakerModel.findById(speaker)));
            r.push(s);
        }))
        res.status(200).json(r);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}


export const addSession = async (req: any, res: any) => {
    try {
        const { type, typeColor, title, description, speakers, hallId, timeSlotId } = req.body;
        if (!type || !typeColor || !title || !description || !speakers || !hallId || !timeSlotId) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const session = new SessionModel({
            type,
            typeColor,
            title,
            description,
            speakers,
            hallId,
            timeSlotId
        });
        await session.save();
        return res.status(201).json({ message: "Session added successfully", session });
    } catch (error: any) {
        console.error('Error adding session:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


export const updateSession = async (req: any, res: any) => {
    try {
        const sessionId = req.params.id;
        const { type, typeColor, title, description, speakers, hallId, timeSlotId } = req.body;
        if (!type || !typeColor || !title || !description || !speakers || !hallId || !timeSlotId) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const session = await SessionModel.findById(sessionId);
        if (!session) {
            return res.status(404).json({ error: "Session not found" });
        }
        session.type = type;
        session.typeColor = typeColor;
        session.title = title;
        session.description = description;
        session.speakers = Array.isArray(speakers) ? speakers.map((id: string) => new Types.ObjectId(id)) : [new Types.ObjectId(speakers)];

        session.hallId = hallId;
        session.timeSlotId = timeSlotId;
        await session.save();
        return res.status(200).json({ message: "Session updated successfully", session });
    } catch (error: any) {
        console.error('Error updating session:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


export const deleteSession = async (req: any, res: any) => {
    try {
        const sessionId = req.params.id;
        const session = await SessionModel.findById(sessionId);
        if (!session) {
            return res.status(404).json({ error: "Session not found" });
        }
        await session.deleteOne();
        return res.status(200).json({ message: "Session deleted successfully" });
    } catch (error: any) {
        console.error('Error deleting session:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

