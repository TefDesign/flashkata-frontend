import { useState } from 'react';
import { Dimensions } from 'react-native';
import { TextInput, View, StyleSheet } from 'react-native';
import theme from '../styles/themeLight'

export default function Input() {

const [isFocused, setIsFocused] = useState(false);

return (
    <View style={styles.container}>
        <TextInput
          style={[
            styles.input,
            { borderColor: isFocused ? theme.colors.primary : theme.colors.border },
        ]}
          placeholder='Input'
          placeholderTextColor={theme.colors.border}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          selectionColor={theme.colors.border}
        />
   </View>
);
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        alignItems: 'center',
    },
    input: {
        width: '60%',
        height: 50,
        margin: theme.spacing.small,
        borderWidth: 2,
        borderRadius: theme.borderRadius.base,
        paddingVertical: theme.spacing.small,
        paddingHorizontal: theme.spacing.medium,
        color: theme.colors.text,
    },
});