import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { Navigation } from "./src/navigation/Navigation";
import { MainContext } from "./src/context/MainContext";

export default function App() {
  return (
    <MainContext>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </MainContext>
  );
}
