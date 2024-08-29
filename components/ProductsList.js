import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";

const ProductList = async ({ category, style }) => {
    const lastSlug = category ? category.toLowerCase() : ''
        const url = 'https://ecommerce-next-js-seven-drab.vercel.app/'

    const response = await fetch(`${url}api/products/${lastSlug}`, {
        cache: "no-store",
    })
    const items = await response.json()

    return (
        <div className={`gap-6 grid grid-cols-2 sm:grid-cols-3 ${style}`}>
            {
                items.length > 0
                ?
                items.map((item, index) => (
                    <Link href={`/catalog/${item.category.toLowerCase()}/${item.id}`} key={index} >
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
                ))
                :
                'Categoría no encontrada'
            }
        </div>
    );
}

export default ProductList