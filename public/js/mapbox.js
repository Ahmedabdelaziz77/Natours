export const displayMap = (locations) => {
  const map = L.map('map', {
    zoomControl: false,
    scrollWheelZoom: false,
  });

  L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    {
      attribution: '&copy; OpenStreetMap & Carto',
    },
  ).addTo(map);

  const bounds = new L.LatLngBounds();

  locations.forEach((loc) => {
    const customIcon = L.divIcon({
      className: 'marker',
      iconSize: [32, 40],
      iconAnchor: [16, 40],
    });

    const latlng = [loc.coordinates[1], loc.coordinates[0]];

    const marker = L.marker(latlng, {
      icon: customIcon,
    }).addTo(map);

    const popupContent = `
    <div class="mapboxgl-popup-content">
      <strong>${loc.description}</strong><br />
      Day ${loc.day}
    </div>
  `;

    const popup = L.popup({
      className: 'mapboxgl-popup',
      closeButton: true,
      autoClose: false,
      closeOnClick: false,
    })
      .setLatLng(latlng)
      .setContent(popupContent)
      .openOn(map);

    bounds.extend(latlng);
  });

  map.fitBounds(bounds, {
    padding: [100, 100],
    maxZoom: 13,
  });

  setTimeout(() => {
    map.invalidateSize();
  }, 200);

  L.control.zoom({ position: 'bottomright' }).addTo(map);
};
