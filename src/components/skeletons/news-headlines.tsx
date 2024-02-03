import HeadlineCardSkeleton from "@/components/skeletons/headline-card";

export default function NewsHeadlinesSkeleton() {
  return (
    <>
      <section className="grid gap-4 lg:grid-cols-3 lg:p-10">
        {Array(9)
          .fill(0)
          .map((_, idx) => {
            return <HeadlineCardSkeleton key={idx} />;
          })}
      </section>
    </>
  );
}
