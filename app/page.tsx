import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { events } from "@/lib/constants";
import { time } from "console";

const page = () => {
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
          {events.map((item, index) => (
            <EventCard key={item.title} {...item} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default page;
