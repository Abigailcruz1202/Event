import React, { useEffect } from "react";
import { connect } from "react-redux";
import styles from "./Home.module.css";
import ActivityCards from "../ActivityCards/ActivityCards";
import Carousel from "../Carousel/Carousel";
import SideBar from "../SideBar/SideBar";
import NavBarHome from "../NavBarHome/NavBarHome";
import { getEventsHome,removeFilters } from "../../actions/actions";

const Home = ({ switchSide, getEventsHome, events, filters, removeFilters }) => {
  //* La informacion de las actividades esta en el archivo FakeDB

  useEffect(() => {
    getEventsHome()
  }, [getEventsHome])

  const all = (e) => {
    removeFilters()
}

  return (
    <>
    <NavBarHome/>
    <div className={styles.container}>
        {switchSide?<div className={styles.sideBar}>
        <SideBar />
        </div>: <div></div> }
      <div>
        {/* <Carousel /> */}
        {filters === undefined ?
        <><h4 style={{marginLeft: '10px'}}>No se encontró lo que buscaba..</h4>
        <h5 style={{ marginBlockEnd: '0', marginLeft: '10px', cursor: 'pointer', textDecoration: 'underline', color: '#f5af00' }} onClick={all}>Regregsar</h5>
        </>
        :filters.length > 0 ?
        <><h5 style={{ marginBlockEnd: '0', marginLeft: '10px', cursor: 'pointer', textDecoration: 'underline', color: '#f5af00' }} onClick={all}>Eliminar Filtros</h5>
        <ActivityCards events={filters}/>
        </>
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

export default connect(mapStateToProps, { getEventsHome, removeFilters })(Home);