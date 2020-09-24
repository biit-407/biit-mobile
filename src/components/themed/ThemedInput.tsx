import React from "react";
import { useTheme } from "@shopify/restyle";
import { Input, InputProps } from "react-native-elements";

import { Theme } from "../../theme";

type ThemedInputProps = {
  label?: string;
  placeholder?: string;
  returnKeyType?: InputProps["returnKeyType"];
  onSubmitEditing?: () => void;
};

// A reusable themed input
const ThemedInput = React.forwardRef<Input, ThemedInputProps>(
  (
    { label, placeholder, returnKeyType, onSubmitEditing }: ThemedInputProps,
    ref
  ) => {
    const theme = useTheme<Theme>();
    return (
      <Input
        ref={ref}
        label={label}
        labelStyle={{ color: theme.colors.textInputDefault }}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textInputDefault}
        inputStyle={{ color: "#3D2400" }}
        inputContainerStyle={{
          borderBottomColor: theme.colors.textInputDefault,
        }}
        containerStyle={{ width: "80%" }}
        selectionColor={theme.colors.textInputDefault}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
      />
    );
  }
);

export default ThemedInput;
