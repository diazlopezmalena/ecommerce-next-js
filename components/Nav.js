'use client';
import { useState, useEffect } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { inconsolata } from '../utils/fonts';
import { ChevronDown } from "../assets/icons";
import { useRouter } from 'next/navigation';
import Cart from './Cart';

const fetchProducts = async () => {
  const response = await fetch('/api/products');
  if (!response.ok) {
    throw new Error('Error fetching products');
  }
  return response.json();
};

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const products = await fetchProducts();
        const uniqueCategories = [...new Set(products.map(product => product.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    getCategories();
  }, []);

  const menuItems2 = [
    {
      label: 'Catálogo',
      href: '/catalog',
      id: 'catalog',
      subitems: [
        {
          label: 'Todos',
          href: '/catalog',
          id: 'all'
        },
        ...categories.map(category => ({
          label: category.charAt(0).toUpperCase() + category.slice(1),
          href: `/catalog/${category}`,
          id: category,
        }))
      ]
    }
  ];

  const handleSubitemsLinks = (slug) => {
    router.replace(slug);
  };

  return (
    <div className='w-full sticky top-0 z-50'>
      <Navbar onMenuOpenChange={setIsMenuOpen} className={`h-24 ${inconsolata.className} font-semiblod max-w-[1366px] px-5 md:px-20 mx-auto bg-primary`}>
        <NavbarContent>
          <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden" />
          <NavbarBrand>
            <Link href={'/'}>
              <Image src={"/logotype.svg"} alt='Retro logotipo' width={100} height={100} />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-10" justify="center">
          {
            menuItems2.map((item) =>
              item.subitems
                ? <Dropdown key={item.id}>
                    <NavbarItem color="foreground">
                      <DropdownTrigger>
                        <Button
                          disableRipple
                          className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                          endContent={<ChevronDown fill="currentColor" size={16} />}
                          radius="sm"
                          variant="light"
                          color="foreground"
                        >
                          {item.label}
                        </Button>
                      </DropdownTrigger>
                    </NavbarItem>
                    <DropdownMenu aria-label="Catalog features" className="w-full" key={item.id}>
                      {item.subitems.map(subitem => (
                        <DropdownItem
                          key={subitem.id}
                          className='w-full'
                          onClick={() => handleSubitemsLinks(subitem.href)}
                        >
                          {subitem.label}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                : <NavbarItem key={item.label}>
                    <Link color="foreground" href={item.href} className={`${path.includes(item.id) ? 'font-bold' : ''} text-lg`}>
                      {item.label}
                    </Link>
                  </NavbarItem>
            )
          }
        </NavbarContent >

        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="/admin" className='text-lg'>Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href={'/cart'}>
              <Cart />
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
}

export default Nav;
