import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import moment from 'moment';

const ProfileEducation = ({
  education: { school, degre, fieldofstudy, current, to, from, description }
}) => {
  return (
    <div>
      <h3 className="text-dark">{school} </h3>
      <p>
        <Moment format="YYYY/MM/DD"> {moment.utc(from)} </Moment> -{" "}
        {!to ? "Now" : <Moment format="YYYY/MM/DD"> {moment.utc(to)} </Moment>}
      </p>
      <p>
          <strong>Degree: </strong> {degre}
      </p>
      <p>
          <strong>Field Of Study: </strong> {fieldofstudy}
      </p>
      <p>
          <strong>Description: </strong> {description}
      </p>
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.array.isRequired
};

export default ProfileEducation;
