import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import SearchInput from './containers/SearchInput'
import configureStore from './store/configureStore'
import {Promise} from 'es6-promise';
import data from './testData.js'
import {changeDataModel,changeLoading} from './actions/index.js'


import './css/style.css';


var store = configureStore();
var testText = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel,';

function find(text) {
    text = text.trim();
    var result = new Promise(function(resolve) {
        store.dispatch(changeLoading(true));
        setTimeout(function() {
            var arrData = data;
            var newData = [];
            for (var i = 0; i < arrData.length; i++) {
                if (arrData[i].data.search(new RegExp(text, 'i')) != -1) {
                    newData.push(arrData[i]);
                }
            }
            resolve(newData);
        }, 100)
    }).then(function(value) {
        store.dispatch(changeLoading(false));
        store.dispatch(changeDataModel(value));
    }, function() {
        store.dispatch(changeLoading(false));
    });
    return result;
}

render(
  <Provider store={store}>
    <div>
      <SearchInput showField={'data'} functionFind={find}/>
      <div className='testText'>{testText}</div>
    </div>
  </Provider>,
  document.getElementById('root')
)

export default {store};
