// "use client"

// import { useState } from "react"
// import { View, Text, TouchableOpacity, ScrollView, TextInput, Switch, FlatList } from "react-native"
// import { Mail, Shield, Trash2, LogOut } from "lucide-react-native"
// import { useSafeAreaInsets } from "react-native-safe-area-context"

// export default function SettingsScreen({ route }) {
//   const insets = useSafeAreaInsets()
//   const [autoScan, setAutoScan] = useState(true)
//   const [trustedDomains, setTrustedDomains] = useState(["amazon.com", "apple.com", "microsoft.com"])
//   const [newDomain, setNewDomain] = useState("")

//   const handleAddDomain = () => {
//     if (newDomain && !trustedDomains.includes(newDomain)) {
//       setTrustedDomains([...trustedDomains, newDomain])
//       setNewDomain("")
//     }
//   }

//   const handleRemoveDomain = (domain) => {
//     setTrustedDomains(trustedDomains.filter((d) => d !== domain))
//   }

//   const renderDomainItem = ({ item }) => (
//     <View
//       style={{
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         backgroundColor: "#0f172a",
//         paddingHorizontal: 12,
//         paddingVertical: 10,
//         marginBottom: 8,
//         borderRadius: 6,
//       }}
//     >
//       <Text style={{ fontSize: 13, color: "#d1d5db" }}>{item}</Text>
//       <TouchableOpacity onPress={() => handleRemoveDomain(item)}>
//         <Trash2 size={16} color="#ef4444" />
//       </TouchableOpacity>
//     </View>
//   )

//   return (
//     <ScrollView
//       style={{ flex: 1, backgroundColor: "#0f172a" }}
//       contentContainerStyle={{ paddingTop: insets.top, paddingHorizontal: 16, paddingBottom: 20 }}
//     >
//       {/* Header */}
//       <Text style={{ fontSize: 24, fontWeight: "bold", color: "#ffffff", marginBottom: 4 }}>Settings</Text>
//       <Text style={{ fontSize: 14, color: "#9ca3af", marginBottom: 20 }}>Manage your account and preferences</Text>

//       {/* Account Section */}
//       <View
//         style={{
//           backgroundColor: "#1e293b",
//           borderRadius: 8,
//           padding: 16,
//           marginBottom: 16,
//           borderWidth: 1,
//           borderColor: "#334155",
//         }}
//       >
//         <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
//           <Mail size={20} color="#3b82f6" style={{ marginRight: 8 }} />
//           <Text style={{ fontSize: 16, fontWeight: "600", color: "#ffffff" }}>Account</Text>
//         </View>

//         <View style={{ marginBottom: 12 }}>
//           <Text style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>Connected Email</Text>
//           <Text style={{ fontSize: 14, fontWeight: "500", color: "#ffffff" }}>user@gmail.com</Text>
//         </View>

//         <TouchableOpacity
//           style={{
//             paddingHorizontal: 12,
//             paddingVertical: 10,
//             backgroundColor: "#0f172a",
//             borderRadius: 6,
//             borderWidth: 1,
//             borderColor: "#334155",
//           }}
//         >
//           <Text style={{ fontSize: 14, fontWeight: "500", color: "#d1d5db", textAlign: "center" }}>
//             Reconnect Gmail / Outlook
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* Security Section */}
//       <View
//         style={{
//           backgroundColor: "#1e293b",
//           borderRadius: 8,
//           padding: 16,
//           marginBottom: 16,
//           borderWidth: 1,
//           borderColor: "#334155",
//         }}
//       >
//         <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
//           <Shield size={20} color="#3b82f6" style={{ marginRight: 8 }} />
//           <Text style={{ fontSize: 16, fontWeight: "600", color: "#ffffff" }}>Security</Text>
//         </View>

//         <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
//           <View>
//             <Text style={{ fontSize: 14, fontWeight: "500", color: "#ffffff", marginBottom: 4 }}>
//               Auto Scan Incoming Mails
//             </Text>
//             <Text style={{ fontSize: 12, color: "#9ca3af" }}>Automatically scan new emails</Text>
//           </View>
//           <Switch
//             value={autoScan}
//             onValueChange={setAutoScan}
//             trackColor={{ false: "#334155", true: "#3b82f6" }}
//             thumbColor="#ffffff"
//           />
//         </View>
//       </View>

//       {/* Trusted Domains Section */}
//       <View
//         style={{ backgroundColor: "#1e293b", borderRadius: 8, padding: 16, borderWidth: 1, borderColor: "#334155" }}
//       >
//         <Text style={{ fontSize: 16, fontWeight: "600", color: "#ffffff", marginBottom: 12 }}>Trusted Domains</Text>
//         <Text style={{ fontSize: 12, color: "#9ca3af", marginBottom: 12 }}>
//           Emails from these domains will be marked as safe
//         </Text>

//         {/* Add Domain */}
//         <View style={{ flexDirection: "row", gap: 8, marginBottom: 16 }}>
//           <TextInput
//             value={newDomain}
//             onChangeText={setNewDomain}
//             placeholder="example.com"
//             placeholderTextColor="#6b7280"
//             style={{
//               flex: 1,
//               backgroundColor: "#0f172a",
//               borderWidth: 1,
//               borderColor: "#334155",
//               borderRadius: 6,
//               paddingHorizontal: 12,
//               paddingVertical: 10,
//               color: "#ffffff",
//               fontSize: 13,
//             }}
//           />
//           <TouchableOpacity
//             onPress={handleAddDomain}
//             style={{
//               paddingHorizontal: 16,
//               paddingVertical: 10,
//               backgroundColor: "#3b82f6",
//               borderRadius: 6,
//               justifyContent: "center",
//             }}
//           >
//             <Text style={{ fontSize: 14, fontWeight: "600", color: "#ffffff" }}>Add</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Domain List */}
//         <FlatList
//           data={trustedDomains}
//           renderItem={renderDomainItem}
//           keyExtractor={(item) => item}
//           scrollEnabled={false}
//         />
//       </View>

//       {/* Logout */}
//       <TouchableOpacity
//         style={{
//           marginTop: 20,
//           paddingHorizontal: 16,
//           paddingVertical: 12,
//           backgroundColor: "rgba(239, 68, 68, 0.1)",
//           borderRadius: 8,
//           borderWidth: 1,
//           borderColor: "rgba(239, 68, 68, 0.2)",
//           flexDirection: "row",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <LogOut size={18} color="#ef4444" style={{ marginRight: 8 }} />
//         <Text style={{ fontSize: 14, fontWeight: "600", color: "#ef4444" }}>Logout</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   )
// }
"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity, ScrollView, TextInput, Switch, FlatList } from "react-native"
import { Mail, Shield, Trash2, LogOut } from "lucide-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function SettingsScreen({ onLogout }) {
  const insets = useSafeAreaInsets()
  const [autoScan, setAutoScan] = useState(true)
  const [trustedDomains, setTrustedDomains] = useState(["amazon.com", "apple.com", "microsoft.com"])
  const [newDomain, setNewDomain] = useState("")

  const handleAddDomain = () => {
    if (newDomain && !trustedDomains.includes(newDomain)) {
      setTrustedDomains([...trustedDomains, newDomain])
      setNewDomain("")
    }
  }

  const handleRemoveDomain = (domain) => {
    setTrustedDomains(trustedDomains.filter((d) => d !== domain))
  }

  const renderDomainItem = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#0f172a",
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 8,
        borderRadius: 6,
      }}
    >
      <Text style={{ fontSize: 13, color: "#d1d5db" }}>{item}</Text>
      <TouchableOpacity onPress={() => handleRemoveDomain(item)}>
        <Trash2 size={16} color="#ef4444" />
      </TouchableOpacity>
    </View>
  )

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#0f172a" }}
      contentContainerStyle={{ paddingTop: insets.top, paddingHorizontal: 16, paddingBottom: 20 }}
    >
      {/* Header */}
      <Text style={{ fontSize: 24, fontWeight: "bold", color: "#ffffff", marginBottom: 4 }}>Settings</Text>
      <Text style={{ fontSize: 14, color: "#9ca3af", marginBottom: 20 }}>Manage your account and preferences</Text>

      {/* Account Section */}
      <View
        style={{
          backgroundColor: "#1e293b",
          borderRadius: 8,
          padding: 16,
          marginBottom: 16,
          borderWidth: 1,
          borderColor: "#334155",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
          <Mail size={20} color="#3b82f6" style={{ marginRight: 8 }} />
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#ffffff" }}>Account</Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>Connected Email</Text>
          <Text style={{ fontSize: 14, fontWeight: "500", color: "#ffffff" }}>user@gmail.com</Text>
        </View>

        <TouchableOpacity
          style={{
            paddingHorizontal: 12,
            paddingVertical: 10,
            backgroundColor: "#0f172a",
            borderRadius: 6,
            borderWidth: 1,
            borderColor: "#334155",
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "500", color: "#d1d5db", textAlign: "center" }}>
            Reconnect Gmail / Outlook
          </Text>
        </TouchableOpacity>
      </View>

      {/* Security Section */}
      <View
        style={{
          backgroundColor: "#1e293b",
          borderRadius: 8,
          padding: 16,
          marginBottom: 16,
          borderWidth: 1,
          borderColor: "#334155",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
          <Shield size={20} color="#3b82f6" style={{ marginRight: 8 }} />
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#ffffff" }}>Security</Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View>
            <Text style={{ fontSize: 14, fontWeight: "500", color: "#ffffff", marginBottom: 4 }}>
              Auto Scan Incoming Mails
            </Text>
            <Text style={{ fontSize: 12, color: "#9ca3af" }}>Automatically scan new emails</Text>
          </View>
          <Switch
            value={autoScan}
            onValueChange={setAutoScan}
            trackColor={{ false: "#334155", true: "#3b82f6" }}
            thumbColor="#ffffff"
          />
        </View>
      </View>

      {/* Trusted Domains Section */}
      <View
        style={{ backgroundColor: "#1e293b", borderRadius: 8, padding: 16, borderWidth: 1, borderColor: "#334155" }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600", color: "#ffffff", marginBottom: 12 }}>Trusted Domains</Text>
        <Text style={{ fontSize: 12, color: "#9ca3af", marginBottom: 12 }}>
          Emails from these domains will be marked as safe
        </Text>

        {/* Add Domain */}
        <View style={{ flexDirection: "row", gap: 8, marginBottom: 16 }}>
          <TextInput
            value={newDomain}
            onChangeText={setNewDomain}
            placeholder="example.com"
            placeholderTextColor="#6b7280"
            style={{
              flex: 1,
              backgroundColor: "#0f172a",
              borderWidth: 1,
              borderColor: "#334155",
              borderRadius: 6,
              paddingHorizontal: 12,
              paddingVertical: 10,
              color: "#ffffff",
              fontSize: 13,
            }}
          />
          <TouchableOpacity
            onPress={handleAddDomain}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 10,
              backgroundColor: "#3b82f6",
              borderRadius: 6,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "600", color: "#ffffff" }}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* Domain List */}
        <FlatList
          data={trustedDomains}
          renderItem={renderDomainItem}
          keyExtractor={(item) => item}
          scrollEnabled={false}
        />
      </View>

      {/* Logout */}
      <TouchableOpacity
        onPress={onLogout} // use prop directly
        style={{
          marginTop: 20,
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: "rgba(239, 68, 68, 0.1)",
          borderRadius: 8,
          borderWidth: 1,
          borderColor: "rgba(239, 68, 68, 0.2)",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LogOut size={18} color="#ef4444" style={{ marginRight: 8 }} />
        <Text style={{ fontSize: 14, fontWeight: "600", color: "#ef4444" }}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}
