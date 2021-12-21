import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateItinerary,
  updateStages,
  updateSingleStage,
  toggleModal,
  loadItineraries,
} from "../redux/actions";

import axios from "axios";

const Modal = () => {
  const { hostels, stages, itinerary } = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const [tempItinerary, setTempItinerary] = useState({
    startdate: "",
    stages: 0,
  });

  const [tempStages, setTempStages] = useState(stages);

  const onChangeItineraryInput = (e) => {
    setTempItinerary((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const changeStage = (e, id) => {
    let values = [...tempStages];
    values[id] = { ...values[id], id: id, [e.target.name]: [e.target.value] };
    setTempStages(values);
  };

  const storeItinerary = (e) => {
    e.preventDefault();

    let fakeStages = [];
    for (let i = 0; i < tempItinerary.stages; i++) {
      fakeStages.push({
        id: i,
        hostel: {},
        nights: 0,
      });
    }

    dispatch(updateItinerary(tempItinerary));
    dispatch(updateStages(fakeStages));
  };

  const saveStages = (e) => {
    e.preventDefault();

    /*
    
    
    "user": "Alice",
        "startdate" : new Date(2022, 5, 24),
        "stages": [
            {"stage":1, "hostel":1, "nights": 2}
        ]
    
    */
    let date = new Date(itinerary.startdate);
    let payloadStages = tempStages.map((stage) => {
      return {
        stage: stage.id + 1,
        hostel: stage.hostel ? Number(stage.hostel[0]) : 1,
        nights: Number(stage.nights[0]),
      };
    });
    let payload = {
      user: "student2775",
      startdate: date,
      stages: payloadStages,
    };

    axios
      .post(`http://localhost:5000/itineraries/new/${payload.user}`, payload)
      .then((res) => {
        let { data } = res;
        console.log(data);
        alert("Itinerary Saved");
        dispatch(toggleModal(false));
        dispatch(loadItineraries("student2775"));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeModal = () => {
    dispatch(toggleModal(false));
  };

  return (
    <div className="modal">
      <div className="container">
        <h3>Create Itinerary</h3>
        <form>
          <div className="group">
            <label htmlFor="startdate">Start date</label>
            <input
              type="date"
              name="startdate"
              id="startdate"
              pattern="\d{4}-\d{2}-\d{2}"
              value={tempItinerary.startdate}
              onChange={(e) => onChangeItineraryInput(e)}
            />
          </div>
          <div className="group">
            <label htmlFor="stages">Stages</label>
            <input
              type="number"
              name="stages"
              id="stages"
              value={tempItinerary.stages}
              onChange={(e) => onChangeItineraryInput(e)}
            />
          </div>
          <button onClick={(e) => storeItinerary(e)}>Save stages</button>
        </form>
        <form className="stages">
          {stages.map((stage) => {
            return (
              <div key={stage.id}>
                <select
                  name="hostel"
                  id=""
                  onChange={(e) => changeStage(e, stage.id)}
                >
                  {hostels.map((ht) => {
                    return (
                      <option key={ht.id} value={ht.id}>
                        {ht.name}
                      </option>
                    );
                  })}
                </select>
                <input
                  type="number"
                  name="nights"
                  onChange={(e) => changeStage(e, stage.id)}
                />
              </div>
            );
          })}
          <button className="finalSave" onClick={(e) => saveStages(e)}>
            Save All
          </button>
          <button
            style={{
              backgroundColor: "#fc4e8e",
              color: "#fff",
              borderColor: "#fc4e8e",
              display: "block",
            }}
            onClick={(e) => closeModal(e)}
          >
            Close Modal
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
