import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import { v2 as cloudinary } from "cloudinary";

export async function POST(req: Request, res: Response) {
  try {
    await connectDB();

    const formData = await req.formData();

    let event;

    try {
      event = Object.fromEntries(formData.entries());
    } catch (error) {
      console.log(error);
      return Response.json(
        { error: "Invalid JSON form data" },
        { status: 400 }
      );
    }

    const file = formData.get("image") as File;

    if (!file) {
      return Response.json(
        { error: "Image file is required" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "dvxjznoxa", resource_type: "image" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result!);
          }
        )
        .end(buffer);
    });

    event.image = (uploadResult as { secure_url: string }).secure_url;

    const createdEvent = await Event.create(event);

    return Response.json(
      { message: "Event Created Successfully", event: createdEvent },
      { status: 201, statusText: "Event Created" }
    );
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to Create Event" }, { status: 500 });
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
