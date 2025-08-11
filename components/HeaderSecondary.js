import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import theme from "../styles/themeLight";
import ArrowBackIcon from "../assets/icons/arrowback.svg";
import Avatar from "./Avatar";
import { useNavigation } from "@react-navigation/native";

const HeaderSecondary = ({ isArrowBack = true, isAvatar = true }) => {
  const onlyAvatar = !isArrowBack && isAvatar;
  const navigation = useNavigation();

  return (
    <View style={[styles.headerContainer, onlyAvatar && styles.onlyAvatar]}>
      {isArrowBack && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowBackIcon width={40} height={40} />
        </TouchableOpacity>
      )}

      {isAvatar && <Avatar size={40} />}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.medium,
    width: Dimensions.get("window").width,
  },
  onlyAvatar: {
    justifyContent: "flex-end",
  },
});

export default HeaderSecondary;
