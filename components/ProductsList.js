// 'use client'
// import { products } from "@/data/products";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";
// import { useRouter } from "next/navigation";

const ProductList = async ({ category, style }) => {
    // const router = useRouter()

    // const lastSlug = category === 'Todos' ? '' : category.toLowerCase()

    const response = await fetch(`http://localhost:3000/api/products`, {
        cache: "no-store",
    })
    const items = await response.json()


    // const items = category === 'Todos'
    //     ? products
    //     : products.filter(items => items.category.toLowerCase() === category.toLowerCase()).length < 1
    //         ? ''// ? router.replace('/not-found')
    //         : products.filter(items => items.category.toLowerCase() === category.toLowerCase())

    const firstSlug = category === 'Todos' ? 'catalog/' : ''

    return (
        <div className={`gap-6 grid grid-cols-2 sm:grid-cols-3 ${style}`}>
            {items.map((item, index) => (
                <Link href={`${firstSlug}${item.category.toLowerCase()}/${item.id}`} key={index} >
                    <Card shadow="sm" className="size-full">
                        <CardBody className="overflow-visible p-0">
                            <Image
                                shadow="sm"
                                radius="lg"
                                width="100%"
                                height="300px"
                                alt={item.title}
                                className="w-full object-cover md:h-[140px] !h-[150px]"
                                src={item.img}
                            />
                        </CardBody>
                        <CardFooter className="text-small justify-between">
                            <b>{item.title}</b>
                            <p className="text-default-500">{item.price}</p>
                        </CardFooter>
                    </Card>
                </Link>
            ))}
        </div>
    );
}

export default ProductList