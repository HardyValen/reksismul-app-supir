import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import * as Application from 'expo-application';
import * as Device from 'expo-device';

import PhoneOff from './assets/icon-off.svg';
import PhoneOn from './assets/icon-on.svg';

import SetAngkotChoice from './components/_set-angkot-choice';
import _GlobalStyles from './styles/_global';
import SetAngkotLocation from './components/_set-angkot-location';
import axios from 'axios';

export default function App() {
  const angkotID = `${Device.deviceName}-${Application.androidId}`
  const [lokasi, setLokasi] = useState(null);
  const [selectedAngkot, setSelectedAngkot] = useState(null)
  const [allowSendLocationToServer, setAllowSendLocationToServer] = useState(false);

  return (
    <View style={_GlobalStyles.container}>
      <View style={_GlobalStyles.menu_container}>
        <View>
          <Text style={_GlobalStyles.h1}>Angkot ID:</Text>
          <Text style={_GlobalStyles.p_gray}>{angkotID}</Text>
        </View>
        <View style={_GlobalStyles.separator}/>
        <View>
          <Text style={_GlobalStyles.h1}>Jenis Angkot:</Text>
          <Text style={_GlobalStyles.p_gray}>{selectedAngkot?.nama_jenis || "Pilih jenis angkot terlebih dahulu"}</Text>
          <SetAngkotChoice 
            selectedAngkot={selectedAngkot} 
            setSelectedAngkot={setSelectedAngkot}
            angkotID={angkotID}
            enabled={allowSendLocationToServer}
          />
        </View>
        {
          selectedAngkot
          ? <>
              <View style={_GlobalStyles.separator}/>
              <View>
                <Text style={_GlobalStyles.h1}>Lokasi Anda:</Text>
                {/* <Text style={_GlobalStyles.p_gray}>{angkotID}</Text> */}
                <SetAngkotLocation 
                  location={lokasi} 
                  setLocation={setLokasi}
                  allowSendLocationToServer={allowSendLocationToServer}
                  setAllowSendLocationToServer={setAllowSendLocationToServer}
                  id_angkot={angkotID}
                />
              </View>
            </>
          : null
        }
      </View>
      
      {
        allowSendLocationToServer
        ? <View style={_GlobalStyles.status_container}>
            <PhoneOn width={200} height={200}/>
            <Text style={_GlobalStyles.status_text_on}>Aplikasi mengirimkan data lokasi.</Text>
          </View>
        : <View style={_GlobalStyles.status_container}>
            <PhoneOff width={200} height={200}/>
            <Text style={_GlobalStyles.status_text_off}>Aplikasi tidak mengirimkan lokasi.</Text>
          </View>
      }
      {/* <Text>{selectedAngkot}</Text> */}
      <StatusBar style="auto" />
    </View>
  );
}