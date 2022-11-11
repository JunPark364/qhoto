import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  red100,
  white,
} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {setFeedMission} from '../../api/feed';
import CheckBox from '@react-native-community/checkbox';

function MissionModal({parentFunction, props}) {
  const [optionItems, setOptionItems] = useState([]);
  const [selectBox, setSelectBox] = useState([true, true, true]);
  const [missionFilter, setMissionFilter] = useState([]);
  const [duration, setDuration] = useState('');
  useEffect(() => {
    setDuration(props);

    setFeedMission(
      res => {
        console.log(res.data.options + ' result 입니다.');
        console.log(res.data);
        let missions = [];
        if (props === 'D') {
          res.data.options.dailyOptions.map(item => {
            missions.push(item);
          });
          setMissionFilter(missions);
        } else if (props === 'W') {
          res.data.options.weeklyOptions.map(item => {
            missions.push(item);
          });
          setMissionFilter(missions);
        } else if (props === 'M') {
          res.data.options.monthlyOptions.map(item => {
            missions.push(item);
          });
          setMissionFilter(missions);
        }
        console.log(missions + '      미션스미션스미션스');
        setOptionItems(missions);
      },
      err => {
        console.log(err);
      },
    );
  }, []);
  console.log(missionFilter + '     미션필터');
  console.log(duration + '        듀레이션');
  console.log(selectBox + '    셀렉트박스');
  console.log();
  console.log(optionItems + '    옵션 아이템즈');

  return (
    <Pressable
      style={styles.centeredView}
      onPress={() => {
        parentFunction();
      }}>
      {missionFilter.length > 0 ? (
        <Pressable style={styles.modalView}>
          {missionFilter.map((item, index) => (
            <View style={styles.modal} key={index}>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  {
                    backgroundColor: selectBox[index]
                      ? 'rgba(128, 0, 128, 0.1)'
                      : 'white',
                    borderTopRightRadius: index == 0 ? 20 : 0,
                    borderTopLeftRadius: index == 0 ? 20 : 0,
                  },
                ]}
                onPress={() => {
                  const newSelectBox = [...selectBox];
                  newSelectBox[index] = !newSelectBox[index];
                  setSelectBox(newSelectBox);
                  const newOptionItems = [...optionItems];
                  if (selectBox[index] === false) {
                    newOptionItems.splice(index, 1);
                  } else {
                    newOptionItems.splice(index, 0, item);
                  }
                  setOptionItems(newOptionItems);
                }}>
                <View style={styles.filterOptions}>
                  <View>
                    <CheckBox
                      disabled={false}
                      value={selectBox[index]}
                      tintColors={{true: '#A32CC4', false: 'black'}}
                    />
                  </View>

                  <View>
                    <Text
                      style={[styles.modalButtonText, {textAlign: 'center'}]}>
                      {item.questName}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity
            style={{
              backgroundColor: 'purple',
              flex: 0.4,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => parentFunction()}>
            <Text
              style={[
                styles.modalButtonText,
                {textAlign: 'center', color: 'white'},
              ]}>
              확인
            </Text>
          </TouchableOpacity>
        </Pressable>
      ) : (
        <></>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalView: {
    width: '100%',
    height: 300,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  body: {
    flex: 1,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonText: {
    fontFamily: 'Happiness-Sans-Bold',
    fontSize: 18,
    color: '#595959',
  },
  filterOptions: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default MissionModal;
