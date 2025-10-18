import { useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Mail, Search, BarChart3, Settings as SettingsIcon } from "lucide-react-native"
import LoginScreen from "./screens/LoginScreen"
import InboxScreen from "./screens/InboxScreen"
import URLScannerScreen from "./screens/URLScannerScreen"
import ReportsScreen from "./screens/ReportsScreen"
import SettingsScreen from "./screens/SettingsScreen"

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function DashboardTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#3b82f6",
        tabBarInactiveTintColor: "#6b7280",
        tabBarStyle: {
          backgroundColor: "#1e293b",
          borderTopColor: "#334155",
          borderTopWidth: 1,
        },
        tabBarIcon: ({ color, size }) => {
          let icon
          if (route.name === "Inbox") {
            icon = <Mail size={size} color={color} />
          } else if (route.name === "URLScanner") {
            icon = <Search size={size} color={color} />
          } else if (route.name === "Reports") {
            icon = <BarChart3 size={size} color={color} />
          } else if (route.name === "Settings") {
            icon = <SettingsIcon size={size} color={color} />
          }
          return icon
        },
      })}
    >
      <Tab.Screen name="Inbox" component={InboxScreen} />
      <Tab.Screen name="URLScanner" component={URLScannerScreen} />
      <Tab.Screen name="Reports" component={ReportsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  )
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <Stack.Screen name="Login" component={LoginScreen} initialParams={{ onLogin: () => setIsLoggedIn(true) }} />
        ) : (
          <Stack.Screen
            name="Dashboard"
            component={DashboardTabs}
            initialParams={{ onLogout: () => setIsLoggedIn(false) }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
