import { protectedResolver } from "../../users/users.utils";
import client from "../../client";
import { createCategoryObj } from "../shops.utils";

export default {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (_, { name, url, category }, { loggedInUser }) => {
        // let = categoryObj = [];
        // categoryObj is Unique
        // if (category) {
        const categoryObj = createCategoryObj(category);
        // }
        const shop = await client.coffeeShop.create({
          data: {
            name,
            ...(categoryObj.length > 0 && {
              categories: {
                connectOrCreate: categoryObj,
              },
            }),
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
          },
        });

        const photo = await client.coffeeShopPhoto.create({
          data: {
            url,
            CoffeeShop: {
              connect: {
                id: shop.id,
              },
            },
          },
        });

        if (!shop || !photo) {
          return {
            ok: false,
            error: "Failed create shop or photo",
          };
        } else {
          return {
            ok: true,
          };
        }
      }
    ),
  },
};
