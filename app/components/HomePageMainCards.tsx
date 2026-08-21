import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PortableText from "react-portable-text";

export const revalidate = 60;

async function getData() {
  const query = `*[_type == "homePageMainCards"]{
  image,
  content,
  title,
  slug,
  _id,
 
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function HomePageMainCards() {
  const data = await getData();
  return (
    <div className='mb-24'>
      <h4 className='text-3xl md:text-6xl font-bold bg-gradient-to-b from-gray-700/80 to-gray-500 dark:from-white dark:to-gray-200 bg-clip-text text-transparent text-center mb-4 '>
        Island Essentials
      </h4>
      <div className='flex flex-wrap justify-around gap-6 lg:gap-12 mt-6 px-4'>
        {data &&
          data.map((item: any) => (
            <div
              key={item._id}
              className='border-2 border-blue-300/50 dark:border-gray-300 bg-white dark:bg-gray-700 md:w-72 p-4 rounded-lg shadow-xl'>
              {item.image && (
                <Image
                  src={urlForImage(item.image).url()}
                  alt={item.title}
                  width={500}
                  height={500}
                  className='aspect-[16/9] object-cover'
                />
              )}

              <h5 className='text-sm text-center mt-4 mb-2 font-semibold'>
                {item.title}
              </h5>

              {item.content && (
                <div className='text-sm line-clamp-3 leading-6 mb-4'>
                  <PortableText content={item.content} />
                </div>
              )}

              <div className='pt-5 text-sm font-semibold cursor-pointer mt-auto'>
                {item.slug && (
                  <Link href={`../mainCard/${item.slug.current}`}>
                    Read more...
                  </Link>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
