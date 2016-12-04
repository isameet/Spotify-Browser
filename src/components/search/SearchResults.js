import React, {PropTypes} from 'react';

const SearchResults = ({results}) => {

  function getSmallImage(images) {
    const defaultImage = 'http://placekitten.com/64/64';
    let image = null;

    if (images && images.length > 0) {
      image = images.filter(image => image.width <= 64);
      image = image && image.length > 0 ? image[0].url : images[images.length - 1].url;
    }

    return (image || defaultImage);
  }

  return (
    <div className="container">
      <div className="col-xs-12 col-sm-8 col-sm-offset-2">

        {
          results.albums && results.albums.items && results.albums.items.length > 0 &&
          <div>
            <h2>Albums</h2>
            <ul className="results">
              {
                results.albums.items.map(item =>
                  <li key={item.id}>
                    <a href={item.href} target="_blank">
                      <img className="thumb" src={getSmallImage(item.images)}/>{item.name}
                    </a>
                  </li>
                )
              }
            </ul>
          </div>
        }

        {
          results.artists && results.artists.items && results.artists.items.length > 0 &&
          <div>
            <h2>Artists</h2>
            <ul className="results">
              {
                results.artists.items.map(item =>
                  <li key={item.id}>
                    <a href={item.href} target="_blank">
                      <img className="thumb" src={getSmallImage(item.images)}/>{item.name}
                    </a>
                  </li>
                )
              }
            </ul>
          </div>
        }

        {
          results.playlists && results.playlists.items && results.playlists.items.length > 0 &&
          <div>
            <h2>Playlists</h2>
            <ul className="results">
              {
                results.playlists.items.map(item =>
                  <li key={item.id}>
                    <a href={item.href} target="_blank">
                      <img className="thumb" src={getSmallImage(item.images)}/>{item.name}
                    </a>
                  </li>
                )
              }
            </ul>
          </div>
        }

        {
          results.tracks && results.tracks.items && results.tracks.items.length > 0 &&
          <div>
            <h2>Tracks</h2>
            <ul className="results">
              {
                results.tracks.items.map(item =>
                  <li key={item.id}>
                    <a href={item.href} target="_blank">
                      <img className="thumb" src={getSmallImage(item.album.images)}/>{item.name}
                    </a>
                  </li>
                )
              }
            </ul>
          </div>
        }

      </div>
    </div>
  );
};

SearchResults.propTypes = {
  results: PropTypes.object
};

export default SearchResults;
