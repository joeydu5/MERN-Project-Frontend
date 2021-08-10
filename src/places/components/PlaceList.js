import Card from "../../shared/components/Card/Card";
import React from "react";
import PlaceItem from "./PlaceItem";
import Button from "../../shared/components/Button/Button";
import "./PlaceList.css";

const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No Place found, create one?</h2>
          <Button to='/places/new'>Share Place</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map((item) => (
        <PlaceItem
          key={item.id}
          id={item.id}
          image={item.image}
          title={item.title}
          description={item.description}
          address={item.address}
          creatorID={item.creator}
          coordinates={item.location}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
