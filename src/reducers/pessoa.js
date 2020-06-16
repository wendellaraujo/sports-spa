import { SET_PESSOAS } from '../actions/pessoaActions'

const initialState = {
  pessoas: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PESSOAS:
      return { ...state, pessoas: action.payload };
    default:
      return state;
  }
}
