import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const router = useRouter();

  const handleRegister = () => {
    // ตัวอย่าง: ตรวจสอบการสมัครสมาชิก (ในอนาคตอาจเชื่อมต่อกับ API)
    // ถ้าสมัครสำเร็จ ให้กลับไปที่หน้า Login
    router.push('/login');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* ส่วนหัว */}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>สมัครสมาชิก</Text>
        </View>

        {/* ช่อง ชื่อ-นามสกุล */}
        <Text style={styles.label}>ชื่อ-นามสกุล</Text>
        <TextInput
          style={styles.input}
          placeholder="ชื่อ-นามสกุล"
          placeholderTextColor="#888"
        />

        {/* ช่อง อีเมล */}
        <Text style={styles.label}>อีเมล</Text>
        <TextInput
          style={styles.input}
          placeholder="อีเมล"
          placeholderTextColor="#888"
          keyboardType="email-address"
        />

        {/* ช่อง เบอร์โทรศัพท์ */}
        <Text style={styles.label}>เบอร์โทรศัพท์</Text>
        <TextInput
          style={styles.input}
          placeholder="เบอร์โทรศัพท์"
          placeholderTextColor="#888"
          keyboardType="phone-pad"
        />

        {/* ช่อง วัน/เดือน/ปีเกิด */}
        <Text style={styles.label}>วัน/เดือน/ปีเกิด</Text>
        <TextInput
          style={styles.input}
          placeholder="DD / MM / YYYY"
          placeholderTextColor="#888"
          keyboardType="numeric"
        />

        {/* ช่อง รหัสผ่าน */}
        <Text style={styles.label}>รหัสผ่าน</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="รหัสผ่าน"
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

        {/* ช่อง ยืนยันรหัสผ่าน */}
        <Text style={styles.label}>ยืนยันรหัสผ่าน</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="ยืนยันรหัสผ่าน"
            placeholderTextColor="#888"
            secureTextEntry={!confirmPasswordVisible}
            value="••••••••"
            editable={false}
          />
          <TouchableOpacity
            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={confirmPasswordVisible ? 'eye' : 'eye-off'}
              size={20}
              color="#1A3C34"
            />
          </TouchableOpacity>
        </View>

        {/* ปุ่ม "สมัครสมาชิก" */}
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.buttonText}>สมัครสมาชิก</Text>
        </TouchableOpacity>

        {/* ลิงก์ "มีบัญชีอยู่แล้ว? เข้าสู่ระบบ" */}
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.linkText}>
            มีบัญชีอยู่แล้ว? <Text style={styles.link}>เข้าสู่ระบบ</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingBottom: 20,
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
    marginBottom: 20,
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
  registerButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFA500',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    color: '#1A3C34',
    fontWeight: 'bold',
  },
  linkText: {
    fontSize: 14,
    color: '#1A3C34',
  },
  link: {
    color: '#1A3C34',
    textDecorationLine: 'underline',
  },
});