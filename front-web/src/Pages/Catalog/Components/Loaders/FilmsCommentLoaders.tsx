
import React from "react";
import ContentLoader from 'react-content-loader'
import './styles.css';

const FilmCommentLoaders = () => {
  return (
    <div className="loaders-details">
      <ContentLoader
        speed={1}
        width={1170}
        height={170}
        viewBox="0 0 1170 170"
        backgroundColor="#ecebeb"
        foregroundColor="#6C6C6C"
      >
        <rect x="0" y="0" rx="10" ry="10" width="1170" height="170" />
      </ContentLoader>
    </div>
  )
}

export default FilmCommentLoaders;