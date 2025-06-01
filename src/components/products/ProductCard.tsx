import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/tools/types/product";
import { elementIds } from "@/tools/constants/test/element-ids";
import { ariaAttributes, roleAttributes } from "@/tools/constants/ui/aria-attributes";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <div
            role={roleAttributes.article}
            aria-label={product.title}
            data-testid={elementIds.productCard}
            className="flex size-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-lg transition-shadow duration-300 hover:shadow-2xl"
        >
            <Image
                src={product.image_src}
                alt={product.title}
                width={300}
                height={300}
                className="h-44 w-full object-contain"
                priority={true}
            />
            <div className="flex flex-1 flex-col p-4">
                <h2 className="mb-1 line-clamp-2 text-lg font-bold">{product.title}</h2>
                <div className="mb-2 text-xs text-gray-500">{product.vendor}</div>
                <div className="mb-2 flex flex-wrap gap-1">
                    {product.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="mt-auto">
                    <div className="mb-1 text-xl font-semibold text-blue-600">{product.price} $</div>
                    {product.subscription && (
                        <div className="mb-2 text-xs text-green-600">
                            Subscription: discount {product.subscription_discount}%
                        </div>
                    )}
                    <Link
                        aria-label={ariaAttributes.productCardLink}
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full rounded-lg bg-blue-600 py-2 text-center font-medium text-white transition-colors duration-200 hover:bg-blue-700"
                    >
                        Learn more
                    </Link>
                </div>
            </div>
        </div>
    );
}
