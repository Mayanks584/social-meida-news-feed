import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    media: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    privacy: {
      type: String,
      enum: ["public", "followers", "private"],
      default: "public",
    },
    likeCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    commentCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

postSchema.index({ authorId: 1, createdAt: -1 });
postSchema.index({ createdAt: -1 });
postSchema.index({ tags: 1 });
postSchema.index({ content: "text", tags: "text" });

export const Post = mongoose.model("Post", postSchema);
