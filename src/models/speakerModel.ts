import { Schema, model } from "mongoose";

const SpeakerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    linkedInUrl: {
        type: String,
        required: true,
    },
    metadata: {
        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
        },
        lastUpdatedAt: {
            type: Date,
            required: true,
            default: Date.now,
        },
    }
}, {
    collection: "speakers"
});

export const SpeakerModel = model("speakers", SpeakerSchema);