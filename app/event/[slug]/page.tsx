import BookEvent from "@/components/BookEvent";
import Event from "@/components/Event";
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

const EventDetaisPage = async ({ params }: PageProps) => {
  "use cache";
  cacheLife({ revalidate: 60 });

  const { slug } = await params;

  if (!slug) return notFound(); // fallback dacă nu există slug

  return (
    <Suspense fallback={<div>Loading event details...</div>}>
      <Event slug={slug} /> {/* propagat corect */}
    </Suspense>
  );
};

export default EventDetaisPage;
