import { Suspense } from "react";
import Event from "@/components/Event";
import { notFound } from "next/navigation";

// prettier-ignore
const EventDetaisPage = async ({ params }: { params: Promise<{ slug: string }>}) => {
  const slug = params.then((result) => {
    console.log("RESULT>SLUG", result.slug);
    return result.slug;
  });
  return (
    <main>
      <Suspense fallback={<div>Loading event details...</div>}>
        <Event par={slug} />   
      </Suspense>
    </main>
  );
};

export default EventDetaisPage;
