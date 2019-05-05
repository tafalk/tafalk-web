const GooglePlacesFindAndAutocompletePlugin = {
  install (Vue, options) {
    if (options.apiKey) {
      try {
        // If not within browser context, do not continue processing
        if (typeof window === 'undefined' || typeof document === 'undefined') {
          return
        }

        if (typeof window.google === 'object' && typeof window.google.maps === 'object') {
          if (typeof window.google.maps.places === 'object') {
            return
          }

          throw new Error('Google is already loaded, but does not contain the places API.')
        }

        const googleMapsPlacesApiScript = document.createElement('SCRIPT')

        const url = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${options.apiKey}`

        googleMapsPlacesApiScript.setAttribute('src', url)
        googleMapsPlacesApiScript.setAttribute('async', '')
        googleMapsPlacesApiScript.setAttribute('defer', '')

        document.body.appendChild(googleMapsPlacesApiScript)
      } catch (exception) {
        throw new Error('Vuetify google find autocomplete plugin load error: ', exception)
      }
    }
  }
}

export default GooglePlacesFindAndAutocompletePlugin
