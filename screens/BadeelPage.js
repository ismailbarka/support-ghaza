import React, { useContext } from 'react';
import { SafeAreaView, Text, View, ScrollView, StyleSheet, Platform } from 'react-native';
import { ProductsContext } from '../Context/ProductContext';

const COLORS = {
  primary: '#222831', // Dark Gray for headings
  secondary: '#393E46', // Medium Dark Gray for labels
  background: '#EEEEEE', // Light Gray for background
  cardBackground: '#EEEEEE', // Light Gray for card backgrounds
  textPrimary: '#222831', // Dark Gray for primary text
  textSecondary: '#687684', // Medium Dark Gray for secondary text
  border: '#00ADB5', // Vibrant Turquoise for borders
  shadow: '#00ADB5', // Vibrant Turquoise for subtle shadows
};



const FONT_SIZES = {
  heading: 22,
  subheading: 18,
  body: 16,
  label: 14,
};

const BadeelPage = () => {
  const { productData } = useContext(ProductsContext);

  const filteredData =
    productData.notSupportersData?.filter(
      (item) => productData.category === item.Category
    ) || [];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Product Information */}
        <Text style={styles.heading}>معلومات المنتج</Text>
        <View style={styles.productInfo}>
          <Text style={styles.text}>
            <Text style={styles.label}>الاسم بالعربية:</Text> {productData.arName}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>الاسم بالإنجليزية:</Text> {productData.enName}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>الشركة المصنعة:</Text> {productData.manufactur}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>الدليل:</Text> {productData.proof}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>الفئة:</Text> {productData.category}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>الحالة:</Text> داعم
          </Text>
        </View>

        {/* Alternative Products */}
        <Text style={styles.heading}>منتوجات بديلة</Text>
        {filteredData.length > 0 ? (
          <View style={styles.section}>
            {filteredData.map((item, index) => (
              <View key={index} style={styles.itemContainer}>
                <Text style={styles.itemText}>
                  <Text style={styles.label}>الاسم بالعربية:</Text> {item.Name}
                </Text>
                <Text style={styles.itemText}>
                  <Text style={styles.label}>الاسم بالإنجليزية:</Text> {item['English Name']}
                </Text>
                <Text style={styles.itemText}>
                  <Text style={styles.label}>الشركة المصنعة:</Text> {item.Manufacturer}
                </Text>
                <Text style={styles.itemText}>
                  <Text style={styles.label}>الفئة:</Text> {item.Category}
                </Text>
              </View>
            ))}
          </View>
        ): <Text>لا يوجد منتوجات بديلة في الوقت الراهن</Text>}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    padding: 16,
  },
  productInfo: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  section: {
    marginBottom: 24,
  },
  heading: {
    fontSize: FONT_SIZES.heading,
    fontWeight: 'bold',
    marginBottom: 12,
    color: "#141619",
    textAlign: 'right',
  },
  text: {
    fontSize: FONT_SIZES.body,
    marginBottom: 8,
    color: COLORS.textPrimary,
    textAlign: 'right',
  },
  label: {
    fontSize: FONT_SIZES.label,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  itemContainer: {
    marginBottom: 16,
    padding: 14,
    backgroundColor: "#E7ECF0",
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  itemTitle: {
    fontSize: FONT_SIZES.subheading,
    fontWeight: 'bold',
    marginBottom: 4,
    color: COLORS.primary,
    textAlign: 'right',
  },
  itemSubtitle: {
    fontSize: FONT_SIZES.body,
    marginBottom: 6,
    color: COLORS.textSecondary,
    textAlign: 'right',
  },
  itemText: {
    fontSize: FONT_SIZES.body,
    marginBottom: 4,
    color: COLORS.textPrimary,
    textAlign: 'right',
  },
  itemLabel: {
    fontWeight: '600',
    color: COLORS.secondary,
  },
});

export default BadeelPage;
