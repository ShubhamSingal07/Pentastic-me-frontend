import Actions from '../store/actions';

export const deleteImage = payload => ({
  type: Actions.deleteImage,
  payload,
});
