import ActionType from '../actions/ActionType';

const initialState = {
  profile: {},
};

export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.SaveProfileUser:
      return {
        ...state,
        profile: action.data,
      };
    default:
      return state;
  }
}
