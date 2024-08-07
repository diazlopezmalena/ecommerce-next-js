import Breadcrumb from "../components/Breadcrumb";


export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <main className="max-w-[1366px] px-20">
          <Breadcrumb/>
            {children}
    </main>
  );
}
