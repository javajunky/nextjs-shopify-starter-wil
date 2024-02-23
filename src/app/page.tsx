import { getAllProductsInCollection } from "@/lib/shopify";
import { gql } from "@/lib/utils";

type GraphQLResponse = {
  data: {
    products: {
      nodes: {
        title: string;
      }[];
    };
  };
  extensions: {
    cost: {
      requestedQueryCost: number;
      actualQueryCost: number;
      throttleStatus: {
        maximumAvailable: number;
        currentlyAvailable: number;
        restoreRate: number;
      };
    };
  };
};
type Product = {
  id: string;
  title: string;
  description: string;
  handle: string;
  images: object;
  variants: object;
};

const getProducts = async (): Promise<GraphQLResponse> => {
  const res = await fetch(process.env.GRAPHQL_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token":
        process.env.NEXT_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN!,
    },
    body: JSON.stringify({
      query: gql`
        query ProductsQuery {
          products(first: 6) {
            nodes {
              title
            }
          }
        }
      `,
    }),
  });

  if (!res.ok) {
    const text = await res.text(); // get the response body for more information

    throw new Error(`
      Failed to fetch data
      Status: ${res.status}
      Response: ${text}
    `);
  }

  return res.json();
};

const HomePage = async () => {
  const json = await getAllProductsInCollection();
  console.log(json);
  return (
    <main>
      <h1>Shopify + Next.js 13!</h1>

      <ul>
        {json.map((node: any) => {
          const product: Product = node.node;
          return <li key={product.title}>{product.title}</li>;
        })}
      </ul>
    </main>
  );
};

export default HomePage;
