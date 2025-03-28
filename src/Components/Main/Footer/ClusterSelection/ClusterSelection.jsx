import React from 'react';
import { connect } from 'react-redux';
import Option from "./Option";
import './ClusterSelection.css';

function ClusterSelection({ isClusterSelectionOpen, clusterData }) {
    console.log(clusterData);
    return (
        <div className={`cluster-selection ${!isClusterSelectionOpen ? 'collapsed' : ''}`}>
            <div className="flex flex-col px-[10px] bg-[#242424]">
                {clusterData.map((item, index) => (
                    <Option
                        key={index}
                        position={item.properties.position}
                        adInfo={item.properties.adInfo}
                        marketplace={item.properties.marketplace}
                    />
                ))}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isClusterSelectionOpen: state.ui.isClusterSelectionOpen,
    clusterData: state.mapData.clusterData,
});

export default connect(mapStateToProps)(ClusterSelection);