import { Suspense } from "react";
import Event from "@/components/Event";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

const EventDetaisPage = async ({ params }: PageProps) => {
  const { slug } = await params;

  if (!slug) return notFound();

  // 2️⃣ Suspense pentru încărcarea componentei Event
  return (
    <Suspense fallback={<div>Loading event details...</div>}>
      <Event slug={slug} />
    </Suspense>
  );
};

export default EventDetaisPage;
