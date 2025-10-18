"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity, ScrollView, FlatList, Modal } from "react-native"
import { RefreshCw, X } from "lucide-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function InboxScreen() {
  const insets = useSafeAreaInsets()
  const [emails, setEmails] = useState([
    { id: "1", from: "Amazon Support", subject: "Your Order Details", status: "safe", timestamp: "2 hours ago" },
    {
      id: "2",
      from: "Bank Notice",
      subject: "Account Update Required",
      status: "suspicious",
      timestamp: "4 hours ago",
    },
    { id: "3", from: "Lottery Win", subject: "Claim your prize", status: "fraud", timestamp: "1 day ago" },
    { id: "4", from: "PayPal", subject: "Confirm your identity", status: "suspicious", timestamp: "2 days ago" },
    { id: "5", from: "Apple Support", subject: "Your subscription renewal", status: "safe", timestamp: "3 days ago" },
  ])
  const [selectedEmail, setSelectedEmail] = useState(null)
  const [scanning, setScanning] = useState(false)

  const handleRescan = () => {
    setScanning(true)
    setTimeout(() => setScanning(false), 2000)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "safe":
        return "#10b981"
      case "suspicious":
        return "#f59e0b"
      case "fraud":
        return "#ef4444"
      default:
        return "#9ca3af"
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case "safe":
        return "✓ Safe"
      case "suspicious":
        return "⚠ Suspicious"
      case "fraud":
        return "✕ Fraud"
      default:
        return "Unknown"
    }
  }

  const renderEmailItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => setSelectedEmail(item)}
      style={{ paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#334155" }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14, fontWeight: "600", color: "#ffffff", marginBottom: 4 }}>{item.from}</Text>
          <Text style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>{item.subject}</Text>
          <Text style={{ fontSize: 11, color: "#6b7280" }}>{item.timestamp}</Text>
        </View>
        <View
          style={{
            paddingHorizontal: 8,
            paddingVertical: 4,
            backgroundColor: getStatusColor(item.status) + "20",
            borderRadius: 4,
            marginLeft: 12,
          }}
        >
          <Text style={{ fontSize: 11, fontWeight: "600", color: getStatusColor(item.status) }}>
            {getStatusLabel(item.status)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={{ flex: 1, backgroundColor: "#0f172a", paddingTop: insets.top }}>
      {/* Header */}
      <View style={{ paddingHorizontal: 16, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: "#334155" }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#ffffff", marginBottom: 4 }}>Inbox Scanner</Text>
        <Text style={{ fontSize: 14, color: "#9ca3af", marginBottom: 16 }}>Analyze your emails for fraud</Text>
        <TouchableOpacity
          onPress={handleRescan}
          disabled={scanning}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 12,
            paddingVertical: 8,
            backgroundColor: "#3b82f6",
            borderRadius: 6,
            alignSelf: "flex-start",
            opacity: scanning ? 0.5 : 1,
          }}
        >
          <RefreshCw size={16} color="#ffffff" style={{ marginRight: 8 }} />
          <Text style={{ fontSize: 14, fontWeight: "600", color: "#ffffff" }}>Rescan</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={{ flexDirection: "row", paddingHorizontal: 16, paddingVertical: 12, gap: 8 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#1e293b",
            borderRadius: 8,
            padding: 12,
            borderWidth: 1,
            borderColor: "#334155",
          }}
        >
          <Text style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>Total</Text>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#ffffff" }}>{emails.length}</Text>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "#1e293b",
            borderRadius: 8,
            padding: 12,
            borderWidth: 1,
            borderColor: "#334155",
          }}
        >
          <Text style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>Safe</Text>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#10b981" }}>
            {emails.filter((e) => e.status === "safe").length}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "#1e293b",
            borderRadius: 8,
            padding: 12,
            borderWidth: 1,
            borderColor: "#334155",
          }}
        >
          <Text style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>Threats</Text>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#ef4444" }}>
            {emails.filter((e) => e.status !== "safe").length}
          </Text>
        </View>
      </View>

      {/* Email List */}
      <FlatList
        data={emails}
        renderItem={renderEmailItem}
        keyExtractor={(item) => item.id}
        style={{ flex: 1 }}
        contentContainerStyle={{
          backgroundColor: "#1e293b",
          marginHorizontal: 16,
          marginVertical: 12,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: "#334155",
        }}
      />

      {/* Email Detail Modal */}
      <Modal visible={!!selectedEmail} animationType="slide" transparent>
        <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", justifyContent: "flex-end" }}>
          <View
            style={{
              backgroundColor: "#1e293b",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              paddingHorizontal: 16,
              paddingVertical: 20,
              paddingBottom: insets.bottom + 20,
              maxHeight: "80%",
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#ffffff" }}>Email Details</Text>
              <TouchableOpacity onPress={() => setSelectedEmail(null)}>
                <X size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {selectedEmail && (
                <>
                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>From</Text>
                    <Text style={{ fontSize: 16, fontWeight: "600", color: "#ffffff" }}>{selectedEmail.from}</Text>
                  </View>
                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>Subject</Text>
                    <Text style={{ fontSize: 16, fontWeight: "600", color: "#ffffff" }}>{selectedEmail.subject}</Text>
                  </View>
                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>Status</Text>
                    <View
                      style={{
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        backgroundColor: getStatusColor(selectedEmail.status) + "20",
                        borderRadius: 6,
                        alignSelf: "flex-start",
                      }}
                    >
                      <Text style={{ fontSize: 14, fontWeight: "600", color: getStatusColor(selectedEmail.status) }}>
                        {getStatusLabel(selectedEmail.status)}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>Received</Text>
                    <Text style={{ fontSize: 14, color: "#d1d5db" }}>{selectedEmail.timestamp}</Text>
                  </View>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  )
}
