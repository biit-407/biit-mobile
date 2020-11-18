import React from "react";
import { useTheme } from "@shopify/restyle";
import { SearchBar, SearchBarProps } from "react-native-elements";

import { Theme } from "../../theme";

type ThemedSearchBarProps = SearchBarProps;

// A reusable themed button
export default function ThemedSearchBar(props: ThemedSearchBarProps) {
  const theme = useTheme<Theme>();
  return (
    <SearchBar
      containerStyle={{ backgroundColor: theme.colors.searchBarBackground }}
      inputStyle={{
        color: theme.colors.iconPrimary,
        backgroundColor: theme.colors.searchBarInputBackground,
      }}
      inputContainerStyle={{
        backgroundColor: theme.colors.searchBarInputBackground,
      }}
      placeholderTextColor={theme.colors.searchBarPlaceholderText}
      leftIconContainerStyle={{
        backgroundColor: theme.colors.searchBarInputBackground,
      }}
      searchIcon={{ color: theme.colors.iconPrimary }}
      rightIconContainerStyle={{
        backgroundColor: theme.colors.searchBarInputBackground,
      }}
      clearIcon={{ color: theme.colors.iconPrimary }}
      {...props}
    />
  );
}
