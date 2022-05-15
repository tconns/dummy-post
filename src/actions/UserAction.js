import ActionType from './ActionType';

const saveProfile = profile => ({
  type: ActionType.SaveProfileUser,
  data: profile,
});

const UserAction = {
  saveProfile,
};
export default UserAction;
