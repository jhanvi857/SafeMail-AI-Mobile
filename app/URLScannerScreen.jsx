"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from "react-native"
import { Search, AlertCircle, CheckCircle, XCircle } from "lucide-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function URLScannerScreen() {
  const insets = useSafeAreaInsets()
  const [url, setUrl] = useState("")
  const [result, setResult] = useState(null)
  const [scanning, setScanning] = useState(false)

  const handleScan = () => {
    if (!url) return
    setScanning(true)
    setTimeout(() => {
      const riskLevel = Math.random() > 0.6 ? "high" : Math.random() > 0.3 ? "medium" : "low"
      setResult({
        riskLevel,
        reasons: ["Domain recently registered", "Contains suspicious parameters", "Redirect chain detected"],
        safetyScore: Math.floor(Math.random() * 100),
      })
      setScanning(false)
    }, 1500)
  }

  const getRiskColor = (level) => {
    switch (level) {
      case "low":
        return "#10b981"
      case "medium":
        return "#f59e0b"
      case "high":
        return "#ef4444"
      default:
        return "#9ca3af"
    }
  }

  const getRiskIcon = (level) => {
    switch (level) {
      case "low":
        return <CheckCircle size={32} color="#10b981" />
      case "medium":
        return <AlertCircle size={32} color="#f59e0b" />
      case "high":
        return <XCircle size={32} color="#ef4444" />
      default:
        return null
    }
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#0f172a" }}
      contentContainerStyle={{ paddingTop: insets.top, paddingHorizontal: 16, paddingBottom: 20 }}
    >
      {/* Header */}
      <Text style={{ fontSize: 24, fontWeight: "bold", color: "#ffffff", marginBottom: 4 }}>URL Checker</Text>
      <Text style={{ fontSize: 14, color: "#9ca3af", marginBottom: 20 }}>Paste a link to check its safety</Text>

      {/* Input Section */}
      <View
        style={{
          backgroundColor: "#1e293b",
          borderRadius: 8,
          padding: 12,
          marginBottom: 20,
          borderWidth: 1,
          borderColor: "#334155",
        }}
      >
        <TextInput
          value={url}
          onChangeText={setUrl}
          placeholder="https://example.com"
          placeholderTextColor="#6b7280"
          style={{ color: "#ffffff", fontSize: 14, marginBottom: 12 }}
        />
        <TouchableOpacity
          onPress={handleScan}
          disabled={scanning || !url}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 16,
            paddingVertical: 12,
            backgroundColor: "#3b82f6",
            borderRadius: 6,
            opacity: scanning || !url ? 0.5 : 1,
          }}
        >
          {scanning ? (
            <ActivityIndicator size="small" color="#ffffff" style={{ marginRight: 8 }} />
          ) : (
            <Search size={16} color="#ffffff" style={{ marginRight: 8 }} />
          )}
          <Text style={{ fontSize: 14, fontWeight: "600", color: "#ffffff" }}>Scan Now</Text>
        </TouchableOpacity>
      </View>

      {/* Results */}
      {result && (
        <>
          {/* Risk Assessment */}
          <View
            style={{
              backgroundColor: getRiskColor(result.riskLevel) + "15",
              borderRadius: 8,
              padding: 16,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: getRiskColor(result.riskLevel) + "30",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
              {getRiskIcon(result.riskLevel)}
              <View style={{ marginLeft: 12 }}>
                <Text style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>Risk Level</Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: getRiskColor(result.riskLevel),
                    textTransform: "capitalize",
                  }}
                >
                  {result.riskLevel}
                </Text>
              </View>
            </View>

            <Text style={{ fontSize: 14, fontWeight: "600", color: "#ffffff", marginBottom: 12 }}>Detected Issues</Text>
            {result.reasons.map((reason, idx) => (
              <View key={idx} style={{ flexDirection: "row", marginBottom: 8 }}>
                <Text style={{ color: "#f59e0b", marginRight: 8 }}>•</Text>
                <Text style={{ fontSize: 12, color: "#d1d5db", flex: 1 }}>{reason}</Text>
              </View>
            ))}
          </View>

          {/* Safety Score */}
          <View
            style={{ backgroundColor: "#1e293b", borderRadius: 8, padding: 16, borderWidth: 1, borderColor: "#334155" }}
          >
            <Text style={{ fontSize: 14, fontWeight: "600", color: "#ffffff", marginBottom: 12 }}>Safety Score</Text>
            <View
              style={{ height: 40, backgroundColor: "#0f172a", borderRadius: 8, overflow: "hidden", marginBottom: 12 }}
            >
              <View
                style={{
                  height: "100%",
                  width: `${result.safetyScore}%`,
                  backgroundColor:
                    result.safetyScore > 70 ? "#10b981" : result.safetyScore > 40 ? "#f59e0b" : "#ef4444",
                }}
              />
            </View>
            <Text style={{ textAlign: "center", fontSize: 14, color: "#d1d5db" }}>
              Score: <Text style={{ fontWeight: "bold", color: "#ffffff" }}>{result.safetyScore}%</Text>
            </Text>
          </View>
        </>
      )}

      {/* Empty State */}
      {!result && !scanning && (
        <View style={{ alignItems: "center", paddingVertical: 48 }}>
          <Search size={48} color="#6b7280" style={{ marginBottom: 16, opacity: 0.5 }} />
          <Text style={{ fontSize: 14, color: "#9ca3af", textAlign: "center" }}>
            Enter a URL and tap "Scan Now" to check its safety
          </Text>
        </View>
      )}
    </ScrollView>
  )
}
