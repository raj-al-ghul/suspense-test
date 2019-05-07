import React from "react";
import './App.css';
import { unstable_createResource } from 'react-cache';

const restaurantListResource = unstable_createResource(() => {
  return new Promise((resolve, reject) => {
    fetch('https://jsonplaceholder.typicode.com/todos/')
      .then(res => res.json())
      .then(x => new Promise(resolve => setTimeout(() => resolve(x), 2000)))
      .then(response => {
        resolve(response);
      });
  });
});

const RestaurantList = () => {
  // if no restaurants are found in the cache, the suspense will throw a promise
  const restaurants = restaurantListResource.read();
  // this line will have to wait until that promise resolves
  return (
    <article>
      <h2 className="f3 fw4 pa3 mv0">Restaurant List</h2>
      <div className="cf pa2">{JSON.stringify(restaurants)}</div>
    </article>
  );
};

function App() {
  return (
    <React.Fragment>
      <h2 style={{ textAlign: "center" }}>{`React: ${React.version} Demo`}</h2>

      <React.Suspense delayMs={50} fallback={'Loading...'}>
        <RestaurantList />
      </React.Suspense>
    </React.Fragment>
  );
}

export default App;
