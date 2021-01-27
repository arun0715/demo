import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { vh, vw, normalize } from './utils/Dimensions'
import Images from './utils/images'
import { Container, Header, Tab, Tabs, TabHeading, Icon, } from 'native-base';
import Tab1 from './watched';
import Tab2 from './watched';
export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: ["Unmatched", "Watched"],
            checked: 0
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <View style={{ marginTop: vh(50), paddingHorizontal: vw(20) }}>
                    <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ width: "70%", justifyContent: "center" }}>
                            <TextInput
                                placeholder="Search MovieDB"
                                style={[styles.textField, { paddingLeft: vw(35) }]}
                            />
                            <Image source={Images.search} style={{ position: "absolute", marginLeft: vw(12) }} />
                        </View>
                        <TouchableOpacity style={styles.plusButton}>
                            <Text style={{ fontSize: normalize(25), color: "white", fontWeight: "bold" }}>
                                +
                    </Text>
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        placeholder="Search My Movies"
                        style={{ height: vh(40), marginTop: vh(20), borderColor: "grey", paddingLeft: vw(10), borderWidth: vh(1), borderRadius: normalize(5) }}
                    >
                    </TextInput>
                    <View style={{ flexDirection: "row", width: vw(150), justifyContent: "space-between" }}>


                        <Container style={{ width: "100%" }}>
                            <Header hasTabs />
                            <Tabs>
                                <Tab heading={<TabHeading><Text style={{ backgroundColor: 'red' }}>Camera</Text></TabHeading>}>
                                    <Tab1 />
                                </Tab>
                                <Tab heading={<TabHeading><Text style={{ backgroundColor: 'red' }}>No Icon</Text></TabHeading>}>
                                    <Tab2 />
                                </Tab>

                            </Tabs>
                        </Container>

                        {
                            this.state.data.map((data, key) => {
                                return (
                                    <View style={{ flexDirection: "row" }}>

















                                        {/* {this.state.checked == key ?
                                            <View style={{ borderRadius: normalize(5), backgroundColor: "red", justifyContent: "center", alignItems: "center" }}>
                                                <Image source={Images.offEye} />
                                                <Text style={{ fontSize: normalize(12), fontWeight: "600" }}>
                                                    {data}
                                                </Text>
                                                <View
                                                    style={{ width: "100%", height: vh(140), backgroundColor: "yellow" }}
                                                />
                                            </View>
                                            :
                                            <TouchableOpacity
                                                style={{ borderRadius: normalize(5), backgroundColor: "#AFABAB", justifyContent: "center", alignItems: "center" }}
                                                onPress={() => { this.setState({ checked: key, currentSelected: data }) }}>
                                                <Image source={Images.offEye} />
                                                <Text style={{ fontSize: normalize(12), fontWeight: "600" }}>
                                                    {data}
                                                </Text>
                                                <View
                                                    style={{ width: "100%", height: vh(140), backgroundColor: "blue" }}
                                                />
                                            </TouchableOpacity>
                                        } */}
                                    </View>
                                );
                            })
                        }

                        {/* <View style={{alignItems:"center"}}>
                    <Image source={Images.offEye}/>
                    <Text>
                        Unmatched
                    </Text>
                </View>
                <View style={{alignItems:"center"}}>
                    <Image source={Images.offEye}/>
                    <Text>
                        Watched
                    </Text>
                </View> */}
                    </View>

                    {/* <Text>
                    hdjksbd
                </Text> */}
                </View>
                {/* <View
                style={{width:"100%",height:vh(40),backgroundColor:"yellow"}}
                /> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textField: {
        borderColor: "grey",
        borderWidth: normalize(1),
        paddingLeft: vw(10),
        borderRadius: normalize(5),
        // width:"70%",
        height: vh(40)
    },
    plusButton: {
        height: vh(40),
        width: vw(80),
        backgroundColor: "blue",
        justifyContent: "center",
        alignItems: "center"
    }

})