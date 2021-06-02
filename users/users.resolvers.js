import client from "../client";

export default {
  User: {
    totalFollowers: ({ id }) => {
      return client.user.findUnique({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      });
    },
    totalFollowing: ({ id }) => {
      return client.user.findUnique({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      });
    },
    isMe: ({ id }, _, { loggedInUser }) => {
      return loggedInUser.id === id ? true : false;
    },
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      } else {
        const exists = client.user.count({
          where: {
            username: loggedInUser.username,
            following: {
              some: {
                id,
              },
            },
          },
        });
        return Boolean(exists);
      }
    },
  },
};
