import { EnrolmentModel } from "../models/userModel";

export const resolveScannedCode = async (req: any, res: any) => {
    try {
        const userId = req.params.userId;
        const sessionId = req.params.sessionId;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        if (!sessionId) {
            return res.status(400).json({ error: "Session ID is required" });
        }

        const enrolment = await EnrolmentModel.findOne({
            userId,
            sessionId
        })

        if (!enrolment) {
            return res.status(404).json({ error: "Enrolment not found" });
        }

        if (enrolment.arrived) {
            return res.status(400).json({ error: "User has already arrived" });
        }

        enrolment.arrived = true;
        await enrolment.save();
        return res.status(200).json({ message: "User marked as arrived" });
    } catch (error: any) {
        console.error('Error resolving scanned code:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}