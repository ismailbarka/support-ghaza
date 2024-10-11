import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper'; // Assuming Searchbar comes from react-native-paper
import deleteIcon from '../../assets/delete.png'; // Replace with your actual path
import search from '../../assets/search.png'; // Replace with your actual path
import logo from '../../assets/logo.png'; // Replace with your actual logo path

const NavBar = ({setSearchValue,searchValue}) => {


  return (
    <View style={styles.navBar}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.search}>
        <Searchbar
          placeholder="ابحث هنا"
          onChangeText={setSearchValue}
          value={searchValue}
          style={styles.searchBar}
          clearIcon={deleteIcon}
          icon={search}
        />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>...</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4682B4',
    paddingHorizontal: 15,
    elevation: 3,
  },
  logo: {
    width: 35,
    height: 35,
  },
  search: {
    flex: 1,
    marginHorizontal: 15,
  },
  searchBar: {
    height: 40,
    borderRadius: 20,
    borderColor: '#B0C4DE',
    borderWidth: 1,
    backgroundColor: '#FFFFFF', // White background for contrast
    paddingHorizontal: 10,
  },
  button: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFD700', // Gold color for button text
    fontWeight: '600',
  },
});

export default NavBar;
