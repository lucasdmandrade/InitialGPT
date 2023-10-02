import React, {FC, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import Dislike from '../../../../../../assets/icons/Dislike';
import Information from '../../../../../../assets/icons/Information';
import Like from '../../../../../../assets/icons/Like';
import Repeat from '../../../../../../assets/icons/Repeat';

interface MenuPosition {
  x: number;
  y: number;
}

interface OwnProps {
  menuPosition: MenuPosition;
  isVisible?: boolean;
  closeMenu: () => void;
}

const MessageOptionsModal: FC<OwnProps> = ({
  menuPosition,
  isVisible,
  closeMenu,
}) => {
  const screenWidth = Dimensions.get('window').width;

  const modalStyle = useMemo(() => {
    const horizontalPosition =
      menuPosition.x > screenWidth / 2
        ? {right: screenWidth - menuPosition.x}
        : {left: menuPosition.x};

    return {
      ...styles.menuContainer,
      ...horizontalPosition,
      top: menuPosition.y,
    };
  }, [menuPosition, screenWidth]);

  return (
    <Modal visible={isVisible} transparent={true} onRequestClose={closeMenu}>
      <TouchableOpacity style={styles.modalContainer} onPress={closeMenu}>
        <View style={modalStyle}>
          <View style={styles.menuContent}>
            <TouchableOpacity onPress={closeMenu}>
              <View style={styles.menuOption}>
                <Information height={20} width={20} color="white" />
                <Text style={styles.menuOptionText}>Copy</Text>
              </View>

              <View style={styles.menuOption}>
                <Information height={20} width={20} color="white" />
                <Text style={styles.menuOptionText}>Select Text</Text>
              </View>

              <View style={styles.menuOption}>
                <Like height={20} width={20} color="white" />
                <Text style={styles.menuOptionText}>Good Response</Text>
              </View>

              <View style={styles.menuOption}>
                <Dislike height={20} width={20} color="white" />
                <Text style={styles.menuOptionText}>Bad Response</Text>
              </View>

              <View style={styles.menuOption}>
                <Repeat height={20} width={20} color="white" />
                <Text style={styles.menuOptionText}>Regenerate Response</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    position: 'absolute',
    backgroundColor: '#2d2f39',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    zIndex: 9999,
  },
  menuContent: {
    flexDirection: 'row',
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  menuOptionText: {
    color: 'white',
    marginLeft: 5,
  },
});

export default MessageOptionsModal;
