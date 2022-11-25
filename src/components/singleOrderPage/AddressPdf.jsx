import React from "react";

function AddressPdf({ company, useraddress, fromaddress }) {
  return (
    <div
      ref={company}
      style={{ width: "100%", height: window.innerHeight, display: "flex"}}
    >
      <div
        style={{
          width: "33.33%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <div>
          <h3>TO:</h3>
          <h3>
            {useraddress.Name},{useraddress.LastName}
          </h3>
          <h3>{useraddress.StreetAddress}</h3>
          <h3>
            {useraddress.TownCity},{useraddress.Pincode}
          </h3>
          <h3>{useraddress.State}</h3>
          <h3>{useraddress.PhoneNumber}</h3>
          <h3>{useraddress.Email}</h3>
        </div>
        <div style={{ marginTop: "20%" }}>
          <h3>FROM:</h3>
          {fromaddress?.FromName ? (
            <>
              <h3>
                {fromaddress.FromName},{fromaddress.FromLastName}
              </h3>
              <h3>{fromaddress.FromStreetAddress}</h3>
              <h3>
                {fromaddress.FromTownCity},{fromaddress.FromPincode},
              </h3>
              <h3> {fromaddress.FromState}</h3>
              <h3>{fromaddress.FromPhoneNumber}</h3>
              <h3>{fromaddress.FromEmail}</h3>
            </>
          ) : (
            <>
              <h3>MOFFA CLOTHING</h3>
              <h3>1st FLOOR,62/9112,</h3>
              <h3>CONVENT ROAD</h3>
              <h3>ERNAKULAM,682035</h3>
              <h3>KERALA</h3>
            </>
          )}
        </div>
      </div>
      <div
        style={{
          width: "33.33%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <div>
          <h3>TO:</h3>
          <h3>
            {useraddress.Name},{useraddress.LastName}
          </h3>
          <h3>{useraddress.StreetAddress}</h3>
          <h3>
            {useraddress.TownCity},{useraddress.Pincode}
          </h3>
          <h3>{useraddress.State}</h3>
          <h3>{useraddress.PhoneNumber}</h3>
          <h3>{useraddress.Email}</h3>
        </div>
        <div style={{ marginTop: "20%" }}>
          <h3>FROM:</h3>
          {fromaddress?.FromName ? (
            <>
              <h3>
                {fromaddress.FromName},{fromaddress.FromLastName}
              </h3>
              <h3>{fromaddress.FromStreetAddress}</h3>
              <h3>
                {fromaddress.FromTownCity},{fromaddress.FromPincode},
              </h3>
              <h3> {fromaddress.FromState}</h3>
              <h3>{fromaddress.FromPhoneNumber}</h3>
              <h3>{fromaddress.FromEmail}</h3>
            </>
          ) : (
            <>
              <h3>MOFFA CLOTHING</h3>
              <h3>1st FLOOR,62/9112,</h3>
              <h3>CONVENT ROAD</h3>
              <h3>ERNAKULAM,682035</h3>
              <h3>KERALA</h3>
            </>
          )}
        </div>
      </div>
      <div
        style={{
          width: "33.33%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <div>
          <h3>TO:</h3>
          <h3>
            {useraddress.Name},{useraddress.LastName}
          </h3>
          <h3>{useraddress.StreetAddress}</h3>
          <h3>
            {useraddress.TownCity},{useraddress.Pincode}
          </h3>
          <h3>{useraddress.State}</h3>
          <h3>{useraddress.PhoneNumber}</h3>
          <h3>{useraddress.Email}</h3>
        </div>
        <div style={{ marginTop: "20%" }}>
          <h3>FROM:</h3>
          {fromaddress?.FromName ? (
            <>
              <h3>
                {fromaddress.FromName},{fromaddress.FromLastName}
              </h3>
              <h3>{fromaddress.FromStreetAddress}</h3>
              <h3>
                {fromaddress.FromTownCity},{fromaddress.FromPincode},
              </h3>
              <h3> {fromaddress.FromState}</h3>
              <h3>{fromaddress.FromPhoneNumber}</h3>
              <h3>{fromaddress.FromEmail}</h3>
            </>
          ) : (
            <>
              <h3>MOFFA CLOTHING</h3>
              <h3>1st FLOOR,62/9112,</h3>
              <h3>CONVENT ROAD</h3>
              <h3>ERNAKULAM,682035</h3>
              <h3>KERALA</h3>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddressPdf;
