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

const ThemedInput = React.forwardRef<Input, ThemedInputProps>(
  (
    { label, placeholder, returnKeyType, onSubmitEditing }: ThemedInputProps,
    ref
  ) => {
    const theme = useTheme<Theme>();
    return (
      <Input
        containerStyle={{ width: "80%" }}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textInputDefault}
        selectionColor={theme.colors.textInputDefault}
        inputStyle={{ color: "#3D2400" }}
        inputContainerStyle={{
          borderBottomColor: theme.colors.textInputDefault,
        }}
        label={label}
        labelStyle={{ color: theme.colors.textInputDefault }}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        ref={ref}
      />
    );
  }
);

export default ThemedInput;
