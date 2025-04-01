import { View, Text, Image, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();

  // เปลี่ยนหน้าไปที่ Login หลังจาก 3 วินาที
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/login'); // ไปที่หน้า login
    }, 3000); // 3 วินาที

    return () => clearTimeout(timer); // ล้าง timer เมื่อ component ถูก unmount
  }, [router]);

  return (
    <View style={styles.container}>
      {/* โลโก้ */}
      <Image
        source={require('../assets/logo.png')} // เปลี่ยน path ตามที่เก็บรูป
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05362c', // สีเขียวเข้มตามรูป
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 450, // ปรับขนาดตามต้องการ
    height: 450,
  },
  text: {
    fontSize: 32,
    color: '#FFD700', // สีทองตามรูป
    fontWeight: 'bold',
    marginTop: 20,
  },
});