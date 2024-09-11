
import axiosClient from "../api/axiosClient";
const MAP_4D_KEY = "539c018f619308e74628dab1644e890d"

export async function getAddressFromLocation(location: { latitude: string; longitude: string; }) {

    const locationStr = location.latitude + ',' + location.longitude;
    const url = `https://api.map4d.vn/sdk/v2/geocode?key=${MAP_4D_KEY}&location=${locationStr}`;
    const result = await axiosClient.get(url);
    console.log(result)
    if (result.code === 'ok') {
        let address = result.result[0].address;
        if (!address.includes('Việt Nam')) {
            address += ', Việt Nam';
        }
        return address;
    } else {
        return null;
    }
}

export const getAddressFromText = async (text: any) => {
    console.log(123);
    const url = `http://api.map4d.vn/sdk/autosuggest?key=${MAP_4D_KEY}&text=${text}`;
    const result = await axiosClient.get(url);
    if (result.code === 'ok') {
        let listAdress = result.result.slice(0, 5); //only show 5 address
        return listAdress;
    } else {
        return null;
    }
};

export async function calcDistance2Location(location1: any, location2: any) {
    const url = `http://api.map4d.vn/sdk/route/matrix?key=${MAP_4D_KEY}&origins=${location1}&destinations=${location2}&mode=motorcycle&language=vi&weighting=2`;
    const result = await axiosClient.get(url);
    console.log(result);
    if (result.code === 'ok') {
        return result;
    } else return null;
}