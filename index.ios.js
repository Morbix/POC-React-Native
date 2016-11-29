/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Alert,
  ListView
} from 'react-native';

var context;

export default class Tracker extends Component {

  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 3']),
      text: "PN287778349BR"
    }
    context = this;
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.primaryInput}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
        />
        <Button
          onPress={onButtonPress}
          title="Search"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <ListView
          dataSource = {this.state.dataSource}
          renderRow = {(rowData) => <Text> {rowData} </Text>}
        />
      </View>
    );
  }



}

function getTrackingInfo(code) {
  return fetch('https://evening-earth-59443.herokuapp.com/search/'+context.state.text)
    .then((response) => response.json())
    .then((responseJson) => {
       //Alert.alert(JSON.stringify(responseJson));
       const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
       context.setState({
         dataSource: ds.cloneWithRows(responseJson.map(function(element) {
                        return element.description;
                    })),
       })
    })
    .catch((error) => {
      console.error(error);
    });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
  },
  primaryInput: {
    marginTop: 20,
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

const onButtonPress = () => {
  getTrackingInfo();
};

AppRegistry.registerComponent('Tracker', () => Tracker);
