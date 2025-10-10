import {View, Text, Image} from 'react-native'
import React from 'react'
import {icons} from "@/constants/icons";
import {images} from "@/constants/images";

const Messages = () => {
    return (
        <View className="flex-1">
            <Image source={images.bg} className="absolute w-full h-full z-0" resizeMode="cover"></Image>
            <View className="flex justify-center items-center flex-1 flex-col gap-5">
                <Image source={icons.save}
                       className="size-10" tintColor="#Fff" />
                <Text className="text-gray-500 text-base">
                    Saved
                </Text>
            </View>
        </View>
    )
}
export default Messages
