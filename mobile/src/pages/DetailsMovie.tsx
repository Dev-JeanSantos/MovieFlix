import React, { useEffect, useState } from "react";
import { Text, View, Image, ActivityIndicator } from "react-native";
import { theme, text, detailsMovie } from "../styles";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { getMoviesById, saveAvaliation } from "../services";
import Toast from 'react-native-tiny-toast';

import star from "../assets/star.png";

const DetailsMovie = ({ route: { params: { id }, }, }) => {

    const navigation = useNavigation();
    const [userFetchData, setUserFetchData] = useState({});
    const [loading, setLoading] = useState(false);

    const [movie, setMovie] = useState({
        id: 0,
        title: null,
        subTitle: null,
        year: null,
        imgUrl: null,
        synopsis: null,
        reviews: [
            {
                text: null,
                userName: null,
            }
        ],

    });

    const [userAvaliation, setUserAvaliation] = useState({
        movieId: 0,
        text: ''
    });

    async function loadMovieData() {
        //setLoading(true);
        const res = await getMoviesById(id);
        setMovie(res.data);
        setLoading(false);

    }
    async function handlerAvaliation(moveId: number) {

        console.warn(userAvaliation);

        // try {
        //     setLoading(true),
        //         await saveAvaliation(userAvaliation),
        //         Toast.showSuccess('Obrigado pelo seu Comentário!');
        //         navigation.navigate('DetailsMovie');
        // } catch (res) {
        //         Toast.show('Erro ao enviar seu comentário! Tente novamente.');
        // }
        // setLoading(false);
    }

    useEffect(() => {
        loadMovieData();
    })
    return (
        <View style={theme.container}>
            <View style={theme.card}>
                <ScrollView>
                    {
                        loading ? <ActivityIndicator size="large" color="#00ff00" /> :
                            <View style={detailsMovie.contentMovie}>
                                <Text style={text.titleDetails}>{movie.title}</Text>
                                <Image source={{ uri: movie.imgUrl }} style={detailsMovie.image} />
                                <Text style={text.yearDetails}>{movie.year}</Text>
                                <Text style={text.descriptionDetails}>{movie.subTitle}</Text>
                                <Text style={text.titleSinopseDetails}>Sinopse</Text>
                                <ScrollView style={detailsMovie.sinopse}>
                                    <Text style={text.sinopse}>
                                        {movie.synopsis}
                                    </Text>
                                </ScrollView>
                            </View>
                    }
                    <View style={detailsMovie.contentAvaliation}>
                        <TextInput
                            style={detailsMovie.avaliation}
                            placeholder="Deixe sua avaliação aqui"
                            multiline={true}
                            value={userAvaliation.text}
                            onChangeText={
                                (e) => {
                                    const newUserAvaliation = { ...userAvaliation };
                                    newUserAvaliation.text = e;
                                    setUserAvaliation(newUserAvaliation);
                                }
                            }
                        />

                        <TextInput style={{ display: 'none' }}
                            value={userAvaliation.movieId = movie.id}
                            
                        >
                        </TextInput>
                        <TouchableOpacity style={detailsMovie.btnAvaliation} onPress={handlerAvaliation}>
                            <Text style={text.btnAvaliation}>SALVAR AVALIAÇÃO</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={detailsMovie.contentComment}>
                        <Text style={text.titleComment}>Avaliações</Text>
                        {
                            movie.reviews.map(review => (
                                <>
                                    <View style={detailsMovie.contentName} key={movie.id}>
                                        <Image style={detailsMovie.star} source={star} />
                                        <Text style={text.nameComment}>{review.userName}</Text>
                                    </View>
                                    <View style={detailsMovie.inputComment}>
                                        <Text style={text.comment}>{review.text}</Text>
                                    </View>
                                </>
                            ))
                        }
                    </ScrollView>
                </ScrollView>
            </View>
        </View>
    )
}

export default DetailsMovie;