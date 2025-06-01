export interface Product {
    id: string;
    slug: string;
    title: string;
    vendor: string;
    tags: string[];
    published: boolean;
    url: string;
    image_src: string;
    option_value: string;
    sku: string;
    price: string;
    subscription_discount: string;
    subscription: boolean;
}
