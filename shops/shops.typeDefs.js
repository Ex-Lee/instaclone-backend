import { gql } from "apollo-server-express";

export default gql`
  type CoffeeShopPhoto {
    id: Int!
    url: String!
    CoffeeShop: CoffeeShop
    createAt: String!
    updateAt: String!
  }

  type CoffeeShop {
    id: Int!
    name: String!
    latitude: String
    longitude: String
    user: User!
    photos: [CoffeeShopPhoto]!
    categories: [Category]
    createAt: String!
    updateAt: String!
  }

  type Category {
    id: Int!
    name: String!
    slug: String!
    shops: [CoffeeShop]
    totalShops: Int
    createAt: String!
    updateAt: String!
  }
`;
