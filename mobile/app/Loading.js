import {ActivityIndicator, Text, View} from "react-native";

const Loading = ({text}) => {
    return (
        <View style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
        }}>
            <Text style={{fontSize: 20}}>{text}</Text>
            <ActivityIndicator color={"#0b209e"}/>
        </View>
    );
}

export default Loading;