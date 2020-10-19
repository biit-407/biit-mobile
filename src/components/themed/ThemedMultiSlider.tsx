import React from "react";
import { useTheme } from "@shopify/restyle";
import MultiSlider, {
  MultiSliderProps,
} from "@ptomasroos/react-native-multi-slider";

import { Theme } from "../../theme";

type ThemedMultiSliderProps = MultiSliderProps;

// A reusable themed multislider
export default function ThemedMultiSlider(props: ThemedMultiSliderProps) {
  const theme = useTheme<Theme>();
  return (
    <MultiSlider
      selectedStyle={{
        backgroundColor: theme.colors.sliderTrackSelected,
      }}
      unselectedStyle={{
        backgroundColor: theme.colors.sliderTrackUnselected,
      }}
      markerStyle={{
        backgroundColor: theme.colors.sliderMarkerDisabled,
      }}
      pressedMarkerStyle={{ backgroundColor: theme.colors.sliderMarkerEnabled }}
      {...props}
    />
  );
}
