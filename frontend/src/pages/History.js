import React from "react";
import { Link } from "react-router-dom";

const History = () => {
  const history = JSON.parse(localStorage.getItem("history"));
  return (
    <div>
      <Link to='/'> &#8592; back</Link>
      {history
        ? history.map((ride, ind) => (
            <div>
              {ind + 1}.{ride._id}
            </div>
          ))
        : "no history"}
    </div>
  );
};

export default History;
