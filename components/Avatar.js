import { TouchableOpacity, Image } from "react-native";
import AvatarIcon from "../assets/icons/avatar";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAvatar } from "../reducers/users";

const Avatar = ({ size = 240, isChange = false }) => {
  const dispatch = useDispatch();
  const avatar = useSelector((state) => state.users.avatar);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      dispatch(updateAvatar(result.assets[0].uri));
    }
  };

  return (
    <TouchableOpacity onPress={isChange ? pickImage : undefined}>
      {avatar ? (
        <Image
          source={{ uri: avatar }}
          style={{ width: size, height: size, borderRadius: size / 2 }}
        />
      ) : (
        <AvatarIcon width={size} height={size} />
      )}
    </TouchableOpacity>
  );
};

export default Avatar;
