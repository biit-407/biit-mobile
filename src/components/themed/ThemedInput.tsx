import React from "react";
import { useTheme } from "@shopify/restyle";
import { Input, InputProps } from "react-native-elements";

import { Theme } from "../../theme";

type ThemedInputProps = InputProps;
// type ThemedInputProps = {
//   label?: string;
//   placeholder?: string;
//   returnKeyType?: InputProps["returnKeyType"];
//   onSubmitEditing?: () => void;
// };

// A reusable themed input
const ThemedInput = React.forwardRef<Input, ThemedInputProps>(
  (props: ThemedInputProps, ref) => {
    const theme = useTheme<Theme>();
    return (
      <Input
        ref={ref}
        labelStyle={{ color: theme.colors.textInputDefault }}
        placeholderTextColor={theme.colors.textInputDefault}
        inputStyle={{ color: "#3D2400" }}
        inputContainerStyle={{
          borderBottomColor: theme.colors.textInputDefault,
        }}
        containerStyle={{ width: "80%" }}
        selectionColor={theme.colors.textInputDefault}
        {...props}
      />
    );
  }
);

export default ThemedInput;
