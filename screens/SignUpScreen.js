import { StyleSheet, Text, View } from 'react-native';

export default function SignUpScreen() {
 return (
   <View style={styles.container}>
     <Text>S'enregistrer</Text>
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