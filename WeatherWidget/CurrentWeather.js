import React, { Component } from 'react';
import { NetInfo, Image, View, Text, StyleSheet } from 'react-native';
import { Spinner } from './common';

export default class CurrentWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      icon: 'default',
      temp: '',
      precipChance: '',
      summary: 'Weather is Offline',
      isConnected: null,
      api: '',
      lat: '',
      lng: ''
    }
  }

  componentDidMount() {
    return fetch('https://api.darksky.net/forecast/' + this.props.api + '/' + this.props.lat + ',' + this.props.lng).then((response) => response.json()).then((responseJson) => {
      this.setState({summary: responseJson.currently.summary, temp: Math.round(10 * responseJson.currently.temperature)/10, icon: responseJson.currently.icon, precipChance: Math.round(responseJson.currently.precipProbability * 100)/10, isLoading: false});
    }).catch((error) => {
      console.error(error);
      this.setState({isLoading: false});
    });
  }



  render() {
    if (this.state.isLoading) {
      return (<Spinner size="small"/>)
    }

    const icons = {
      'partly-cloudy-day': require('./weather-icons/partly-cloudy-day.png'),
      'partly-cloudy-night': require('./weather-icons/partly-cloudy-night.png'),
      'clear-day': require('./weather-icons/clear-day.png'),
      'clear-night': require('./weather-icons/clear-night.png'),
      'rain': require('./weather-icons/rain.png'),
      'snow': require('./weather-icons/snow.png'),
      'sleet': require('./weather-icons/sleet.png'),
      'wind': require('./weather-icons/wind.png'),
      'fog': require('./weather-icons/fog.png'),
      'cloudy': require('./weather-icons/cloudy.png'),
      'hail': require('./weather-icons/hail.png'),
      'thunderstorm': require('./weather-icons/thunderstorm.png'),
      'tornado': require('./weather-icons/tornado.png'),
      'meteor-shower': require('./weather-icons/meteor-shower.png'),
      'default': require('./weather-icons/default.png')
    }

    function getIcon(icon){
      return icons[icon];
    }

    return (
      <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Current{`\n`}Weather</Text>
            </View>
            <View style={styles.summaryContainer}>
              <Text style={styles.summary}>{this.state.summary}</Text>
              <Image style={styles.icon} source={ getIcon(this.state.icon) } />
            </View>
            <View style={styles.tempContainer}>
              <Text>{this.state.temp}°F</Text>
              <View style={{flexDirection: 'row',}}>
              <Text>
                {this.state.precipChance}%
              </Text>
              <Image style={{marginTop: 3, }} source={require('./weather-icons/precip.png')} />
              </View>
            </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: -1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    position: 'relative',
    borderTopWidth: 1,
    borderBottomColor: '#8294a0',
    borderBottomWidth: 1,
    borderBottomColor: '#8294a0',
  },

  titleContainer:{
    flex: 1,
    borderRightWidth: 1
  },
  title:{
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5,
    color: 'black',
    fontWeight: '500',
    textAlign: 'right'
  },
  summaryContainer: {
    flex: 1.5,
    flexDirection: 'row',
    marginTop: 13
  },
  summary: {
    marginLeft: 20,
    marginRight: 10
  },
  icon: {
    marginTop: -6
  },
  tempContainer: {
    flex: .5,
    flexDirection: 'column',
    marginTop: 2,
    marginRight: 15,
    alignItems: 'flex-end'
  }

})
