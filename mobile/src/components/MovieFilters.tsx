import React from "react";
import { Modal, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { catalog } from "../styles";

const MovieFilters: React.FC = () => {
    return (
        <Modal
            //visible={showGenres}
            animationType="fade"
            transparent={true}
            presentationStyle="overFullScreen"

        >
            <View style={catalog.containerModal}>
                <View style={catalog.contentModal}>
                    <ScrollView >
                        {/* {
                            genres.map(
                                gen => (
                                    <TouchableOpacity
                                        key={gen.id}
                                        onPress={() => {
                                            setMovie({ ...movie, genre: gen.name })
                                            setShowGenres(!showGenres);
                                        }}
                                        style={catalog.itemModal}
                                    >
                                        <Text style={text.modal}>{gen.name}</Text>
                                    </TouchableOpacity>
                                )
                            )
                        } */}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}

export default MovieFilters;