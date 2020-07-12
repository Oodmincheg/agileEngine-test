import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-image-lightbox';
import Image from '../Image';
import InfiniteScroll from 'react-infinite-scroll-component';

import api from '../../utils/api';

import './style.css';
import 'react-image-lightbox/style.css';

function Gallery({ token, getToken }) {
  const [pageImages, setPageImages] = useState([]);
  const [page, setPage] = useState(0);
  const [imageViewIsOpened, setImageIsOpened] = useState(false);
  const [imageDetails, setImageDetails] = useState({});

  useEffect(() => {
    if (token) getPageImages();
  }, [token, page]);

  function getPageImages() {
    api
      .get(`/images?pages=${page}`, { headers: { Authorization: token } })
      .then((res) => setPageImages([...pageImages, ...res?.data?.pictures]))
      .catch((error) => getToken());
  }

  function getImageDetails(id) {
    api
      .get(`/images/${id}`, { headers: { Authorization: token } })
      .then((res) => setImageDetails(res?.data))
      .catch((error) => getToken());
  }

  function openImageDetails(id) {
    getImageDetails(id);
    setImageIsOpened(true);
  }

  return (
    <>
      <InfiniteScroll
        dataLength={pageImages.length} //This is important field to render the next data
        next={() => setPage(page + 1)}
        hasMore={true}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="gallery">
          {pageImages.map(({ id, cropped_picture }) => {
            return (
              <>
                <Image
                  key={id}
                  cropped_picture={cropped_picture}
                  id={id}
                  alt="thumb"
                  onClick={openImageDetails}
                />
                {imageViewIsOpened && (
                  <Lightbox
                    mainSrc={imageDetails?.full_picture}
                    onCloseRequest={() => setImageIsOpened(false)}
                    onMoveNextRequest={() => console.log('next')}
                    imageCaption={
                      <>
                        <p>Author: {imageDetails?.author}</p>
                        <p>Camera: {imageDetails?.camera}</p>
                        <p>Tags: {imageDetails?.tags}</p>
                      </>
                    }
                  />
                )}
              </>
            );
          })}
        </div>
      </InfiniteScroll>
    </>
  );
}

Gallery.propTypes = {
  token: PropTypes.string,
  getToke: PropTypes.func,
};

export default Gallery;
