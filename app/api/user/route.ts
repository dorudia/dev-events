import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request, res: Response) {
  try {
    await connectDB();

    const body = await req.json();
    const user = await User.create({
      email: body.email,
      name: body.name,
    });

    return Response.json(user, { status: 201, statusText: "User Created" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to create user" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();
    const users = await User.find();
    return Response.json(users);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
