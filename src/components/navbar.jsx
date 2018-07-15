import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const navbarHeight = Platform.OS === 'android' ? 56 : 44;

const styles = StyleSheet.create({
  navbarContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: navbarHeight,
    borderColor: '#e0e0e0',
    borderBottomWidth: 1,
  },
  navbarText: {
    fontSize: Platform.OS === 'android' ? 20 : 17,
    fontWeight: '500',
    letterSpacing: 0.5,
    color: '#000000',
  },
  expandedView: {
    alignItems: 'stretch',
    backgroundColor: '#FFFFFF',
    height: Dimensions.get('window').height - navbarHeight,
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
    <View
      style={styles.navbar}
    >
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
    </View>
    {isExpanded && (
      <View style={styles.expandedView}>
        {renderExpandedContent()}
      </View>
    )}
  </View>
);

export default NavBar;
