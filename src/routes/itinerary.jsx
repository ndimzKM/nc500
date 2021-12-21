import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadItineraries, setHostels } from "../redux/actions";
import EditStage from "../components/EditStage";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

const Itinerary = () => {
  const { stages, itinerary, hostels } = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  const [single, setSingle] = useState({});
  const [tempStages, setTempStages] = useState([]);
  const [distances, setDistances] = useState([]);

  const generateFake = () => {
    let fakeStages = [];
    for (let i = 1; i <= single.stages.length; i++) {
      fakeStages.push({
        id: i,
        hostel: 1,
        nights: 0,
      });
    }
    setTempStages(fakeStages);
  };

  const calcDistances = () => {
    let tempDistances = [];
    single.stages.forEach((st) => {
      tempDistances.push({
        hostel: st.hostel,
      });
    });

    tempDistances = tempDistances.map((temp) => {
      let ht = hostels.find((h) => h.id == temp.hostel);
      return { ...temp, lat: ht.location.lat, long: ht.location.long };
    });

    console.log(tempDistances);
    let _distances = [];
    for (let i = 0; i < tempDistances.length - 1; i++) {
      let lat1 = tempDistances[i].lat;
      let lat2 = tempDistances[i + 1].lat;

      let long1 = tempDistances[i].long;
      let long2 = tempDistances[i + 1].long;

      lat1 = (lat1 * Math.PI) / 180;
      long1 = (long1 * Math.PI) / 180;
      lat2 = (lat2 * Math.PI) / 180;
      long2 = (long2 * Math.PI) / 180;

      let dlong = long2 - long1;
      let dlat = lat2 - lat1;

      let a =
        Math.pow(Math.sin(dlat / 2), 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlong / 2), 2);

      let c = 2 * Math.asin(Math.sqrt(a));
      let r = 3956;

      _distances.push(c * r);
    }
    setDistances(_distances);
    console.log(_distances);
  };

  const changeStage = (e, id) => {
    let values = [...tempStages];
    let value = tempStages.find((st) => st.id == id);
    values[id - 1] = value;
    console.log(id);
    value = {
      ...value,
      [e.target.name]: e.target.value,
    };
    console.log(values);
    setTempStages(values);
  };

  const saveChanges = (e) => {
    e.preventDefault();
    console.log(stages);
  };

  const totalDistance = () => {
    let total = 0;
    distances.forEach((d) => {
      total += d;
    });
    console.log("Hello ", distances);
    return parseFloat(total).toFixed(2);
  };

  useEffect(() => {
    dispatch(loadItineraries("student2775"));
    dispatch(setHostels());
  }, []);

  useEffect(() => {
    setSingle(itinerary[0] || []);
  }, [itinerary]);

  useEffect(() => {
    if (single.stages && single.stages.length > 0 && hostels.length > 1) {
      generateFake();
      calcDistances();
    }
  }, [single]);

  return (
    <div className="App">
      <div className="App-header">
        {single.stages ? (
          <div className="itinerary">
            <h1>Start Date: {single.startdate}</h1>
            <h1>Number of Stages: {single.stages.length}</h1>
            <br />
            {distances.map((d, index) => {
              return (
                <div key={uuidv4()}>
                  Distance between Stage ({index + 1}) and Stage ({index + 2}):{" "}
                  <span>{parseFloat(d).toFixed(2)}KM</span>
                </div>
              );
            })}
            <p>Total Distance = {totalDistance()}KM</p>
            <br />
            <div>
              <form className="editform">
                {single.stages.map((stage) => {
                  return <EditStage key={uuidv4()} stage={stage} />;
                })}
              </form>
            </div>

            <button className="saveChanges" onClick={(e) => saveChanges(e)}>
              Save Changes
            </button>
          </div>
        ) : (
          <p>No itinerary added</p>
        )}
        <br />
        <Link to="/" className="back">
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default Itinerary;
