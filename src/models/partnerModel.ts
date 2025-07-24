  import { url } from "inspector";
import { Schema, model, Types } from "mongoose";

  const PartnerSchema = new Schema(
    {
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: false,
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
},
    { collection: "partners" }
);

export const PartnerModel = model("partners", PartnerSchema);