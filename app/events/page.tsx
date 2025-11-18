// app/events/page.tsx
import { Suspense } from "react";
import EventsList from "@/components/EventsList";
import { cacheLife } from "next/cache";

const EventsPage = () => {
  return (
    <section className="md:px-6 md:px-20 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        All Events
      </h1>

      <Suspense fallback={<p>Loading events...</p>}>
        <ul className="events grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <EventsList allEvents={true} /> {/* toate evenimentele */}
        </ul>
      </Suspense>
    </section>
  );
};

export default EventsPage;
