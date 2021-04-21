import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Text, ToastAndroid, View } from 'react-native';
import _GlobalStyles from '../styles/_global';
import * as Location from 'expo-location';

function SetAngkotLocation ({id_angkot, location, setLocation, allowSendLocationToServer, setAllowSendLocationToServer}) {
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Izin akses lokasi tidak diberikan oleh pengguna.');
        return;
      }

      await Location.watchPositionAsync(
        {
          timeInterval: 1,
          distanceInterval: 1,
        }, 
        (res) => {
          setLocation(res);
          console.log("Updating Location...")
        }
      );

    })();
  }, []);

  // UseEffect kalau boleh kirim lokasi
  useEffect(() => {
    if (allowSendLocationToServer && location) {
      axios.post("https://srv2.gatot.id/reksismul/data/lokasi-angkot",
      {
        id_angkot,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      })
      .then(() => {
        console.log("Send Location Success (_set-angkot-location)")
      })
      .catch(() => {
        console.log("Error Sending Location (_set-angkot-location)")
      })
    }

    return () => {}
  }, [allowSendLocationToServer, location])

  let text = 'Tunggu sebentar..';

  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Lintang: ${location.coords.latitude}, Bujur: ${location.coords.longitude}`;
  }

  function KirimLokasi() {
    setAllowSendLocationToServer(true);
    ToastAndroid.showWithGravityAndOffset(
      "Aplikasi mengirimkan lokasi secara realtime...",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      50
    );
  }

  function BerhentiKirimLokasi() {
    setAllowSendLocationToServer(false);
    
    axios.delete(
      "https://srv2.gatot.id/reksismul/data/lokasi-angkot",
      {
        data: {
          id_angkot
        }
      }
    )
    .then(() => {
      console.log("Delete Location Success (_set-angkot-location)")
    })
    .catch((err) => {
      console.log(err.response.data)
    })

    ToastAndroid.showWithGravityAndOffset(
      "Aplikasi berhenti mengirimkan lokasi...",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      50
    );
  }

  return (
    <View>
      <Text style={{marginBottom: 10}}>{text}</Text>
      {
        !allowSendLocationToServer
        ? <Button
            onPress={KirimLokasi}
            title="Kirimkan Lokasi"
            color="#2D9CDB"
            accessibilityLabel="Kirimkan Lokasi"
          />
        : <Button
            onPress={BerhentiKirimLokasi}
            title="Berhenti Mengirimkan Lokasi"
            color="#2D9CDB"
            accessibilityLabel="Berhenti Mengirimkan Lokasi"
          />
      }
    </View>
  );
}

export default SetAngkotLocation