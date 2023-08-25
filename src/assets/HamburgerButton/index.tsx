import React, {FC} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';

interface HamburgerButtonProps {
  onPress: () => void;
}

const HamburgerButton: FC<HamburgerButtonProps> = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/* <Ionicons name="menu" size={30} color="white" /> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginTop: 25,
  },
});

export default HamburgerButton;
