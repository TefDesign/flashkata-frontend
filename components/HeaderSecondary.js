import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import theme from "../styles/themeLight";
import ArrowBackIcon from "../assets/icons/arrowback.svg";
import AvatarIcon from "../assets/icons/avatar";
import { useNavigation } from "@react-navigation/native";
import useThemedStyles from "../hooks/useThemedStyles";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";

const HeaderSecondary = ({
  isArrowBack = true,
  isAvatar = true,
  color = "",
}) => {
  const onlyAvatar = !isArrowBack && isAvatar;
  const navigation = useNavigation();
  const avatar = useSelector((state) => state.users.avatar);

  const route = useRoute();
  console.log(route.name);

  const [theme, styles] = useThemedStyles((theme) =>
    StyleSheet.create({
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
    })
  );

  return (
    <View style={[styles.headerContainer, onlyAvatar && styles.onlyAvatar]}>
      {isArrowBack && (
        <TouchableOpacity
          onPress={() => {
            route.name === "Learn"
              ? navigation.navigate("MainMenu")
              : navigation.goBack();
          }}
        >
          <ArrowBackIcon
            width={40}
            height={40}
            style={{ color: color === "" ? theme.colors.text : color }}
          />
        </TouchableOpacity>
      )}

      {isAvatar && (
        <TouchableOpacity onPress={() => navigation.navigate("UserSettings")}>
          {avatar ? (
            <Image
              source={{ uri: avatar }}
              style={{ width: 40, height: 40, borderRadius: 40 / 2 }}
            />
          ) : (
            <AvatarIcon width={40} height={40} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HeaderSecondary;
