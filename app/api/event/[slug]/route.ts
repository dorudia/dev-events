import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();
    const { slug } = await params;
    console.log({ slug });

    const event = await Event.findOne({ slug: slug });

    if (!event) {
      return Response.json({ error: "Event Not Found" }, { status: 404 });
    }

    return Response.json({ message: "Event Found", event }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to Fetch Events" }, { status: 500 });
  }
}
