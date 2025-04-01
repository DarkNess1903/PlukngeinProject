import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* หน้าที่ไม่ต้องมี Bottom Nav (เช่น Splash, Login, Register) */}
      <Stack.Screen name="index" /> {/* Splash Screen */}
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}