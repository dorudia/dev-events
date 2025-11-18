import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
  allEvents?: boolean;
}
const EventCard = ({
  title,
  image,
  slug,
  location,
  date,
  time,
  allEvents,
}: Props) => {
  return (
    <Link href={`/event/${slug}`} id="event-card">
      <div
        className="w-full relative overflow-hidden rounded-md mb-2"
        style={{ aspectRatio: "3/2" }}
      >
        <Image
          src={image}
          alt={title}
          fill
          // className="poster"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </div>
      <div className="flex flex-row gap-2 w-full">
        <Image
          src="/icons/pin.svg"
          alt="location"
          width={14}
          height={14}
          style={{ width: "auto", height: "auto" }}
        />
        <p>{location}</p>
      </div>
      <p className="title">{title}</p>
      {!allEvents && (
        <div className="datetime">
          <div>
            <Image
              src="/icons/calendar.svg"
              alt="date"
              width={14}
              height={14}
              style={{
                width: "auto",
                height: "auto",
              }}
            />
            <p>{date}</p>
          </div>
          <div>
            <Image
              src="/icons/clock.svg"
              alt="time"
              width={14}
              height={14}
              style={{ width: "auto", height: "auto" }}
            />
            <p>{time}</p>
          </div>
        </div>
      )}
    </Link>
  );
};

export default EventCard;
