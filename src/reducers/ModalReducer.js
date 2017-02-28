import { assign } from 'lodash';

export const InitialState = {
  isModal: false,
  modalData: null,
  modalType: "",
  modalDetails: null,
  isWaiting: false
}; 


function modalTypes(type, body) {
    const modalTypes = {
        edit: {
            title: 'Edit',
            type:'edit',
            isBody: true,
            body: body,
            buttons: [
                {name:'CANCEL', action:'close'},
                {name: 'SAVE',  action:'save'}
            ]
        },
        delete: {
            title: 'Delete',
            type:'delete',
            isBody: false,
            buttons: [
                {name:'NO',  action:'close'},
                {name:'YES', action:'delete'}           
            ]
        }
    }

    return modalTypes[type];
}


export default function(state = InitialState, action) {
  const { type, data, payload } = action;

  switch (type) {
    case "OPEN_MODAL":
        return assign({}, state, {
            isModal: !state.isModal,
            type: payload.type,
            data: payload.data,
            modalType: payload.modalType,
            modalDetails: assign({}, modalTypes(payload.modalType, payload.data.text)),
            isWaiting: false
        });
    case "CLOSE_MODAL":
        return assign({}, state, {
            isModal: false,
            type: '',
            data: null,
            modalType: '',
            modalDetails: null,
            isWaiting: false
        });
    case "PRE_PUTDEL_COMMENTS":
        return assign({}, state, {isWaiting: true});
    default:
      return state;
  }
}
