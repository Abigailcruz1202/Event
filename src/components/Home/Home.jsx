import React, { useEffect } from "react";
import { connect } from "react-redux";
import styles from "./Home.module.css";
import ActivityCards from "../ActivityCards/ActivityCards";
import Carousel from "../Carousel/Carousel";
import SideBar from "../SideBar/SideBar";
import NavBarHome from "../NavBarHome/NavBarHome";
import activitiesList from "../../FakeDB/FakeDB";
import { getEventsHome } from "../../actions/actions";

const Home = ({ switchSide, getEventsHome, events, filters }) => {
  //* La informacion de las actividades esta en el archivo FakeDB

  useEffect(() => {
    getEventsHome()
  }, [getEventsHome])


  return (
    <>
    <NavBarHome/>
    <div className={styles.container}>
        {switchSide?<div className={styles.sideBar}>
        <SideBar />
        </div>: <div></div> }
      <div>
        {/* <Carousel /> */}
        {filters.length > 0 ?
        <ActivityCards events={filters}/>
        :<div>
        <Carousel />
          <ActivityCards events={events} /></div>}
        
      </div>
    
    </div>
    </>
  );
};

function mapStateToProps(state) {
  return {
    events: state.eventsHome,
    switchSide: state.sideBarSwitch,
    filters: state.filters
  };
}

export default connect(mapStateToProps, { getEventsHome })(Home);