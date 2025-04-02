import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function WalletScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* ส่วนหัว */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>บัญชีของฉัน</Text>
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
          <Text style={styles.progressText}>30%</Text>
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

      {/* กราฟ */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>รายรับทั้งหมด 5,000.00</Text>
        <LineChart
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
              {
                data: [20, 45, 28, 80, 99, 43],
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Content 1
                strokeWidth: 2,
              },
              {
                data: [-20, -10, 30, 50, 20, -10],
                color: (opacity = 1) => `rgba(255, 105, 180, ${opacity})`, // Content 2
                strokeWidth: 2,
              },
            ],
            legend: ['Content 1', 'Content 2'],
          }}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>

      {/* ปุ่มตัวเลือก */}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>สัปดาห์</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterButton, styles.activeFilter]}>
          <Text style={[styles.filterText, styles.activeFilterText]}>รายรับ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>รายจ่าย</Text>
        </TouchableOpacity>
      </View>

      {/* รายการธุรกรรม */}
      <View style={styles.transactionContainer}>
        {/* รายการที่ 1 */}
        <View style={styles.transactionItem}>
          <View style={styles.transactionIcon}>
            <Ionicons name="wallet-outline" size={24} color="#1A3C34" />
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTitle}>Total Income</Text>
            <Text style={styles.transactionDate}>18:27 - มีนาคม 30</Text>
          </View>
          <Text style={[styles.transactionAmount, { color: '#1A3C34' }]}>$4,000.00</Text>
        </View>

        {/* รายการที่ 2 */}
        <View style={styles.transactionItem}>
          <View style={styles.transactionIcon}>
            <Ionicons name="wallet-outline" size={24} color="#1A3C34" />
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTitle}>Total Income</Text>
            <Text style={styles.transactionDate}>17:00 - มีนาคม 24</Text>
          </View>
          <Text style={[styles.transactionAmount, { color: '#FF0000' }]}>-$100.00</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1A3C34',
    padding: 15,
  },
  header: {
    fontSize: 18,
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
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A3C34',
    marginBottom: 10,
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#E0F2E9',
  },
  activeFilter: {
    backgroundColor: '#1A3C34',
  },
  filterText: {
    fontSize: 16,
    color: '#1A3C34',
  },
  activeFilterText: {
    color: '#fff',
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
});