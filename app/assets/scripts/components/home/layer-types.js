export const layerTypes = {
  raster: {
    hide: (mbMap, layerInfo, props) => {
      const { id } = layerInfo;
      if (mbMap.getSource(id)) {
        mbMap.setLayoutProperty(id, 'visibility', 'none');
      }
    },
    show: (mbMap, layerInfo, props) => {
      const { id, source } = layerInfo;
      if (mbMap.getSource(id)) {
        mbMap.setLayoutProperty(id, 'visibility', 'visible');
      } else {
        mbMap.addSource(id, source);
        mbMap.addLayer({
          id: id,
          type: 'raster',
          source: id
        }, 'admin-1-boundary-bg');
      }
    }
  }
};
