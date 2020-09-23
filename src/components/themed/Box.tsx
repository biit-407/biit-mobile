// Replacement for View to allow for theming
import { createBox } from "@shopify/restyle";

import { Theme } from "../../theme";

const Box = createBox<Theme>();

export default Box;
