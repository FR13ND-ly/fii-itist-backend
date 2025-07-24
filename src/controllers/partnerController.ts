import { PartnerModel } from "../models/partnerModel";

export const getPartners = async (req: any, res: any) => {
    try {
        const partners = await PartnerModel.find();
        res.status(200).json(partners);
    }
    catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}


export const addPartner = async (req: any, res: any) => {
    try {
        const { name, type, imageUrl, url } = req.body;
        if (!name || !type || !imageUrl || !url) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const partner = new PartnerModel({
            name,
            type,
            imageUrl,
            url
        });
        await partner.save();
        return res.status(201).json({ message: "Partner added successfully", partner });
    } catch (error: any) {
        console.error('Error adding partner:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


export const updatePartner = async (req: any, res: any) => {
    try {
        const partnerId = req.params.id;
        const { name, type, imageUrl, url } = req.body;
        if (!name || !type || !imageUrl || !url) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const partner = await PartnerModel.findById(partnerId);
        if (!partner) {
            return res.status(404).json({ error: "Partner not found" });
        }
        partner.name = name;
        partner.type = type;
        partner.imageUrl = imageUrl;
        partner.url = url;
        await partner.save();
        return res.status(200).json({ message: "Partner updated successfully", partner });
    } catch (error: any) {
        console.error('Error updating partner:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


export const deletePartner = async (req: any, res: any) => {
    try {
        const partnerId = req.params.id;
        const partner = await PartnerModel.findById(partnerId);
        if (!partner) {
            return res.status(404).json({ error: "Partner not found" });
        }
        await partner.deleteOne();
        return res.status(200).json({ message: "Partner deleted successfully" });
    } catch (error: any) {
        console.error('Error deleting partner:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}