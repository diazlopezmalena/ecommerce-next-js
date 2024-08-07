import Image from "next/image";
import ProductList from "./components/ProductsList";
import { inconsolata, raleway } from "./utils/fonts";

export default function Home() {
  return (
    <main className="pt-5 max-w-[1366px] px-20 mx-auto">
      <div className="relative">
        <Image src='banner-2.svg' alt="Banner home" width={1200} height={100} className="rounded-[20px] aspect-16/6 shadow-[10px_10px_0px_1px_rgba(0,0,0,1)]" style={{objectFit: "cover"}} />
        <div className="absolute top-[35%] right-[5%]">
          <h1 className={`text-secondary bg-primary px-5 text-homeTitle ${inconsolata.className} mb-[-7px]`}>
            Musicalize your life
          </h1>
          <span className={`${raleway.className} text-homeSub text-primary bg-secondary px-5 text-center`}>
            like the good old days
          </span>
        </div>
      </div>
      <ProductList category='Todos' style='py-10' />
    </main>
  );
}
