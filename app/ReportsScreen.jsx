"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity, ScrollView, FlatList } from "react-native"
import { Download, FileText } from "lucide-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function ReportsScreen() {
  const insets = useSafeAreaInsets()
  const [exportFormat, setExportFormat] = useState("csv")

  const threatData = [
    { name: "Safe", value: 65, color: "#10b981" },
    { name: "Suspicious", value: 20, color: "#f59e0b" },
    { name: "Fraud", value: 15, color: "#ef4444" },
  ]

  const scanHistory = [
    { id: 1, type: "Email", source: "Amazon Support", status: "Safe", date: "2 hours ago" },
    { id: 2, type: "URL", source: "https://verify-account.fake.com", status: "Fraud", date: "4 hours ago" },
    { id: 3, type: "Email", source: "Bank Notice", status: "Suspicious", date: "1 day ago" },
    { id: 4, type: "URL", source: "https://secure-login.example.com", status: "Safe", date: "2 days ago" },
    { id: 5, type: "Email", source: "Lottery Win", status: "Fraud", date: "3 days ago" },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Safe":
        return "#10b981"
      case "Suspicious":
        return "#f59e0b"
      case "Fraud":
        return "#ef4444"
      default:
        return "#9ca3af"
    }
  }

  const renderThreatItem = ({ item }) => (
    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
      <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: item.color, marginRight: 8 }} />
      <Text style={{ fontSize: 14, color: "#d1d5db", flex: 1 }}>{item.name}</Text>
      <Text style={{ fontSize: 14, fontWeight: "600", color: "#ffffff" }}>{item.value}%</Text>
    </View>
  )

  const renderHistoryItem = ({ item }) => (
    <View style={{ paddingHorizontal: 12, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#334155" }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 12, fontWeight: "600", color: "#9ca3af", marginBottom: 4 }}>{item.type}</Text>
          <Text style={{ fontSize: 13, color: "#d1d5db", marginBottom: 4 }}>{item.source}</Text>
          <Text style={{ fontSize: 11, color: "#6b7280" }}>{item.date}</Text>
        </View>
        <View
          style={{
            paddingHorizontal: 8,
            paddingVertical: 4,
            backgroundColor: getStatusColor(item.status) + "20",
            borderRadius: 4,
          }}
        >
          <Text style={{ fontSize: 11, fontWeight: "600", color: getStatusColor(item.status) }}>{item.status}</Text>
        </View>
      </View>
    </View>
  )

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#0f172a" }}
      contentContainerStyle={{ paddingTop: insets.top, paddingHorizontal: 16, paddingBottom: 20 }}
    >
      {/* Header */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <View>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#ffffff", marginBottom: 4 }}>Reports</Text>
          <Text style={{ fontSize: 14, color: "#9ca3af" }}>View your scanning history</Text>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 12,
            paddingVertical: 8,
            backgroundColor: "#3b82f6",
            borderRadius: 6,
          }}
        >
          <Download size={16} color="#ffffff" style={{ marginRight: 6 }} />
          <Text style={{ fontSize: 12, fontWeight: "600", color: "#ffffff" }}>Export</Text>
        </TouchableOpacity>
      </View>

      {/* Threat Distribution */}
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
        <Text style={{ fontSize: 14, fontWeight: "600", color: "#ffffff", marginBottom: 16 }}>Threat Distribution</Text>
        <FlatList
          data={threatData}
          renderItem={renderThreatItem}
          keyExtractor={(item) => item.name}
          scrollEnabled={false}
        />
      </View>

      {/* Recent Scans */}
      <View
        style={{
          backgroundColor: "#1e293b",
          borderRadius: 8,
          borderWidth: 1,
          borderColor: "#334155",
          overflow: "hidden",
        }}
      >
        <View
          style={{ paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#334155" }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FileText size={18} color="#3b82f6" style={{ marginRight: 8 }} />
            <Text style={{ fontSize: 14, fontWeight: "600", color: "#ffffff" }}>Recent Scans</Text>
          </View>
        </View>
        <FlatList
          data={scanHistory}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  )
}
