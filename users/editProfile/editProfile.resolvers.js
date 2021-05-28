import { createWriteStream } from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";
import { protectedResolver } from "../users.utils";

const resolverFnc = async (
  _,
  { username, email, name, password: newPassword, location, avatarURL },
  { loggedInUser }
) => {
  let avatarCheck = null;
  if (avatarURL) {
    const { filename, createReadStream } = await avatarURL;

    const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
    const readStream = createReadStream();
    const writeStream = createWriteStream(
      `${process.cwd()}/uploads/${newFilename}`
    );
    readStream.pipe(writeStream);
    avatarCheck = `http://localhost:4000/static/${newFilename}`;
  }

  const { id } = loggedInUser;
  let hashPassword = null;
  if (newPassword) {
    hashPassword = await bcrypt.hash(newPassword, 10);
  }
  const checkExistUser = await client.user.findFirst({
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

  if (checkExistUser) {
    return {
      ok: false,
      error: "The username or email already exists.",
    };
  }

  const updatedUser = await client.user.update({
    where: {
      id,
    },
    data: {
      username,
      email,
      name,
      ...(hashPassword && { password: hashPassword }),
      location,
      ...(avatarCheck && { avatarURL: avatarCheck }),
    },
  });
  if (updatedUser) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "could not update profile",
    };
  }
};

export default {
  Mutation: {
    editProfile: protectedResolver(resolverFnc),
  },
};
