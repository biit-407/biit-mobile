import React from "react";
import { Button } from "react-native-elements";

import theme from "../../theme";
import { getDayOfWeek, getTimeAsString } from "../../utils/timeUtils";
import { ThemedCard, Box } from "../themed";
import Text from "../themed/Text";

interface UserTimePreferenceCardProps {
  index: number;
  startTime: Date;
  endTime: Date;
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
  const startTimeString = getTimeAsString(startTime);
  const endTimeString = getTimeAsString(endTime);

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
