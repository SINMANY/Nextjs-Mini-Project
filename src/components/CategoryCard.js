import Image from 'next/image'
import React from 'react'

export default function CategoryCard({ image, name }) {
    return (
        <>
            <div class="m-8">
                <div class="flex flex-col items-center">
                    <Image unoptimized width={500} height={500}
                        className="w-24 h-24 rounded-full shadow-lg"
                        src={image ? image : "/images/placeholder-image.png"}
                        alt="product image"
                    />
                    <h5 class="mb-1 text-xl font-medium dark:text-grey-900 dark:text-white">
                        {name ? name : "Untitled"}
                    </h5>
                </div>
            </div>
        </>
    )
}
