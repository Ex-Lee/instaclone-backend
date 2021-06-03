import client from "../../client";

export default {
  Query: {
    seeProfile: async (_, { username }) => {
      const user = await client.user.findFirst({
        where: {
          username,
        },
        include: {
          following: true,
          followers: true,
        },
      });
      return user;
    },
  },
};
