import { View, Text } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import theme from '../styles/themeLight'

export default function Gauge() {
  return (
    <View>
      <ProgressBar 
        progress={0.9} 
        width={200} 
        height={20}
        color={theme.colors.success}
        borderRadius={8}
      />
    </View>
  );
}