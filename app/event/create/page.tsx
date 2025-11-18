"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

const CreateEvent = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  if (!isSignedIn) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-amber-500">
          Please Sign In to create an event.
        </h2>
      </div>
    );
  }

  const [submitting, setSubmitting] = useState(false);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Checkbox → "true"/"false"
    formData.set("featured", formData.get("featured") ? "true" : "false");

    console.log("FORM DATA TO SEND:", Object.fromEntries(formData.entries()));

    try {
      setSubmitting(true);
      const res = await fetch("/api/event", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      console.log("API RESPONSE:", result);

      if (res.ok) {
        alert("Event created successfully!");
        form.reset();
        router.push("/events");
      } else {
        alert(result.error || "Failed to create event");
      }
    } catch (err) {
      console.error("SUBMIT ERROR:", err);
      alert("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="border border-amber-50 p-4 max-w-2xl mx-auto mt-3 rounded-md">
      <h3 className="text-center mb-4 text-xl font-semibold">Create Event</h3>
      <form onSubmit={submitHandler}>
        <label htmlFor="title">Event Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          className="w-full bg-gray-800 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-amber-600"
          placeholder="Enter event title"
        />

        <label htmlFor="description">Event Description</label>
        <textarea
          id="description"
          name="description"
          required
          className="w-full bg-gray-800 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-amber-600"
          placeholder="Enter event description"
          rows={4}
        />

        <label htmlFor="image">Select Event Image</label>
        <input
          type="file"
          id="image"
          name="image"
          required
          className="w-full bg-gray-800 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-amber-600"
        />

        <label htmlFor="location">Event Location</label>
        <input
          type="text"
          id="location"
          name="location"
          required
          className="w-full bg-gray-800 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-amber-600"
          placeholder="Enter event location"
        />

        <label htmlFor="date">Event Date</label>
        <input
          type="date"
          id="date"
          name="date"
          required
          className="w-full bg-gray-800 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-amber-600"
        />

        <label htmlFor="time">Event Time</label>
        <input
          type="time"
          id="time"
          name="time"
          required
          className="w-full bg-gray-800 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-amber-600"
        />

        <label className="flex items-center mb-4 gap-2 text-white">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            className="w-5 h-5 accent-amber-500 rounded"
          />
          Featured Event
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="bg-amber-600 px-4 py-2 rounded-md mt-2 w-full hover:bg-amber-700 transition disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
