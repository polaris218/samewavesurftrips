import React, { useState } from 'react'
import PropTypes from 'prop-types'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'
import { PlacesInput } from './styles'

const LocationSearchInput = props => {
  const [ address, setAddress ] = useState('')
  const handleChange = address => {
    setAddress(address)
  }

  const handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        const location = { ...latLng, name: address }
        setAddress(address)
        console.log('Location', location)
        if (location) {
          localStorage.setItem(
            'search_loc',
            JSON.stringify({ lat: location.lat, lng: location.lng })
          )
        }
        props.onChange(location)
      })
      .catch(error => console.error('Error', error))
  }

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <PlacesInput error={props.error}>
          <input
            {...getInputProps({
              placeholder: props.value,
              className: 'location-search-input'
            })}
          />

          <div className='autocomplete-dropdown-container'>
            {loading && <div>Loading...</div>}
            {suggestions.map(suggestion => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item'
              return (
                <div {...getSuggestionItemProps(suggestion, { className })}>
                  <span>{suggestion.description}</span>
                </div>
              )
            })}
          </div>
        </PlacesInput>
      )}
    </PlacesAutocomplete>
  )
}

LocationSearchInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.bool
}

LocationSearchInput.defaultProps = {
  label: '',
  value: '',
  onChange: null,
  error: false
}

export default LocationSearchInput
