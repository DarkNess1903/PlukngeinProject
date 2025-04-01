import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';

export default function AddTransactionScreen() {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('$26.00');
  const [type, setType] = useState('');
  const [note, setNote] = useState('');

  const onDateChange = (_event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const handleSave = () => {
    // ตัวอย่าง: บันทึกข้อมูล (ในอนาคตอาจส่งไปยัง API)
    console.log({
      date: date.toLocaleDateString(),
      category,
      amount,
      type,
      note,
    });
    router.back(); // กลับไปหน้าก่อนหน้า (เช่น หน้า Calculator)
  };

  return (
    <View style={styles.container}>
      {/* ส่วนหัว */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.header}>เพิ่มรายการ</Text>
        <TouchableOpacity style={styles.notificationIcon}>
          <Ionicons name="notifications-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* ฟอร์มเพิ่มรายการ */}
      <View style={styles.formContainer}>
        {/* ช่อง วันที่ */}
        <Text style={styles.label}>วันที่</Text>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.inputText}>
            {date.toLocaleDateString('th-TH', { day: 'numeric', year: 'numeric' })}
          </Text>
          <Ionicons name="calendar-outline" size={20} color="#1A3C34" />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}

        {/* ช่อง หมวดหมู่ */}
        <Text style={styles.label}>หมวดหมู่</Text>
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="เลือกหมวดหมู่" value="" />
            <Picker.Item label="อาหาร" value="food" />
            <Picker.Item label="ที่พัก" value="housing" />
            <Picker.Item label="เดินทาง" value="travel" />
            <Picker.Item label="อื่นๆ" value="others" />
          </Picker>
          <Ionicons name="chevron-down" size={20} color="#1A3C34" />
        </View>

        {/* ช่อง จำนวน */}
        <Text style={styles.label}>จำนวน</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="$0.00"
            placeholderTextColor="#888"
          />
        </View>

        {/* ช่อง ประเภท */}
        <Text style={styles.label}>ประเภท</Text>
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={type}
            onValueChange={(itemValue) => setType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="เลือกประเภท" value="" />
            <Picker.Item label="รายรับ" value="income" />
            <Picker.Item label="รายจ่าย" value="expense" />
          </Picker>
          <Ionicons name="chevron-down" size={20} color="#1A3C34" />
        </View>

        {/* ช่อง หมายเหตุ */}
        <Text style={styles.label}>หมายเหตุ</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { height: 100 }]}
            value={note}
            onChangeText={setNote}
            placeholder="หมายเหตุ"
            placeholderTextColor="#888"
            multiline
          />
        </View>
      </View>

      {/* ปุ่ม "บันทึก" */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>บันทึก</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    width: '100%',
    backgroundColor: '#1A3C34',
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    paddingVertical: 40,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  notificationIcon: {
    padding: 10,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    color: '#1A3C34',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F2E9',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#1A3C34',
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    color: '#1A3C34',
  },
  picker: {
    flex: 1,
    height: 50,
    color: '#1A3C34',
  },
  saveButton: {
    backgroundColor: '#1A3C34',
    borderRadius: 25,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginVertical: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});