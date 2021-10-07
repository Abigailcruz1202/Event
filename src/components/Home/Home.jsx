import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import styles from "./Home.module.css";
import ActivityCards from "../ActivityCards/ActivityCards";
import Carousel from "../Carousel/Carousel";
import SideBar from "../SideBar/SideBar";
import NavBarHome from "../NavBarHome/NavBarHome";
import { getEventsHome, removeFilters, removeTypes, clearSearch } from "../../actions/actions";

const Home = ({ switchSide, getEventsHome, events, filters, removeFilters, removeTypes, clearSearch }) => {
  //* La informacion de las actividades esta en el archivo FakeDB


  const stateTypesFilters = useSelector(state => state.typesFilters)

  //(Lucio) PAGINATION LOCAL STATES:
  const pageSize = 3;
  const [pages, setPages] = useState(0);

  //(Lucio) HOOKS:
  useEffect(() => {
    getEventsHome(pages)
  }, [getEventsHome, pages])

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


}
// (Lucio) PAGINATION REDUCERS
let thisPage = events && events.slice(pages, pages + pageSize);
let filteredPage = filters && filters.slice(pages, pages + pageSize);

// (Lucio) PAGINATION HANDLERS
const pgDn = (e) => {
  e.preventDefault();
  if (pages <= 0) {
    setPages(0);
  } else {
    setPages(pages - pageSize);
  }
};
const pgUpNoFilter = (e) => {
  e.preventDefault();
  if (pages + pageSize > events.length) {
    setPages(pages);
  } else {
    setPages(pages + pageSize);
  }
};
const pgUpFiltered = (e) => {
  e.preventDefault();
  if (pages + pageSize > filters.length) {
    setPages(pages);
  } else {
    setPages(pages + pageSize);
  }
};

  return (
    <>
    <NavBarHome/>
    <div className={styles.container}>
        {switchSide?<div className={styles.sideBar}>
        <SideBar />
        </div>: <div></div> }
      <div className={styles.conC}>
        {/* <Carousel /> */}
        {filters === undefined ?
        <><h4 style={{marginLeft: '10px'}}>No se encontró lo que buscaba..</h4>
        <h5 style={{ marginBlockEnd: '0', marginLeft: '10px', cursor: 'pointer', textDecoration: 'underline', color: '#f5af00' }} onClick={all}>Regresar</h5>
        </>
        :filters.length > 0 ?
        <><h5 style={{ marginBlockEnd: '0', marginLeft: '10px', cursor: 'pointer', textDecoration: 'underline', color: '#f5af00' }} onClick={all}>Eliminar Filtros</h5>
        {/* PAGINATION BUTTONS WITHOUTFILTERS */}
        <div align="center">
          <input type="button" onClick={pgDn} disabled={pages <= 0} value="<" />
          <span>
            Página {Math.ceil((pages + pageSize) / pageSize)}
            (resultados {pages + 1}-{pages + thisPage.length})
          </span>
          <input type="button" onClick={pgUpFiltered}
            disabled={pages + pageSize >= filters.length} value=">"/>
            </div>
        <ActivityCards events={filteredPage}/>
        </>
        :<div>
        <Carousel />
                  {/* PAGINATION BUTTONS WITHOUTFILTERS */}
                  <div align="center">
          <input type="button" onClick={pgDn} disabled={pages <= 0} value="<" />
          <span>
            Página {Math.ceil((pages + pageSize) / pageSize)}
            (resultados {pages + 1}-{pages + thisPage.length})
          </span>
          <input type="button" onClick={pgUpNoFilter}
            disabled={pages + pageSize >= events.length} value=">"/>
            </div>
          <ActivityCards events={thisPage} /></div>}
        

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