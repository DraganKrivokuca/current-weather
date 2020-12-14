import '../assets/css/Main.css';
import React, { useState } from 'react';

function Location({ setCity, currentCity, background }) {

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const positionOfWeek = new Date().getDay();
    const [term, setTerm] = useState('');
    const [searchResult, setSearchResult] = useState(currentCity);
    let [openModal, setopenModal] = useState(false);
    const showHideClassName = openModal ? "modal display-block" : "modal display-none";

    const changeTerm = function (e) {
        setTerm(e.target.value);
    }

    const search = function () {
        setSearchResult(term);
        setCity(term);
        setTerm('');
        setopenModal(false);
    }

    const openSearchForm = function () {
        setopenModal(true);
        openModal = !openModal;
    }

    const cancel = function () {
        setopenModal(false);
    }

    return (
        <div>
            <div>
                <div onClick={openSearchForm} className="ui icon button"
                    data-position="bottom right" data-inverted=""
                    style={{ marginLeft: '80%', background: 'unset', color: '#fff', border: '1px solid #fff' }}>
                    <i className="add icon"></i>
                </div>
            </div>
            <div className={showHideClassName}>
                <section className={`modal-main ${background}`}>
                    <div style={{top: '40%'}} className="ui form">
                        <div className="field">
                            <input style={{ width: '80%', background: 'unset', borderColor: '#fff', color: '#fff' }}
                                onChange={(e) => changeTerm(e)} type="text" value={term} placeholder='Enter City Name' />
                        </div>
                        {/* <button className="ui button" onClick={search}>
                            Search
                        </button> */}
                        <div onClick={search} className="ui icon button"
                             data-position="bottom right" data-inverted=""
                             style={{ background: 'unset', color: '#fff', border: '1px solid #fff' }}>
                                 Search
                            <i className="search icon"></i>
                        </div>
                        <div onClick={cancel} className="ui icon button"
                             data-position="bottom right" data-inverted=""
                             style={{ background: 'unset', color: '#fff', border: '1px solid #fff' }}>
                                 Close
                            <i className="close icon"></i>
                        </div>
                        {/* <button className="ui button" onClick={cancel}>
                            Close
                        </button> */}
                    </div>
                </section>
            </div>
            <div className="location-container">
                <div className="location">
                    {searchResult}
                </div>
                <br />
                <br />
                <div className="date">
                    {days[positionOfWeek]}
                </div>
            </div>
        </div>
    );
}

export default Location;