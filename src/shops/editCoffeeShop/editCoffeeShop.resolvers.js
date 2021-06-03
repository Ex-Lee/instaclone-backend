import { protectedResolver } from "../../users/users.utils";
import client from "../../client";
import { createCategoryObj } from "../shops.utils";

export default {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (
        _,
        { id, categories, name, latitude, longitude },
        { loggedInUser }
      ) => {
        const oldShop = await client.coffeeShop.findFirst({
          where: {
            id,
            userId: loggedInUser.id,
          },
          include: {
            categories: {
              select: {
                name: true,
              },
            },
            photos: {
              select: {
                id: true,
                url: true,
              },
            },
          },
        });
        if (oldShop.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: "Photo not found.",
          };
        } else {
          const newShop = await client.coffeeShop.update({
            where: {
              id,
            },
            data: {
              name,
              latitude,
              longitude,
              categories: {
                disconnect: oldShop.categories,
                connectOrCreate: createCategoryObj(categories),
              },
            },
          });

          if (!newShop) {
            return {
              ok: false,
              error: "Failed create shop photo",
            };
          } else {
            return {
              ok: true,
            };
          }
        }
      }
    ),
  },
};
