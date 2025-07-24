import { Schema, model, Types } from "mongoose";

const EditionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    details: {
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
    collection: "editions"
});

const VideoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    code: {
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
    collection: "videos"
});

export const EditionModel = model("editions", EditionSchema);
export const VideoModel = model("videos", VideoSchema);