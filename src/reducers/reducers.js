import {
    GET_DETAIL, 
   SWITCH_SIDE_BAR,
   POST_EVENT,
   SET_USER,
   SET_PROMOTER,
   GET_EVENTS_HOME,
   FILTER_TAGS,
   FILTER_AGE_RATING,
   FILTER_WEEKDAYS,
   REMOVE_FILTERS,
   CHANGE_MODAL,
   SEARCH_NAME,
   GET_EVENTS,

  } from "../actions/actions";

  // Pruebas para guardar usuario en el local storage
  // let loginUser = JSON.parse(localStorage.getItem( user )) 
  const initialState = {
    eventsHome: [],
    //*detalles de evento
    detailsEvent:{},
    //*switch de nav-bar
    sideBarSwitch: false,
    //*post //Abi
    posts:[],
    //*user
    userState:{},
    //*promoter
    promoterState:{},
   //modal
    modal:{
      render:false,
      type:null,
      message:null,
    },
    //*filter //Abi
    filters:[],
    home:[],

  };

 
  
  function rootReducer(state = initialState, action) {
    //*__GET_DE_EVENTOS_EN_HOME
    if(action.type=== GET_EVENTS_HOME){
      return{
        ...state,
        eventsHome: action.payload,
      } 
    }
    // Abi
    if(action.type === GET_EVENTS){
      return{
        ...state,
        home:action.payload
      }
    }
    //*__DETALLES_DE_EVENTOS
    if(action.type=== GET_DETAIL){
      return{
        ...state,
        detailsEvent: action.payload,
      } 
    }
    //*__SWITCH_NAV_BAR
    if(action.type=== SWITCH_SIDE_BAR){
      return{
        ...state,
        sideBarSwitch: action.payload
      }
    }
    //*__POST //Abi
    if(action.type=== POST_EVENT){
      return{
        ...state,
        posts: action.payload
      }
    }
    //*_USER_______
    if(action.type=== SET_USER){
      return{
        ...state,
        userState: action.payload
      }
    }
    //*_PRMOTER_______
    if(action.type=== SET_PROMOTER){
      return{
        ...state,
        promoterState: action.payload
      }
    }
    //*__FILTER  //Abi
    if(action.type === FILTER_TAGS){
      return{
        ...state,
        filters: state.home.filter((e)=> e.tags === action.payload)
      }
    }
    if(action.type === FILTER_AGE_RATING){
      return{
        ...state,
        filters: state.home.filter((e)=> e.age_rating === action.payload)
      }
    }
    if(action.type === FILTER_WEEKDAYS){
      return{
        ...state,
        filters: state.home.filter((e)=> e.weekdays.find((day)=> day === action.payload))
      }
    }
    if(action.type === REMOVE_FILTERS){
      return{
        ...state,
        filters:[]
      }
    }

    if(action.type === CHANGE_MODAL){
     
      return{
        ...state,
        modal:{
          ...state.modal,
          render:!state.modal.render,
          message: action.payload.message,
          type: action.payload.type
        }
      }
    }
    if(action.type === SEARCH_NAME){
      return{
        ...state,
        home: state.home.filter((e)=> e.name.includes(action.payload))

      }
    }
  
    return state;
  }
  
  export default rootReducer;
  