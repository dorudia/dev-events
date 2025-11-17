// "use server";

// import mongoose from "mongoose";

// console.log("MONGODB_URI:", process.env.MONGODB_URI);

// export async function connectDB() {
//   // fallback sigur dacă connection e undefined
//   if (mongoose.connections?.[0]?.readyState) {
//     return;
//   }

//   if (!process.env.MONGODB_URI) {
//     throw new Error("Please define the MONGODB_URI environment variable");
//   }

//   return mongoose.connect(process.env.MONGODB_URI);
// }

// lib/mongodb.ts
"use server"; // foarte important în Next.js 16 server actions

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// Singleton pentru conexiune
let cached = (global as any).mongoose;
if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise && MONGODB_URI) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
