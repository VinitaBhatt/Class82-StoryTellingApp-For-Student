import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView,Platform,StatusBar,FlatList,Image } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import StoryCard from './StoryCard';

var stories = require("../temp_stories.json");

var customFont = {
    "Bubblegum-Sans" : require("../assets/fonts/BubbleGumSans-Regular.ttf")
}

export default class Feed extends Component {
    constructor(props){
        super(props);
        this.state = {
            fontsLoaded : false
        }
    }

    componentDidMount(){
        this._loadFontAsync();
    }

     _loadFontAsync = async () =>{
        await Font.loadAsync(customFont);
        this.setState({fontsLoaded:true})
    }

    keyExtractor=(item,index)=>{
        index.toString();
    }

    renderItem=({item:story})=>{
        return <StoryCard  story={story}/>
    }
    render() {
        if(!this.state.fontsLoaded){
            return(
                <AppLoading/>
            )
        }else{
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea}/>
                <View style={styles.appTitle}>
                    <View style={styles.appIcon}>
                        <Image source={require("../assets/logo.png")}
                         style={{width:60,height:60, resizeMode:"contain", marginLeft:10}}>

                        </Image>
                    </View >

                    <View style={styles.appTitleTextContainer}>
                        <Text style={styles.appTitleText}>
                            StoryTelling App
                        </Text>
                    </View>
                </View>
                <View style={styles.cardConatiner}>
                    <FlatList
                        keyExtractor ={this.keyExtractor}
                        data = {stories}
                        renderItem ={this.renderItem}
                    />
                </View>
            </View>
        )
            }
    }
}

const styles = StyleSheet.create({
    container :{
            flex: 1,
            backgroundColor:"#15193c"
        },
    droidSafeArea:{
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    appTitle:{
        flex:0.07,
        flexDirection:"row",
        flexWrap : "wrap",
        padding:5
    },
    appIcon:{
        flex:0.3
    },
    appTitleTextContainer:{
        justifyContent:"center",
        alignItems:"center"
    },
    appTitleText:{
        color:"white",
        fontSize:28,
        fontFamily:"Bubblegum-Sans",
        paddingLeft:20
    },
    cardConatiner:{
        flex:0.85
    }
    
})