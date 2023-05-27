import CategoryCard from '@/components/CategoryCard';
import Link from 'next/link';
import React from 'react'

export const metadata = {
    title: "ISTAD - Category",
    description: 'This is my app',
    images: "/images/alien.png",


    openGraph: {
        title: 'ISTAD-CATEGORY',
        description: 'This is my app',
        url: 'https://next-v13-with-form-upload-file.vercel.app/',
        images: "/images/alien.png",
    },
    twitter: {
        title: 'My App',
        description: 'This is my app',
        url: 'https://myapp.com',
        image: 'https://myapp.com/og.png',
    }


}

// get data from API
export async function getCategory() {
    // no-store to avoid cache
    const res = await fetch(
        "https://api.escuelajs.co/api/v1/categories?limit=20", { cache: "no-store" }
    );
    const data = await res.json();
    console.log(data)
    return data;
}

export default async function page({ id }) {
    const categories = await getCategory();
    console.log(getCategory)
    return (
        <main >
            <h1 class="mt-20 ms-36 ">Top Categories</h1>
            <div className='flex flex-wrap items-center justify-between ps-36 pe-36'>
                {categories.map((getCategory) => (
                    <Link key={category.id} href={`/categories/${getCategory.id}`}>
                        <CategoryCard
                            key={getCategory.id}
                            id={getCategory.id}
                            name={getCategory.name}
                            updatedAt={getCategory.updatedAt}
                            image={getCategory.image}
                        />
                    </Link>
                ))}
            </div>
                   
        </main>
    )
}
