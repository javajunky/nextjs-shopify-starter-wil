import ProductsList from "@/components/ProductsList";

type Product = {
  id: string;
  title: string;
  description: string;
  handle: string;
  images: object;
  variants: object;
};
const HomePage = async () => {
  // const json = await getAllProductsInCollection();
  // console.log(json);

  return (
    <main className="p-10 container">
      <h1 className="text-xl font-bold">Shopify + Next.js 14!</h1>
      <ProductsList />
      <ul>
        {/* {json.map((node: any) => {
          const product: Product = node.node;
          return <li key={product.title}>{product.title}</li>;
        })} */}
      </ul>
    </main>
  );
};

export default HomePage;
