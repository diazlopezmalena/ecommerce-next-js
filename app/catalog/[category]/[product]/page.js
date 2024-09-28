import ProductDetail from "@/components/productDetail"

const Product = async ({ params }) => {
    const url = 'https://ecommerce-next-js-seven-drab.vercel.app/'

    const response = await fetch(`${url}api/product/${params.product}`, {
        cache: "no-store",
    })
    const item = await response.json()

    return (
        <>
            <ProductDetail product={item} />
        </>
    )
}

export default Product