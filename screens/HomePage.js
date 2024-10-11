import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import axios from 'axios';
import Papa from 'papaparse';
import { ProductsContext } from '../Context/ProductContext';
import NavBar from '../Components/NavBar/NavBar';
import Categories from '../Components/Categories/Categories';
import Body from '../Components/Body/Body';
import { categoriesContainers, supportersDataURL, notSupportersDataURL } from '../data';

// Function to parse CSV data
const parseCSV = (data) => {
  return new Promise((resolve, reject) => {
    Papa.parse(data, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        resolve(results.data);
      },
      error: function (error) {
        reject(error);
      },
    });
  });
};

const HomePage = ({ navigation }) => {
  const [searchValue, setSearchValue] = useState('');
  const [supportersData, SetsupportersData] = useState({});
  const [notSupportersData, SetNotsupportersData] = useState({});
  const [maySupportersData, SetMaysupportersData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [isLoading, setIsLoading] = useState(true);
  const { updateData, updateNotSupportersData } = useContext(ProductsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Log to ensure fetching starts
        console.log("Fetching supporters data...");

        // Fetch supportersData
        const supportersRes = await axios.get(supportersDataURL);
        const supportersRawData = await parseCSV(supportersRes.data);

        const supportersProcessedData = {};
        supportersRawData.forEach((item) => {
          const tmpCat = item.Category;
          categoriesContainers.forEach((category) => {
            if (category.titles.includes(tmpCat)) {
              const parentCat = category.name;
              if (!supportersProcessedData[parentCat]) {
                supportersProcessedData[parentCat] = [];
              }
              supportersProcessedData[parentCat].push(item);
            }
          });
        });
        SetsupportersData(supportersProcessedData);
        console.log("Supporters data fetched successfully!");

        // Fetch notSupportersData
        console.log("Fetching notSupporters data...");
        const notSupportersRes = await axios.get(notSupportersDataURL);
        const notSupportersRawData = await parseCSV(notSupportersRes.data);

        const notSupportersProcessedData = {};
        notSupportersRawData.forEach((item) => {
          const tmpCat = item.Category;
          categoriesContainers.forEach((category) => {
            if (category.titles.includes(tmpCat)) {
              const parentCat = category.name;
              if (!notSupportersProcessedData[parentCat]) {
                notSupportersProcessedData[parentCat] = [];
              }
              notSupportersProcessedData[parentCat].push(item);
            }
          });
        });
        SetNotsupportersData(notSupportersProcessedData);
        console.log("NotSupporters data fetched successfully!");
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        // Ensure the loading state is updated
        setIsLoading(false);
      }
    };

    fetchData(); // Trigger data fetching
  }, []);

  const handleShowOtherProducts = (item) => {
    let filteredSupportersData = [];

    if (selectedCategory === 'الكل') {
      filteredSupportersData = Object.values(notSupportersData).flat();
    } else {
      filteredSupportersData = notSupportersData[selectedCategory] || [];
    }

    updateData({
      arName: item.Name,
      enName: item['English Name'],
      manufactur: item.Manufacturer,
      proof: item.Proof,
      category: item.Category,
    });
    updateNotSupportersData(filteredSupportersData);
    navigation.navigate('badeel');
  };

  return (
    <View style={styles.container}>
      <NavBar setSearchValue={setSearchValue} searchValue={searchValue} />
      <Categories
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      {!isLoading ? (
        <Body
          supportersData={supportersData}
          searchValue={searchValue}
          selectedCategory={selectedCategory}
          notSupportersData={notSupportersData}
          maySupportersData={maySupportersData}
          handleShowOtherProducts={handleShowOtherProducts}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
  },
});

export default HomePage;