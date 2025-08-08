import { StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native';
import theme from "../styles/themeLight";
import LogoIcon from "../assets/icons/logo.svg";
import GoogleIcon from "../assets/icons/google.svg"
import AppleIcon from "../assets/icons/apple.svg"
import Button from '../components/Button';
import Input from '../components/Input';

export default function SignUpScreen() {
 return (
  <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.logo}>
        <LogoIcon width={280} height={280} />
      </View>
      <Text style={styles.title}>S'enregistrer via</Text>
      <Button
        icon={GoogleIcon}
        title="Google"
        variant="outline"
        style={styles.button}
      />
      <Button
        icon={AppleIcon}
        title="Apple"
        variant="outline"
        style={styles.button}
      />
      <View style={styles.barre} />
      <Text style={styles.title}>ou directement</Text>
      <Input placeholder="Nom d'utilisateur"/>
      <Input placeholder="Email" autoCapitalize="none"/>
      <Input placeholder="Mot de passe" secureTextEntry/>
      <Button style={[styles.button, { marginBottom: 80 }]} title="S'inscrire"/>
  </KeyboardAvoidingView>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
   title: {
    fontFamily: theme.fonts.staatliches,
    fontSize: theme.fontSize.title,
    margin: theme.spacing.medium,
  },
   button: {
    margin: theme.spacing.small,
    width: '85%',
  },
   barre: {
    width: '50%',
    backgroundColor: theme.colors.error,
    height: 4,
   },
});