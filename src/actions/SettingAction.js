import ActionType from './ActionType';

const enableLoading = enable => ({
  type: ActionType.ChangeStateLoading,
  data: enable,
});

const SettingAction = {
  enableLoading,
};
export default SettingAction;
