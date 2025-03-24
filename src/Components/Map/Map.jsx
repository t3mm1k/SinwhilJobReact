import React, { useEffect, useRef } from 'react';
import './Map.css';
import { connect } from 'react-redux';
import { fetchMapData } from '../../store/slices/mapDataSlice';

function MapComponent({ mapData, fetchMapData }) {
    const mapRef = useRef(null);
    const [mapInstance, setMapInstance] = React.useState(null);

    useEffect(() => {
        fetchMapData();
    }, [fetchMapData]);

    useEffect(() => {
        if (!mapRef.current) {
            console.error("Map element not found (mapRef.current is null).");
            return;
        }

        async function initMap() {
            if (mapInstance) {
                console.log("Map already initialized, skipping creation");
                return;
            }

            if (!window.ymaps3 || !window.ymaps3.ready) {
                console.error("Yandex Maps 3 library is not loaded.");
                return;
            }

            await window.ymaps3.ready;

            const {
                YMap,
                YMapDefaultSchemeLayer,
                YMapDefaultFeaturesLayer,
            } = window.ymaps3;

            const newMap = new YMap(mapRef.current, {
                location: {
                    center: [37.588144, 55.733842],
                    zoom: 10
                }
            });

            newMap.addChild(new YMapDefaultSchemeLayer());
            newMap.addChild(new YMapDefaultFeaturesLayer());

            setMapInstance(newMap);
        }
        initMap();
    }, [mapInstance]); // Include fetchMapData for completeness, though it's not directly used here.

    useEffect(() => {
        if (!mapInstance) {
            console.log("Map not yet initialized, skipping data processing");
            return;
        }

        async function updateMapData() {
            if (!window.ymaps3 || !window.ymaps3.ready) {
                console.error("Yandex Maps 3 library is not loaded.");
                return;
            }

            await window.ymaps3.ready;

            const { YMapMarker, YMapListener } = window.ymaps3;

            let clustererImport = null;
            try {
                clustererImport = await window.ymaps3.import('@yandex/ymaps3-clusterer@0.0.1');
            } catch (error) {
                console.error("Failed to import clusterer:", error);
                return;
            }

            const { YMapClusterer, clusterByGrid } = clustererImport;

            function createMarketplaceMarker(marketplace, adInfo) {
                const markerElement = document.createElement('div');
                markerElement.classList.add('custom-marker');

                let logoSrc = '';
                switch (marketplace) {
                    case 'Wildberries': logoSrc = './img/marketplace-logo/wb-logo.png'; break;
                    case 'Yandex': logoSrc = './img/marketplace-logo/yandex-market-logo.png'; break;
                    case 'Ozon': logoSrc = './img/marketplace-logo/ozon-logo.png'; break;
                    case 'Avito': logoSrc = './img/marketplace-logo/avito-logo.png'; break;
                    case 'Boxberry': logoSrc = './img/marketplace-logo/boxberry-logo.png'; break;
                    default: logoSrc = './img/icons/logo-dark.svg';
                }

                markerElement.innerHTML = `
                    <img src="${logoSrc}" alt="${marketplace}">
                    <div class="marker-context">
                        <p>${marketplace}</p>
                        <p>${adInfo}</p>
                    </div>
                `;
                return markerElement;
            }

            const markerRenderer = (feature) => {
                const { marketplace, adInfo } = feature.properties;
                const coordinates = feature.geometry.coordinates;
                const markerElement = createMarketplaceMarker(marketplace, adInfo);
                return new YMapMarker({ coordinates }, markerElement);
            };

            function clusterRenderer(coordinates, features) {
                const count = features.length;
                const clusterElement = document.createElement('div');
                clusterElement.classList.add('cluster-circle');
                clusterElement.textContent = count;
                return new YMapMarker({ coordinates }, clusterElement);
            }
            function jitterCoordinates(coordinates, jitterAmount = 0.0001) {
                const [lng, lat] = coordinates;
                const jitteredLng = lng + (Math.random() - 0.5) * 2 * jitterAmount;
                const jitteredLat = lat + (Math.random() - 0.5) * 2 * jitterAmount;
                return [jitteredLng, jitteredLat];
            }
            console.log("MapData", mapData);

            if (!mapData) {
                return; // Handle the case where mapData is still loading
            }


            const points = mapData.map((item, i) => {
                const coords = jitterCoordinates(item.coordinates)

                return {
                    type: 'Feature',
                    id: i,
                    geometry: {
                        type: 'Point',
                        coordinates: coords
                    },
                    properties: {
                        marketplace: item.marketplace,
                        adInfo: item.adInfo,
                        vacancy_type: item.vacancy_type
                    }
                };
            });

            //Clear old markers and clusters.
            mapInstance.children.forEach((child) => {
                if (child instanceof YMapClusterer || child instanceof YMapMarker) {
                    mapInstance.removeChild(child);
                }
            });


            const clusterer = new YMapClusterer({
                method: clusterByGrid({ gridSize: 48 }),
                features: points,
                marker: markerRenderer,
                cluster: clusterRenderer
            });

            mapInstance.addChild(clusterer);


            const mapListener = new YMapListener({
                layer: 'any',
                onUpdate: (event) => {
                    const zoom = event.location.zoom;
                    const markers = mapRef.current.querySelectorAll('.custom-marker');

                    markers.forEach(marker => {

                        if (!marker.classList.contains('cluster-circle')) {
                            if (zoom < 12) {
                                marker.classList.add('icon-only');
                            } else {
                                marker.classList.remove('icon-only');
                            }
                        }
                    });
                }
            });

            mapInstance.addChild(mapListener);


        }
        updateMapData();
    }, [mapData, mapInstance]);

    return (
        <div id="map" className="absolute top-[10px] left-[10px] w-[calc(100%-20px)] h-[calc(100%-20px)]" ref={mapRef}></div>
    );
}

const mapStateToProps = (state) => ({
    mapData: state.mapData.filteredData,
});

const mapDispatchToProps = (dispatch) => ({
    fetchMapData: () => dispatch(fetchMapData()),
});

const Map = connect(mapStateToProps, mapDispatchToProps)(MapComponent);

export default Map;