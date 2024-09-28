import ProductList from "@/components/ProductsList"

export async function generateMetadata({ params, searchParams }, parent) {
  return {
    title: `${params.category}`
  }
}

const Category = ({ params }) => {

  return (
    <div>Category: {params.category}
      <ProductList category={params.category} />
    </div>
  )
}

export default Category