import React from "react";
import { Text } from "react-native";

import {
  CreateAccountPageRouteProp,
  CreateAccountPageNavigationProp,
} from "../../routes";

type CreateAccountPageProps = {
  route: CreateAccountPageRouteProp;
  navigation: CreateAccountPageNavigationProp;
};

export default function CreateAccountPage({}: CreateAccountPageProps) {
  return <Text>Hello world</Text>;
}
