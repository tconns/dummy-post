import ActionType from '../actions/ActionType';

const initialState = {
  loading: false,
};

export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.ChangeStateLoading:
      return {
        loading: action.data,
      };
    default:
      return state;
  }
}
