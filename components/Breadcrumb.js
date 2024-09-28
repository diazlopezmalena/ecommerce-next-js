'use client'
import { usePathname, useRouter } from 'next/navigation'
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { HomeIcon } from '../assets/HomeIcon';
import { inconsolata } from '../utils/fonts';

const Breadcrumb = () => {
  const pathname = usePathname();
  const router = useRouter();
  const arrayOfSlugs = pathname.split('/');

  const handleBreadcrumbClick = (slug) => {
    const url = arrayOfSlugs.slice(0, slug + 1).join('/');
    router.push(url);
  };

  return (
    <Breadcrumbs
      underline="hover"
      itemClasses={{
        item: "px-2 text-white/60 data-[current=true]:text-white",
        separator: "px-0 text-white/40",
      }}
      className={`py-3 ${inconsolata.className} text-white pl-1`}
    >
      <BreadcrumbItem onClick={() => handleBreadcrumbClick(0)}>
        <HomeIcon fill='white' width='16px' />
      </BreadcrumbItem>
      {
        arrayOfSlugs.map((slug, index) => {
          if (slug === '') return null; 

          return (
            <BreadcrumbItem onClick={() => handleBreadcrumbClick(index)} key={slug}>
              {slug.toUpperCase()}
            </BreadcrumbItem>
          )
        })
      }
    </Breadcrumbs>
  );
}

export default Breadcrumb;
