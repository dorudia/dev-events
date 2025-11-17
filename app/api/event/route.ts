import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import { v2 as cloudinary } from "cloudinary";
import slugify from "slugify";

// export async function POST(req: Request, res: Response) {
//   try {
//     await connectDB();

//     const formData = await req.formData();

//     let event: Record<string, any>;
//     // convert string "true"/"false" în boolean

//     try {
//       event = Object.fromEntries(formData.entries());
//     } catch (error) {
//       console.log(error);
//       return Response.json(
//         { error: "Invalid JSON form data" },
//         { status: 400 }
//       );
//     }

//     // generează slug din title și verifică unicitatea
//     const title = event.title as string;
//     let slug = slugify(title, { lower: true, strict: true });

//     let uniqueSlug = slug;
//     let count = 1;
//     while (await Event.findOne({ slug: uniqueSlug })) {
//       uniqueSlug = `${slug}-${count}`;
//       count++;
//     }
//     event.slug = uniqueSlug;

//     // imagine
//     const file = formData.get("image") as File;
//     if (!file) {
//       return Response.json(
//         { error: "Image file is required" },
//         { status: 400 }
//       );
//     }

//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     const uploadResult = await new Promise((resolve, reject) => {
//       cloudinary.uploader
//         .upload_stream(
//           { folder: "dvxjznoxa", resource_type: "image" },
//           (error, result) => {
//             if (error) return reject(error);
//             resolve(result!);
//           }
//         )
//         .end(buffer);
//     });

//     event.image = (uploadResult as { secure_url: string }).secure_url;

//     // convert featured în boolean
//     event.featured = event.featured === "true";

//     // creează event
//     const createdEvent = await Event.create(event);

//     return Response.json(
//       { message: "Event Created Successfully", event: createdEvent },
//       { status: 201, statusText: "Event Created" }
//     );
//   } catch (error) {
//     console.error(error);
//     return Response.json({ error: "Failed to Create Event" }, { status: 500 });
//   }
// }

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    // Extrage câmpurile și convertim sigur în string
    const titleRaw = formData.get("title");
    const descriptionRaw = formData.get("description");
    const locationRaw = formData.get("location");
    const dateRaw = formData.get("date");
    const timeRaw = formData.get("time");
    const featuredRaw = formData.get("featured");

    if (!titleRaw || !descriptionRaw || !locationRaw || !dateRaw || !timeRaw) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const title = String(titleRaw);
    const description = String(descriptionRaw);
    const location = String(locationRaw);
    const date = String(dateRaw);
    const time = String(timeRaw);
    const featured = featuredRaw === "true";

    console.log("API RECEIVED:", {
      title,
      description,
      location,
      date,
      time,
      featured,
    });

    // Generează slug unic
    let slug = slugify(title, { lower: true, strict: true });
    let uniqueSlug = slug;
    let count = 1;
    while (await Event.findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${slug}-${count}`;
      count++;
    }

    // Imagine
    const file = formData.get("image") as File;
    if (!file) {
      return new Response(JSON.stringify({ error: "Image file is required" }), {
        status: 400,
      });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "dvxjznoxa", resource_type: "image" },
            (err, result) => {
              if (err) return reject(err);
              resolve(result as { secure_url: string });
            }
          )
          .end(buffer);
      }
    );

    const eventData = {
      title,
      description,
      location,
      date,
      time,
      featured,
      slug: uniqueSlug,
      image: uploadResult.secure_url,
    };

    const createdEvent = await Event.create(eventData);

    console.log("EVENT CREATED:", createdEvent);

    return new Response(
      JSON.stringify({
        message: "Event created successfully",
        event: createdEvent,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("API ERROR:", error);
    return new Response(JSON.stringify({ error: "Failed to create event" }), {
      status: 500,
    });
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();
    const events = await Event.find().sort({ createdAt: -1 });
    return Response.json(events);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
