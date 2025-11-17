"use server";

import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";

export const getSimilarEvents = async (slug: string) => {
  try {
    await connectDB();
    const events = await Event.find({ slug: { $ne: slug } })
      .lean()
      .limit(4);
    return events;
  } catch (error) {
    console.log(error);
  }
};
