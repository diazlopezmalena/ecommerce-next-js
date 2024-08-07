'use client'
import { useState } from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button } from "@nextui-org/react";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { inconsolata } from '../utils/fonts';
// import {AcmeLogo} from "./AcmeLogo.jsx";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const path = usePathname()

  const menuItems2 = [
    {
      label: 'Catálogo',
      href: '/catalog',
      id: 'catalog'
    },
    {
      label: 'Carrito',
      href: '/cart',
      id: '/cart'
    }
  ];

  return (
    <div className='w-full sticky top-0 z-50'>
      <Navbar onMenuOpenChange={setIsMenuOpen} className={`h-24 ${inconsolata.className} font-semiblod max-w-[1366px] px-20 mx-auto bg-primary`}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Link href={'/'}>
              <Image src={"/logotype.svg"} alt='Retro logotipo' width={100} height={100} />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-10" justify="center">
          {
            menuItems2.map((item) => {
              return (
                <NavbarItem key={item.label}>
                  <Link color="foreground" href={item.href} className={`${path.includes(item.id) ? 'font-bold' : ''} text-lg`}>
                    {item.label}
                  </Link>
                </NavbarItem>
              )
            })
          }
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="/admin" className='text-lg'>Login</Link>
          </NavbarItem>

        </NavbarContent>

        <NavbarMenu>
          {menuItems2.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2 ? "primary" : index === menuItems2.length - 1 ? "danger" : "foreground"
                }
                className="w-full"
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </div>
  )
}

export default Nav