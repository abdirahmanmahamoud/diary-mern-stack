import mongoose from "mongoose";

const diaryScheme = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    eventDate: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Diary = mongoose.model("Diary", diaryScheme);
export default Diary;
