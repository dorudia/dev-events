import EventCard from "@/components/EventCard";
import { IEvent } from "@/models/Event";
// import { events } from "@/lib/constants";

const EventsList = async ({ allEvents }: { allEvents?: boolean }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/event`, {
    next: { revalidate: 3 },
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Failed to fetch events:", text);

    return <p>Failed to load events.</p>;
  }

  const events = await res.json();

  const displayedEvents = allEvents
    ? events
    : events.filter((el: any) => el.featured).slice(0, 6);

  return (
    <>
      {events &&
        events.length > 0 &&
        displayedEvents.map((item: IEvent) => (
          <EventCard key={item.slug} {...item} allEvents={allEvents} />
          // <EventCard key={(item as IEvent & { _id: string })._id} {...item} />
        ))}
    </>
  );
};

export default EventsList;
