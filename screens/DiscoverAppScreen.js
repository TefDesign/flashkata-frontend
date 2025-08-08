import { StyleSheet, Text, View } from 'react-native';

export default function DiscoverAppScreen() {
 return (
   <View style={styles.container}>
     <Text>Découvrir l'application</Text>
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