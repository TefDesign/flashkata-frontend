import { StyleSheet, Text, View } from "react-native";

const KataRead = (props) => {
  const { text, word = null } = props;
  return (
    <View>
      <Text>{text}</Text>
      {word && <Text style={styles.word}>{word}</Text>}
    </View>
  );
};

export default KataRead;

const styles = StyleSheet.create({
  word: {
    fontSize: 20,
    fontWeight: "bold",
    fontVariant: "italic",
  },
});
