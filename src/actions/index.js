export const CHANGE_INPUT_TEXT = 'change_input_text';
export const CHANGE_DATA_MODEL = 'change_data_model';
export const CHANGE_FLAG_LOADING = 'change_flag_loading';

export function changeText(text){
  return{
    type:'change_input_text',
    inputText:text,
    index:-1
  }
}
export function changeDataModel(newModel){
  return{
    type:'change_data_model',
    dataModel:newModel
  }
}
export function changeLoading(isLoading){
  return{
    type:'change_flag_loading',
    isLoading:isLoading
  }
}