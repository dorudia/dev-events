import { Suspense } from "react";
import Event from "@/components/Event";
import { notFound } from "next/navigation";
import { log } from "console";

const EventDetaisPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = params.then((result) => {
    log({ result });
    return result.slug;
  });
  return (
    <main>
      <Suspense fallback={<div>Loading event details...</div>}>
        // @ts-ignore
        <Event params={slug} />
      </Suspense>
    </main>
  );
};

export default EventDetaisPage;
