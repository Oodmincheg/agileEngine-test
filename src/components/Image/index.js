import React, { useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../utils/api';

function Image({ id, cropped_picture, onClick }) {
  return (
    <img
      key={id}
      src={cropped_picture}
      alt="thumb"
      onClick={() => onClick(id)}
    />
  );
}

Image.propTypes = {
  id: PropTypes.string,
  cropped_picture: PropTypes.string,
};

export default Image;
