// "use client"

// import { useState } from "react"
// import { View, Text, TouchableOpacity, ScrollView, FlatList, Modal } from "react-native"
// import { RefreshCw, X } from "lucide-react-native"
// import { useSafeAreaInsets } from "react-native-safe-area-context"

// export default function InboxScreen() {
//   const insets = useSafeAreaInsets()
//   const [emails, setEmails] = useState([
//     { id: "1", from: "Amazon Support", subject: "Your Order Details", status: "safe", timestamp: "2 hours ago" },
//     {
//       id: "2",
//       from: "Bank Notice",
//       subject: "Account Update Required",
//       status: "suspicious",
//       timestamp: "4 hours ago",
//     },
//     { id: "3", from: "Lottery Win", subject: "Claim your prize", status: "fraud", timestamp: "1 day ago" },
//     { id: "4", from: "PayPal", subject: "Confirm your identity", status: "suspicious", timestamp: "2 days ago" },
//     { id: "5", from: "Apple Support", subject: "Your subscription renewal", status: "safe", timestamp: "3 days ago" },
//   ])
//   const [selectedEmail, setSelectedEmail] = useState(null)
//   const [scanning, setScanning] = useState(false)

//   const handleRescan = () => {
//     setScanning(true)
//     setTimeout(() => setScanning(false), 2000)
//   }

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "safe":
//         return "#10b981"
//       case "suspicious":
//         return "#f59e0b"
//       case "fraud":
//         return "#ef4444"
//       default:
//         return "#9ca3af"
//     }
//   }

//   const getStatusLabel = (status) => {
//     switch (status) {
//       case "safe":
//         return "✓ Safe"
//       case "suspicious":
//         return "⚠ Suspicious"
//       case "fraud":
//         return "✕ Fraud"
//       default:
//         return "Unknown"
//     }
//   }

//   const renderEmailItem = ({ item }) => (
//     <TouchableOpacity
//       onPress={() => setSelectedEmail(item)}
//       style={{ paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#334155" }}
//     >
//       <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
//         <View style={{ flex: 1 }}>
//           <Text style={{ fontSize: 14, fontWeight: "600", color: "#ffffff", marginBottom: 4 }}>{item.from}</Text>
//           <Text style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>{item.subject}</Text>
//           <Text style={{ fontSize: 11, color: "#6b7280" }}>{item.timestamp}</Text>
//         </View>
//         <View
//           style={{
//             paddingHorizontal: 8,
//             paddingVertical: 4,
//             backgroundColor: getStatusColor(item.status) + "20",
//             borderRadius: 4,
//             marginLeft: 12,
//           }}
//         >
//           <Text style={{ fontSize: 11, fontWeight: "600", color: getStatusColor(item.status) }}>
//             {getStatusLabel(item.status)}
//           </Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   )

//   return (
//     <View style={{ flex: 1, backgroundColor: "#0f172a", paddingTop: insets.top }}>
//       {/* Header */}
//       <View style={{ paddingHorizontal: 16, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: "#334155" }}>
//         <Text style={{ fontSize: 24, fontWeight: "bold", color: "#ffffff", marginBottom: 4 }}>Inbox Scanner</Text>
//         <Text style={{ fontSize: 14, color: "#9ca3af", marginBottom: 16 }}>Analyze your emails for fraud</Text>
//         <TouchableOpacity
//           onPress={handleRescan}
//           disabled={scanning}
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             paddingHorizontal: 12,
//             paddingVertical: 8,
//             backgroundColor: "#3b82f6",
//             borderRadius: 6,
//             alignSelf: "flex-start",
//             opacity: scanning ? 0.5 : 1,
//           }}
//         >
//           <RefreshCw size={16} color="#ffffff" style={{ marginRight: 8 }} />
//           <Text style={{ fontSize: 14, fontWeight: "600", color: "#ffffff" }}>Rescan</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Stats */}
//       <View style={{ flexDirection: "row", paddingHorizontal: 16, paddingVertical: 12, gap: 8 }}>
//         <View
//           style={{
//             flex: 1,
//             backgroundColor: "#1e293b",
//             borderRadius: 8,
//             padding: 12,
//             borderWidth: 1,
//             borderColor: "#334155",
//           }}
//         >
//           <Text style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>Total</Text>
//           <Text style={{ fontSize: 20, fontWeight: "bold", color: "#ffffff" }}>{emails.length}</Text>
//         </View>
//         <View
//           style={{
//             flex: 1,
//             backgroundColor: "#1e293b",
//             borderRadius: 8,
//             padding: 12,
//             borderWidth: 1,
//             borderColor: "#334155",
//           }}
//         >
//           <Text style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>Safe</Text>
//           <Text style={{ fontSize: 20, fontWeight: "bold", color: "#10b981" }}>
//             {emails.filter((e) => e.status === "safe").length}
//           </Text>
//         </View>
//         <View
//           style={{
//             flex: 1,
//             backgroundColor: "#1e293b",
//             borderRadius: 8,
//             padding: 12,
//             borderWidth: 1,
//             borderColor: "#334155",
//           }}
//         >
//           <Text style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>Threats</Text>
//           <Text style={{ fontSize: 20, fontWeight: "bold", color: "#ef4444" }}>
//             {emails.filter((e) => e.status !== "safe").length}
//           </Text>
//         </View>
//       </View>

//       {/* Email List */}
//       <FlatList
//         data={emails}
//         renderItem={renderEmailItem}
//         keyExtractor={(item) => item.id}
//         style={{ flex: 1 }}
//         contentContainerStyle={{
//           backgroundColor: "#1e293b",
//           marginHorizontal: 16,
//           marginVertical: 12,
//           borderRadius: 8,
//           borderWidth: 1,
//           borderColor: "#334155",
//         }}
//       />

//       {/* Email Detail Modal */}
//       <Modal visible={!!selectedEmail} animationType="slide" transparent>
//         <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", justifyContent: "flex-end" }}>
//           <View
//             style={{
//               backgroundColor: "#1e293b",
//               borderTopLeftRadius: 16,
//               borderTopRightRadius: 16,
//               paddingHorizontal: 16,
//               paddingVertical: 20,
//               paddingBottom: insets.bottom + 20,
//               maxHeight: "80%",
//             }}
//           >
//             <View
//               style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}
//             >
//               <Text style={{ fontSize: 18, fontWeight: "bold", color: "#ffffff" }}>Email Details</Text>
//               <TouchableOpacity onPress={() => setSelectedEmail(null)}>
//                 <X size={24} color="#ffffff" />
//               </TouchableOpacity>
//             </View>
//             <ScrollView>
//               {selectedEmail && (
//                 <>
//                   <View style={{ marginBottom: 16 }}>
//                     <Text style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>From</Text>
//                     <Text style={{ fontSize: 16, fontWeight: "600", color: "#ffffff" }}>{selectedEmail.from}</Text>
//                   </View>
//                   <View style={{ marginBottom: 16 }}>
//                     <Text style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>Subject</Text>
//                     <Text style={{ fontSize: 16, fontWeight: "600", color: "#ffffff" }}>{selectedEmail.subject}</Text>
//                   </View>
//                   <View style={{ marginBottom: 16 }}>
//                     <Text style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>Status</Text>
//                     <View
//                       style={{
//                         paddingHorizontal: 12,
//                         paddingVertical: 8,
//                         backgroundColor: getStatusColor(selectedEmail.status) + "20",
//                         borderRadius: 6,
//                         alignSelf: "flex-start",
//                       }}
//                     >
//                       <Text style={{ fontSize: 14, fontWeight: "600", color: getStatusColor(selectedEmail.status) }}>
//                         {getStatusLabel(selectedEmail.status)}
//                       </Text>
//                     </View>
//                   </View>
//                   <View>
//                     <Text style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>Received</Text>
//                     <Text style={{ fontSize: 14, color: "#d1d5db" }}>{selectedEmail.timestamp}</Text>
//                   </View>
//                 </>
//               )}
//             </ScrollView>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   )
// }
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Modal, ScrollView, TextInput } from "react-native";
import { RefreshCw, X } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as Linking from "expo-linking";

export default function InboxScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [emailText, setEmailText] = useState(""); // For demo input
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
  const handleDeepLink = ({ url }) => {
    const { queryParams } = Linking.parse(url);

    // existing handling
    if (queryParams.email) setEmail(queryParams.email);

    // new handling for Expo OAuth redirect
    if (queryParams.safemailDeepLink) {
      Linking.openURL(queryParams.safemailDeepLink);
    }
  };

  Linking.getInitialURL().then((url) => {
    if (url) handleDeepLink({ url });
  });

  const subscription = Linking.addEventListener("url", handleDeepLink);
  return () => subscription.remove();
}, []);

  useEffect(() => {
    if (mounted && !email) {
      const timer = setTimeout(() => router.replace("/LoginScreen"), 500);
      return () => clearTimeout(timer);
    }
  }, [mounted, email]);

  const [emails, setEmails] = useState([
    { id: "1", from: "Amazon", subject: "Order Details", status: "safe", timestamp: "2h" },
    { id: "2", from: "Bank", subject: "Account Alert", status: "suspicious", timestamp: "4h" },
  ]);

  const [selectedEmail, setSelectedEmail] = useState(null);
  const [scanning, setScanning] = useState(false);

  if (!email) return null; // prevent rendering before login

  // const handleScanEmail = async () => {
  //   if (!emailText.trim()) return alert("Please enter an email text to scan");
  //   try {
  //     const response = await fetch("http://192.168.1.3:3000/api/analyze-email", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ emailText }),
  //     });
  //     const data = await response.json();
  //     setScanResult(data.result);
  //     alert(`Demo scan result: ${data.result}`);
  //   } catch (err) {
  //     alert("Error scanning email: " + err.message);
  //   }
  // };

    const handleScanEmail = async () => {
  if (!emailText.trim()) return alert("Please enter email text");

  try {
    const response = await fetch("http://192.168.1.3:3000/api/analyze-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailText }),
    });

    const data = await response.json();

    if (data.error) return alert("Error: " + data.error);

    setScanResult(data.result); // safe / fraudulent
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

  return (
    <View style={{ flex: 1, backgroundColor: "#0f172a", paddingTop: insets.top }}>
      <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: "#334155" }}>
        <Text style={{ color: "#fff", fontSize: 24 }}>Inbox Scanner</Text>
        <Text style={{ color: "#9ca3af" }}>Analyze your emails for fraud</Text>

        {/* Demo input for backend/ML testing */}
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
