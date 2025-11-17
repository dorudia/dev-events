// models/Booking.ts
"use server"; // important dacă folosești direct în actions

import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    slug: { type: String, required: true },
    email: { type: String, ref: "User", required: true },
  },
  { timestamps: true }
);

// Folosim singleton pattern
const Booking =
  mongoose.models?.Booking || mongoose.model("Booking", BookingSchema);
export default Booking;
