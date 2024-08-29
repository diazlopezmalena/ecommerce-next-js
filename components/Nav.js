'use client'
import { useState } from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { inconsolata } from '../utils/fonts';
import { ChevronDown, Lock, Activity, Flash, Server, TagUser, Scale } from "../assets/icons";
import { useRouter } from 'next/navigation';
import Cart from './Cart';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const path = usePathname()
  const router = useRouter()

  const menuItems2 = [
    {
      label: 'Catálogo',
      href: '/catalog',
      id: 'catalog',
      subitems: [
        {
          label: 'Cassettes',
          href: '/cassettes',
          id: 'cassettes'
        },
        {
          label: 'Audio',
          href: '/audio',
          id: 'audio'
        }
      ]
    },
    {
      label: 'Carrito',
      href: '/cart',
      id: '/cart'
    }
  ];

  const handleSubitemsLinks = (slug) => {
    router.replace(slug)
  }

  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
    scale: <Scale className="text-warning" fill="currentColor" size={30} />,
    lock: <Lock className="text-success" fill="currentColor" size={30} />,
    activity: <Activity className="text-secondary" fill="currentColor" size={30} />,
    flash: <Flash className="text-primary" fill="currentColor" size={30} />,
    server: <Server className="text-success" fill="currentColor" size={30} />,
    user: <TagUser className="text-danger" fill="currentColor" size={30} />,
  };

  return (
    <div className='w-full sticky top-0 z-50'>
      <Navbar onMenuOpenChange={setIsMenuOpen} className={`h-24 ${inconsolata.className} font-semiblod max-w-[1366px] px-5 md:px-20 mx-auto bg-primary`}>
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
            menuItems2.map((item) =>
              item.subitems
                ?
                <Dropdown key={item.id}>
                  <NavbarItem>
                    <DropdownTrigger>
                      <Button
                        disableRipple
                        className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                        endContent={icons.chevron}
                        radius="sm"
                        variant="light"
                      >
                        {item.label}
                      </Button>
                    </DropdownTrigger>
                  </NavbarItem>
                  <DropdownMenu
                    aria-label="ACME features"
                    className="w-full"
                    itemClasses={{
                      base: "gap-4",
                    }}
                    key={item.id}
                  >
                    {item.subitems.map(subitem => {
                      return (
                        <DropdownItem
                          startContent={icons.scale}
                          key={subitem.id}
                          className='w-full'
                          onClick={() => handleSubitemsLinks(item.href + subitem.href)}
                        >
                          {subitem.label}
                        </DropdownItem>
                      )

                    })}
                  </DropdownMenu>

                </Dropdown>
                :
                <NavbarItem key={item.label}>
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
            <Cart />
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