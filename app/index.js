// import { useState } from "react"
// import { NavigationContainer } from "@react-navigation/native"
// import { createNativeStackNavigator } from "@react-navigation/native-stack"
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
// import { Mail, Search, BarChart3, Settings as SettingsIcon } from "lucide-react-native"
// import LoginScreen from "./screens/LoginScreen"
// import InboxScreen from "./screens/InboxScreen"
// import URLScannerScreen from "./screens/URLScannerScreen"
// import ReportsScreen from "./screens/ReportsScreen"
// import SettingsScreen from "./screens/SettingsScreen"
// import { Tabs } from "expo-router"

// const Stack = createNativeStackNavigator()
// const Tab = createBottomTabNavigator()

// function DashboardTabs() {
//   return (
//     <Tabs
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarActiveTintColor: "#3b82f6",
//         tabBarInactiveTintColor: "#6b7280",
//         tabBarStyle: {
//           backgroundColor: "#1e293b",
//           borderTopColor: "#334155",
//           borderTopWidth: 1,
//         },
//         tabBarIcon: ({ color, size }) => {
//           let icon
//           if (route.name === "Inbox") {
//             icon = <Mail size={size} color={color} />
//           } else if (route.name === "URLScanner") {
//             icon = <Search size={size} color={color} />
//           } else if (route.name === "Reports") {
//             icon = <BarChart3 size={size} color={color} />
//           } else if (route.name === "Settings") {
//             icon = <SettingsIcon size={size} color={color} />
//           }
//           return icon
//         },
//       })}
//     >
//       <Tab.Screen name="Inbox" component={InboxScreen} />
//       <Tab.Screen name="URLScanner" component={URLScannerScreen} />
//       <Tab.Screen name="Reports" component={ReportsScreen} />
//       <Tab.Screen name="Settings" component={SettingsScreen} />
//     </Tabs>
//   )
// }

// export default function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false)

//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         {!isLoggedIn ? (
//           <Stack.Screen name="Login" component={LoginScreen} initialParams={{ onLogin: () => setIsLoggedIn(true) }} />
//         ) : (
//           <Stack.Screen
//             name="Dashboard"
//             component={DashboardTabs}
//             initialParams={{ onLogout: () => setIsLoggedIn(false) }}
//           />
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   )
// }
import { useState } from "react";
import { Tabs } from "expo-router";
import { Mail, Search, BarChart3, Settings as SettingsIcon } from "lucide-react-native";

import LoginScreen from "./LoginScreen";
import InboxScreen from "./InboxScreen";
import URLScannerScreen from "./URLScannerScreen";
import ReportsScreen from "./ReportsScreen";
import SettingsScreen from "./SettingsScreen";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // If not logged in, show Login screen directly
  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  // Once logged in, show dashboard tabs
  return (
    <Tabs
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
          if (route.name === "Inbox") return <Mail size={size} color={color} />;
          if (route.name === "URLScanner") return <Search size={size} color={color} />;
          if (route.name === "Reports") return <BarChart3 size={size} color={color} />;
          if (route.name === "Settings") return <SettingsIcon size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="Inbox" component={InboxScreen} />
      <Tabs.Screen name="URLScanner" component={URLScannerScreen} />
      <Tabs.Screen name="Reports" component={ReportsScreen} />
      <Tabs.Screen name="Settings">
        {() => <SettingsScreen onLogout={() => setIsLoggedIn(false)} />}
      </Tabs.Screen>
    </Tabs>
  );
}
