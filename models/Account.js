import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

const accountSchema = new mongoose.Schema(

  {
    Username: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
    provider: {
      type: String,
      required: true,
    },
    providerAccountId: {
      type: String,
      required: true,
    },
    access_token: {
      type: String,
    },
    token_type: {
      type: String,
    },
    scope: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure that each user can only have one account per provider
accountSchema.index({ userId: 1, provider: 1 }, { unique: true });

accountSchema.plugin(toJSON);

export default mongoose.models.Account || mongoose.model("Account", accountSchema);
