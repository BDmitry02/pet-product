import { Suspense } from "react";
import { FiltersAndPaginationMenu } from "@/components/layout/FiltersAndPaginationMenu";
import { ProductPaginator } from "@/components/pagination/ProductPaginator";
import { ProductCardSkeletonList } from "@/components/products/ProductCardSkeleton";
import { ProductList } from "@/components/products/ProductList";
import { fetchGet } from "@/tools/funcs/fetch/fetch-func";
import { Product } from "@/tools/types/product";

export default async function Home() {
    const products = await fetchGet<Product[]>("http://localhost:3010/products");

    return (
        <div className="flex min-h-screen flex-col gap-4 p-4 md:flex-row">
            <aside className="w-full self-start md:sticky md:top-4 md:max-w-1/4 lg:max-w-1/6">
                <FiltersAndPaginationMenu />
            </aside>
            <div className="flex min-h-full w-full flex-col justify-between">
                <Suspense fallback={<ProductCardSkeletonList />}>
                    <div className="flex-1">
                        <ProductList initialProducts={products.data} />
                    </div>
                    <div className="m-auto mt-4 flex items-center justify-between">
                        <ProductPaginator totalCount={products.totalCount} />
                    </div>
                </Suspense>
            </div>
        </div>
    );
}
