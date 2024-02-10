import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '@/apps/components/button';
import { Card, List, TextInput, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackProps } from '../MyStack';
import useStoreBoard from '@/stores/useStoreBoard';
import { FlatList } from 'react-native-gesture-handler';
import DialogComponent from '@/apps/components/dialog';
import useStoreDialog from '@/stores/useStoreDialog';
import LoadingSpiner from '@/apps/components/loading';
import useStoreQuestion from '@/stores/useStoreQuestion';
import useStoreDialogBoard from '@/stores/useStoreDialogBoard';
import { storage, zustandStorage } from '@/stores/StorageMMK';


const BoardScreen = (props: NativeStackScreenProps<RootStackProps>) => {
  const [height, setHeight] = useState<number>(0);
  const [testerName, setTesterName] = useState<string>();
  const [error,setError] = useState<string | null>();
  const styles = useStyles();
  const theme = useTheme();
  const storeBoard = useStoreBoard();
  const storageDialog = useStoreDialogBoard();
  const storageQuestion = useStoreQuestion();

useEffect(() => {
},[])
  return (
    <SafeAreaView
      onLayout={() => {
        if (Platform.OS === 'android') {
          setHeight(StatusBar.currentHeight || 0);
        }
      }}
      style={[styles.container, {
        paddingTop: height,
      }]}>

      <View style={[styles.container, {
      }]}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../../../assets/images/quizshow-bro.png")}
          />
        </View>
        <View style={styles.listBoard}>
          {storeBoard.boards.length 
            ? (
              <FlatList
                style={{
                  flex: 1,
                  alignSelf: "stretch",
                  paddingHorizontal: 10,
                }}
                data={storeBoard.boards}
                renderItem={({ item, index }) => renderItemlist(item)}
                keyExtractor={(item, index) => String(index)}
              />
            )
            : (
              <View style={{
                alignSelf: "center"
              }}>
                <Text style={{
                  fontSize: 30,
                  fontWeight: "500"
                }}>Board is Empty!</Text>
              </View>
            )}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            label="Start Quiz"
            style={{ alignSelf: "stretch" }}
            onPress={() => {
              storageDialog.onOpen();
            }}
          />
        </View>
      </View>

      <LoadingSpiner loading={storageQuestion.loading} />
      <DialogComponent
        visible={storageDialog.visible}
        onDismiss={storageDialog.onClose}
        title={'Tester name'}
        onCancel={storageDialog.onClose}
        onPress={() => {
          if(!testerName?.length) {
          setError("Please enter your name!")
            return ;
          }
          setError(null);
          storageQuestion.setTesterName(testerName!);
          storageDialog.onClose();
          setTimeout(() => {
            storageQuestion.setLoading();
            props.navigation.navigate("Question");
          },2*1000);
        }}
      >
        <TextInput
          label="Name"
          value={testerName}
          mode="outlined"
          error={!!error}
          onChangeText={text => {
            setTesterName(text)
          }}
        />
        {error && <Text style={{
          color:theme.colors.error
        }}>{error}</Text>}
      </DialogComponent>
    </SafeAreaView>
  );

  function renderItemlist(item: IBoard) {
    return (
      <Card style={{ marginBottom: 15 }}>
        <Card.Content style={{
        }}>
          <List.Item
            title={"Tester : " + item.testerName}
            titleStyle={{
              fontSize: 22,
              fontWeight: "500",
              color: theme.colors.secondary,
              paddingBottom: 5
            }}
            description={() => (
              <View>
                <Text style={{
                  fontSize: 18,
                  color: theme.colors.onSecondaryContainer,
                  fontWeight: "600"
                }}>Score : {item.score} / 20</Text>
              </View>
            )}
          />
        </Card.Content>
      </Card>

    );
  };
};

export default BoardScreen;

const useStyles = () => StyleSheet.create({
  container: {
    alignItems: "center",
    alignSelf: "stretch",
    height: "100%",
  },
  listBoard: {
    flex: 3,
    alignSelf: "stretch",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 10
  },
  imageContainer: {
    flex: 2,
    alignSelf: "stretch",
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    alignItems: "center"
  },
  buttonContainer: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    marginBottom: 1,
    padding: 15
  },

});