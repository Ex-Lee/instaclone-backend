import client from "../../client";

export default {
  Query: {
    seeCategory: async (_, { id }) => {
      const category = await client.category.findFirst({
        where: {
          id,
        },
      });
      return category;
    },

    seeCategories: async (_, { page }) => {
      return await client.coffeeShop.findMany({
        take: 5,
        skip: (page - 1) * 5,
      });
    },
  },
};
