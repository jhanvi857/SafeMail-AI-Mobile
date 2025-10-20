import { View, Text, TouchableOpacity, Switch, ScrollView, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { LogOut, Info } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/user", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.email) setEmail(data.email);
      })
      .catch((err) => console.error("Failed to fetch user:", err));
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        Alert.alert("Logged out", "You have been logged out successfully");
        router.replace("/LoginScreen"); 
      } else {
        const data = await res.json();
        Alert.alert("Logout failed", data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Logout failed", err.message);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#0f172a", paddingTop: insets.top }}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <View style={{ paddingHorizontal: 16, marginBottom: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#ffffff", marginBottom: 4 }}>
          Settings
        </Text>
        <Text style={{ fontSize: 14, color: "#9ca3af" }}>Manage your app preferences</Text>
        {email && (
          <Text style={{ fontSize: 14, color: "#6b7280", marginTop: 4 }}>
            Logged in as: {email}
          </Text>
        )}
      </View>

      {/* Notification Toggle */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: "#1e293b",
          marginBottom: 12,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: "#334155",
        }}
      >
        <Text style={{ fontSize: 16, color: "#ffffff" }}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled} 
          trackColor={{ false: "#334155", true: "#3b82f6" }}
          thumbColor={notificationsEnabled ? "#3b82f6" : "#6b7280"}
        />
      </View>

      {/* App Info */}
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: "#1e293b",
          marginBottom: 12,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: "#334155",
        }}
        onPress={() => alert("SafeMail AI v1.0")}
      >
        <Info size={20} color="#3b82f6" style={{ marginRight: 12 }} />
        <Text style={{ fontSize: 16, color: "#ffffff" }}>App Info</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: "#ef4444",
          marginHorizontal: 16,
          marginTop: 20,
          borderRadius: 8,
          justifyContent: "center",
        }}
        onPress={handleLogout}
      >
        <LogOut size={20} color="#ffffff" style={{ marginRight: 8 }} />
        <Text style={{ fontSize: 16, fontWeight: "600", color: "#ffffff" }}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
