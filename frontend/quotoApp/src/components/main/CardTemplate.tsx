import React from 'react';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {
  questName: string;
  questType: string;
  handleRerollClick: any;
}

const windowSize = Dimensions.get('window').width;

const questTypes: {[key: string]: {iconName: string; colorCode: string}} = {
  건강: {iconName: '', colorCode: '#C25445'},
  일상: {iconName: '', colorCode: '#ECB21D'},
  환경: {iconName: '', colorCode: '#70A348'},
  이색: {iconName: '', colorCode: '#2271CE'},
  색깔: {iconName: '', colorCode: '#4B179F'},
};

const CardTemplate: React.FC<Props> = props => {
  const {questName, questType, handleRerollClick} = props;

  return (
    <View style={styles.card}>
      <Icon
        name="refresh"
        style={styles.rerollIcon}
        onPress={handleRerollClick}></Icon>
      <View style={styles.labelContainer}>
        <View
          style={[
            styles.label,
            {
              backgroundColor: questTypes[questType].colorCode,
            },
          ]}>
          <Text style={styles.labelContent}>{questType} 퀘스트</Text>
        </View>
      </View>
      <View style={styles.questContentContainer}>
        <Text
          style={[
            styles.questContent,
            {
              color: questTypes[questType].colorCode,
            },
          ]}>
          {questName}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: (windowSize * 5) / 6,
    height: 350,
    backgroundColor: 'white',
    justifyContent: 'center',
    shadowColor: 'black',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
  },
  rerollIcon: {
    color: '#C7C7C7',
    fontSize: 20,
    position: 'absolute',
    top: 15,
    right: 20,
  },
  labelContainer: {
    flex: 1,
  },
  label: {
    width: 150,
    height: 50,
    alignItems: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  labelContent: {
    color: 'white',
    textAlign: 'center',
    lineHeight: 50,
    fontFamily: 'Happiness-Sans-Bold',
    fontSize: 16,
  },
  questContentContainer: {
    flex: 9,
    justifyContent: 'center',
    padding: 20,
  },
  questContent: {
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'Happiness-Sans-Bold',
  },
});

export default CardTemplate;
