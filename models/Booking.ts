import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  email: { type: String, ref: "User", required: true },
  date: { type: Date, required: true },
});
export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);
