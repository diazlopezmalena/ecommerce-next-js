import ProductCard from './ProductCard';

const ProductList = async ({ category, style }) => {
   
    const lastSlug = category ? category.toLowerCase() : '';
    // const url = 'http://localhost:3000/';
    const url = 'https://ecommerce-next-js-seven-drab.vercel.app/'

    const response = await fetch(`${url}api/products/${lastSlug}`, {
        cache: "no-store",
    });

    if (!response.ok) {
        console.error("Failed to fetch products:", response.statusText);
        return <div>Error fetching products</div>; 
    }

    const items = await response.json();

    return (
        <div className={`gap-6 grid grid-cols-2 sm:grid-cols-3 ${style}`}>
            {
                items.length > 0
                    ? items.map((item, index) => (
                        <ProductCard key={index} itemProduct={[item]} /> 
                    ))
                    : 'Categoría no encontrada'
            }
        </div>
    );
}

export default ProductList;

