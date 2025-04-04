import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { auth, db } from '../src/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function LoginScreen() {
  const [pinVisible, setPinVisible] = useState(false);
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!phone || !pin) {
      Alert.alert('ข้อผิดพลาด', 'กรุณากรอกเบอร์โทรศัพท์และ รหัสผ่าน');
      return;
    }

    if (!/^\d{6}$/.test(pin)) {
      Alert.alert('ข้อผิดพลาด', 'รหัสผ่าน ต้องเป็นตัวเลข 6 หลัก');
      return;
    }

    try {
      // ค้นหาอีเมลจากเบอร์โทรศัพท์ใน Firestore
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('phone', '==', phone));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        Alert.alert('ข้อผิดพลาด', 'ไม่พบเบอร์โทรศัพท์นี้ในระบบ');
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      const email = userData.email;

      await signInWithEmailAndPassword(auth, email, pin);
      Alert.alert('สำเร็จ', 'เข้าสู่ระบบเรียบร้อยแล้ว!');
      router.push('/(tabs)');
    } catch (error) {
      console.log('Login Error:', error);
      let errorMessage = 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ';
      if (error && typeof error === 'object' && 'code' in error && 'message' in error) {
        const errorCode = error.code;
        const errorMsg = error.message;
        if (errorCode === 'auth/wrong-password') {
          errorMessage = 'รหัส ไม่ถูกต้อง';
        } else if (errorCode === 'auth/user-not-found') {
          errorMessage = 'ไม่พบผู้ใช้ในระบบ';
        } else if (errorCode === 'auth/invalid-email') {
          errorMessage = 'รูปแบบอีเมลไม่ถูกต้อง';
        } else {
          errorMessage = `ข้อผิดพลาด: ${errorMsg}`;
        }
      }
      Alert.alert('ข้อผิดพลาด', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>เข้าสู่ระบบ</Text>
      </View>

      <Text style={styles.label}>เบอร์โทรศัพท์</Text>
      <TextInput
        style={styles.input}
        placeholder="เบอร์โทรศัพท์"
         keyboardType="phone-pad"
         value={phone}
         onChangeText={setPhone}
         maxLength={10}
      />

      <Text style={styles.label}>รหัสผ่าน (6 หลัก)</Text>
      <View style={styles.pinContainer}>
        <TextInput
          style={styles.pinInput}
          placeholder="รหัสผ่าน"
          placeholderTextColor="#888"
          secureTextEntry={!pinVisible}
          keyboardType="numeric"
          value={pin}
          onChangeText={setPin}
          maxLength={6}
        />
        <TouchableOpacity onPress={() => setPinVisible(!pinVisible)} style={styles.eyeIcon}>
          <Ionicons name={pinVisible ? 'eye' : 'eye-off'} size={20} color="#1A3C34" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>เข้าสู่ระบบ</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerButton} onPress={() => router.push('/register')}>
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
  pinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  pinInput: {
    width: '80%',
    height: 50,
    backgroundColor: '#E0F2E9',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#888',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
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
