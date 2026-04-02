import {SettingsStyles } from "@/assets/styles/settings-styles";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

const ProgressStats = () => {
  const { colors } = useTheme();
  const styles = SettingsStyles(colors);

  const todos = useQuery(api.todos.getTodos);
  const totalTodos = todos ? todos.length : 0;
  const completedTodos = todos ? todos.filter((todo) => todo.isCompleted).length : 0;
  const activeTodos = totalTodos - completedTodos;

  return (
    <LinearGradient colors={colors.gradients.surface} style={styles.section}>
      <Text style={styles.sectionTitle}>Progress Stats</Text>

      <View style={styles.statsContainer}>
        {/* TOTAL TODOS */}
        <LinearGradient
          colors={colors.gradients.background}
          style={[styles.statCard, { borderLeftColor: colors.primary }]}
        >
          <View style={styles.statIconContainer}>
            <LinearGradient colors={colors.gradients.primary} style={styles.statIcon}>
              <Ionicons name="list" size={20} color="#fff" />
            </LinearGradient>
          </View>

          <View>
            <Text style={styles.statNumber}>{totalTodos}</Text>
            <Text style={styles.statLabel}>Total Todos</Text>
          </View>
        </LinearGradient>

        {/* COMPLETED TODOS */}
        <LinearGradient
          colors={colors.gradients.background}
          style={[styles.statCard, { borderLeftColor: colors.success }]}
        >
          <View style={styles.statIconContainer}>
            <LinearGradient colors={colors.gradients.success} style={styles.statIcon}>
              <Ionicons name="checkmark-circle" size={20} color="#fff" />
            </LinearGradient>
          </View>

          <View>
            <Text style={styles.statNumber}>{completedTodos}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
        </LinearGradient>

        {/* ACTIVE TODOS */}

        <LinearGradient
          colors={colors.gradients.background}
          style={[styles.statCard, { borderLeftColor: colors.warning }]}
        >
          <View style={styles.statIconContainer}>
            <LinearGradient colors={colors.gradients.warning} style={styles.statIcon}>
              <Ionicons name="time" size={20} color="#fff" />
            </LinearGradient>
          </View>

          <View>
            <Text style={styles.statNumber}>{activeTodos}</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
        </LinearGradient>
      </View>
    </LinearGradient>
  );
};

export default ProgressStats;