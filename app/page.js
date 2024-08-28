import Image from "next/image";
import ProductList from "../components/ProductsList";
import { inconsolata, raleway } from "../utils/fonts";

export default function Home() {
  return (
    <main className="pt-5 max-w-[1366px] px-5 md:px-20 mx-auto">
      <div className="relative">
        <Image src='banner-2.svg' alt="Banner home" width={1200} height={100} className="rounded-[20px] md:aspect-16/6 shadow-[10px_10px_0px_1px_rgba(0,0,0,1)]" style={{objectFit: "cover"}} />
        <div className="absolute top-[35%] left-[45%] -translate-x-[50%] md:-translate-x-[0%] md:right-[5%] w-[210px] md:w-auto">
          <h1 className={`text-secondary bg-primary md:px-5 text-[20px] md:text-homeTitle ${inconsolata.className} md:mb-[-6px]`}>
            Musicalize your life
          </h1>
          <span className={`${raleway.className} text-[17px] md:text-homeSub taext-primary bg-secondary text-primary md:px-5 text-center`}>
            like the good old days
          </span>
        </div>
      </div>
      <ProductList category='Todos' style='py-10' />
    </main>
  );
}
