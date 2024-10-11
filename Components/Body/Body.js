import FuzzySet from 'fuzzyset.js';
import React, { useState } from 'react';
import { ScrollView, View, Text, Button, StyleSheet } from 'react-native';

const mySearchFilter = (data, searchValue) => {
  const lowercasedSearchValue = searchValue.toLowerCase();
  const filteredData = {};

  Object.keys(data).forEach(category => {
    filteredData[category] = data[category].filter(item => {
      const name = item.Name ? item.Name.toLowerCase() : '';
      const englishName = item['English Name'] ? item['English Name'].toLowerCase() : '';
      return name.includes(lowercasedSearchValue) || englishName.includes(lowercasedSearchValue);
    });
  });

  return filteredData;
};

const Body = ({
  supportersData,
  searchValue,
  selectedCategory,
  notSupportersData,
  maySupportersData,
  handleShowOtherProducts,
}) => {
  const [itemsToShow, setItemsToShow] = useState(10); // Pagination state

  const renderItem = (item, statusStyle, statusText, index) => (
    <View key={`${item.Name}-${index}`} style={styles.itemContainer}>
      <View style={styles.itemRow}>
        <Text style={styles.itemLabel}>الاسم بالعربية:</Text>
        <View style={styles.itemAnswerContainer}>
          <Text style={styles.itemAnswer}>{item.Name}</Text>
        </View>
      </View>
      <View style={styles.itemRow}>
        <Text style={styles.itemLabel}>الاسم بالإنجليزية:</Text>
        <View style={styles.itemAnswerContainer}>
          <Text style={styles.itemAnswer}>{item['English Name']}</Text>
        </View>
      </View>
      <View style={styles.itemRow}>
        <Text style={styles.itemLabel}>الشركة المصنعة:</Text>
        <View style={styles.itemAnswerContainer}>
          <Text style={styles.itemAnswer}>{item.Manufacturer}</Text>
        </View>
      </View>
      <View style={styles.itemRow}>
        <Text style={styles.itemLabel}>الحالة:</Text>
        <View style={[styles.itemStatusContainer, statusStyle]}>
          <Text style={styles.itemStatusText}>{statusText}</Text>
        </View>
      </View>
      {statusText === 'داعم' &&  <View style={styles.itemRow}>
        <Text style={styles.itemLabel}>الدليل:</Text>
        <View style={styles.itemAnswerContainer}>
          <Text style={styles.itemAnswer}>{item.Proof}</Text>
        </View>
      </View>}
      <View style={styles.itemRow}>
        <Text style={styles.itemLabel}>الفئة:</Text>
        <View style={styles.itemAnswerContainer}>
          <Text style={styles.itemAnswer}>{item.Category}</Text>
        </View>
      </View>
      {statusText === 'داعم' && (
        <Button onPress={() => handleShowOtherProducts(item)} title="عرض البدائل" />
      )}
    </View>
  );

  // Get supporters, not supporters, and may supporters based on the selected category
  const filteredSupporters = selectedCategory === 'الكل'
    ? Object.values(mySearchFilter(supportersData, searchValue)).flat()
    : mySearchFilter(supportersData, searchValue)[selectedCategory] || [];

  const filteredNotSupporters = selectedCategory === 'الكل'
    ? Object.values(mySearchFilter(notSupportersData, searchValue)).flat()
    : mySearchFilter(notSupportersData, searchValue)[selectedCategory] || [];

  const filteredMaySupporters = selectedCategory === 'الكل'
    ? Object.values(mySearchFilter(maySupportersData, searchValue)).flat()
    : mySearchFilter(maySupportersData, searchValue)[selectedCategory] || [];

  // Combine all filtered data
  const combinedData = [...filteredSupporters, ...filteredNotSupporters, ...filteredMaySupporters];

  // Paginate the data (show only `itemsToShow` items)
  const paginatedData = combinedData.slice(0, itemsToShow);

  return (
    <ScrollView style={styles.body}>
      {/* Render paginated items */}
      {paginatedData.map((item, index) => {
        const status = item.Proof ? 'داعم' : item.Category ? 'بديل' : 'قيد المراجعة';
        const statusStyle = status === 'داعم' ? styles.itemStatusSupport :
          status === 'بديل' ? styles.itemStatusAlternative : styles.itemStatusReview;
        return renderItem(item, statusStyle, status, index);
      })}

      {/* Load More Button */}
      {itemsToShow < combinedData.length && (
        <Button
          title="تحميل المزيد"
          onPress={() => setItemsToShow(prev => prev + 10)} // Load 10 more items
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 20,
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#B0C4DE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    alignItems: 'flex-end', // Align content to the right
  },
  itemRow: {
    flexDirection: 'row-reverse', // Reverse the row direction for RTL
    alignItems: 'center',
    marginBottom: 6,
  },
  itemLabel: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'right', // Align text to the right
  },
  itemAnswerContainer: {
    borderWidth: 1,
    borderColor: '#B0C4DE',
    borderRadius: 5,
    padding: 4,
    marginLeft: 5, // Adjust margin for RTL layout
    maxWidth: '70%',
  },
  itemAnswer: {
    fontSize: 14,
    color: 'black',
    textAlign: 'right', // Align text to the right
  },
  itemStatusContainer: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 4,
    marginLeft: 5, // Adjust margin for RTL layout
  },
  itemStatusText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  itemStatusSupport: {
    backgroundColor: 'red',
    borderColor: 'red',
  },
  itemStatusAlternative: {
    backgroundColor: 'green',
    borderColor: 'green',
  },
  itemStatusReview: {
    backgroundColor: '#FFA500',
    borderColor: '#FFA500',
  },
});

export default Body;
