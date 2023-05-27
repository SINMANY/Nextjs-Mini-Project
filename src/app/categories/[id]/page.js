import CardComponent from "@/components/CardComponent"
import React from "react"


export  async function getProductByCategory(id) {
    const res = await fetch(
        `https://api.escuelajs.co/api/v1/products/?categoryId=${id}`
    )
    const data = await res.json()
    return data
}

// get category by id
export async function getCategoryById(id) {
    const res = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`)
    const data = await res.json()
    return data
}

export async function generateMetadata({params}) {
    const id = params.id
    console.log(id)
    const category = await getCategoryById(id)
    console.log(category)
    return {
        title: category.name,
        description: category.name,
        image: category.image,
        openGraph: {
            type: "website",
            url: `https://escuelajs.co/category/${id}`,
            title: category.name,
            description: category.name,
            images: [
                {
                    url: category.image,
                    width: 800,
                    height: 600,
                },
            ],
        },
    }
}

 export  default async function CategoryDetail({params}) {
    const id = params.id
    console.log(id)

    const productByCategory = await getProductByCategory(id)

    const categoryById = await getCategoryById(id)

    return (
        <div className='w-[90%] mx-auto'>
            <h1 className='text-center text-4xl font-bold my-5 w-full'>
                {categoryById.name}{" "}
            </h1>
            <div className='flex flex-wrap justify-center gap-5'>
                {productByCategory.length < 1 ? (
                    <p className='text-center'>
                        {" "}
                        there are no product available for {categoryById.name}
                    </p>
                ) : (
                    productByCategory.map((product) => {
                        return (
                            <CardComponent
                                key={product.id}
                                id={product.id}
                                image={product.images[0]}
                                price={product.price}
                                title={product.title}
                            />
                        )
                    })
                )}
            </div>
        </div>
    )
}