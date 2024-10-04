import { StyleSheet, View, Text } from 'react-native';
import React, { useEffect, useState, } from 'react';
import useStoreQuestion from '@/stores/useStoreQuestion';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { useTheme, Snackbar } from 'react-native-paper';
import QuestionItem from '@/apps/components/question-item';
import FooterList from '@/apps/components/footer-list';
import useStoreDialog from '@/stores/useStoreDialog';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackProps } from '../MyStack';
import { CommonActions } from '@react-navigation/native';
const QuestionScreen = (props: NativeStackScreenProps<RootStackProps>) => {
  const theme = useTheme();
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const storeDialog = useStoreDialog();
  const {
    loading,
    question,
    setQuestion,
    onValidate,
    compare,
    clearQuestionState,
  } = useStoreQuestion();

  const handleSubmit = () => {
    if (onValidate()) {
      storeDialog.onOpen({
        children: () => <Text>send your answer</Text>,
        title: "Confirm send answer.",
        onPress: handleSend,
      });
    } else {
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
      }, 2 * 1000);
    }
  };
  const handleSend = async () => {
    storeDialog.onDismiss();
    await compare();
    clearQuestionState();
    props.navigation.dispatch(
      CommonActions.navigate({
        name: "Result",
      })
    );
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

      {/* <DialogComponent
        visible={storeDialog.visible}
        onDismiss={storeDialog.onClose}
        onPress={handleSend}
        onCancel={storeDialog.onClose}
        title={"Confirm send answer."}
      >
        <Text>Send answer</Text>
      </DialogComponent> */}
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