import * as types from './types';

const getExplaination = (type) => {
  switch (type) {
    case types.SCHEDULE:
      return 'What\'s the plan for today?';
    case types.GOALS:
      return 'What do you want\'t achieve today?';
    case types.MOTIVATION:
      return 'What drives you today ?';
    case types.HAPPINESS:
      return 'What makes you happy today?';
    case types.TODO:
      return 'Things to check off!';
    default:
      return 'type something, if you wish!';
  }
};

export default getExplaination;
