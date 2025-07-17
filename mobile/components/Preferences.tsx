import { SettingsStyles } from "@/assets/styles/settings-styles";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Switch, Text, View } from "react-native";

const Preferences = () => {
  const [isAutoSync, setIsAutoSync] = useState(true);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

  const { isDarkMode, toggleDarkMode, colors } = useTheme();

  const styles = SettingsStyles(colors);

  return (
    <LinearGradient colors={colors.gradients.surface} style={styles.section}>
      <Text style={styles.sectionTitle}>Preferences</Text>

      {/* DARK MODE */}
      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <LinearGradient colors={colors.gradients.primary} style={styles.settingIcon}>
            <Ionicons name="moon" size={18} color="#fff" />
          </LinearGradient>
          <Text style={styles.settingText}>Dark Mode</Text>
        </View>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          thumbColor={"#fff"}
          trackColor={{ false: colors.border, true: colors.primary }}
          ios_backgroundColor={colors.border}
        />
      </View>

      {/* NOTIFICATONS */}
      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <LinearGradient colors={colors.gradients.warning} style={styles.settingIcon}>
            <Ionicons name="notifications" size={18} color="#fff" />
          </LinearGradient>
          <Text style={styles.settingText}>Notifications</Text>
        </View>
        <Switch
          value={isNotificationsEnabled}
          onValueChange={() => setIsNotificationsEnabled(!isNotificationsEnabled)}
          thumbColor={"#fff"}
          trackColor={{ false: colors.border, true: colors.warning }}
          ios_backgroundColor={colors.border}
        />
      </View>

      {/* AUTO-SYNC */}
      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <LinearGradient colors={colors.gradients.success} style={styles.settingIcon}>
            <Ionicons name="notifications" size={18} color="#fff" />
          </LinearGradient>
          <Text style={styles.settingText}>Auto Sync</Text>
        </View>
        <Switch
          value={isAutoSync}
          onValueChange={() => setIsAutoSync(!isAutoSync)}
          thumbColor={"#fff"}
          trackColor={{ false: colors.border, true: colors.success }}
          ios_backgroundColor={colors.border}
        />
      </View>
    </LinearGradient>
  );
};

export default Preferences;