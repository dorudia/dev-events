import mongoose from "mongoose";

export interface IEvent {
  slug: string;
  image: string;
  title: string;
  location: string;
  date: string;
  time: string;
  description?: string;
  featured?: boolean;
}

const EventSchema = new mongoose.Schema<IEvent>(
  {
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    description: { type: String, required: false }, // adăugat
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
