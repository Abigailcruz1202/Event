import React from "react";

const ShoppingList = ({ events }) => {
  return (
    <>
      <ul>
        {events.map((event) => (
          <li>
            <img src={event.picture[0]} alt="" />
            <h4> {event.name} </h4>
            <p>{event.price}</p>
            <p>{event.tags}</p>
            <p>{event.weekday}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ShoppingList;
