import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Text, ToastAndroid, View } from 'react-native';
import _GlobalStyles from '../styles/_global';
// import * as Application from 'expo-application';
// import * as Device from 'expo-device';

function SetAngkotChoice ({selectedAngkot, setSelectedAngkot, angkotID, enabled}) {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get("https://srv2.gatot.id/reksismul/data/jenis-angkot")
    .then(({data}) => {
      setList(data)
    })
    return () => {}
  }, [])

  function initAngkot(id_jenis_angkot) {
    if (id_jenis_angkot) {
      axios.post(
        "https://srv2.gatot.id/reksismul/data/angkot",
        {
          id_angkot: angkotID,
          id_jenis_angkot
        }
      )
      .then(() => {
        ToastAndroid.showWithGravityAndOffset(
          "Angkot berhasil didaftarkan / diperbarui",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          0,
          50
        );
      })
      .catch(() => {
        ToastAndroid.showWithGravityAndOffset(
          "Maaf ada kesalahan teknis, lapor kepada dev! (Error: initAngkot)",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          0,
          50
        );
      });
    }
  }

  return (
    list.length > 0
    ? <Picker 
        style={_GlobalStyles.picker}
        selectedValue={selectedAngkot}
        enabled={!enabled}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedAngkot(itemValue)
          initAngkot(itemValue?.id_jenis_angkot)
          return;
        }}>
        <Picker.Item label={"Pilih angkot"} value={null}/>
        {list.map((data, index) => {
          return (
            <Picker.Item label={data.nama_jenis} value={data} key={index}/>
          )
        })}
      </Picker>
    : null
  )
}

export default SetAngkotChoice