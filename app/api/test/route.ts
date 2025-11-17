// export async function GET() {
//   const html = `
//     <html>
//       <head><title>Hello</title></head>
//       <body >
//         <h1 style="color: blue; text-align: center; margin-top: 50px">Hello World!</h1>
//         <h2 style="font-weight: normal; text-align: center" >Acesta este un raspuns HTML din API route.</h2>
//       </body>
//     </html>
//   `;

//   return new Response(html, {
//     status: 200,
//     headers: { "Content-Type": "text/html" },
//   });
// }

export async function GET() {
  return Response.json({ message: "Hello from Test API Route..." });
}
