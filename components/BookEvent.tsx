"use client";

import {
  createBooking,
  getBookingsByEmail,
} from "@/lib/actions/booking.actions";
import { get } from "http";
import { useEffect, useState } from "react";

const BookEvent = ({ eventId, slug }: { eventId: string; slug: string }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // const bookings = getBookingsByEmail(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(typeof eventId, typeof slug, typeof email);
    try {
      await createBooking({ eventId, slug, email });
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting booking:", error);
    }

    // Here you can handle the form submission, e.g., send the email to your server
    console.log("Email submitted:", email);
    setSubmitted(true);
  };

  return (
    <div id="book-event">
      {submitted ? (
        <p className="text-sm">Thank you for signing up!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-gray-800 rounded-md p-3 mb-4 active:border-none focus:border-none focus:outline-none"
            placeholder="Enter your email address"
          />
          <button type="submit" className="button-submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
