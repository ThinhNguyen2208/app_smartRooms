import {
    Animated,
    Dimensions,
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native"
import React from 'react'
import Button from '../../components/Button'
import ScreenWrapper from '../../components/ScreenWrapper'

import COLORS from '../../constants/Colors'
import { useRouter } from "expo-router";

import RateComp from "../../components/RateComp"
import Icon from "react-native-vector-icons/MaterialIcons";
import hotels from '../../constants/hotels'

const { width } = Dimensions.get("screen");
const cardWidth = width / 1.8;

const Home = () => {
    const router = useRouter()

    const categories = ["Tất cả", "Quận 1", "Bình thạnh", "Gò vấp", "Quận 3"];
    const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
    const [activeCardIndex, setActiveCardIndex] = React.useState(0);
    const scrollX = React.useRef(new Animated.Value(0)).current;



    const CategoryList = ({ router }) => {
        return (
            <View style={style.categoryListContainer}>
                {categories.map((item, index
                ) => (
                    <TouchableOpacity key={index} activeOpacity={0.8} onPress={() => setSelectedCategoryIndex(index)}>
                        <View>
                            <Text
                                style={{
                                    ...style.categoryListText,
                                    color: selectedCategoryIndex == index ? COLORS.primary : COLORS.grey,
                                }}
                            >
                                {item}
                            </Text>
                            {selectedCategoryIndex == index && (
                                <View
                                    style={{
                                        height: 3,
                                        width: 30,
                                        backgroundColor: COLORS.primary,
                                        marginTop: 2,
                                    }}
                                />
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    const Card = ({ hotel, index }) => {
        const inputRange = [(index - 1) * cardWidth, index * cardWidth, (index + 1) * cardWidth];
        const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.7, 0, 0.7],
        });
        const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
        });

        return (
            <TouchableOpacity disabled={activeCardIndex != index} activeOpacity={1} onPress={() => router.push({
                pathname: './search',
                params: { data: JSON.stringify(hotel) } // Chuyển data qua JSON
            })}>
                <Animated.View style={{ ...style.card, transform: [{ scale }] }}>
                    <Animated.View style={{ ...style.cardOverLay, opacity }} />
                    {/* <View style={style.priceTag}>
                        <Text style={{ color: COLORS.white, fontSize: 20, fontWeight: "bold" }}>${hotel.price}</Text>
                    </View> */}
                    <Image source={hotel.image} style={style.cardImage} />
                    <View style={style.cardDetails}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View>
                                <Text style={{ fontWeight: "bold", fontSize: 17 }}>{hotel.name}</Text>
                                <Text style={{ color: COLORS.grey, fontSize: 12 }}>{hotel.location}</Text>
                            </View>
                            <Icon name="bookmark-border" size={26} color={COLORS.primary} />
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginTop: 10,
                            }}
                        >
                            <RateComp numStar={4} />
                        </View>
                    </View>
                </Animated.View>
            </TouchableOpacity>
        );
    };

    const TopHotelCard = ({ hotel }) => {
        return (
            <View style={style.topHotelCard}>
                <View
                    style={{
                        position: "absolute",
                        top: 5,
                        right: 5,
                        zIndex: 1,
                        flexDirection: "row",
                    }}
                >
                    <Icon name="star" size={15} color={COLORS.orange} />
                    <Text style={{ color: COLORS.white, fontWeight: "bold", fontSize: 15 }}>5.0</Text>
                </View>
                <Image style={style.topHotelCardImage} source={hotel.image} />
                <View style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
                    <Text style={{ fontSize: 10, fontWeight: "bold" }}>{hotel.name}</Text>
                    <Text style={{ fontSize: 7, fontWeight: "bold", color: COLORS.grey }}>{hotel.location}</Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar barStyle="light-content" translucent backgroundColor="rgba(0,0,0,0)" />
            <View style={style.header}>
                <View style={{ paddingBottom: 15 }}>
                    <Text style={{ fontSize: 30, fontWeight: "bold" }}>Tìm phòng của bạn ở</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text
                            style={{

                                fontSize: 30,
                                fontWeight: "bold",
                                color: COLORS.primary,
                            }}
                        >
                            Thành phố Hồ Chí Minh
                        </Text>
                    </View>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity onPress={() => router.push("./search")}>
                    <View style={style.searchInputContainer}>
                        <Icon name="search" size={30} style={{ marginLeft: 20 }} />
                        <TextInput
                            placeholder="Tìm kiếm phòng"
                            style={{
                                fontSize: 20,
                                paddingLeft: 10,
                                width: "100%",
                            }}
                            editable={false}
                        />
                    </View>
                </TouchableOpacity>

                <CategoryList
                    router={router}
                />

                <View>
                    <Animated.FlatList
                        onMomentumScrollEnd={(e) => {
                            setActiveCardIndex(Math.round(e.nativeEvent.contentOffset.x / cardWidth));
                        }}
                        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
                        horizontal
                        data={hotels}
                        contentContainerStyle={{
                            paddingVertical: 30,
                            paddingLeft: 20,
                            paddingRight: cardWidth / 2 - 40,
                        }}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => <Card hotel={item} index={index} />}
                        snapToInterval={cardWidth}
                    />
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginHorizontal: 20,
                    }}
                >
                    <Text style={{ fontWeight: "bold", color: COLORS.grey }}>Phòng mới nhất</Text>
                    <TouchableOpacity onPress={() => router.push("./search")}>
                        <Text style={{ color: COLORS.grey }}>Xem tất cả</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={hotels}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingLeft: 20,
                        marginTop: 20,
                        paddingBottom: 30,
                    }}
                    renderItem={({ item }) => <TopHotelCard hotel={item} />}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home
const style = StyleSheet.create({
    header: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },

    searchInputContainer: {
        height: 50,
        backgroundColor: COLORS.light,
        marginTop: 15,
        marginLeft: 20,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        flexDirection: "row",
        alignItems: "center",
        overflow: "hidden",
    },

    categoryListContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
        marginTop: 30,
    },
    categoryListText: {
        fontSize: 17,
        fontWeight: "bold",
    },
    card: {
        height: 280,
        width: cardWidth,
        elevation: 15,
        marginRight: 20,
        borderRadius: 15,
        backgroundColor: COLORS.white,
    },
    cardImage: {
        height: 200,
        width: "100%",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    priceTag: {
        height: 60,
        width: 80,
        backgroundColor: COLORS.primary,
        position: "absolute",
        zIndex: 1,
        right: 0,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    cardDetails: {
        height: 100,
        borderRadius: 15,
        backgroundColor: COLORS.white,
        position: "absolute",
        bottom: 0,
        padding: 20,
        width: "100%",
    },
    cardOverLay: {
        height: 280,
        backgroundColor: COLORS.white,
        position: "absolute",
        zIndex: 100,
        width: cardWidth,
        borderRadius: 15,
    },
    topHotelCard: {
        height: 120,
        width: 120,
        backgroundColor: COLORS.white,
        elevation: 15,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    topHotelCardImage: {
        height: 80,
        width: "100%",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
});



