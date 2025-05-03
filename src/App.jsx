import axios from "axios";
import { useState } from "react";
import {
  Button,
  Box,
  Stack,
  Text,
  Heading,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react"; // spell-checker: disable-line
import { DogImg } from "./DogImg";
function App() {
  const [weather, setWeather] = useState(null); // 例: { condition: "sunny", temp: 31 }
  const getCardStyle = () => {
    switch (weather?.condition) {
      case "sunny":
        return { bg: "#e6f4ea", icon: "☀️", message: "今日はお散歩可能です！" };
      case "cloudy":
        return { bg: "#dff1fb", icon: "☁️", message: "まあまあかな〜" };
      case "rainy":
        return {
          bg: "#fbeaea",
          icon: "🌧️",
          message: "今日はお散歩やめとこう……",
        };
      default:
        return {};
    }
  };

  const apiKey = import.meta.env.VITE_REACT_APP_OPENWEATHERMAP_API_KEY; // spell-checker: disable-line

  // const [region, setRegion] = useState("");
  const city = "okinawa";

  //const onChangeRegion = (event) => setRegion(event.target.value);
  const description = weather?.weather?.[0]?.description || "";
  const emoji = description ? getWeatherEmoji(description) : "";

  const getWeatherEmoji = (description) => {
    const lowerDesc = description.toLowerCase();

    if (lowerDesc.includes("clear")) return "☀️";
    if (lowerDesc.includes("cloud")) return "☁️";
    if (lowerDesc.includes("rain")) return "🌧️";
    if (lowerDesc.includes("thunder")) return "⛈️";
    if (lowerDesc.includes("snow")) return "❄️";

    return "🌈"; // fallback
  };
  console.log("emoji", emoji);

  const apiCall = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      console.log("===================== response data =====================");

      setWeather(response.data);
      console.log("Weather data:", weather);
    } catch (error) {
      console.error("Error has occurred:", error);
    }
  };

  return (
    <>
      <Box bg="#F3F6F9" minH="100vh" py={12} px={4}>
        <Box
          maxW="lg"
          mx="auto"
          bg="white"
          boxShadow="md"
          borderRadius="lg"
          p={8}
        >
          <Stack spacing={4} align="center">
            <Heading size="lg">🐕‍ おさんぽ日和チェッカー 🐶</Heading>
            <Text>
              今日のあなたの地域で今お散歩ができるかチェックできます！
            </Text>
            <DogImg />
            <FormControl>
              <FormLabel>地域を教えてください</FormLabel>
              <Text>{weather?.condition?.toUpperCase() || "N/A"}</Text>
              <Text>{getCardStyle().icon}</Text>
              <Text>{weather?.temp ? `${weather.temp}℃` : "N/A"}</Text>
              <Text>{getCardStyle().message}</Text>
              <Stack direction="row">
                <Input placeholder="東京" />
                <Button colorScheme="blue" onClick={apiCall}>
                  検索
                </Button>
              </Stack>
            </FormControl>
          </Stack>
        </Box>
      </Box>
      );
    </>
  );
}
export default App;
