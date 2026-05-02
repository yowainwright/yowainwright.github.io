import { makeAPIRouteHandler } from "@keystatic/next/api";
import keystatic from "../../../lib/config/keystatic.config";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export default makeAPIRouteHandler({ config: keystatic });
