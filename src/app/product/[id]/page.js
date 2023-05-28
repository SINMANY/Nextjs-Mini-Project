"user client"

import Image from "next/image";
import Link from "next/link";
import React from "react";


async function getProductDetails(id) {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);

    const data = await res.json();
    return data;
}

export async function generateMetadata({ params }) {
    const { id } = params;
    const product = await getProductDetails(id);
    return {
        title: product.title,
        description: product.description,
        price: product.price,
        metadataBase: new URL("https://istad.co"),
        alternates: {
            canonical: "/",
            languages: {
                "en-US": "/en-US",
                "de-DE": "/de-DE",
            },

        },
        openGraph: {
            images: product.images[0],
        },
    };
}

export default async function ProductDetails({ params }) {
    const { id } = params;
    const product = await getProductDetails(id);
    return (

        <div class="flex flex-col items-center bg-gray-800 border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            {product.images && (
                <Image unoptimized width={500} height={500}
                    className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                    src={product.images[0]}
                    alt=""
                />
            )}
            <div class="flex flex-col justify-between p-4 leading-normal">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">{product.title ? product.title : "Loading..."}</h5>
                <p class="mb-3 font-normal text-white dark:text-gray-400">{product.description ? product.description : "Loading..."}</p>
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">  ${product.price ? product.price : "Price"}</h5>
            </div>
        </div>

    );
}
