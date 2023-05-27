import { View, Text } from 'react-native'
import React from 'react'
import ScanScreen from './screens/Qrcode'

export default function App() {
  return (
    <View style={{flex:1}}>
      <ScanScreen/>
    </View>
  )
}