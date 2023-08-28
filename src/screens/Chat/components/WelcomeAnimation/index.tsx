import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, Text, StyleSheet, StyleProp, TextStyle} from 'react-native';
import Logo from '../../../../assets/icons/SnackPrompt/Logo';

type ArithmeticOperation = 'Addition' | 'Subtraction';

const WelcomeAnimation = () => {
  const text = useMemo(() => 'Snack Prompt ', []);

  const [counter, setCounter] = useState(0);
  const [arithmeticOperation, setArithmeticOperation] =
    useState<ArithmeticOperation>('Addition');

  const isChartVisible = useMemo(
    () =>
      text
        .split('')
        .map((isVisible, chartIndex) => (counter > chartIndex ? true : false)),
    [counter, text],
  );

  const chartStyle = useMemo(
    () =>
      text.split('').map(
        (chart, index) =>
          ({
            ...styles.appName,
            display: isChartVisible[index] ? 'flex' : 'none',
          } as StyleProp<TextStyle>),
      ),
    [isChartVisible, text],
  );

  const handleArithmeticOperation = useCallback(() => {
    if (counter >= text.length) {
      const interval = setInterval(() => {
        setArithmeticOperation('Subtraction');
      }, 500);

      return () => clearInterval(interval);
    }
  }, [counter, text]);

  const handleCounter = useCallback(
    (operation: number) => {
      const counterInterval =
        counter === 0 && arithmeticOperation === 'Addition' ? 1000 : 50;

      return setInterval(() => {
        setCounter(operation);
      }, counterInterval);
    },
    [arithmeticOperation, counter],
  );

  useEffect(() => {
    handleArithmeticOperation();
  }, [handleArithmeticOperation]);

  useEffect(() => {
    if (counter < 0) {
      return;
    }

    const counterNewValue =
      arithmeticOperation === 'Addition' ? counter + 1 : counter - 1;

    const interval = handleCounter(counterNewValue);

    return () => clearInterval(interval);
  }, [arithmeticOperation, counter, handleCounter]);

  return (
    <View style={styles.container}>
      {text.split('').map((char, index) => (
        <Text key={index} style={chartStyle[index]}>
          {char}
        </Text>
      ))}

      <Logo height={25} width={25} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
  },
  appName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default WelcomeAnimation;
