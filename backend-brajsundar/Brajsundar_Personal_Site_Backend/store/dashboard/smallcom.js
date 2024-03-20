import { createSlice } from "@reduxjs/toolkit";

const smallCom = createSlice({
  name: "smC",
  initialState: { sideBarvis: false,openCLoseprooc:false ,openclosesidemanutabv:0, plan_name :'null'},
  reducers: {
    toggle(state) {
        
        state.sideBarvis =  !state.sideBarvis;
    },
    openCLosepromod(state){
        state.openCLoseprooc = !state.openCLoseprooc;
    },
    bodycom(state, action){
      const newcardPanel = action.payload;
      state.openclosesidemanutabv = newcardPanel;
    },
    plancheck(state, action){
      let newcardPanel = action.payload;
      let planname ;
      switch(newcardPanel) {
        case 0:
          planname = 'Silver';
          break;
        case 1:
          planname = 'Golden';
          break;
        case 2:
          planname = 'Platinum';
          break;
        case 3:
          planname = 'Premium Plus';
          break;
        case 4:
          planname = 'Executive';
          break;
        case 5:
          planname = 'Executive Plus';
          break;
        case 6:
          planname = 'Ultimate';
          break;
        default:
          planname = 'Not Active';
      }
      state.plan_name = planname;
    }
    
  },
});

export const SmcA = smallCom.actions;

export default smallCom;
