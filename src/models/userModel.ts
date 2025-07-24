import { Schema, model } from "mongoose"

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    educationLevel: {
        type: String,
        required: true,
    },
    educationInstitution: {
        type: String,
        required: false,
    },
    educationYear: {
        type: String,
        required: false,
    },
    faculty: {
        type: String,
        required: false,
    },
    occupation: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    heardAboutUs: {
        type: String,
        required: true,
    },
    oAuth: {
        type: Boolean,
        required: true,
    },
    password: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    canScan: {
        type: Boolean,
        required: true,
        default: false,
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
    collection: "users"
});

const VerificationTokenSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    metadata: {
        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
        },
    }
}, {
    collection: "verificationTokens"
});


const EnrolmentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    sessionId: {
        type: Schema.Types.ObjectId,
        ref: "sessions",
        required: true,
    },
    arrived: {
        type: Boolean,
        required: true,
        default: false,
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
    collection: "enrolments"
});

export const UserModel = model("users", UserSchema);
export const VerificationTokenModel = model("verificationTokens", VerificationTokenSchema);
export const EnrolmentModel = model("enrolments", EnrolmentSchema);