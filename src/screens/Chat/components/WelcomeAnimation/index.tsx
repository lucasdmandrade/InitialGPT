import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Text, StyleSheet, StyleProp, TextStyle, Animated} from 'react-native';
import Logo from '../../../../assets/icons/SnackPrompt/Logo';

type ArithmeticOperation = 'Addition' | 'Subtraction';

type WelcomeAnimationProps = {
  text: string[];
  disableBackgroung?: boolean;
};

const WelcomeAnimation: React.FC<WelcomeAnimationProps> = ({
  text,
  disableBackgroung,
}) => {
  const [backgroundColor, setBackgroundColor] = useState('#FF5733');
  const [counter, setCounter] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [arithmeticOperation, setArithmeticOperation] =
    useState<ArithmeticOperation>('Addition');

  const randomColor: string = useMemo(() => {
    if (arithmeticOperation === 'Addition') {
      return randomColor || '#191a20';
    }

    const min = 0x000000;
    const max = 0xffffff;

    const colorValue = Math.floor(
      min + Math.random() * (max - min + text[currentWordIndex].length),
    ).toString(16);

    setBackgroundColor(`#${'0'.repeat(6 - colorValue.length)}${colorValue}`);
    return `#${'0'.repeat(6 - colorValue.length)}${colorValue}`;
  }, [arithmeticOperation, currentWordIndex, text]);

  const colorAnimation = new Animated.Value(0);

  const interpolatedColor = colorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [randomColor, backgroundColor],
    easing: () => 1,
  });

  const containerStyle = useMemo(
    () => ({
      ...styles.container,
      backgroundColor: disableBackgroung ? 'transparent' : interpolatedColor,
    }),
    [disableBackgroung, interpolatedColor],
  );

  const isChartVisible = useMemo(
    () =>
      text[currentWordIndex]
        .split('')
        .map((isVisible, chartIndex) => (counter > chartIndex ? true : false)),
    [counter, currentWordIndex, text],
  );

  const chartStyle = useMemo(
    () =>
      text[currentWordIndex].split('').map(
        (chart, index) =>
          ({
            ...styles.appName,
            display: isChartVisible[index] ? 'flex' : 'none',
          } as StyleProp<TextStyle>),
      ),
    [isChartVisible, currentWordIndex, text],
  );

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
    if (counter < 0) {
      return;
    }

    const counterNewValue =
      arithmeticOperation === 'Addition' ? counter + 1 : counter - 1;

    if (counterNewValue - 1 >= text[currentWordIndex].length) {
      const subtractionInterval = setInterval(() => {
        setArithmeticOperation('Subtraction');
      }, 300);

      return () => clearInterval(subtractionInterval);
    }

    if (counterNewValue < 0) {
      if (currentWordIndex < text.length - 1) {
        setArithmeticOperation('Addition');
        setCurrentWordIndex(currentWordIndex + 1);
        setCounter(0);
      }
    }

    const interval = handleCounter(counterNewValue);

    return () => clearInterval(interval);
  }, [arithmeticOperation, counter, handleCounter, currentWordIndex, text]);

  return (
    <Animated.View style={containerStyle}>
      {text[currentWordIndex].split('').map((char, index) => (
        <Text key={index} style={chartStyle[index]}>
          {char}
        </Text>
      ))}

      <Logo height={25} width={25} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
