import { Skeleton } from "@/components/skeletons";
import HeadlineCardSkeleton from "@/components/skeletons/headline-card";
import { CATEGORIES } from "@/constants";

export default function NewsHeadlinesSkeleton() {
  return (
    <>
      <Skeleton className="mb-4 mt-2 h-6 w-[176px]" />
      <div className="my-2 flex flex-wrap items-center justify-center gap-4">
        {CATEGORIES.map((category) => (
          <Skeleton key={category} className="h-8 w-20" />
        ))}
      </div>
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
