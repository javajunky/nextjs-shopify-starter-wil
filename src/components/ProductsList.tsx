"use client";
import { graphql } from "gql.tada";
import { useQuery } from "urql/";

const collection = process.env.NEXT_PUBLIC_SHOPIFY_COLLECTION;

const ProductQuery = graphql(`{
      collectionByHandle(handle: "${collection}") {
        id
        title
        products(first: 250) {
          edges {
            node {
              id
              title
              description
              handle
              images(first: 250) {
                edges {
                  node {
                    id
                    originalSrc
                    height
                    width
                    altText
                  }
                }
              }
              variants(first: 250) {
                edges {
                  node {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }`);

function ProductsList() {
  const [result] = useQuery({
    query: ProductQuery,
  });
  console.log(result);
  return <div>ProductsList</div>;
}

export default ProductsList;
