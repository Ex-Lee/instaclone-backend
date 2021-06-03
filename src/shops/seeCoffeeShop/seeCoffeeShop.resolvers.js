import client from "../../client";

export default {
  Query: {
    seeCoffeeShop: async (_, { id }) => {
      const coffeeShop = await client.coffeeShop.findFirst({
        where: {
          id,
        },
      });
      return coffeeShop;
    },

    seeCoffeeShops: async (_, { page }) => {
      return await client.coffeeShop.findMany({
        take: 5,
        skip: (page - 1) * 5,
      });
    },
  },
};
