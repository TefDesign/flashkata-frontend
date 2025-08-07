import { TouchableOpacity, Image } from "react-native";
import AvatarIcon from "../assets/icons/avatar";

const Avatar = ({ img, size = 240 }) => {

  return (
    <TouchableOpacity>
      {img ? (<Image source={{ uri: img }} style={{width: size, height: size, borderRadius: '50%' }} /> ) : (<AvatarIcon width={size} height={size} />)}
    </TouchableOpacity>
  );
};

export default Avatar;