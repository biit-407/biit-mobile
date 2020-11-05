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
import { updateAccount, useAccount } from "../../contexts/accountContext";
import { useToken } from "../../contexts/tokenContext";

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

export default function UserTimePreferencePage({}: UserTimePreferencePageProps) {
  const [preferences, setPreferences] = React.useState<
    { start: Date; end: Date }[]
  >([]);
  const [show, setShow] = React.useState(false);
  const [dateState, setDateState] = React.useState({
    state: 0,
    start: new Date(),
    end: new Date(),
    index: 0,
    day: 0,
  });
  const [modalVisible, setModalVisible] = React.useState(false);
  const [accountState, accountDispatch] = useAccount();
  const [tokenState, tokenDispatch] = useToken();

  const createTimeCard = (_event: GestureResponderEvent) => {
    setPreferences([...preferences, { start: new Date(), end: new Date() }]);
  };

  const deleteTimePreference = (index: number) => {
    const copy = preferences;
    copy.splice(index, 1);
    setPreferences([...copy]);
  };

  const submitPreferences = async () => {
    setModalVisible(false);
    const offset = (new Date().getDay() + dateState.day - 1) % 7;

    const copy = preferences;
    const startDate = new Date(dateState.start);
    startDate.setDate(dateState.start.getDate() + offset);

    const endDate = new Date(dateState.end);
    endDate.setDate(dateState.end.getDate() + offset);

    copy[dateState.index] = {
      start: startDate,
      end: endDate,
    };
    setPreferences([...copy]);
    await updateAccount(
      accountDispatch,
      tokenDispatch,
      tokenState.refreshToken,
      accountState.account,
      {
        fname: accountState.account.fname,
        lname: accountState.account.lname,
        email: accountState.account.email,
        schedule: copy.map((item, _index, _source) => {
          return [
            Math.round(item.start.getTime() / 1000).toString(),
            Math.round(item.end.getTime() / 1000).toString(),
          ];
        }),
      }
    );
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
    if (dateState.state === 0 && selectedDate) {
      setDateState({ ...dateState, start: selectedDate, state: 1 });
      setShow(false);
    }
    if (dateState.state === 1 && selectedDate) {
      setDateState({ ...dateState, end: selectedDate, state: 2 });
      setShow(false);
      setModalVisible(true);
    }
  };

  const renderUserPreference = ({
    item,
    index,
  }: {
    item: { start: Date; end: Date };
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
    const schedule: { start: Date; end: Date }[] = [];
    console.log(accountState.account.schedule);
    if (accountState.account.schedule !== undefined) {
      for (let i = 0; i < accountState.account.schedule?.length; i++) {
        schedule.push({
          start: new Date(accountState.account.schedule[i][0]),
          end: new Date(accountState.account.schedule[i][1]),
        });
      }
    }
    setPreferences(schedule);
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
          <Button title={"Submit"} onPress={submitPreferences} />
        </Box>
      </Modal>
    </Box>
  );
}
