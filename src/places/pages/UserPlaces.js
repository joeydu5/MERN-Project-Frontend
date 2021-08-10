import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import PlaceList from "../components/PlaceList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/UI/LoadingSpinner";
import ErrorModal from "../../shared/UI/ErrorModal";

// const DUMMY_PLACES = [
//   {
//     id: "p1",
//     title: "Sydney Harbour Bridge",
//     imageURL:
//       "https://images.pexels.com/photos/1680247/pexels-photo-1680247.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//     description:
//       "The Sydney Harbour Bridge is an Australian heritage-listed steel through arch bridge across Sydney Harbour that carries rail, vehicular, bicycle, and pedestrian traffic between the Sydney central business district (CBD) and the North Shore",
//     address: "North Sydney, NSW",
//     location: {
//       latitude: -33.8523063,
//       Longtitude: 151.2085984,
//     },
//     creator: "u1",
//   },
//   {
//     id: "p2",
//     title: "London Tower Bridge",
//     imageURL:
//       "https://images.pexels.com/photos/3220846/pexels-photo-3220846.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//     description:
//       "Tower Bridge is a Grade I listed combined bascule and suspension bridge in London, built between 1886 and 1894, engineered by John Wolfe Barry and architected by Horace Jones",
//     address: "Tower bridge road London",
//     location: {
//       latitude: 51.5054564,
//       Longtitude: -0.0775452,
//     },
//     creator: "u2",
//   },
// ];

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userID = useParams().userid;
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/places/users/${userID}`);
        setLoadedPlaces(responseData.places)
      } catch (err) {}
    };
  }, [sendRequest, userID]);
  // const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userID);
  // console.log(userID)
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} />}
    </React.Fragment>
  );
};

export default UserPlaces;
