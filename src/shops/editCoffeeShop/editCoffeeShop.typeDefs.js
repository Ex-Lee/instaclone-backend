import { gql } from "apollo-server-express";

export default gql`
  type editCoffeeShop {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editCoffeeShop(
      id: Int!
      categories: String
      name: String
      latitude: String
      longitude: String
    ): editCoffeeShop!
  }
`;
