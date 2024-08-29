import ProductCard from "@/components/ProductCard"


const Product = async ({ params }) => {

    // const lastSlug = category ? category.toLowerCase() : ''

    const response = await fetch(`http://localhost:3000/api/product/${params.product}`, {
        cache: "no-store",
    })
    const item = await response.json()

    return (
        <ProductCard itemProduct={item} />
    )
}

export default Product