import React from "react";
import moment from "moment";

function UserCreationDate({ creationDate }:any) {
  const formattedDate = moment(creationDate).format("DD/MM/YYYY");

  return <span>{formattedDate}</span>;
}

export default UserCreationDate;
