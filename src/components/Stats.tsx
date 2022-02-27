import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ITypes, IStats } from "../utils/interfaces";
import { capitalize } from "../utils/functions";

interface Props {
  stats: Array<IStats>;
  color: string;
}

export const Stats: React.FC<Props> = ({ stats, color }) => {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Base Stats</Text>
      {stats.map((item) => (
        <View style={styles.container} key={item.stat.name}>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{capitalize(item.stat.name)}:</Text>
            <Text style={styles.percentage}>{`${item.base_stat}%`}</Text>
          </View>
          <View style={styles.defaultBar}>
            <View
              style={[
                styles.bar,
                {
                  backgroundColor: item.base_stat > 49 ? "#00ac17" : "#ff3e3e",
                  width: item.base_stat > 100 ? "100%" : `${item.base_stat}%`,
                },
              ]}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    marginVertical: 25,
    justifyContent: "space-between",
    flexWrap: "wrap",
    paddingHorizontal: 20,
  },
  title: {
    width: "100%",
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 2,
    textAlign: "center",
    marginBottom: 10,
  },
  container: {
    flexDirection: "row",
    padding: 3,
    alignItems: "center",
  },

  infoContainer: {
    width: "40%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 10,
    alignItems: "center",
  },
  name: { color: "#6b6b6b", fontSize: 14, fontWeight: "600" },
  percentage: { color: "#6b6b6b", fontSize: 14, fontWeight: "700" },

  defaultBar: {
    width: "50%",
    height: 10,
    backgroundColor: "#dedede",
    borderRadius: 5,
  },
  bar: {
    borderRadius: 5,
    height: "100%",
  },
});
