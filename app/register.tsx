import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { auth, db } from '../src/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function RegisterScreen() {
  const [pinVisible, setPinVisible] = useState(false);
  const [confirmPinVisible, setConfirmPinVisible] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const router = useRouter();

  const formatBirthDate = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    let formatted = '';
    if (cleaned.length > 0) {
      formatted = cleaned.substring(0, 2);
      if (cleaned.length > 2) formatted += '/' + cleaned.substring(2, 4);
      if (cleaned.length > 4) formatted += '/' + cleaned.substring(4, 8);
    }
    if (formatted.length > 10) formatted = formatted.substring(0, 10);
    setBirthDate(formatted);
  };

  const handleRegister = async () => {
    if (!fullName || !phone || !birthDate || !pin || !confirmPin) {
      Alert.alert('ข้อผิดพลาด', 'กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return;
    }

    if (pin !== confirmPin) {
      Alert.alert('ข้อผิดพลาด', 'รหัสผ่าน และการยืนยัน รหัสผ่าน ไม่ตรงกัน');
      return;
    }

    if (!/^\d{6}$/.test(pin)) {
      Alert.alert('ข้อผิดพลาด', 'รหัสผ่าน ต้องเป็นตัวเลข 6 หลัก');
      return;
    }    

    const birthDateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!birthDateRegex.test(birthDate)) {
      Alert.alert('ข้อผิดพลาด', 'กรุณากรอกวัน/เดือน/ปีเกิดในรูปแบบ DD/MM/YYYY');
      return;
    }

    // สร้างอีเมลปลอมจากเบอร์โทร
    const email = `${phone}@yourapp.com`;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pin);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        fullName: fullName,
        email: email,
        phone: phone,
        birthDate: birthDate,
        createdAt: new Date().toISOString(),
      });

      Alert.alert('สำเร็จ', 'สมัครสมาชิกเรียบร้อยแล้ว!');
      router.push('/login');
    } catch (error: unknown) {
      console.log('Registration Error:', error);
      let errorMessage = 'เกิดข้อผิดพลาดในการสมัครสมาชิก';
      if (error && typeof error === 'object' && 'code' in error && 'message' in error) {
        const errorCode = (error as { code: string }).code;
        const errorMsg = (error as { message: string }).message;
        if (errorCode === 'auth/email-already-in-use') {
          errorMessage = 'เบอร์โทรศัพท์นี้ถูกใช้งานแล้ว';
        } else if (errorCode === 'auth/invalid-email') {
          errorMessage = 'รูปแบบอีเมลไม่ถูกต้อง';
        } else if (errorCode === 'auth/weak-password') {
          errorMessage = 'รหัสผ่าน ต้องมีอย่างน้อย 6 หลัก';
        } else {
          errorMessage = `ข้อผิดพลาด: ${errorMsg}`;
        }
      }
      Alert.alert('ข้อผิดพลาด', errorMessage);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>สมัครสมาชิก</Text>
        </View>
        <Text style={styles.label}>ชื่อ-นามสกุล</Text>
        <TextInput style={styles.input} placeholder="ชื่อ-นามสกุล" value={fullName} onChangeText={setFullName} />
        <Text style={styles.label}>เบอร์โทรศัพท์</Text>
        <TextInput 
        style={styles.input}
         placeholder="เบอร์โทรศัพท์"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          maxLength={10}
        />
        <Text style={styles.label}>วัน/เดือน/ปีเกิด เช่น (01/01/2550)</Text>
        <TextInput
          style={styles.input}
          placeholder="วัน/เดือน/พ.ศ"
          keyboardType="numeric"
          value={birthDate}
          onChangeText={formatBirthDate}
          maxLength={10}
        />
        <Text style={styles.label}>รหัสผ่านตัวเลข (6 หลัก)</Text>
        <View style={styles.pinContainer}>
        <TextInput
            style={styles.pinInput}
            placeholder="รหัสผ่าน"
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
        <Text style={styles.label}>ยืนยันรหัสผ่านตัวเลข (6 หลัก)</Text>
        <View style={styles.pinContainer}>
          <TextInput
            style={styles.pinInput}
            placeholder="ยืนยัน รหัสผ่าน"
            secureTextEntry={!confirmPinVisible}
            keyboardType="numeric"
            value={confirmPin}
            onChangeText={setConfirmPin}
            maxLength={6}
          />
          <TouchableOpacity onPress={() => setConfirmPinVisible(!confirmPinVisible)} style={styles.eyeIcon}>
            <Ionicons name={confirmPinVisible ? 'eye' : 'eye-off'} size={20} color="#1A3C34" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.buttonText}>สมัครสมาชิก</Text>
        </TouchableOpacity>
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