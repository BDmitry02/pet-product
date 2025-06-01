import { roleAttributes } from "@/tools/constants/ui/aria-attributes";

export function ProductCardSkeleton() {
    return (
        <div
            role={roleAttributes.status}
            className="flex size-full animate-pulse flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-lg"
        >
            <div className="mb-4 h-44 w-full rounded-lg bg-gray-200" />
            <div className="flex flex-1 flex-col p-4">
                <div className="mb-2 h-5 w-3/4 rounded bg-gray-200" />
                <div className="mb-3 h-3 w-1/4 rounded bg-gray-200" />
                <div className="mb-2 flex flex-wrap gap-1">
                    <div className="h-4 w-12 rounded-full bg-gray-200" />
                    <div className="h-4 w-10 rounded-full bg-gray-200" />
                </div>
                <div className="mt-auto">
                    <div className="mb-2 h-6 w-1/3 rounded bg-gray-200" />
                    <div className="mb-3 h-3 w-1/2 rounded bg-gray-200" />
                    <div className="h-10 w-full rounded-lg bg-gray-200" />
                </div>
            </div>
        </div>
    );
}

export function ProductCardSkeletonList() {
    return (
        <div
            role={roleAttributes.status}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
            {Array.from({ length: 12 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    );
}
