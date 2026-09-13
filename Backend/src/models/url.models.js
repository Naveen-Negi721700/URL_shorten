import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: [true,"URL is required"],
    },

    shortenUrl: {
      type: String,
      required: true,
      unique: true,
    },
    owner:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true,
    },

    qrCode: {
      type: String,
    },
    
    visitedHistory: {
      type: [],

    },
    clicks: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Url = mongoose.model("Url", urlSchema);