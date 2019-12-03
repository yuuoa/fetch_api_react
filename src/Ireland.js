import React, { Component } from "react";

class Ireland extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    fetch("https://randomuser.me/api/?results=10&nat=ie")
      .then(res => res.json())
      .then(parsedJSON =>
        parsedJSON.results.map(data => ({
          id: `${data.id.name}`,
          firstName: `${data.name.first}`,
          lastName: `${data.name.last}`,
          locationStreet: `${data.location.street.number},${data.location.street.name}`,
          locationCity: `${data.location.city}, ${data.location.state}`,
          country: `${data.location.country}`,
          thumbnail: `${data.picture.large}`,
          gender: `${data.gender}`,
          age: `${data.dob.age}`
        }))
      )
      .then(items =>
        this.setState({
          items,
          isLoaded: false
        })
      )
      .catch(error => console.log("parsing failed", error));
  }

  render() {
    const { items } = this.state;
    return (
      <div className="boxWhite">
        <h2>Random User</h2>
        {items.length > 0
          ? items.map(item => {
              const {
                id,
                firstName,
                lastName,
                locationStreet,
                locationCity,
                country,
                thumbnail,
                gender,
                age
              } = item;
              return (
                <div key={id} className="bgCircle">
                  <center>
                    <img src={thumbnail} alt={firstName} className="circle" />{" "}
                  </center>
                  <br />
                  <div className="ctr">
                    {firstName} {lastName}
                    <br />
                    {gender}, {age}
                    <br />
                    {locationStreet} <br />
                    {locationCity} <br />
                    {country}
                  </div>
                </div>
              );
            })
          : null}
      </div>
    );
  }
}

export default Ireland;