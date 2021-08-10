import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import Input from "../../shared/components/Input/Input";
import Button from "../../shared/components/Button/Button";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./NewPlace.css";
import Card from "../../shared/components/Card/Card";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Sydney Harbour Bridge",
    imageURL:
      "https://images.pexels.com/photos/1680247/pexels-photo-1680247.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description:
      "The Sydney Harbour Bridge is an Australian heritage-listed steel through arch bridge across Sydney Harbour that carries rail, vehicular, bicycle, and pedestrian traffic between the Sydney central business district (CBD) and the North Shore",
    address: "North Sydney, NSW",
    location: {
      latitude: -33.8523063,
      Longtitude: 151.2085984,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "London2 Tower Bridge",
    imageURL:
      "https://images.pexels.com/photos/3220846/pexels-photo-3220846.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    description:
      "Tower Bridge is a Grade I listed combined bascule and suspension bridge in London, built between 1886 and 1894, engineered by John Wolfe Barry and architected by Horace Jones",
    address: "Tower bridge road London",
    location: {
      latitude: 51.5054564,
      Longtitude: -0.0775452,
    },
    creator: "u2",
  },
];

const UpdatePlace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        // value: identifiedPlace.title,
        value: "",
        isValid: false,
      },
      description: {
        // value: identifiedPlace.description,
        value: "",
        isValid: false,
      },
    },
    false
  );

  const identifiedPlace = DUMMY_PLACES.find((each) => each.id === placeId);
  // the initial value was set to empty so that could save time, after got data, want to update the initial value

  useEffect(() => {
    if (identifiedPlace) { // if identifiedData exists will reload the data in the update form.
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace.description,
            isValid: true,
          },
        },
        true
      );
    }

    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  const placeUpdateSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find any place!</h2>
        </Card>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading.....</h2>
      </div>
    );
  }
  return (
    //only when formstate value exist will return the form.

    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        // type="text"
        label="Description"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter description"
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Update Place
      </Button>
    </form>
  );
};

export default UpdatePlace;
