export const initialStore=()=>{
  return{
    contactList: []
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case "SET_CONTACT_LIST":
      return {
        ...store,
        contactList: action.payload
      };
    case "DELETE_CONTACT":{
      const id = Number(action.payload);
      const newContactList = store.contactList.filter((contact) => contact.id !== id);
      return {
        ...store,
        contactList: newContactList
      };
    }
    default:
      throw Error('Unknown action.');
  }    
}
