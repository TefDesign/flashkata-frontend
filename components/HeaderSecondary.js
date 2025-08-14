import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import theme from "../styles/themeLight";
import ArrowBackIcon from "../assets/icons/arrowback.svg";
import AvatarIcon from "../assets/icons/avatar";
import { useNavigation } from "@react-navigation/native";
import useThemedStyles from "../hooks/useThemedStyles";
import { useRoute } from '@react-navigation/native';

const HeaderSecondary = ({ isArrowBack = true, isAvatar = true }) => {
  const onlyAvatar = !isArrowBack && isAvatar;
  const navigation = useNavigation();

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
        <TouchableOpacity onPress={() => {route.name === "Learn" ? navigation.navigate("MainMenu") : navigation.goBack()}}>
          <ArrowBackIcon
            width={40}
            height={40}
            style={{ color: theme.colors.text }}
          />
        </TouchableOpacity>
      )}

      {isAvatar &&( 
        <TouchableOpacity onPress={() => navigation.navigate('UserSettings')}>
          <AvatarIcon width={40} height={40} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HeaderSecondary;
