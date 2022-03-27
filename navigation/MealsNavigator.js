import React from 'react';
import { Platform , Text} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import Colors from '../consts/Colors';
import FavoritesScreen from '../screens/FavoritesScreen';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from 'react-navigation-drawer';
import FiltersScreen from '../screens/FiltersScreen'

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTitleStyle : {
        fontFamily:'open-sans-bold'
    },
    headerBackTitleStyle : {
        fontFamily:'open-sans'
    },
    headerTintColor: Platform.OS === 'ios' ? Colors.primaryColor : 'white',
    headerTitle: 'A Screen'
}
const MealsNavigator = createStackNavigator({
    Categories: {
        screen: CategoriesScreen,
    },
    CategoryMeals: {
        screen: CategoryMealsScreen
    },
    MealDetail: MealDetailScreen
}, {
    defaultNavigationOptions: defaultStackNavOptions
}

);
const FavNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
}, {
    defaultNavigationOptions: defaultStackNavOptions
})
const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons
                    name='ios-restaurant'
                    size={25}
                    color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.primaryColor,
            tabBarLabel:Platform.OS === 'android' ? <Text style={{fontFamily:'open-sans-bold'}}>Meals</Text> : 'Meals'
        }
    },
    Favourites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons
                    name='ios-star-sharp'
                    size={25}
                    color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.accentColor,
            tabBarLabel:Platform.OS === 'android' ? <Text style={{fontFamily:'open-sans-bold'}}>Favorites</Text> : 'Favorites'
        }
    }
}

const MealsFavTabNavigator =
    Platform.OS === 'android' ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: 'white',
        shifting: true,
        barStyle: {
            backgroundColor: Colors.primaryColor
        }
    }) :
        createBottomTabNavigator(tabScreenConfig,
            {
                tabBarOptions: {
                  labelStyle: {
                    fontFamily:'open-sans'
                  },
                    activeTintColor: Colors.accentColor
                }
            }
        )

const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen
},{
    defaultNavigationOptions: defaultStackNavOptions
})

const MainNavigator = createDrawerNavigator({
    MealsFav: {screen : MealsFavTabNavigator,
    navigationOptions:{
        drawerLabel:'Meals'
    } },
    Filters: FiltersNavigator
},{
    contentOptions : {
        activeTintColor:Colors.accentColor,
        labelStyle:{
            fontFamily : 'open-sans-bold'
        }
    }
})

export default createAppContainer(MainNavigator);