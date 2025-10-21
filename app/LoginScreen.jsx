// import { useState, useEffect } from "react";
// import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Platform } from "react-native";
// import { Mail, Lock } from "lucide-react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import * as WebBrowser from "expo-web-browser";
// import * as Linking from "expo-linking";
// import { useRouter } from "expo-router";

// export default function LoginScreen({ onLogin }) {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const insets = useSafeAreaInsets();

//   const BACKEND_URL = Platform.OS === "web"
//     ? "http://localhost:3000"
//     : "https://safemail-ai-mobile.onrender.com.com"; 

//   useEffect(() => {
//     const handleDeepLink = ({ url }) => {
//       const parsed = Linking.parse(url);
//       const email = parsed.queryParams?.email;
//       if (email) {
//         console.log("Logged in user:", email);
//         onLogin();
//         router.push("/InboxScreen");
//       }
//     };

//     const subscription = Linking.addEventListener("url", handleDeepLink);
//     return () => subscription.remove();
//   }, []);

//   const handleOAuthLogin = async (provider) => {
//     try {
//       setLoading(true);

//       if (provider === "gmail") {
//         if (Platform.OS === "web") {
//           window.location.href = `${BACKEND_URL}/auth/google?platform=web`;
//         } else {
//           const authUrl = `${BACKEND_URL}/auth/google?platform=mobile`;
//           const redirectUrl = Linking.createURL("/InboxScreen");
//           await WebBrowser.openAuthSessionAsync(authUrl, redirectUrl);
//         }
//       }

//       setLoading(false);
//     } catch (err) {
//       console.error("Login failed:", err);
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView style={{ flex: 1, backgroundColor: "#0f172a" }} contentContainerStyle={{ flexGrow: 1 }}>
//       <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 20, paddingTop: insets.top, paddingBottom: insets.bottom }}>
//         <View style={{ alignItems: "center", marginBottom: 48 }}>
//           <View style={{ width: 48, height: 48, borderRadius: 8, backgroundColor: "rgba(59, 130, 246, 0.1)", justifyContent: "center", alignItems: "center", marginBottom: 16 }}>
//             <Lock size={24} color="#3b82f6" />
//           </View>
//           <Text style={{ fontSize: 28, fontWeight: "bold", color: "#ffffff", marginBottom: 8 }}>SafeMailAI</Text>
//           <Text style={{ fontSize: 14, color: "#9ca3af" }}>Connect Your Email Account</Text>
//         </View>

//         <View style={{ backgroundColor: "#1e293b", borderRadius: 12, padding: 24, borderWidth: 1, borderColor: "#334155" }}>
//           <Text style={{ textAlign: "center", fontSize: 14, color: "#9ca3af", marginBottom: 24 }}>
//             Protect yourself from email and URL fraud with AI-powered detection
//           </Text>

//           <TouchableOpacity onPress={() => handleOAuthLogin("gmail")} disabled={loading} style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", paddingHorizontal: 16, paddingVertical: 12, backgroundColor: "#334155", borderRadius: 8, marginBottom: 12, opacity: loading ? 0.5 : 1 }}>
//             <Mail size={20} color="#ffffff" style={{ marginRight: 12 }} />
//             <Text style={{ fontSize: 16, fontWeight: "500", color: "#ffffff" }}>Login with Gmail</Text>
//           </TouchableOpacity>

//           {loading && (
//             <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 16, gap: 8 }}>
//               <ActivityIndicator size="small" color="#3b82f6" />
//               <Text style={{ fontSize: 14, color: "#3b82f6" }}>Connecting...</Text>
//             </View>
//           )}
//         </View>

//         <Text style={{ textAlign: "center", fontSize: 12, color: "#9ca3af", marginTop: 24 }}>
//           Your data is encrypted and secure. We never store your emails.
//         </Text>
//       </View>
//     </ScrollView>
//   );
// }
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Platform } from "react-native";
import { Mail, Lock } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import * as AuthSession from "expo-auth-session";

export default function LoginScreen({ onLogin }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();

  const BACKEND_URL = Platform.OS === "web"
    ? "http://localhost:3000"
    : "https://safemail-ai-mobile.onrender.com"; // FIXED: removed extra .com

  useEffect(() => {
    const handleDeepLink = ({ url }) => {
      const parsed = Linking.parse(url);
      const email = parsed.queryParams?.email;
      if (email) {
        console.log("Logged in user:", email);
        onLogin();
        router.push("/InboxScreen");
      }
    };

    const subscription = Linking.addEventListener("url", handleDeepLink);
    return () => subscription.remove();
  }, []);

  const handleOAuthLogin = async (provider) => {
    try {
      setLoading(true);

      if (provider === "gmail") {
        if (Platform.OS === "web") {
          // Web: simple redirect
          window.location.href = `${BACKEND_URL}/auth/google?platform=web`;
        } else {
          // Mobile: use PKCE + deep link
          const redirectUri = AuthSession.makeRedirectUri({ scheme: "safemail-ai" });

          const authUrl = `${BACKEND_URL}/auth/google?platform=mobile&redirect_uri=${encodeURIComponent(
            redirectUri
          )}`;

          const result = await AuthSession.startAsync({ authUrl });

          if (result.type === "success" && result.url) {
            const parsed = Linking.parse(result.url);
            const email = parsed.queryParams?.email;
            if (email) {
              console.log("Logged in user:", email);
              onLogin();
              router.push("/InboxScreen");
            }
          } else {
            alert("Login cancelled or failed");
          }
        }
      }

      setLoading(false);
    } catch (err) {
      console.error("Login failed:", err);
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#0f172a" }} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 20, paddingTop: insets.top, paddingBottom: insets.bottom }}>
        <View style={{ alignItems: "center", marginBottom: 48 }}>
          <View style={{ width: 48, height: 48, borderRadius: 8, backgroundColor: "rgba(59, 130, 246, 0.1)", justifyContent: "center", alignItems: "center", marginBottom: 16 }}>
            <Lock size={24} color="#3b82f6" />
          </View>
          <Text style={{ fontSize: 28, fontWeight: "bold", color: "#ffffff", marginBottom: 8 }}>SafeMailAI</Text>
          <Text style={{ fontSize: 14, color: "#9ca3af" }}>Connect Your Email Account</Text>
        </View>

        <View style={{ backgroundColor: "#1e293b", borderRadius: 12, padding: 24, borderWidth: 1, borderColor: "#334155" }}>
          <Text style={{ textAlign: "center", fontSize: 14, color: "#9ca3af", marginBottom: 24 }}>
            Protect yourself from email and URL fraud with AI-powered detection
          </Text>

          <TouchableOpacity
            onPress={() => handleOAuthLogin("gmail")}
            disabled={loading}
            style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", paddingHorizontal: 16, paddingVertical: 12, backgroundColor: "#334155", borderRadius: 8, marginBottom: 12, opacity: loading ? 0.5 : 1 }}
          >
            <Mail size={20} color="#ffffff" style={{ marginRight: 12 }} />
            <Text style={{ fontSize: 16, fontWeight: "500", color: "#ffffff" }}>Login with Gmail</Text>
          </TouchableOpacity>

          {loading && (
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 16, gap: 8 }}>
              <ActivityIndicator size="small" color="#3b82f6" />
              <Text style={{ fontSize: 14, color: "#3b82f6" }}>Connecting...</Text>
            </View>
          )}
        </View>

        <Text style={{ textAlign: "center", fontSize: 12, color: "#9ca3af", marginTop: 24 }}>
          Your data is encrypted and secure. We never store your emails.
        </Text>
      </View>
    </ScrollView>
  );
}
