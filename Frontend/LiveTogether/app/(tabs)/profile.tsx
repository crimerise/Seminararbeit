import {View, Text, Image, FlatList, ActivityIndicator, StyleSheet} from 'react-native'
import {images} from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import {useRouter} from "expo-router";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import {icons} from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import {useEffect, useState} from "react";
import {text} from "node:stream/consumers";
import {updateSearchCount} from "@/services/appwrite";
import MapView from "react-native-maps";


const profile = () => {

    const [searchQuery, setSearchQuery] = useState('');


    const {
        data: movies,
        loading,
        error,
        refetch: loadMovies,
        reset,

        }=useFetch(() => fetchMovies({
            query: searchQuery,
        }), false)

    useEffect(() => {
        const timeoutId = setTimeout( async () => {
            if (searchQuery.trim()) {
                await loadMovies();
            }else {
                reset()
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    useEffect(() =>{
        if(movies?.length > 0 && movies?.[0])
             updateSearchCount(searchQuery, movies[0]);
    },[movies]);

    return (
        <View className="flex-1 bg-primary">
            <Image
                source={images.bg}
                className="absolute w-full h-full z-0"
                resizeMode="cover"
            />

            <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                className="px-5"
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: 'center',
                    gap: 16,
                    marginVertical: 16,
                }}
                contentContainerStyle={{ paddingBottom: 100 }}
                ListHeaderComponent={
                    <>
                        <View className="w-full flex-row justify-center mt-20 items-center">
                            <Image source={icons.logo} className="w-12 h-10" />
                        </View>

                        <View className="my-5">
                            <SearchBar
                                placeholder="Wandern..."
                                value={searchQuery}
                                onChangeText={(text: string) => setSearchQuery(text)}
                            />
                        </View>


                        <Text className="text-xl text-white font-bold">
                            Suche Aktivitäten auf der Karte
                            <Text className="text-accent">{searchQuery}</Text>
                        </Text>


                    </>
                }
            />
        </View>
    ); // <- diese schließende Klammer hat gefehlt
};


export default profile;

