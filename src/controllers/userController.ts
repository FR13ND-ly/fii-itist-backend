import { AppEnv } from "../config/env.config";
import nodemailer from "nodemailer";
import { EnrolmentModel, UserModel, VerificationTokenModel } from "../models/userModel";

export const sendVerificationEmail = async (req: any, res: any) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "User already exists" });
        }

        // let existingVerificationToken: any = await VerificationTokenModel.findOne({ email });
        // if (existingVerificationToken) {
        //   if (existingVerificationToken.metadata.createdAt > new Date(Date.now() - 60 * 1000)) {
        //     return res.status(400).json({ error: "Verification email already sent within the last minute" });
        //   } else {
        //     await existingVerificationToken.deleteOne();
        //   }
        // }

        const transporter = nodemailer.createTransport({
            host: AppEnv.EMAIL_CONFIG.host,
            port: AppEnv.EMAIL_CONFIG.port,
            secure: AppEnv.EMAIL_CONFIG.secure,
            auth: {
                user: AppEnv.EMAIL_CONFIG.auth.user,
                pass: AppEnv.EMAIL_CONFIG.auth.pass,
            },
        });

        let code = Math.floor(100000 + Math.random() * 900000);
        
        const mailOptions = {
            from: AppEnv.EMAIL_CONFIG.auth.user,
            to: email,
            subject: `FII-ITIST Verification Code`,
            html: `<p>Your verification code is: <strong>${code}</strong></p>`,
        };

        await transporter.sendMail(mailOptions);

        let token = new VerificationTokenModel({
            email,
            token: code
        }) 
        token.save();
        res.status(200).json({ message: "Verification email sent successfully" });
    } catch (error: any) {
        console.error("Error sending verification email:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const verifyEmail = async (req: any, res: any) => {
    try {
        const { email, verificationCode } = req.body;
        if (!email || !verificationCode) {
            return res.status(400).json({ error: "Email and token are required" });
        }
        const verificationToken = await VerificationTokenModel.findOne({ email, token: verificationCode });
        if (!verificationToken) {
            return res.status(404).json({ error: "Invalid or expired verification token" });
        }
        await verificationToken.deleteOne();
        res.status(200).json({ message: "Email verified successfully" });
    } catch (error: any) {
        console.error("Error verifying email:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getUsers = async (req: any, res: any) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const getUser = async (req: any, res: any) => {
    try {
        const userId = req.params.id;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const updateUser = async (req: any, res: any) => {
    try {
        const userId = req.params.id;
        const userData = req.body;
        const user = await UserModel.findByIdAndUpdate(userId, userData, { new: true });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        await user.save();
        return res.status(200).json({ message: "User updated successfully", user });
    } catch (error: any) {
        console.error('Error updating user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export const deleteUser = async (req: any, res: any) => {
    try {
        const userId = req.params.id;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        await EnrolmentModel.deleteMany({ userId });
        user.deleteOne();
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error: any) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


export const getEnrolments = async (req: any, res: any) => {
    try {
        const userId = req.params.id;
        const enrolments = await EnrolmentModel.find({ userId });
        res.status(200).json(enrolments);
    } catch (error: any) {
        console.error("Error fetching enrolments:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


export const addEnrolment = async (req: any, res: any) => {
  try {
    const { userId, sessionId } = req.body;
    if (!userId || !sessionId) {
      return res.status(400).json({ error: "User ID and Session ID are required" });
    }
    const enrolment = new EnrolmentModel({ userId, sessionId });
    await enrolment.save();
    res.status(201).json(enrolment);
  } catch (error: any) {
    console.error('Error adding enrolment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export const deleteEnrolment = async (req: any, res: any) => {
  try {
    const userId = req.params.id;
    const sessionId = req.params.sessionId;
    console.log(userId, sessionId)
    const enrolment = await EnrolmentModel.findOne({ userId, sessionId });
    if (!enrolment) {
      return res.status(404).json({ error: "Enrolment not found" });
    }
    await enrolment.deleteOne();
    res.status(200).json({ message: "Enrolment deleted successfully" });
  } catch (error: any) {
    console.error('Error deleting enrolment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}