import { title } from "process";

let arr: any = [];

export async function GET() {
  return new Response(JSON.stringify(arr));
}

export async function POST(request: Request) {
  const body = await request.json();
  arr.push(body);
  console.log({ arr });
  return new Response(JSON.stringify(body));
}
