import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IEvent } from "@/models/Event";
import { log } from "console";
import { cacheLife } from "next/cache";
// import { events } from "@/lib/constants";

const Page = async () => {
  "use cache";
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/event`);

  const events = await data.json();

  return (
    <section>
      <h1 className="text-center">
        The Hub For Every Dev
        <br /> Event You Can't Miss
      </h1>
      <p className="text-center mt-5">
        Hackathons, Meetups and Workshops, All in One Place
      </p>
      <ExploreBtn />
      <div className="mt-20space-y-7">
        <h3>Featured Events</h3>
        <ul className="events mt-4">
          {events &&
            events.length > 0 &&
            events.map((item: IEvent) => (
              <EventCard
                key={(item as IEvent & { _id: string })._id}
                {...item}
              />
            ))}
        </ul>
      </div>
    </section>
  );
};

export default Page;
