import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ExemploCamera from './exemplos/Camera';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';

function HomeScreen({ navigation }) {

  const [data, setData] = useState();

  useEffect(() => {
    async function apiCall(){
      const response = await fetch("https://jsonplaceholder.typicode.com/comments?postId=1")
      setData(await response.json())
    }
    apiCall()
  }, [])

  if(!data) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.produtoContainer}>
        <Text style={styles.produtoTitle}>Seja bem-vindo</Text>
        <Button
          title="Clique aqui para utilizar nosso produto"
          onPress={() => navigation.navigate('Camera')}
          titleStyle={styles.buttonTitle} // Adicionando estilo para centralizar o texto
        />
      </View>
      <StatusBar style="auto" />
      <View style={styles.relatosContainer}>
        <Text style={styles.relatosTitle}>Veja o relato dos nossos ultimos clientes:</Text>
        <FlatList 
          data={data}
          renderItem={({item}) => (
            <View style={styles.comentariosContainer}>
              <Text>{item.email}</Text>
              <Text style={styles.comentariosBody}>{item.body}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Tela Inicial" component={HomeScreen} />
        <Stack.Screen name="Camera" component={ExemploCamera} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  produtoContainer: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  produtoTitle: {
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 15
  },
  buttonTitle: {
    fontSize: 16, // Tamanho da fonte do texto
  },
  relatosContainer: {
    marginTop: 30
  },
  relatosTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  comentariosContainer: {
    backgroundColor: 'grey',
    width: '80%',
    borderRadius: 10,
    height: 150,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  comentariosBody: {
    color: '#fff',
    textAlign: 'left',
    fontSize: 12,
    marginTop: 5
  }
});
