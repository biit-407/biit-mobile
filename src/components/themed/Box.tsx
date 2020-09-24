// Replacement for View to allow for easy theming
import { createBox } from "@shopify/restyle";

import { Theme } from "../../theme";

const Box = createBox<Theme>();

export default Box;
