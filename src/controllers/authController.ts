import { encryptPassword, generateJWT, localAuthenticate } from "../config/passport";
import { UserModel } from "../models/userModel";


export const signup = async (req: any, res: any) => {
  try {
    console.log(req.body);
    const { email, firstName, lastName, educationLevel, educationInstitution, educationYear, faculty, occupation, experience, heardAboutUs, password, oAuth,  } = req.body;
    if (!email || !firstName || !lastName || !educationLevel || !occupation || !experience || !heardAboutUs) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        if (oAuth) {
            const token = generateJWT(existingUser);
            res.json({ message: "User already exists, login successful", token });
        }
        return res.status(400).json({ error: "Email already registered" });
    }
    const user = new UserModel({
      email,
      firstName,
      lastName,
      educationLevel,
      educationInstitution,
      educationYear,
      faculty,
      occupation,
      experience,
      heardAboutUs,
      oAuth,
      password: await encryptPassword(password)
    });
    await user.save();
    const token = generateJWT(user);
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const signin = async (req: any, res: any) => {
  try {
    const { email, password, oAuth } = req.body;
    if (oAuth) {
        const user = await UserModel.findOne({ email });
        if (!user) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        const token = generateJWT(user);
        res.json({ message: "Login successful", token });
    }
    const tuser = await UserModel.findOne({ email });
  
    if (!tuser) {
      res.status(401).json({ error: "Invalid credentials" });
      return 
    }
    if (tuser.oAuth) {
      res.status(400).json({ error: "Use OAuth login instead" });
      return 
    }
    console.log(email, password);
    const user = await localAuthenticate(email, password);
    if (!user) {
        res.status(401).json({ error: "Invalid credentials" });
        return 
    }

    const token = generateJWT(user);
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
