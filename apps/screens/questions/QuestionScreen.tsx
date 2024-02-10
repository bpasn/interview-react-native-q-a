import { ActivityIndicator, Animated, StyleSheet, View, Text } from 'react-native';
import React, { useEffect, useState, useId } from 'react';
import useStoreQuestion from '@/stores/useStoreQuestion';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { useTheme, Snackbar } from 'react-native-paper';
import QuestionItem from '@/apps/components/question-item';
import FooterList from '@/apps/components/footer-list';
import DialogComponent from '@/apps/components/dialog';
import useStoreDialog from '@/stores/useStoreDialog';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackProps } from '../MyStack';
import { CommonActions } from '@react-navigation/native';
import LoadingSpiner from '@/apps/components/loading';
import useStoreBoard from '@/stores/useStoreBoard';
import uuid from 'react-native-uuid';
const QuestionScreen = (props: NativeStackScreenProps<RootStackProps>) => {
  const theme = useTheme();
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const storageBoard = useStoreBoard();
  const storeDialog = useStoreDialog();
  const id = useId();
  const {
    loading,
    question,
    setQuestion,
    onValidate,
    compare,
    onSubmit,
    createQuestionState,
    testerName
  } = useStoreQuestion();

  const handleSubmit = () => {
    if (onValidate()) {
      storeDialog.onOpen();
    } else {
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
      }, 2 * 1000);
    }
  };
  const handleSend = async () => {
    storeDialog.onClose();
    const score = await compare();
    storageBoard.setBoard({
      id: String(uuid.v4()),
      score: score.correct,
      testerName
    });
    setTimeout(() => {
      createQuestionState()
      props.navigation.dispatch(
        CommonActions.navigate({
          name: "Result",
        })
      );
    }, 3 * 1000);
  };
  useEffect(() => {
    setQuestion();
  }, []);
  return (
    <View style={{
      flex: 1,
      height: "100%",
      alignItems: "center",
      alignSelf: "stretch",
      backgroundColor: theme.colors.inversePrimary,
      position: "relative"
    }}>
      <FlatList
        data={question}
        initialNumToRender={5}
        renderItem={({ item, index }) => (<QuestionItem key={index} item={item} />)}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={setQuestion} />}
        keyExtractor={(_, index) => String(index)}
        ListFooterComponent={<FooterList hidden={loading} onPress={handleSubmit} />}
      />
      <Snackbar
        visible={showSnackbar}
        duration={2 * 1000}
        style={{
          backgroundColor: theme.colors.error,
        }}
        icon="close"
        onDismiss={() => setShowSnackbar(false)}
      >
        Please answer all questions.
      </Snackbar>

      <LoadingSpiner loading={onSubmit} />
      <DialogComponent
        visible={storeDialog.visible}
        onDismiss={storeDialog.onClose}
        onPress={handleSend}
        onCancel={storeDialog.onClose}
        title={"Confirm send answer."}
      >
        <Text>Send answer</Text>
      </DialogComponent>
    </View>
  );
};

export default QuestionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },

});