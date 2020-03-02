// gauna JSON, grazina objekta

const config = {
  endpoint: 'https://api.flickr.com/services/rest',
  galleries: [
    '72157689485704142',
    '72157705000178755',
    '72157692049980335',
    '72157653801148814',
    '72157712273183531',
    '72157712548441722'
  ],
  searchParams: {
    api_key: 'ca370d51a054836007519a00ff4ce59e',
    page: 1,
    per_page: 12,
    method: 'flickr.galleries.getPhotos',
    extras: 'owner_name',
    format: 'json',
    nojsoncallback: 1
  }
};

function transform(json) {
  const photos = new Map();

  json.photos.photo.forEach(
    ({
      farm,
      id,
      secret,
      server,
      title,
      ownername
    }) => {
      photos.set(id, {
        favouritedAt: '',
        title,
        ownername,
        src: `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_b.jpg`,
        srcAlt: `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_t.jpg`
        // t - thumbnail
        // n - 320x240
        // '' - 500x375
        // b - big
      });
    }
  );

  const { page, pages, perpage } = json.photos;
  const meta = {
    currentPage: parseInt(page, 10),
    allPages: parseInt(pages, 10),
    perPage: parseInt(perpage, 10)
  };

  return { meta, photos };
}

export default { config, transform };
