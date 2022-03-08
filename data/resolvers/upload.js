import fs from "fs";
import path from "path";
const __dirname = path.resolve();

import { GraphQLUpload } from "graphql-upload";

export const uploadResolver = {
  Mutation: {
    singleUpload: async (parent, { file }) => {
      const { createReadStream, filename, mimetype, encoding } = await file;
      const location = path.join(__dirname, `/public/images/${filename}`);
      const stream = createReadStream();

      await stream.pipe(fs.createWriteStream(location));

      return { url: `${url}/images/${filename}` };
    },
  },
};
