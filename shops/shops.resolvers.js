import client from "../client";

export default {
  CoffeeShop: {
    user: ({ userId }) => {
      return client.user.findUnique({
        where: {
          id: userId,
        },
      });
    },

    categories: ({ id }) => {
      return client.category.findMany({
        where: {
          shops: {
            some: {
              id,
            },
          },
        },
      });
    },
    photos: () => {
      return client.coffeeShopPhoto.findMany();
    },
  },

  Category: {
    shops: ({ id }) => {
      return client.coffeeShop.findMany({
        where: {
          categories: {
            some: {
              id,
            },
          },
        },
      });
    },
    totalShops: ({ id }) => {
      return client.coffeeShop.count({
        where: {
          categories: {
            some: {
              id,
            },
          },
        },
      });
    },
  },
};
