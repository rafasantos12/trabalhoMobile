import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, Button } from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Linking from 'expo-linking';

const { width } = Dimensions.get('window');

export default function ExemploCamera() {
  const [tipoCamera, setTipoCamera] = useState(Camera.Constants.Type.back);
  const [permissao, solicitaPermissao] = Camera.useCameraPermissions();
  const [qrCodeData, setQrCodeData] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [exibirCamera, setExibirCamera] = useState(false);
  const [menuVisivel, setMenuVisivel] = useState(false);
  const [linkGerado, setLinkGerado] = useState(null);

  const camera = useRef();

  const iniciarLeitura = () => {
    setQrCodeData(null);
    setExibirCamera(true);
    setMenuVisivel(false);
    setLinkGerado(null);
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setQrCodeData(data);
    setMenuVisivel(true);
    setExibirCamera(false);
    setLinkGerado(data);
  };

  const abrirLink = () => {
      Linking.openURL(qrCodeData);
  };

  const mostrarCamera = () => {
    setExibirCamera(true);
    setMenuVisivel(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        {exibirCamera ? (
          <Camera
            ref={camera}
            style={styles.camera}
            type={tipoCamera}
            onBarCodeScanned={handleBarCodeScanned}
          />
        ) : (
          <TouchableOpacity
            onPress={mostrarCamera}
            style={styles.buttonWithBorder}
          >
            <Text style={styles.buttonText}>Leia um QR Code</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.menuContainer}>
        {menuVisivel && (
          <Button
            title="Ler outro QR Code"
            onPress={iniciarLeitura}
          />
        )}
        {linkGerado && (
          <Button
            title="Compartilhar Link"
            onPress={abrirLink}
          />
        )}
      </View>
      {linkGerado && (
        <Text style={styles.linkText}>Link gerado: {linkGerado}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  camera: {
    width: 300,
    height: 400
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#eee',
  },
  buttonWithBorder: {
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 10,
    padding: 15,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'blue',
    fontSize: 20,
  },
  linkText: {
    color: 'blue',
    fontSize: 16,
    padding: 20,
    textAlign: 'center',
  },
});
