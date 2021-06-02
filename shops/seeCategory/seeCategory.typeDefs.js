import { gql } from "apollo-server";

export default gql`
  type Query {
    seeCategory(id: Int!): Category!
    seeCategories(page: Int!): [Category]!
  }
`;
