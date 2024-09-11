import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as Location from "expo-location";
import {
    GooglePlacesAutocomplete,
    GooglePlaceDetail,
} from "react-native-google-places-autocomplete";


import { colors, generalStyle } from "../../../contains";
import Geocoder from "react-native-geocoding";
import { useDebounce } from "../../../hooks";


import axiosClient from "../../../api/axiosClient";
import { getAddressFromLocation, getAddressFromText } from "../../../utils/map";

// {
//   address: '',
//   coordinates: { latitude: '12.342345',longitude: '-0.045345' }
// }

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.02;

const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let INITIAL_POSITION = {
    latitude: 10.824371876108833,
    longitude: 106.69208107191297,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
};

const SearchLocation = ({ route }) => {
    const navigation = useNavigation();

    const [txtSearch, setTxtSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    const debouncedValue = useDebounce(txtSearch, 500);

    const [addressCustomer, setAddressCustomer] = useState({
        address: "",
        coordinates: {
            latitude: 0,
            longitude: 0,
        },
    });

    useEffect(() => {
        //console.log(txtSearch);
        const getAddress = async () => {
            let listAddress = await getAddressFromText(txtSearch);
            if (listAddress === null) setSearchResult([]);
            else setSearchResult([...listAddress]);
        };
        getAddress();
    }, [debouncedValue]);

    const handleChangeTxt = (value) => {
        setTxtSearch(value);
    };

    const handleChosseResultSerch = (result) => {
        setAddressCustomer({
            address: result.address,
            coordinates: {
                latitude: result.location.lat,
                longitude: result.location.lng,
            },
        });
        navigation.navigate("NewOrder", {
            currentLocation: {
                address: result.address,

                coordinates: {
                    latitude: result.location.lat,
                    longitude: result.location.lng,
                },
            },
            loaiKhoa: route.params.loaiKhoa,
        });
    };

    const getLocationUserNow = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("Permission to access location was denied");
                return null;
            }
            let location = await Location.getCurrentPositionAsync({});
            const coordinate = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            };
            const address = await getAddressFromLocation(coordinate);
            navigation.navigate("NewOrder", {
                currentLocation: {
                    address: address,

                    coordinates: {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    },
                },
                loaiKhoa: route.params.loaiKhoa,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleChooseCurrentLocation = () => {
        getLocationUserNow();
    };
    return (
        <View style={generalStyle.wrapper}>
            <View style={stylesSearchLocation.header}>
                <Ionicons
                    name="close"
                    size={30}
                    color="#000"
                    style={stylesSearchLocation.icon}
                    onPress={() => navigation.goBack()}
                />
                <Text style={stylesSearchLocation.txtHeader}>Bạn đang ở đâu?</Text>
            </View>
            <View style={stylesSearchLocation.contain}>
                <View style={stylesSearchLocation.options}>
                    <TouchableOpacity
                        style={[
                            stylesSearchLocation.btn,
                            stylesSearchLocation.btn.btnRadius,
                        ]}
                        onPress={() => {
                            navigation.navigate("SelectLocationOnMap");
                        }}
                    >
                        <FontAwesome5
                            name="map-marked"
                            size={20}
                            color="green"
                            style={[stylesSearchLocation.icon.iconEx]}
                        />
                        <Text style={colors.textColor}>Chọn bằng bản đồ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            stylesSearchLocation.btn,
                            stylesSearchLocation.btn.btnRadius,
                        ]}
                        onPress={handleChooseCurrentLocation}
                    >
                        <MaterialIcons
                            name="my-location"
                            size={20}
                            color={colors.primaryColor}
                            style={stylesSearchLocation.icon.iconEx}
                        />
                        <Text style={colors.textColor}>Vị trí hiện tại của bạn</Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    style={stylesSearchLocation.txtSearch}
                    placeholder="Nhập địa chỉ của bạn"
                    value={txtSearch}
                    onChangeText={(text) => handleChangeTxt(text)}
                />
                {searchResult.length > 0 && (
                    <View style={stylesSearchLocation.resultSearch}>
                        {searchResult.map((result) => {
                            return (
                                <TouchableOpacity
                                    key={result.id}
                                    style={stylesSearchLocation.itemResult}
                                    onPress={() => handleChosseResultSerch(result)}
                                >
                                    <Text>{result.address}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                )}
            </View>
        </View>
    );
    //
    // const mapRef = useRef(null);
    // const ref = useRef()
    // const [origin, setOrigin] = useState(route.params.origin);
    // const [addressCustomer, setAddressCustomer] = useState('');

    // const edgePaddingValue = 70;

    // const moveTo = async position => {
    //   const camera = await mapRef.current?.getCamera();
    //   if (camera) {
    //     camera.center = position;
    //     mapRef.current?.animateCamera(camera, {duration: 1000});
    //   }
    // };

    // useEffect(() => {
    //   if(route.params.place){
    //     ref.current.setAddressText(route.params.place)

    //   }
    //   //console.log(1);
    // },[])
    // const handleSelected = (details = GooglePlaceDetail, data) => {
    //   const position = {
    //     latitude: details?.geometry.location.lat || 0,
    //     longitude: details?.geometry.location.lng || 0,
    //   };
    //   setOrigin(position);
    //   moveTo(position);
    //   setAddressCustomer(data.description);
    // };

    // return (
    //   <View style={stylesSearchLocation.container}>
    //     <MapView
    //       ref={mapRef}
    //       style={stylesSearchLocation.map}
    //       provider={PROVIDER_GOOGLE}
    //       initialRegion={INITIAL_POSITION}>
    //       {origin && <Marker coordinate={origin} />}
    //     </MapView>

    //     <View style={stylesSearchLocation.header}>
    //       <Feather
    //         name="arrow-left"
    //         size={35}
    //         color="#000"
    //         style={stylesSearchLocation.btnBack}
    //         onPress={() => navigation.goBack()}
    //       />
    //       <View style={[stylesSearchLocation.searchContainer]}>
    //         <GooglePlacesAutocomplete
    //           ref={ref}
    //           styles={{textInput: stylesSearchLocation.txtSearch}}
    //           placeholder="Nhập địa chỉ của bạn"
    //           enablePoweredByContainer={false}
    //           fetchDetails
    //           onPress={(data, details = null) => {
    //             handleSelected(details, data);
    //           }}
    //           setAddressText={() => set}
    //           query={{
    //             key: 'AIzaSyDQBK0WUEi9UVhdv8wO8tz0_nVEQj-naqY',
    //             language: 'vn',
    //             components: 'country:vn',
    //           }}
    //         />
    //       </View>
    //     </View>
    //     <TouchableOpacity
    //       style={stylesSearchLocation.btnContinue}
    //       onPress={() =>
    //         navigation.navigate('NewOrder', {
    //           addressCustomer,
    //           origin,
    //         })
    //       }>
    //       <Feather name="arrow-right" size={35} color="#000" />
    //     </TouchableOpacity>
    //   </View>
    //);
};

export default SearchLocation;
const stylesSearchLocation = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    icon: {
        paddingHorizontal: 4,
        iconEx: {
            marginRight: 8
        }
    },
    txtHeader: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.textColor
    },
    contain: {
        flex: 1,
        marginTop: 20,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

    txtSearch: {
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8
    },

    options: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    btn: {
        paddingHorizontal: 10,
        height: 40,
        borderWidth: 1,
        borderColor: colors.borderColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        btnRadius: {
            borderRadius: 20
        }
    },
    resultSearch: {
        marginTop: 5,
        borderRadius: 10,
        width: '100%',
        minHeight: 50,
        borderWidth: 1,
        padding: 10
    },

    itemResult: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    }
    // btnBack: {
    //   position: 'absolute',
    //   top: 5,
    //   marginRight: 10,
    // },
    // buttonText: {
    //   textAlign: 'center',
    // },
    // btnContinue: {
    //   width: 75,
    //   height: 75,
    //   backgroundColor: colors.primaryColor,
    //   position: 'absolute',
    //   bottom: 10,
    //   right: 10,
    //   borderRadius: 100,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    // },
});