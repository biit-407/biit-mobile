import React from "react";
import {
  FlatList,
  GestureResponderEvent,
  Modal,
  StyleSheet,
} from "react-native";
import { Button } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-community/picker";

import Box from "../themed/Box";
import useConstructor from "../../hooks/useConstructor";
import theme from "../../theme";
import {
  UserTimePreferencePageNavigationProp,
  UserTimePreferencePageRouteProp,
} from "../../routes";
import Text from "../themed/Text";

import UserTimePreferenceCard from "./UserTimePreferenceCard";

type UserTimePreferencePageProps = {
  route: UserTimePreferencePageRouteProp;
  navigation: UserTimePreferencePageNavigationProp;
};

export const UserTimePreferencePageOptions = {
  title: "Time Preference",
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
});

export default function UserTimePreferencePage({
  route,
}: UserTimePreferencePageProps) {
  const { currentUserPreferences } = route.params;
  const [preferences, setPreferences] = React.useState<
    { start: number; end: number }[]
  >([]);
  const [show, setShow] = React.useState(false);
  const [dateState, setDateState] = React.useState({
    state: 0,
    start: 0,
    end: 0,
    index: 0,
    day: 0,
  });
  const [modalVisible, setModalVisible] = React.useState(false);

  const createTimeCard = (_event: GestureResponderEvent) => {
    setPreferences([...preferences, { start: 9, end: 17 }]);
  };

  const deleteTimePreference = (index: number) => {
    const copy = preferences;
    copy.splice(index, 1);
    setPreferences([...copy]);
  };

  const updateTimePreference = (index: number) => {
    const startTime = preferences[index].start;
    const endTime = preferences[index].end;
    setDateState({
      ...dateState,
      start: startTime,
      end: endTime,
      state: 0,
      index: index,
    });
    setShow(true);
  };

  const onChange = (
    _event: any /*eslint-disable-line @typescript-eslint/no-explicit-any */,
    selectedDate: Date | undefined
  ) => {
    if (_event.type !== "set") {
      return;
    }
    const time = selectedDate?.getHours();
    if (dateState.state === 0 && time) {
      setDateState({ ...dateState, start: time, state: 1 });
      setShow(false);
    }
    if (dateState.state === 1 && time) {
      setDateState({ ...dateState, end: time, state: 2 });
      setShow(false);
      setModalVisible(true);
    }
  };

  const renderUserPreference = ({
    item,
    index,
  }: {
    item: { start: number; end: number };
    index: number;
  }) => {
    return (
      <UserTimePreferenceCard
        index={index}
        startTime={item.start}
        endTime={item.end}
        deleteCallback={deleteTimePreference}
        updateCallback={updateTimePreference}
      />
    );
  };

  useConstructor(() => {
    setPreferences(currentUserPreferences);
  });

  return (
    <Box backgroundColor="mainBackground" style={{ ...styles.root }}>
      <FlatList
        data={preferences}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={renderUserPreference}
        style={{ width: "100%" }}
        ListFooterComponent={
          <>
            <Button
              onPress={createTimeCard}
              title={"Add Time Preference"}
              buttonStyle={{
                backgroundColor: theme.colors.buttonPrimaryBackground,
                padding: theme.spacing.md,
                margin: theme.spacing.md,
                elevation: 16,
                shadowColor: "#000000",
                shadowOpacity: 0.29,
                shadowOffset: {
                  width: 8,
                  height: 8,
                },
                shadowRadius: 16,
                marginBottom: 32,
              }}
            />
          </>
        }
      />

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode={"time"}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <Box style={{ alignSelf: "center", width: "80%" }}>
          <Box style={{ height: "40%" }} />
          <Text variant={"header"}>Select the day of the week</Text>
          <Picker
            selectedValue={dateState.day}
            onValueChange={(itemValue: React.ReactText, _itemIndex: number) => {
              setDateState({
                ...dateState,
                day: parseInt(itemValue.toString(), 10),
              });
            }}
          >
            <Picker.Item label="Monday" value={0} />
            <Picker.Item label="Tuesday" value={1} />
            <Picker.Item label="Wednesday" value={2} />
            <Picker.Item label="Thursday" value={3} />
            <Picker.Item label="Friday" value={4} />
            <Picker.Item label="Saturday" value={5} />
            <Picker.Item label="Sunday" value={6} />
          </Picker>
          <Button
            title={"Submit"}
            onPress={() => {
              setModalVisible(false);
              const offset = dateState.day * 24;

              const copy = preferences;
              copy[dateState.index] = {
                start: dateState.start + offset,
                end: dateState.end + offset,
              };
              setPreferences([...copy]);
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
}
