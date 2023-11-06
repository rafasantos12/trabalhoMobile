import { StyleSheet, TouchableOpacity, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function IconButton({ name, onPress }) {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <FontAwesome
                    name={name}
                    size={28}
                    color="#000000"
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 64,
        height: 64,
    },
    button: {
        flex: 1,
        backgroundColor: '#efefef',
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
