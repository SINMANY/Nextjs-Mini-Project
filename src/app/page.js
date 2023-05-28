import CardComponent from '@/components/CardComponent';
import Image from 'next/image'
import Users from './users/page';
import Link from 'next/link';
import CategoryCard from '@/components/CategoryCard';

export const metadata = {
  title: "ISTAD - Home",
  description: 'This is my app',
  images: "/images/alien.png",


  openGraph: {
    title: 'ISTAD-HOME',
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
export async function getData() {
  // no-store to avoid cache
  const res = await fetch(
    "https://api.escuelajs.co/api/v1/products?limit=20&offset=0", { cache: "no-store" }
  );
  const data = await res.json();
  return data;
}

export default async function Home() {
  const products = await getData();

  return (
    <>
    <br />
      <Link href="/product"> <button type="button" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Add new product</button></Link>
      <main className="flex my-4 min-h-screen flex-wrap items-center justify-between">
      {products.map((product) => (
        <CardComponent
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          image={product.images[0]}
        />
      ))}
    </main>
    </>
  )
}

