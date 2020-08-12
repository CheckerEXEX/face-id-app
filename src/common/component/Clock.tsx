import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

const formatDate = (date) => {
  if (!date) return "";
  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);
  const seconds = `0${date.getSeconds()}`.slice(-2);
  return `${hours}:${minutes}:${seconds}`;
};

const Clock = () => {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const clockInterval = setInterval(() => {
      const now = new Date();
      //hh:mm:ss
      const newTimeString = formatDate(now);
      setTimeString(newTimeString);
    }, 1000);
    return () => {
      //clean up when component unmount
      clearInterval(clockInterval);
    };
  }, []);

  return <Text style={{ fontSize: 40 }}>{timeString}</Text>;
};

export default Clock;
