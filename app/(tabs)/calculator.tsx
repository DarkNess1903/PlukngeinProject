import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function CalculatorScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* ส่วนหัว */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.header}>รายการ สัปดาห์ - รายจ่าย</Text>
        <TouchableOpacity style={styles.notificationIcon}>
          <Ionicons name="notifications-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* ยอดเงิน */}
      <View style={styles.balanceContainer}>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>รายรับทั้งหมด</Text>
          <Text style={styles.balanceAmount}>$7,783.00</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '30%', backgroundColor: '#1A3C34' }]} />
          </View>
          <Text style={styles.progressText}>30% Of Your Expenses, Looks Good.</Text>
        </View>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>รายจ่ายทั้งหมด</Text>
          <Text style={styles.balanceAmount}>$1,187.40</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '0%', backgroundColor: '#FF0000' }]} />
          </View>
          <Text style={styles.progressText}>NULL</Text>
        </View>
      </View>

      {/* รายการธุรกรรม */}
      <View style={styles.transactionContainer}>
        {/* รายการที่ 1 */}
        <View style={styles.transactionItem}>
          <View style={styles.transactionIcon}>
            <Ionicons name="wallet-outline" size={24} color="#1A3C34" />
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTitle}>รายรับ</Text>
            <Text style={styles.transactionDate}>18:27 - April 30</Text>
          </View>
          <Text style={[styles.transactionAmount, { color: '#1A3C34' }]}>$1,000</Text>
        </View>

        {/* รายการที่ 2 */}
        <View style={styles.transactionItem}>
          <View style={styles.transactionIcon}>
            <Ionicons name="wallet-outline" size={24} color="#1A3C34" />
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTitle}>รายจ่าย</Text>
            <Text style={styles.transactionDate}>15:00 - April 24</Text>
          </View>
          <Text style={[styles.transactionAmount, { color: '#FF0000' }]}>-$18.35</Text>
        </View>

        {/* รายการที่ 3 */}
        <View style={styles.transactionItem}>
          <View style={styles.transactionIcon}>
            <Ionicons name="wallet-outline" size={24} color="#1A3C34" />
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTitle}>Outcome</Text>
            <Text style={styles.transactionDate}>12:30 - April 15</Text>
          </View>
          <Text style={[styles.transactionAmount, { color: '#FF0000' }]}>-$15.40</Text>
        </View>

        {/* รายการที่ 4 */}
        <View style={styles.transactionItem}>
          <View style={styles.transactionIcon}>
            <Ionicons name="wallet-outline" size={24} color="#1A3C34" />
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTitle}>Outcome</Text>
            <Text style={styles.transactionDate}>9:30 - April 08</Text>
          </View>
          <Text style={[styles.transactionAmount, { color: '#FF0000' }]}>-$12.13</Text>
        </View>
      </View>

      {/* ปุ่ม "เพิ่มรายการ" */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/add-transaction')} // เพิ่มบรรทัดนี้
      >
        <Text style={styles.addButtonText}>เพิ่มรายการ</Text>
      </TouchableOpacity>
    </ScrollView>
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
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  balanceCard: {
    width: '45%',
    backgroundColor: '#E0F2E9',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 16,
    color: '#1A3C34',
    marginBottom: 5,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A3C34',
    marginBottom: 10,
  },
  progressBar: {
    width: '80%',
    height: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
  },
  progressText: {
    fontSize: 14,
    color: '#1A3C34',
  },
  transactionContainer: {
    paddingHorizontal: 20,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0F2E9',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0F2E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A3C34',
  },
  transactionDate: {
    fontSize: 14,
    color: '#888',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#1A3C34',
    borderRadius: 25,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginVertical: 20,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
