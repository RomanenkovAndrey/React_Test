const initialState = {
	inputText:'',
	currentItem:'-1',
	dataModel: [],
	isLoading:false
}
const CHANGE_INPUT_TEXT = 'change_input_text';
const CHANGE_DATA_MODEL = 'change_data_model';
const CHANGE_FLAG_LOADING = 'change_flag_loading';

export default function updateDropDownList(state = initialState,action) {
  switch(action.type){
		case CHANGE_INPUT_TEXT:
			return  Object.assign({},state,
				{
					inputText:action.inputText,
					currentIndex:-1
				});
		case CHANGE_DATA_MODEL:
			return  Object.assign({},state,
				{
					dataModel:action.dataModel,
				});
		case CHANGE_FLAG_LOADING:
			return  Object.assign({},state,
				{
					isLoading:action.isLoading,
				});
		default:
			return state;
	}
}

