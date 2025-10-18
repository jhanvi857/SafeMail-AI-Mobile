// app/_layout.jsx
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#3b82f6",
        tabBarInactiveTintColor: "#6b7280",
        tabBarStyle: {
          backgroundColor: "#1e293b",
          borderTopColor: "#334155",
          borderTopWidth: 1,
        },
      }}
    >
      <Tabs.Screen name="LoginScreen" />
      <Tabs.Screen name="URLScannerScreen" />
      <Tabs.Screen name="ReportsScreen" />
      <Tabs.Screen name="SettingsScreen" />
    </Tabs>
  );
}
