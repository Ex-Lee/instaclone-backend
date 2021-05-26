import bcrypt from "bcrypt";
import client from "../client";

export default {
  Mutation: {
    createAccount: async (_, { username, email, name, password }) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });

        if (existingUser) {
          throw new Error("This username/email already taken");
        } else {
          const hashPassword = await bcrypt.hash(password, 10);
          return client.user.create({
            data: {
              username,
              email,
              name,
              password: hashPassword,
            },
          });
        }
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
};
