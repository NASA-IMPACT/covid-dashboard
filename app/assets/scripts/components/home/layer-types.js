import { format } from 'date-fns';

const prepDateSource = (source, date) => ({
  ...source,
  tiles: source.tiles.map(t => t.replace('{date}', format(date, 'yyyyMM')))
});

export const layerTypes = {
  'raster-timeseries': {
    update: (mbMap, layerInfo, props, prevProps) => {
      const { id, source } = layerInfo;
      const { date } = props;

      if (prevProps.date && date.getTime() === prevProps.date.getTime()) return;

      if (mbMap.getSource(id)) {
        // https://github.com/mapbox/mapbox-gl-js/issues/2941
        // Set the tile url to a cache-busting url (to circumvent browser caching behaviour):
        mbMap.getSource(id).tiles = prepDateSource(source, date).tiles;
        // Remove the tiles for a particular source
        mbMap.style.sourceCaches[id].clearTiles();
        // Load the new tiles for the current viewport (mbMap.transform -> viewport)
        mbMap.style.sourceCaches[id].update(mbMap.transform);
        // Force a repaint, so that the map will be repainted without you having to touch the map
        mbMap.triggerRepaint();
      }
    },
    hide: (mbMap, layerInfo, props) => {
      const { id } = layerInfo;
      if (mbMap.getSource(id)) {
        mbMap.setLayoutProperty(id, 'visibility', 'none');
      }
    },
    show: (mbMap, layerInfo, props) => {
      const { id, source } = layerInfo;
      const { date } = props;

      if (!date) return;

      if (mbMap.getSource(id)) {
        mbMap.setLayoutProperty(id, 'visibility', 'visible');
      } else {
        mbMap.addSource(id, prepDateSource(source, date));
        mbMap.addLayer({
          id: id,
          type: 'raster',
          source: id
        }, 'admin-1-boundary-bg');
      }
    }
  }
};
