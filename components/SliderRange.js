import Slider from '@react-native-community/slider';
import { Text } from 'react-native';
import theme from '../styles/themeLight';

const SliderRange = () => {

const [sliderValue, setSliderValue] = useState(1);

return (
        <Slider
            style={{width: 200, height: 40}}
            minimumValue={1}
            maximumValue={10}
            onValueChange={(value) => setSliderValue(value)}
            step={1}
            value={sliderValue}
            minimumTrackTintColor={theme.colors.success}
            maximumTrackTintColor={theme.colors.border}
        />
  );
};

export default SliderRange;