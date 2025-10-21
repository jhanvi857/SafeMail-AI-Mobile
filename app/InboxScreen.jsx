import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Modal, ScrollView, TextInput } from "react-native";
import { X } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as Linking from "expo-linking";
import { useEmails } from "@/hooks/useEmails";

export default function InboxScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [emailText, setEmailText] = useState(""); 
  const [scanResult, setScanResult] = useState(null);
  const emails = useEmails(); 
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
  const handleDeepLink = async ({ url }) => {
    const { queryParams } = Linking.parse(url);
    if (queryParams.email) setEmail(queryParams.email);

    const accessToken = queryParams.accessToken; 
    const refreshToken = queryParams.refreshToken; 
    if (accessToken && refreshToken) {
      try {
        await fetch("http://localhost:3000/predict-emails/set-tokens", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tokens: { accessToken, refreshToken } }),
        });
      } catch (err) {
        console.error("Failed to set tokens:", err);
      }
    }
  };

  Linking.getInitialURL().then(url => url && handleDeepLink({ url }));
  const subscription = Linking.addEventListener("url", handleDeepLink);
  return () => subscription.remove();
}, []);

  useEffect(() => {
    if (mounted && !email) {
      const timer = setTimeout(() => router.replace("/LoginScreen"), 500);
      return () => clearTimeout(timer);
    }
  }, [mounted, email]);

  const handleScanEmail = async () => {
    if (!emailText.trim()) return alert("Please enter email text");

    try {
      const response = await fetch("http://localhost:3000/api/analyze-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailText }),
      });
      const data = await response.json();
      if (data.error) return alert("Error: " + data.error);
      setScanResult(data.result); 
      alert(`Scan result: ${data.result}`);
    } catch (err) {
      alert("Error connecting to server: " + err.message);
    }
  };

  const handleRescan = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 2000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "safe": return "#10b981";
      case "suspicious": return "#f59e0b";
      case "fraud": return "#ef4444";
      default: return "#9ca3af";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "safe": return "✓ Safe";
      case "suspicious": return "⚠ Suspicious";
      case "fraud": return "✕ Fraud";
      default: return "Unknown";
    }
  };

  const renderEmailItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => setSelectedEmail(item)}
      style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: "#334155" }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text style={{ color: "#fff" }}>{item.from}</Text>
          <Text style={{ color: "#9ca3af" }}>{item.subject}</Text>
        </View>
        <View style={{ padding: 4, backgroundColor: getStatusColor(item.status) + "20", borderRadius: 4 }}>
          <Text style={{ color: getStatusColor(item.status) }}>{getStatusLabel(item.status)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (!email) return null;

  return (
    <View style={{ flex: 1, backgroundColor: "#0f172a", paddingTop: insets.top }}>
      <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: "#334155" }}>
        <Text style={{ color: "#fff", fontSize: 24 }}>Inbox Scanner</Text>
        <Text style={{ color: "#9ca3af" }}>Analyze your emails for fraud</Text>

        {/* Demo manual scan */}
        <TextInput
          placeholder="Paste email content here..."
          placeholderTextColor="#6b7280"
          value={emailText}
          onChangeText={setEmailText}
          multiline
          style={{ marginTop: 12, backgroundColor: "#1e293b", color: "#fff", padding: 8, borderRadius: 6 }}
        />
        <TouchableOpacity
          onPress={handleScanEmail}
          style={{ marginTop: 8, backgroundColor: "#3b82f6", padding: 8, borderRadius: 6 }}
        >
          <Text style={{ color: "#fff" }}>Scan Email (Demo)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleRescan}
          disabled={scanning}
          style={{ marginTop: 8, backgroundColor: "#3b82f6", padding: 8, borderRadius: 6 }}
        >
          <Text style={{ color: "#fff" }}>{scanning ? "Rescanning..." : "Rescan Inbox"}</Text>
        </TouchableOpacity>

        {scanResult && (
          <Text style={{ marginTop: 8, color: scanResult === "safe" ? "#10b981" : "#ef4444" }}>
            Last demo scan result: {scanResult}
          </Text>
        )}
      </View>

      <FlatList data={emails} renderItem={renderEmailItem} keyExtractor={(item) => item.id} style={{ flex: 1 }} />

      <Modal visible={!!selectedEmail} animationType="slide" transparent>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" }}>
          <View style={{ backgroundColor: "#1e293b", padding: 16, borderTopLeftRadius: 16, borderTopRightRadius: 16, maxHeight: "80%" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }}>
              <Text style={{ color: "#fff", fontSize: 18 }}>Email Details</Text>
              <TouchableOpacity onPress={() => setSelectedEmail(null)}>
                <X size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {selectedEmail && (
                <>
                  <Text style={{ color: "#9ca3af" }}>From</Text>
                  <Text style={{ color: "#fff", fontSize: 16 }}>{selectedEmail.from}</Text>
                  <Text style={{ color: "#9ca3af" }}>Subject</Text>
                  <Text style={{ color: "#fff", fontSize: 16 }}>{selectedEmail.subject}</Text>
                  <Text style={{ color: "#9ca3af" }}>Status</Text>
                  <Text style={{ color: getStatusColor(selectedEmail.status) }}>{getStatusLabel(selectedEmail.status)}</Text>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
