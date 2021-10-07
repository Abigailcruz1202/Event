import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import styles from "./Home.module.css";
import ActivityCards from "../ActivityCards/ActivityCards";
import Carousel from "../Carousel/Carousel";
import SideBar from "../SideBar/SideBar";
import NavBarHome from "../NavBarHome/NavBarHome";
import { getEventsHome, removeFilters, removeTypes, clearSearch } from "../../actions/actions";

const Home = ({ switchSide, getEventsHome, events, filters, removeFilters, removeTypes, clearSearch }) => {
  //* La informacion de las actividades esta en el archivo FakeDB

  const stateTypesFilters = useSelector(state => state.typesFilters)

  useEffect(() => {
    getEventsHome()
  }, [getEventsHome])

  const all = (e) => {
    removeFilters()
    removeTypes()
    clearSearch()
  }

  return (
    <>
      <NavBarHome />
      <div className={styles.container}>
        {switchSide ? <div className={styles.sideBar}>
          <SideBar />
        </div> : <div></div>}
        <div className={styles.conC}>
          {/* <Carousel /> */}
          {/* {stateTypesFilters.map((e)=>{
          return(
            <p>{e}</p>
          )
        })} */}
          {
            filters === undefined ?
              <><h4 style={{ marginLeft: '10px' }}>No se encontró lo que buscaba..</h4>
                <h5 style={{ marginBlockEnd: '0', marginLeft: '10px', cursor: 'pointer', textDecoration: 'underline', color: '#f5af00' }} onClick={all}>Regregsar</h5>
              </>
              : filters.length > 0 ?
                <><h5 style={{ marginBlockEnd: '0', marginLeft: '10px', cursor: 'pointer', textDecoration: 'underline', color: '#f5af00' }} onClick={all}>Eliminar Filtros</h5>
                  <ActivityCards events={filters} />
                </>
                : events.length !== 0 ?
                  <div>
                    <Carousel />
                    {stateTypesFilters.length ?
                      <><p style={{ marginLeft: '10px' }}>Filtros activos:</p>
                        {stateTypesFilters.map((e) => {
                          return (
                            <span style={{ marginLeft: '10px' }}>{`"${e}"`}</span>
                          )
                        })}
                      </>
                      : null}
                    <ActivityCards events={events} />
                  </div>
                  : <>
                    <p style={{ marginLeft: '10px' }}>Filtros activos:</p>
                    {stateTypesFilters.map((e) => {
                      return (
                        <span style={{ marginLeft: '10px' }}>{`"${e}"`}</span>
                      )
                    })}
                    <h4 style={{ marginLeft: '10px' }}>No se encontró lo que buscaba..</h4>
                    <h5 style={{ marginBlockEnd: '0', marginLeft: '10px', cursor: 'pointer', textDecoration: 'underline', color: '#f5af00' }} onClick={all}>Regregsar</h5>
                  </>
          }

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

export default connect(mapStateToProps, { getEventsHome, removeFilters, removeTypes, clearSearch })(Home);