import EventCard from "@/components/EventCard";
import { IEvent } from "@/models/Event";
// import { events } from "@/lib/constants";

const EventsList = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/event`);

  if (!res.ok) {
    const text = await res.text();
    console.error("Failed to fetch events:", text);

    return <p>Failed to load events.</p>;
  }

  const events = await res.json();

  return (
    <>
      {events &&
        events.length > 0 &&
        events.map((item: IEvent) => (
          <EventCard key={item.slug} {...item} />
          // <EventCard key={(item as IEvent & { _id: string })._id} {...item} />
        ))}
    </>
  );
};

export default EventsList;
