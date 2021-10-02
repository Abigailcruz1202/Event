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
   GET_EVENTS_PROMOTER,
   EDIT_EVENT,
   PROMOTER_USER,
   ADD_SHOPPING,
  DELETE_SHOPPING,
  ADD_CHECKOUT,
  DELETE_CHECKOUT,
  SET_TOTAL_CHECKOUT,
  RESET_SHOPPING,
  ADD_TICKET,
  DELETE_TICKET,
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
    promoterEvents:[],
   //modal
    modal:{
      render:false,
      type:null,
      message:null,
    },
    //modL FORM 
    modalForm:{
      render:false,
      data:{},
    },
    //*filter //Abi
    filters:[],
    home:[],
    //promoter user 
    promoterUser:[],
   //*shopping cart
    cartState:[],
    checkoutItems:[],
    checkoutTotal:0,
    ticketItems: [],
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
    if(action.type=== GET_EVENTS_PROMOTER){
      return{
        ...state,
        promoterEvents: action.payload
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

    
    if(action.type === EDIT_EVENT){    
      console.log('en el reducer',action.payload)
      return{
        ...state,
        modalForm:{
          ...state.modalForm,
          render:!state.modalForm.render,
          data: action.payload,
        }
      }
    }
    if(action.type === SEARCH_NAME){
      return{
        ...state,
        home: state.home.filter((e)=> e.name.includes(action.payload))

      }
    }
    if(action.type=== PROMOTER_USER){
      return {
        ...state,
        promoterUser: action.payload
      }
      }



   //*__SHOPPING_CART
   if(action.type === ADD_SHOPPING){
    return{
      ...state,
      cartState: state.cartState.concat(action.payload) 
    }
  }
  if(action.type === DELETE_SHOPPING){
    return{
      ...state,
      cartState: state.cartState.filter(e => e.id !== action.payload) 
    }
  }
  if(action.type === ADD_CHECKOUT){
    const event =  state.checkoutItems.filter(e => e.sku !== action.payload.sku) 

    return{
      ...state,
      checkoutItems: event.concat(action.payload) 
    }
  }
  if(action.type === DELETE_CHECKOUT){
    return{
      ...state,
      checkoutItems: state.checkoutItems.filter(e => e.sku !== action.payload) 
    }
  }
  if(action.type === SET_TOTAL_CHECKOUT){
    return{
      ...state,
      checkoutTotal: action.payload
    }
  }
  if(action.type === RESET_SHOPPING){
    return{
      ...state,
      cartState: [],
      checkoutItems: [],
      checkoutTotal: []
    }
  }
  if(action.type === ADD_TICKET){
    const ticket =  state.ticketItems.filter(e => e.idEvent !== action.payload.idEvent)
    return{
      ...state,
      ticketItems: ticket.concat(action.payload) 
    }
  }
  if(action.type === DELETE_TICKET){
    return{
      ...state,
      ticketItems: state.ticketItems.filter(e => e.idEvent !== action.payload) 
    }
  }




  




     return state;
  }
  




  
  export default rootReducer;
  