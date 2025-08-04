import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import theme from '../styles/themeLight'

function Input() {

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
        width: '100%',
        alignItems: 'center',
    },
    input: {
        width: '60%',
        height: 50,
        margin: 20,
        borderWidth: 2,
        borderRadius: theme.borderRadius.base,
        paddingVertical: 10,
        paddingHorizontal: 20,
        color: theme.colors.text,
    },
});

export default Input;