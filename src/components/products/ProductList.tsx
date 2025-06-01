"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductCard } from "@/components/products/ProductCard";
import { setProducts } from "@/tools/redux/slices/products-slice";
import { AppDispatch, RootState } from "@/tools/redux/store";
import { Product } from "@/tools/types/product";
import { elementIds } from "@/tools/constants/test/element-ids";
import { ariaAttributes, roleAttributes } from "@/tools/constants/ui/aria-attributes";

interface ProductListProps {
    initialProducts: Product[];
}

export function ProductList({ initialProducts }: ProductListProps) {
    const dispatch = useDispatch<AppDispatch>();

    const products = useSelector((state: RootState) => state.products.products);

    useEffect(() => {
        dispatch(setProducts(initialProducts));
    }, [dispatch, initialProducts]);

    return (
        <>
            {products.length === 0 ? (
                <section
                    className="m-auto flex flex-col items-center justify-center"
                    aria-label={ariaAttributes.noProductsFound}
                    role={roleAttributes.status}
                >
                    <p className="text-lg text-gray-400">No products available</p>
                    <span className="mt-2 block text-3xl font-bold text-blue-500">
                        Please check back soon!
                    </span>
                </section>
            ) : (
                <section
                    aria-label={ariaAttributes.productList}
                    data-testid={elementIds.productList}
                    className="grid w-full grid-cols-[repeat(auto-fill,minmax(250px,1fr))] items-start justify-center gap-4 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]"
                >
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </section>
            )}
        </>
    );
}
