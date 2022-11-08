import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
//
import image from "./assets/logo.jpg"; // asi se llaman las imgaenes locales
//import React, { useState } from "react";

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Pemission to access is required");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
    //console.log(pickerResult);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick an image¡¡</Text>
      <TouchableOpacity onPress={openImagePickerAsync}>
        <Image
          //source={{ uri: "https://picsum.photos/200/200" }} de esta manera carho imagen de la web
          //source={image} asi carga imagen local
          source={{
            uri:
              selectedImage !== null
                ? selectedImage.localuri
                : "https://picsum.photos/200/200",
          }}
          style={styles.image}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Ingresa</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: `#292929`,
  },
  title: { fontSize: 30, color: "#fff" },
  image: { height: 200, width: 200, borderRadius: 100, resizeMode: "contain" },
  button: { backgroundColor: "#dc143c", padding: 7, marginTop: 10 },
  buttonText: { color: "#fff", fontSize: 20 },
});

export default App;
