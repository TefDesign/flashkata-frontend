import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import theme from "../styles/themeLight";
import AvatarIcon from "../assets/icons/avatar";

const Avatar = ({ avatarType }) => {

  return (
    <TouchableOpacity style={styles.base}>
      <View style={styles.btnContent}>
        {avatarType ? (<Image source={{ uri: avatarType}} style={styles.icon} /> ) : (<AvatarIcon width={180} height={180} style={styles.icon} />)}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    width: 60,
    height: 60,
    margin: 60,
  },
  icon: {
    marginRight: theme.spacing.small,
  },
  btnContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Avatar;