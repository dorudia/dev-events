"use server";

import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";

export const createBooking = async (bookingData: {
  eventId: string;
  slug: string;
  email: string;
}) => {
  try {
    await connectDB();
    // console.log(bookingData);
    await Booking.create(bookingData);
    return { success: true };
  } catch (error) {
    console.error("Error creating booking:", error);
    return { success: false };
  }
};

export const getBookingsByEmail = async (email: string) => {
  try {
    await connectDB();
    const bookings = await Booking.find({ email }).lean();
    return bookings;
  } catch (error) {
    console.error("Error fetching bookings by email:", error);
    return [];
  }
};
