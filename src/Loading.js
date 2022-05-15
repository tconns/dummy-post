import React from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import RNSpinkit from 'react-native-spinkit';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(33, 33, 33, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class Loading extends React.Component {
  render() {
    if (!this.props.loading) {
      return null;
    }
    return (
      <View style={styles.container}>
        <RNSpinkit size={33} color={'white'} type={'Wave'} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state?.SettingReducer?.loading,
  };
};

export default connect(mapStateToProps, null)(Loading);
