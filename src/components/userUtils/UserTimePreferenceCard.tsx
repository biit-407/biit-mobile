import React from "react";
import { Button } from "react-native-elements";

import theme from "../../theme";
import { ThemedCard, Box } from "../themed";
import Text from "../themed/Text";

function getDayOfWeek(time: number) {
  const day = Math.floor(time / 24);
  if (day === 0) {
    return "Monday";
  }
  if (day === 1) {
    return "Tuesday";
  }
  if (day === 2) {
    return "Wednesday";
  }
  if (day === 3) {
    return "Thursday";
  }
  if (day === 4) {
    return "Friday";
  }
  if (day === 5) {
    return "Saturday";
  }
  if (day === 6) {
    return "Sunday";
  }
  return "Monday";
}

interface UserTimePreferenceCardProps {
  index: number;
  startTime: number;
  endTime: number;
  deleteCallback: (index: number) => void;
  updateCallback: (index: number) => void;
}

const UserTimePreferenceCard = ({
  index,
  startTime,
  endTime,
  deleteCallback,
  updateCallback,
}: UserTimePreferenceCardProps) => {
  const dayOfWeek = getDayOfWeek(startTime);
  const startTimeString = `${startTime % 12}:00 ${
    startTime % 24 >= 12 ? "PM" : "AM"
  }`;
  const endTimeString = `${endTime % 12}:00 ${
    endTime % 24 >= 12 ? "PM" : "AM"
  }`;

  const performUpdate = () => {
    updateCallback(index);
  };

  const performDelete = () => {
    deleteCallback(index);
  };

  return (
    <ThemedCard>
      <Box style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text variant="largeHeader" style={{ flex: 1, alignSelf: "center" }}>
          {dayOfWeek}
        </Text>
        <Box>
          <Text variant="header" style={{ alignSelf: "flex-end" }}>
            {startTimeString} - {endTimeString}
          </Text>
          <Box
            style={{
              paddingTop: theme.spacing.md,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Button
              onPress={performUpdate}
              title={"Update"}
              buttonStyle={{
                backgroundColor: theme.colors.buttonSecondaryBackground,
                marginRight: theme.spacing.md,
              }}
            />
            <Button
              onPress={performDelete}
              title={"Delete"}
              buttonStyle={{
                // TODO create secondary background color
                backgroundColor: theme.colors.iconSelectedRed,
              }}
            />
          </Box>
        </Box>
      </Box>
    </ThemedCard>
  );
};

export default UserTimePreferenceCard;
