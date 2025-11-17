import BookEvent from "@/components/BookEvent";
import EventCard from "@/components/EventCard";
import SimilarEventsList from "@/components/SimilarEventsList";
import { getBookingsByEmail } from "@/lib/actions/booking.actions";
import { getSimilarEvents } from "@/lib/actions/event.actions";
import { IEvent } from "@/models/Event";
import { log } from "console";
import { get } from "http";
import { Book } from "lucide-react";
import { cacheLife } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { cache, Suspense } from "react";

interface PageProps {
  params: {
    slug: string;
  };
}

const EventDetailItem = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => (
  <div className="flex flex-row gap-2 items-center mb-2">
    <Image
      src={icon}
      alt={alt}
      width={20}
      height={20}
      style={{ width: "auto", height: "auto" }}
    />
    <p>{label}</p>
  </div>
);

const EventDetaisPage = async ({ params }: PageProps) => {
  "use cache";
  cacheLife({ revalidate: 60 }); // Revalidate every 60 seconds
  const { slug } = await params;
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/event/${slug}`
  );

  const { event } = await data.json();

  if (!event) return notFound();

  return (
    <section id="event">
      <h1>{event.title}</h1>
      <div className="header">
        {event.description && (
          <>
            <h1>Event Descripton</h1>
            <p className="mt-2">{event.description}</p>
          </>
        )}
      </div>
      <div className="details">
        <div className="content">
          <Image
            className="banner"
            src={event.image}
            alt="event poster"
            width={800}
            height={800}
          />
          <section className="flex-col-gap-2">
            <h2>Event Details</h2>
            <EventDetailItem
              icon="/icons/calendar.svg"
              alt="calendar"
              label={event.date}
            />
            <EventDetailItem
              icon="/icons/clock.svg"
              alt="clock"
              label={event.time}
            />
            <EventDetailItem
              icon="/icons/pin.svg"
              alt="location"
              label={event.location}
            />
          </section>
        </div>
        <aside className="booking">
          <p className="text-lg font-semibold mb-4">Book Event</p>
          <div className="signup-card">
            <h2>Book your spot</h2>
            <BookEvent eventId={event._id} slug={event.slug} />
          </div>
        </aside>
      </div>
      <div className="flex w-full flex-col gap-4 pt-20">
        <h2>Similar Events</h2>
        <ul className="list-none flex flex-direction-row flex-wrap gap-4 mb-4">
          <Suspense fallback={<div>Loading similar events...</div>}>
            <SimilarEventsList slug={slug} />
          </Suspense>
        </ul>
      </div>
    </section>
  );
};

export default EventDetaisPage;
