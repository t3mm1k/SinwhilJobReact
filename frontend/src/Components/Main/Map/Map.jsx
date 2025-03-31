import React, { useEffect, useRef, useState } from 'react';
import './Map.css';
import { connect } from 'react-redux';
import { fetchMapData, setClusterData } from '../../../store/slices/mapDataSlice';
import { setSearchValue, setSearchResult } from '../../../store/slices/searchSlice';
import {
    toggleClusterSelectionVisibility,
    toggleFilterVisibility,
    toggleSearchVisibility,
    setFilterVisibility,
    setIsClusterSelectionOpen,
    setSearchVisibility
} from "../../../store/slices/uiSlice";

function MapComponent({ mapData, fetchMapData, searchValue, setSearchValue, searchResult, setClusterData, toggleClusterSelectionVisibility, isClusterSelectionOpen, isFilterOpen, isSearchOpen, setIsClusterSelectionOpen, setSearchVisibility, setFilterVisibility }) {
    const mapRef = useRef(null);
    const [mapInstance, setMapInstance] = useState(null);
    const [ymaps3Ready, setYmaps3Ready] = useState(false);

    useEffect(() => {
        fetchMapData();
    }, [fetchMapData]);

    useEffect(() => {
        if (!window.ymaps3 || !window.ymaps3.ready) {
            return;
        }
        async function waitForYmaps3() {
            await window.ymaps3.ready;
            setYmaps3Ready(true);
        }
        waitForYmaps3();
    }, []);

    useEffect(() => {
        if (!mapRef.current || !ymaps3Ready || mapInstance) {
            return;
        }

        async function initMap() {
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
    }, [ymaps3Ready, mapInstance]);

    useEffect(() => {
        if (!mapInstance || !ymaps3Ready) {
            return;
        }

        async function updateMapData() {
            const { YMapMarker, YMapListener } = window.ymaps3;

            let clustererImport = null;
            try {
                clustererImport = await window.ymaps3.import('@yandex/ymaps3-clusterer@0.0.1');
            } catch (error) {
                console.error("Failed to import clusterer:", error);
                return;
            }

            const { YMapClusterer, clusterByGrid } = clustererImport;

            function onMarkerClick(vacancy) {
                // console.log('markerClick');
            }

            function createMarketplaceMarker(vacancy) {
                const markerElement = document.createElement('div');
                markerElement.classList.add('custom-marker');
                markerElement.style.cursor = 'pointer';

                let logoSrc = '';
                switch (vacancy.marketplace) {
                    case 'Wildberries': logoSrc = './img/marketplace-logo/Wildberries.png'; break;
                    case 'Yandex': logoSrc = './img/marketplace-logo/Yandex.png'; break;
                    case 'Ozon': logoSrc = './img/marketplace-logo/Ozon.png'; break;
                    case 'Avito': logoSrc = './img/marketplace-logo/Avito.png'; break;
                    case 'Boxberry': logoSrc = './img/marketplace-logo/Boxberry.png'; break;
                    default: logoSrc = './img/icons/logo-dark.svg';
                }
                let salaryText = vacancy.vacancy_type === "part-time" ? " / за смену" : " / в месяц";
                markerElement.innerHTML = `
                    <img src="${logoSrc}" alt="${vacancy.marketplace}">
                    <div class="marker-context">
                        <p>${vacancy.position}</p>
                        <p>${vacancy.salary} ${salaryText}</p>
                    </div>
                `;
                return markerElement;
            }

            const markerRenderer = (feature) => {
                const coordinates = [feature.properties.address.longitude, feature.properties.address.latitude]; // Получаем координаты из feature.properties
                const markerElement = createMarketplaceMarker(feature.properties);
                console.log("markerElement", feature);

                markerElement.addEventListener('click', (e) => { // Added click listener for markers
                    e.stopPropagation(); // Prevent map click event

                    setClusterData([feature]); // Pass the feature as an array
                    mapInstance.setLocation({
                        center: coordinates,
                        zoom: Math.min(mapInstance.zoom + 2, 17),
                        duration: 500
                    });

                    if (!isClusterSelectionOpen) {
                        toggleClusterSelectionVisibility();
                    }
                });

                return new YMapMarker({ coordinates }, markerElement);
            };

            function clusterRenderer(coordinates, features) {
                const count = features.length;
                const clusterElement = document.createElement('div');
                clusterElement.classList.add('cluster-circle');
                clusterElement.textContent = count;
                clusterElement.style.cursor = 'pointer';

                clusterElement.addEventListener('click', (e) => {
                    if (features.length > 5) features = features.slice(0, 5);
                    e.stopPropagation();
                    mapInstance.setLocation({
                        center: coordinates,
                        zoom: Math.min(mapInstance.zoom + 2, 17),
                        duration: 500
                    });
                    setClusterData(features);

                    if (!isClusterSelectionOpen) {
                        toggleClusterSelectionVisibility();
                    }
                });
                return new YMapMarker({ coordinates }, clusterElement);
            }

            function jitterCoordinates(coordinates, jitterAmount = 0.0001) {
                const [lng, lat] = coordinates;
                const jitteredLng = lng + (Math.random() - 0.5) * 2 * jitterAmount;
                const jitteredLat = lat + (Math.random() - 0.5) * 2 * jitterAmount;
                return [jitteredLng, jitteredLat];
            }

            if (!mapData) {
                return;
            }

            const points = mapData.map((item, i) => {
                const coords = jitterCoordinates([item.address.longitude, item.address.latitude])
                console.log("point",item);
                return {
                    type: 'Feature',
                    id: i,
                    geometry: {
                        type: 'Point',
                        coordinates: coords
                    },
                    properties: item
                };
            });

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
                onClick: (event) => {
                    if (isClusterSelectionOpen) {
                        setIsClusterSelectionOpen(false);
                    }
                    if (isFilterOpen) {
                        setFilterVisibility(false);
                    }
                    if (isSearchOpen) {
                        setSearchVisibility(false);
                    }
                },
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
    }, [mapData, mapInstance, ymaps3Ready, toggleClusterSelectionVisibility, isClusterSelectionOpen, isFilterOpen, isSearchOpen]);

    useEffect(() => {
        if (!mapInstance || !searchResult) {
            return;
        }
        // console.log(searchResult, "Перемещение карты");
        mapInstance.update({
            location: {
                center: searchResult,
                zoom: 17,
                duration: 400
            }
        });
    }, [mapInstance, searchResult, setSearchValue, searchValue]);

    return (
        <div id="map" className="absolute top-[10px] left-[10px] w-[calc(100%-20px)] h-[calc(100%-20px)]" ref={mapRef}></div>
    );
}

const mapStateToProps = (state) => ({
    mapData: state.mapData.filteredData,
    searchValue: state.search.searchValue,
    searchResult: state.search.searchResult,
    isClusterSelectionOpen: state.ui.isClusterSelectionOpen,
    isFilterOpen: state.ui.isFilterOpen,
    isSearchOpen: state.ui.isSearchOpen
});

const mapDispatchToProps = (dispatch) => ({
    fetchMapData: () => dispatch(fetchMapData()),
    setSearchValue: (value) => dispatch(setSearchValue(value)),
    setClusterData: (data) => dispatch(setClusterData(data)),
    toggleClusterSelectionVisibility: () => dispatch(toggleClusterSelectionVisibility()),
    toggleFilterVisibility: () => dispatch(toggleFilterVisibility()),
    toggleSearchVisibility: () => dispatch(toggleSearchVisibility()),
    setIsClusterSelectionOpen: (value) => dispatch(setIsClusterSelectionOpen(value)),
    setSearchVisibility: (value) => dispatch(setSearchVisibility(value)),
    setFilterVisibility: (value) => dispatch(setFilterVisibility(value))
});

const Map = connect(mapStateToProps, mapDispatchToProps)(MapComponent);

export default Map;