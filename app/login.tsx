import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    // ตัวอย่าง: ตรวจสอบการล็อกอิน (ในอนาคตอาจเชื่อมต่อกับ API)
    // ถ้าล็อกอินสำเร็จ ให้ไปที่หน้า (tabs) ซึ่งมี Bottom Nav
    router.push('/(tabs)'); // ไปที่กลุ่ม tabs
  };

  return (
    <View style={styles.container}>
      {/* ส่วนหัว */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>เข้าสู่ระบบ</Text>
      </View>

      {/* ช่อง Username */}
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#888"
      />

      {/* ช่อง Password */}
      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry={!passwordVisible}
          value="••••••••"
          editable={false}
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={passwordVisible ? 'eye' : 'eye-off'}
            size={20}
            color="#1A3C34"
          />
        </TouchableOpacity>
      </View>

      {/* ปุ่ม "เข้าสู่ระบบ" */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>เข้าสู่ระบบ</Text>
      </TouchableOpacity>

      {/* ปุ่ม "สมัครสมาชิก" */}
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => router.push('/register')}
      >
        <Text style={styles.buttonText}>สมัครสมาชิก</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  headerContainer: {
    width: '100%',
    backgroundColor: '#1A3C34',
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    paddingVertical: 40,
    alignItems: 'center',
    marginBottom: 50,
  },
  header: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    color: '#1A3C34',
    alignSelf: 'flex-start',
    marginLeft: '10%',
    marginBottom: 8,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#E0F2E9',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 16,
    color: '#888',
  },
  passwordContainer: {
    width: '80%',
    height: 50,
    backgroundColor: '#E0F2E9',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  passwordInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#888',
  },
  eyeIcon: {
    paddingHorizontal: 15,
  },
  loginButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFA500',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  registerButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFDAB9',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#1A3C34',
    fontWeight: 'bold',
  },
});