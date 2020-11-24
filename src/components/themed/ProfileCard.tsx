import React from "react";
import { EMPTY_PROFILE_PIC } from "../../models/constants";

import Text from "./Text";
import ThemedAvatar from "./ThemedAvatar";
import ThemedCard from "./ThemedCard";

interface ProfileCardProps {
  avatarURI: string;
  name: string;
  onEdit?: () => void;
}

export default function ProfileCard({
  avatarURI,
  name,
  onEdit,
}: ProfileCardProps) {
  return (
    <ThemedCard wrapperStyle={{ alignItems: "center" }}>
      <ThemedAvatar
        uri={avatarURI ?? EMPTY_PROFILE_PIC}
        size="xlarge"
        edit={onEdit ? true : false}
        onEdit={onEdit}
      />
      <Text marginBottom="md" variant="header">
        {name}
      </Text>
    </ThemedCard>
  );
}
