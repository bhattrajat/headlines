import HeadlineCardSkeleton from "@/components/skeletons/headline-card";

export default function NewsHeadlinesSkeleton() {
  return (
    <>
      <h1 className="text-2xl">Today&apos;s headlines</h1>
      <section className="p-10 lg:grid lg:grid-cols-3 lg:gap-4">
        {Array(9)
          .fill(0)
          .map((_, idx) => {
            return <HeadlineCardSkeleton key={idx} />;
          })}
      </section>
    </>
  );
}
