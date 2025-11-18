import Image from "next/image";
import React, { Suspense } from "react";
import BookEvent from "./BookEvent";
import SimilarEventsList from "./SimilarEventsList";
import { notFound } from "next/navigation";
import { cacheLife } from "next/cache";

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

export const dynamic = "force-dynamic";

const Event = async ({ par }: { par: Promise<string> }) => {
  "use cache";
  cacheLife("minutes");

  const slug = await par;

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/event/${slug}`
  );
  const { event } = await data.json();
  if (!event) return notFound();

  return (
    <section id="event">
      <h1>{event.title}</h1>
      <div className="header"></div>
      <div className="details">
        <div className="content">
          <Image
            className="banner"
            src={event.image}
            alt="event poster"
            width={800}
            height={800}
          />
          {event.description && (
            <>
              <h3>Event Descripton</h3>
              <p>{event.description}</p>
            </>
          )}
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

export default Event;
