import React, { useState, useEffect, useCallback } from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import Colors from '../consts/Colors';
import { useDispatch } from 'react-redux';
import { setFilters } from '../store/actions/meals';


const FilterSwitch = props => {
    return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch
                value={props.state}
                onValueChange={props.onChange}
                trackColor={{ true: Colors.primaryColor }}
                thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''} />
        </View>
    )
}

const FiltersScreen = props => {

    const [isGlutenFree, setIsGultenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);
    const { navigation } = props


    
    const dispatch = useDispatch();
    
    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian
        };

        dispatch(setFilters(appliedFilters))

    }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian])

    useEffect(() => {
        navigation.setParams({ save: saveFilters });

    }, [saveFilters])

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions </Text>
            <FilterSwitch
                label='Gluten-free'
                state={isGlutenFree}
                onChange={newValue => setIsGultenFree(newValue)} />
            <FilterSwitch
                label='Lactose-free'
                state={isLactoseFree}
                onChange={newValue => setIsLactoseFree(newValue)} />
            <FilterSwitch
                label='Vegan'
                state={isVegan}
                onChange={newValue => setIsVegan(newValue)} />
            <FilterSwitch
                label='Vegetarian'
                state={isVegetarian}
                onChange={newValue => setIsVegetarian(newValue)} />

        </View>)
}

FiltersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Meals Filter',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Menu'
                    iconName='ios-menu'
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }} />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Save'
                    iconName='ios-save'
                    onPress={navData.navigation.getParam('save')} />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    title:
    {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    },
    filterContainer:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: Platform.OS === 'ios' ? 15 : 0

    }
})

export default FiltersScreen;