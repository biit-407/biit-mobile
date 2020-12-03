import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useNotificationCenter } from '../../contexts/notificationCenterContext';
import { Theme } from '../../theme';
import { Box, ThemedButton } from '../themed';
import { Text } from '../themed'

const styles = StyleSheet.create({
    itemView: {
        backgroundColor: "#FFE8C6",
        borderColor: "#3D2400",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.25,
        elevation: 5,
    },
    itemText: {
        marginTop: 20,
        marginLeft: 15,
        marginRight: 15,
        textAlign: "center",
    },
});

type NotificationCenterItemProps = {
    text: string;
    buttonText?: string;
    backgroundColor?: string;
    buttonColor?: keyof Theme["colors"];
    buttonSlim?: boolean;
    showButton: boolean;
};

export default function NotificationCenterItem({
    text,
    buttonText,
    backgroundColor,
    buttonColor,
    buttonSlim,
    showButton,
}: NotificationCenterItemProps) {
    const [, notificationCenterDispatch] = useNotificationCenter();

    return ((buttonText && showButton) ?
        <Box style={[styles.itemView, {backgroundColor: backgroundColor ? backgroundColor : styles.itemView.backgroundColor}]}>
            <Text style={styles.itemText}>{text}</Text>
            <ThemedButton 
                    title={buttonText}
                    onPress={() => {
                        notificationCenterDispatch({type: "hide"})
                    }}
                    color={buttonColor}
                    slim={buttonSlim ? buttonSlim : false}
            />
        </Box>
        :
        <Box style={[styles.itemView, {backgroundColor: backgroundColor ? backgroundColor : styles.itemView.backgroundColor, width: 200}]}>
            <Text style={[styles.itemText, {marginBottom: 20}]}>{text}</Text>
        </Box>
    );
}