import React from 'react';
import { View, ScrollView, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

// Importing category images
import all from '../../assets/Categories/all.png';
import fastFood from '../../assets/Categories/fast-food.png';
import restaurant from '../../assets/Categories/restaurant.png';
import gingerbreadHouse from '../../assets/Categories/gingerbread-house.png';
import cleaning from '../../assets/Categories/cleaning.png';
import computer from '../../assets/Categories/computer.png';
import cars from '../../assets/Categories/cars.png';
import clothes from '../../assets/Categories/clothes.png';
import kid from '../../assets/Categories/kid.png';
import pets from '../../assets/Categories/pets.png';
import medicalKit from '../../assets/Categories/medical-kit.png';

const categoriesNamesAr = [
  { name: 'الكل', image: all },
  { name: 'طعام', image: fastFood },
  { name: 'مطاعم', image: restaurant },
  { name: 'منزل', image: gingerbreadHouse },
  { name: 'جمال', image: cleaning },
  { name: 'إلكترونيات', image: computer },
  { name: 'سيارات', image: cars },
  { name: 'ملابس', image: clothes },
  { name: 'أطفال', image: kid },
  { name: 'حيوانات', image: pets },
  { name: 'صحة', image: medicalKit },
];

const Categories = ({ setSelectedCategory, selectedCategory }) => {
  return (
    <View>
      <ScrollView
        horizontal={true}
        style={styles.categories}
        showsHorizontalScrollIndicator={false}
      >
        {categoriesNamesAr.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={
              selectedCategory === item.name
                ? styles.catBtnSelected
                : styles.catBtnNotSelected
            }
            onPress={() => setSelectedCategory(item.name)}
          >
            <Image style={styles.images} source={item.image} />
            <Text
              style={
                selectedCategory === item.name
                  ? styles.selectedText
                  : styles.notSelectedText
              }
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  categories: {
    height: 80,

  },
  catBtnSelected: {
    borderWidth: 1,
    borderColor: '#4682B4',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 5,
    padding: 10,
    height: 70,
    borderRadius: 20,
    backgroundColor: '#B0E0E6',
    minWidth: 90,
  },
  catBtnNotSelected: {
    borderWidth: 1,
    borderColor: '#B0C4DE',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 5,
    padding: 10,
    height: 70,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    minWidth: 90,
  },
  images: {
    width: 35,
    height: 35,
  },
  selectedText: {
    color: '#4682B4',
    fontWeight: '600',
  },
  notSelectedText: {
    color: '#696969',
    fontWeight: '500',
  },
});

export default Categories;
