import React, { useEffect, useState } from "react";
import Hostel from "./components/Hostel";
import "./styles/style.css";
import axios from "axios";
import { ImPlus, ImEye } from "react-icons/im";
import Modal from "./components/Modal";
import { useSelector, useDispatch } from "react-redux";
import { setHostels, toggleModal } from "./redux/actions";
import { Link } from "react-router-dom";

function App() {
  const { hostels, modalActive } = useSelector((state) => state.reducer);

  const dispatch = useDispatch();

  const [hostelsFilter, setHostelsFilter] = useState([]);
  const [searchField, setSearchField] = useState("");

  const setSearchFieldValue = (searchValue) => {
    setSearchField(searchValue);
  };

  const filterHostels = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:5000/hostels/search/${searchField}`)
      .then((res) => {
        console.log(res);
        let { data } = res;
        setHostelsFilter(data);
      })
      .catch((err) => console.log(err));
  };

  const toggleModalUI = (e) => {
    e.preventDefault();
    dispatch(toggleModal(!modalActive));
  };

  const hideModal = () => {
    dispatch(toggleModal(false));
  };

  useEffect(() => {
    dispatch(setHostels());
  }, []);

  useEffect(() => {
    if (hostels.length > 0) {
      setHostelsFilter(hostels);
    }
  }, [hostels]);

  return (
    <div className="App">
      <nav>
        <h2>NC 500</h2>
        <div className="actions">
          <Link to="/itinerary">
            {" "}
            <ImEye /> <span>View Itinerary</span>
          </Link>
          <button onClick={(e) => toggleModalUI(e)}>
            {" "}
            <ImPlus /> <span>Create Itinerary</span>
          </button>
        </div>
      </nav>
      <header className="App-header" onClick={() => hideModal()}>
        <h2>Welcome to NC500</h2>
        <form onSubmit={(e) => filterHostels(e)} className="form">
          <input
            type="text"
            placeholder="Search hostel"
            onChange={(e) => setSearchFieldValue(e.target.value)}
            value={searchField}
          />
          <button type="submit">Search</button>
        </form>
      </header>
      <main>
        <section className="hostels">
          {searchField.length > 1
            ? hostelsFilter.map((ht) => <Hostel hostel={ht} key={ht.id} />)
            : hostels.map((ht) => <Hostel hostel={ht} key={ht.id} />)}
        </section>
      </main>
      {modalActive && <Modal />}
    </div>
  );
}

export default App;
