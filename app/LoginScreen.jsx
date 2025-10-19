import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { Mail, Lock } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";

export default function LoginScreen({ onLogin }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const handleDeepLink = ({ url }) => {
      const { queryParams } = Linking.parse(url);
      if (queryParams.email) {
        console.log("Logged in user:", queryParams.email);
        onLogin(); 
        router.push("/InboxScreen");
      }
    };

    const subscription = Linking.addEventListener("url", handleDeepLink);
    return () => subscription.remove();
  }, []);
const BACKEND_URL = "https://safemail-ai-mobile.onrender.com"; 

  const handleOAuthLogin = async (provider) => {
    try {
      setLoading(true);

      if (provider === "gmail") {
        const result = await WebBrowser.openAuthSessionAsync(
  "https://safemail-ai-mobile.onrender.com/auth/google", 
    "https://safemail-ai-mobile.onrender.com/" , 
  Linking.createURL("/Inbox")         
);

        console.log("OAuth result:", result);
      }

      setLoading(false);
    } catch (err) {
      console.error("Login failed:", err);
      setLoading(false);
    }
  };

  return (
    <>
    <ScrollView style={{ flex: 1, backgroundColor: "#0f172a" }} contentContainerStyle={{ flexGrow: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          paddingHorizontal: 20,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        {/* Header */}
        <View style={{ alignItems: "center", marginBottom: 48 }}>
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 8,
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Lock size={24} color="#3b82f6" />
          </View>
          <Text style={{ fontSize: 28, fontWeight: "bold", color: "#ffffff", marginBottom: 8 }}>SafeMailAI</Text>
          <Text style={{ fontSize: 14, color: "#9ca3af" }}>Connect Your Email Account</Text>
        </View>

        {/* Login Card */}
        <View
          style={{ backgroundColor: "#1e293b", borderRadius: 12, padding: 24, borderWidth: 1, borderColor: "#334155" }}
        >
          <Text style={{ textAlign: "center", fontSize: 14, color: "#9ca3af", marginBottom: 24 }}>
            Protect yourself from email and URL fraud with AI-powered detection
          </Text>

          {/* OAuth Buttons */}
          <TouchableOpacity
          onPress={() => handleOAuthLogin("gmail")}
          disabled={loading}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 16,
            paddingVertical: 12,
            backgroundColor: "#334155",
            borderRadius: 8,
            marginBottom: 12,
            opacity: loading ? 0.5 : 1,
          }}
        >
          <Mail size={20} color="#ffffff" style={{ marginRight: 12 }} />
          <Text style={{ fontSize: 16, fontWeight: "500", color: "#ffffff" }}>Login with Gmail</Text>
        </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => handleOAuthLogin("outlook")}
            disabled={loading}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 16,
              paddingVertical: 12,
              backgroundColor: "#334155",
              borderRadius: 8,
              marginBottom: 24,
              opacity: loading ? 0.5 : 1,
            }}
          >
            <Mail size={20} color="#ffffff" style={{ marginRight: 12 }} />
            <Text style={{ fontSize: 16, fontWeight: "500", color: "#ffffff" }}>Login with Outlook</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 24 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: "#334155" }} />
            <Text style={{ marginHorizontal: 12, color: "#9ca3af", fontSize: 12 }}>or</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: "#334155" }} />
          </View>

          <TouchableOpacity
            style={{
              borderWidth: 2,
              borderStyle: "dashed",
              borderColor: "#334155",
              borderRadius: 8,
              paddingVertical: 24,
              paddingHorizontal: 16,
              alignItems: "center",
            }}
          >
            <Mail size={32} color="#6b7280" style={{ marginBottom: 8 }} />
            <Text style={{ fontSize: 14, fontWeight: "500", color: "#ffffff", marginBottom: 4 }}>Upload EML File</Text>
            <Text style={{ fontSize: 12, color: "#9ca3af" }}>Tap to select</Text>
          </TouchableOpacity> */}

          {/* Loading State */}
          {loading && (
            <View
              style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 16, gap: 8 }}
            >
              <ActivityIndicator size="small" color="#3b82f6" />
              <Text style={{ fontSize: 14, color: "#3b82f6" }}>Connecting...</Text>
            </View>
          )}
        </View>

        {/* Footer */}
        <Text style={{ textAlign: "center", fontSize: 12, color: "#9ca3af", marginTop: 24 }}>
          Your data is encrypted and secure. We never store your emails.
        </Text>
      </View>
    </ScrollView>
    </>
  );
}
