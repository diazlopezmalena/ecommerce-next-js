'use client'
import { usePathname } from 'next/navigation'
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { HomeIcon } from '../assets/HomeIcon';
import { inconsolata } from '../utils/fonts';

const Breadcrumb = () => {
  const paths = usePathname()
  const arrayOfSlugs = paths.split('/')
  return (
    <Breadcrumbs
      underline="hover"
      itemClasses={{
        item: "px-2 text-white/60 data-[current=true]:text-white",
        separator: "px-0 text-white/40",
      }}
      className={`py-3 ${inconsolata.className} text-white pl-1`}
    >
      <BreadcrumbItem href="/catalog">
        <HomeIcon fill='white' width='16px' />
      </BreadcrumbItem>
      {
        arrayOfSlugs.map((slug, index) => {

          const url = arrayOfSlugs.slice(0,index)
          const joiner = url.join('/')

          if (slug === '') {
            return
          }

          return (
            <BreadcrumbItem href={`${joiner}/${slug}`} key={slug} >
              {slug.toUpperCase()}
            </BreadcrumbItem>
          )
        })
      }
    </Breadcrumbs>
  );
}


export default Breadcrumb