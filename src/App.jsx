import axios from "axios";
import { Button, Box, Input, Heading, Text } from "@chakra-ui/react";

function App() {
  const apiKey = import.meta.env.VITE_REACT_APP_OPENWEATHERMAP_API_KEY;
  const city = "Tokyo";

  const apiCall = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      console.log("===================== response data =====================");
      console.log(response.data);
    } catch (error) {
      console.error("Error has occured:", error);
    }
  };

  return (
    <>
      <div>
        aaaa
        <Heading>🐕‍ おさんぽ日和チェッカー 🐶</Heading>
        <Text>今日のあなたの地域で今お散歩ができるかチェックできます！</Text>
        <Button onClick={apiCall}> ボタン</Button>
      </div>
    </>
  );
}
export default App;
