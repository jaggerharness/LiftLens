import { Skeleton } from "@/components/shad-ui/skeleton";

export function WorkoutAreaSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-8">
      <div className="flex flex-row justify-between">
        <Skeleton className="w-48 h-6 rounded-xl" />
        <Skeleton className="w-48 h-6 rounded-xl" />
      </div>
      <Skeleton className="w-full flex-grow rounded-xl px-2" />
    </div>
  );
}
