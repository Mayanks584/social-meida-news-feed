import mongoose, { Schema } from "mongoose";

const followSchema = new Schema(
  {
    followerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    followeeId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

followSchema.index({ followerId: 1, followeeId: 1 }, { unique: true });
followSchema.index({ followerId: 1 });
followSchema.index({ followeeId: 1 });

export const Follow = mongoose.model("Follow", followSchema);
