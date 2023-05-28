import UserCard from '@/components/UserCard'
import React from 'react'

export const metadata = {
  title: "ISTAD - User",
  description: 'This is my app',
  images: "/images/alien.png",


  openGraph: {
    title: 'ISTAD-USER',
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


export async function getUsers() {
  const res = await fetch(
    "https://api.escuelajs.co/api/v1/users?limit=8", { cache: "no-store" }
  );
  const data = await res.json();
  return data;
}


export default async function Users() {
  const users = await getUsers();
  return (
    <main className="flex my-4 min-h-screen flex-wrap items-center justify-between">
      {users.map((user) => (
        <UserCard
          key={user.id}
          id={user.id}
          name={user.name}
          avatar={user.avatar}
        />
      ))}
    </main>
  )
}
