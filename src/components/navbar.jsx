import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const styles = StyleSheet.create({
  navbarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: Platform.OS === 'android' ? 56 : 44,
  },
  navbarText: {
    fontSize: Platform.OS === 'android' ? 20 : 17,
    fontWeight: '500',
    letterSpacing: 0.5,
    color: '#000000',
  },
  expandedView: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 56 : 44,
    left: 0,
    right: 0,
    flex: 1,
    zIndex: 1,
    elevation: 1,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
  },
});

const NavBar = ({
  title,
  isExpanded,
  onExpand,
  onCollapse,
  renderExpandedContent,
}) => (
  <View style={styles.navbarContainer}>
    <TouchableOpacity
      onPress={() => {
        if (isExpanded) {
          onCollapse();
        } else {
          onExpand();
        }
      }}
    >
      <Text style={styles.navbarText}>
        {title}
      </Text>
    </TouchableOpacity>
    <Icon name={isExpanded ? 'menu-up' : 'menu-down'} style={styles.navbarText} />
    {isExpanded && (
    <View style={styles.expandedView}>
      {renderExpandedContent()}
    </View>
    )}
  </View>
);

export default NavBar;
