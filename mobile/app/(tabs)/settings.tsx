import { SettingsStyles } from "@/assets/styles/settings-styles";
import DangerZone from "@/components/DangerZone";
import Preferences from "@/components/Preferences";
import ProgressStats from "@/components/ProgressStats";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingsScreen = () => {
  const { colors } = useTheme();

  const styles = SettingsStyles(colors);

  return (
    <LinearGradient colors={colors.gradients.background} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <LinearGradient colors={colors.gradients.primary} style={styles.iconContainer}>
              <Ionicons name="settings" size={28} color="#ffffff" />
            </LinearGradient>
            <Text style={styles.title}>Settings</Text>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <ProgressStats />
          <Preferences />
          <DangerZone />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};
export default SettingsScreen;