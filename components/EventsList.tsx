import EventCard from "@/components/EventCard";
import { IEvent } from "@/models/Event";

const EventsList = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/event`);

  const events = await data.json();

  return (
    <>
      {events &&
        events.length > 0 &&
        events.map((item: IEvent) => (
          <EventCard key={(item as IEvent & { _id: string })._id} {...item} />
        ))}
    </>
  );
};

export default EventsList;
