import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Calendar } from 'react-native-calendars';

type CalendarDay = {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

// Define the Transaction interface
interface Transaction {
  type: string;
  amount: number;
  time: string;
  category: string;
  date: string;
}

// Define the Transactions type with an index signature
interface Transactions {
  [key: string]: Transaction[];
}

export default function CalculatorScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string>('2023-04-08');
  const [selectedTab, setSelectedTab] = useState<'income' | 'expense'>('expense');

  // Sample transactions data
  const transactions: Transactions = {
    '2023-04-08': [
      { type: 'expense', amount: -12.13, time: '9:30', category: 'ค่าอาหาร', date: 'April 08' },
    ],
    '2023-04-15': [
      { type: 'expense', amount: -15.40, time: '12:30', category: 'Outcome', date: 'April 15' },
    ],
    '2023-04-24': [
      { type: 'expense', amount: -18.35, time: '15:00', category: 'รายจ่าย', date: 'April 24' },
    ],
    '2023-04-30': [
      { type: 'income', amount: 1000, time: '18:27', category: 'รายรับ', date: 'April 30' },
    ],
  };

  // Filter transactions based on selected tab and date
  const filteredTransactions = Object.keys(transactions)
    .filter((date) => date === selectedDate)
    .flatMap((date) => transactions[date])
    .filter((transaction) => transaction.type === selectedTab);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.header}>สถิติ & รายงาน</Text>
        <TouchableOpacity style={styles.notificationIcon}>
          <Ionicons name="notifications-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Calendar */}
      <View style={styles.calendarContainer}>
        <Calendar
          current={'2023-04-01'}
          onDayPress={(day: { dateString: string }) => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: '#1A3C34' },
          }}
          theme={{
            calendarBackground: '#fff',
            textSectionTitleColor: '#000',
            selectedDayBackgroundColor: '#1A3C34',
            selectedDayTextColor: '#fff',
            todayTextColor: '#1A3C34',
            dayTextColor: '#000',
            textDisabledColor: '#d9e1e8',
            arrowColor: '#1A3C34',
          }}
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'income' && styles.activeTab]}
          onPress={() => setSelectedTab('income')}
        >
          <Text style={[styles.tabText, selectedTab === 'income' && styles.activeTabText]}>
            รายรับ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'expense' && styles.activeTab]}
          onPress={() => setSelectedTab('expense')}
        >
          <Text style={[styles.tabText, selectedTab === 'expense' && styles.activeTabText]}>
            รายจ่าย
          </Text>
        </TouchableOpacity>
      </View>

      {/* Transaction List */}
      <ScrollView style={styles.transactionContainer}>
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction, index) => (
            <View key={index} style={styles.transactionItem}>
              <View style={styles.transactionIcon}>
                <Ionicons
                  name={transaction.type === 'income' ? 'wallet-outline' : 'fast-food-outline'}
                  size={24}
                  color="#1A3C34"
                />
              </View>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionTitle}>{transaction.category}</Text>
                <Text style={styles.transactionDate}>
                  {transaction.time} - {transaction.date}
                </Text>
              </View>
              <Text
                style={[
                  styles.transactionAmount,
                  transaction.type === 'expense' && styles.expenseAmount,
                ]}
              >
                {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>ไม่มีข้อมูลสำหรับวันที่เลือก</Text>
        )}
      </ScrollView>

      {/* Add Transaction Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/add-transaction')}
      >
        <Text style={styles.addButtonText}>เพิ่มรายการ</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
    padding: 5,
  },
  calendarContainer: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 2,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: '#1A3C34',
  },
  tabText: {
    fontSize: 16,
    color: '#000',
  },
  activeTabText: {
    color: '#fff',
  },
  transactionContainer: {
    flex: 1,
    margin: 10,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 1,
    marginBottom: 10,
  },
  transactionIcon: {
    marginRight: 10,
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
    color: '#666',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  expenseAmount: {
    color: '#FF0000',
  },
  noDataText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
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