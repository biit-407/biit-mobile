// Replacement for Text to allow for easy theming
import { createText } from "@shopify/restyle";

import { Theme } from "../../theme";

const Text = createText<Theme>();

export default Text;
