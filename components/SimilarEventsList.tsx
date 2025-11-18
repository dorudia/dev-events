import { getSimilarEvents } from "@/lib/actions/event.actions";
import { IEvent } from "@/models/Event";
import React from "react";
import EventCard from "./EventCard";
import { cacheLife } from "next/cache";

const SimilarEventsList = async ({ slug }: { slug: string }) => {
  "use cache";
  cacheLife("minutes");

  const similarEvents: any = await getSimilarEvents(slug);
  console.log({ similarEvents });

  if (!similarEvents || similarEvents.length === 0)
    return <p>No similar events found.</p>;

  return (
    <>
      {similarEvents.length > 0 &&
        similarEvents.map((item: IEvent) => {
          return (
            <li
              className="md:w-1/5 w-full "
              key={(item as IEvent & { _id: string })._id}
            >
              <EventCard {...item} />
            </li>
          );
        })}
      ;
    </>
  );
};

export default SimilarEventsList;
