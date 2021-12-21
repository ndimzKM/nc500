import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateStages, loadItineraries } from "../redux/actions";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const EditStage = ({ stage }) => {
  const { stages, itinerary, hostels } = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const stageContainer = useRef();

  const [singleStage, setSingleStage] = useState({
    hostel: stage.hostel,
    nights: stage.nights,
  });

  const changeStage = (e, id) => {
    let allStages = itinerary[0].stages;
    // console.log(allStages);
    let value = allStages.find((st) => st.stage == id);
    value.stage = Number(value.stage);
    value = {
      ...value,
      [e.target.name]: Number(e.target.value),
    };
    allStages[id - 1] = value;
    dispatch(updateStages(allStages));
    setSingleStage((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });

    let payload = {
      user: "student2775",
      stage: value,
    };

    axios
      .post(
        `https://cwapi-one.herokuapp.com/itineraries/stages/update/${payload.user}/${id}`,
        payload.stage
      )
      .then((res) => {
        let { data } = res;
        console.log(data);
        dispatch(loadItineraries("student2775"));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div ref={stageContainer} className="stage">
      <span>Stage {stage.stage}</span>
      <div>
        <div>
          <label htmlFor="">Hostel</label>
          <select
            name="hostel"
            id=""
            value={singleStage.hostel}
            onChange={(e) => changeStage(e, stage.stage)}
          >
            {hostels.map((ht) => {
              return (
                <option key={uuidv4()} value={ht.id}>
                  {ht.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label htmlFor="nights">Number of nights</label>
          <input
            type="number"
            value={singleStage.nights}
            onChange={(e) => changeStage(e, stage.stage)}
            name="nights"
          />
        </div>
      </div>
    </div>
  );
};

export default EditStage;
