import { StyleSheet, Text, View } from 'react-native';

export default function SignInScreen() {
 return (
   <View style={styles.container}>
     <Text>Se Connecter</Text>
   </View>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});