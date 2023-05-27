import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Linking, Animated, View, Image } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const ScanScreen = () => {
    const [isTorchOn, setTorchOn] = useState(false);
    const [animation] = useState(new Animated.Value(0));

    const toggleTorch = () => {
        setTorchOn((prevTorchOn) => !prevTorchOn);
    };

    const onSuccess = (e) => {
        Linking.openURL(e.data).catch(err =>
            console.error('An error occurred', err)
        );
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            Animated.sequence([
                Animated.timing(animation, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: false,
                }),
                Animated.timing(animation, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false,
                })
            ]).start();
        }, 500);

        return () => clearInterval(intervalId);
    }, []);

    const animatedStyle = {
        opacity: animation,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 20,
        width: '70%',
        height: '35%',
        position: 'absolute',
        top: '33%',
        left: '15%',
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} resizeMode='contain' source={require('../assets/b.png')} />
        </View>

        <View style={styles.imageContainer}>
          <Image style={styles.image} resizeMode='contain' source={require('../assets/logo.png')} />
        </View>

        <View style={styles.imageContainer}>
          <Image style={styles.image} resizeMode='contain' source={require('../assets/london.png')} />
        </View>
      </View>

      <QRCodeScanner
        onRead={onSuccess}
        flashMode={isTorchOn ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
      />

      <View style={styles.rowContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} resizeMode='contain' source={require('../assets/qr.png')} />
        </View>

        <View style={styles.imageContainer}>
          <Image style={styles.image} resizeMode='contain' source={require('../assets/HISTORY.png')} />
        </View>

        <TouchableOpacity onPress={toggleTorch}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} resizeMode='contain' source={require('../assets/flash.png')} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
            <Animated.View style={animatedStyle} />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
      },
      imageContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        width: 100,
      },
      image: {
        height: 25,
      },
});

export default ScanScreen;
