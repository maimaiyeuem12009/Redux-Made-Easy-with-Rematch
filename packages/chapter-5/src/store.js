import { init } from "@rematch/core";

import { shop, cart } from "./models";

const models = { shop, cart };

const store = init({ models });

export default store;
