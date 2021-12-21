import React from "react";
import { ImLocation, ImSphere } from "react-icons/im";
import { Link } from "react-router-dom";

const Hostel = ({ hostel, ratingsAvg, names }) => {
  let ratingsResolved = () => {
    let average = 0;
    for (let i = 0; i < hostel.ratings.length; i++) {
      average += hostel.ratings[i];
    }
    average = average / hostel.ratings.length;
    return parseFloat(average).toFixed(1);
  };
  return (
    <div className="hostel">
      <h4>{hostel.name}</h4>
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
      <p>Phone: {hostel.phone}</p>
      <p>
        Ratings({hostel.ratings.length}): Average= {ratingsResolved()}
      </p>
      <br />
      <Link to={`/hostel?id=${hostel.id}`}>Details</Link>
      {/* <div>
        <p>Reviews</p>
        {hostel.reviews.map((review) => (
          <div key={4()}>
            <b>{review.reviewer}</b>: <span>{review.review}</span>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Hostel;
