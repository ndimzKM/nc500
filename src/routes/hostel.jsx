import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { ImLocation, ImSphere } from "react-icons/im";
import { Link } from "react-router-dom";
import BarChart from "../components/BarChart";

const HostelDetails = () => {
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  const query = useQuery();
  const id = query.get("id");

  const [hostel, setHostel] = useState(null);
  const [review, setReview] = useState({ reviewer: "", review: "" });

  const addReview = (e) => {
    e.preventDefault();
    // /hostels/review/:id
    axios
      .post(`http://localhost:5000/hostels/review/${id}`, review)
      .then((res) => {
        let { data } = res;
        setHostel(data);
      })
      .catch((err) => console.log(err));
  };

  const updateReview = (e) => {
    e.target.type == "text"
      ? setReview((prevState) => {
          return { ...prevState, reviewer: e.target.value };
        })
      : setReview((prevState) => {
          return { ...prevState, review: e.target.value };
        });
  };

  const ratingsResolved = () => {
    let average = 0;
    for (let i = 0; i < hostel.ratings.length; i++) {
      average += hostel.ratings[i];
    }
    average = average / hostel.ratings.length;
    return parseFloat(average).toFixed(1);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/hostels/${id}`)
      .then((res) => {
        let { data } = res;
        setHostel(data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        {hostel != null ? (
          <div className="hostel edithostel">
            <h2>{hostel.name}</h2>
            <div className="location">
              <p className="lat">
                <ImSphere />
                <div className="span">
                  <span>Lat: {hostel.location.lat}</span>
                  <span>Long: {hostel.location.long}</span>
                </div>
              </p>

              <p>
                <ImLocation />
                <span>Address: {hostel.address}</span>
              </p>
            </div>
            <p>{hostel.description}</p>
            <br />
            <p>Phone: {hostel.phone}</p>
            <p>
              Ratings({hostel.ratings.length}): Average= {ratingsResolved()}
            </p>
            <div style={{ maxWidth: "650px" }}>
              <BarChart ratings={hostel.ratings} />
            </div>
            <div>
              <p>Reviews</p>
              {hostel.reviews.map((rev) => (
                <div key={uuidv4()}>
                  <b>{rev.reviewer}</b>: <span>{rev.review}</span>
                </div>
              ))}
            </div>
            <form onSubmit={(e) => addReview(e)}>
              <h4>Add New Review</h4>
              <input
                type="text"
                placeholder="Name"
                value={review.reviewer}
                onChange={(e) => updateReview(e)}
              />
              <textarea
                value={review.review}
                placeholder="Your review"
                id=""
                cols="30"
                onChange={(e) => updateReview(e)}
                rows="10"
              ></textarea>
              <button type="submit">Submit</button>
            </form>
            <br />
            <Link to="/" className="back">
              Go Back
            </Link>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default HostelDetails;
