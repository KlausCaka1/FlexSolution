import React, {Component} from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';
import Geocode from 'react-geocode';
import ReactDOM from "react-dom";
import Modal from './Modal';
import './App.css'
import './Modal.css';

Geocode.setApiKey("AIzaSyCp0DdA_3fCu67ojmtQUjNahSkwI4NlE-M");

class MapComponent extends Component {

    lastId = 1;

    state = {
        activeMarker: null,
        infoWindowOpen: false,
        infoWindow: '',
    };

    setInfo = (event) => {
        this.setState({
            infoWindow: event.target.value
        });
    };

    onSave = () => {
        const newMarkers = [...this.props.markers];
        const activeIndex = newMarkers.findIndex(marker => marker.id === this.state.activeMarker.id);
        newMarkers[activeIndex] = {
            ...newMarkers[activeIndex],
            description: this.state.infoWindow,
        };
        this.props.setMarkers(newMarkers);
        this.setState({
            infoWindowOpen: false
        });
    };

    onClick = (t, map, coord) => {
        const {latLng} = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();

        this.props.setMarkers([
            ...this.props.markers,
            {
                id: this.lastId,
                position: {lat, lng},
                description: '',
            }]);
        this.lastId++;
    };

    onMarkerClick = (marker) => {
        this.setState({
            activeMarker: marker,
            infoWindow: marker.description,
            infoWindowOpen: true,
        });
    };

    windowHasClosed = () => {
        this.setState({infoWindowOpen: false});
        console.log(this.state);
    };


    render() {
        return (
            <div className={this.props.disabled ? 'small__map': 'map'}>
                <Map
                    google={this.props.google}
                    zoom={15}
                    style={this.props.small ? smallMapStyles : mapStyles}
                    initialCenter={{lat: 41.3275, lng: 19.8187}}
                    onClick={this.props.disabled ? null : this.onClick}
                    zoomControl={false}
                >
                    {this.props.markers.map((marker, index) => (
                        <Marker
                            key={index}
                            position={marker.position}
                            onClick={() => this.onMarkerClick(marker)}>>
                        </Marker>
                    ))}
                </Map>
                <Modal
                    className="modal"
                    close={this.windowHasClosed}
                    add={this.onSave}
                    disabled={this.props.disabled}
                    show={this.state.infoWindowOpen}>
                    Info :
                    <input type="text"
                           disabled={this.props.disabled}
                           value={this.state.infoWindow}
                           onChange={this.setInfo}
                           id="Adresa"/>
                </Modal>
            </div>
        )
    }
}

const mapStyles = {
    width: '55rem',
    height: '21.5rem'
};

const smallMapStyles = {
    width: '100%',
    height: '100%'
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCp0DdA_3fCu67ojmtQUjNahSkwI4NlE-M'
})(MapComponent);
