import client from "../../client";

export default {
  Query: {
    seeProfile: async (_) => {
      const user = await client.user.findMany();
      return user;
    },
  },
};
