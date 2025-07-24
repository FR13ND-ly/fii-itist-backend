import { time } from "console";
import { Schema, model, Types } from "mongoose";
import { title } from "process";

const Hall = new Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
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
    collection: "halls"
});


const TimeSlot = new Schema({
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    noHalls: {
        type: Boolean,
        default: false,
        required: true,
    },
    details: {
        title: {
            type: String,
            default: "",
        },
        location: {
            type: String,
            default: "",
        }
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
    collection: "timeSlots"
});

const SessionSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    typeColor: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    speakers: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "speakers",
            required: true,
        }],
    },
    timeSlotId: {
        type: Types.ObjectId,
        ref: "timeSlots",
        required: true,
    },
    hallId: {
        type: Types.ObjectId,
        ref: "halls",
        required: true,
    },
}, {
    collection: "sessions",
})

export const SessionModel = model("sessions", SessionSchema);
export const HallModel = model("halls", Hall);
export const TimeSlotModel = model("timeSlots", TimeSlot);