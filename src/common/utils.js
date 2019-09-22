/**
 * Auxiliary method to sanitize empty fields to adapt to Dynamo restriction
 * @param target
 */
const removeEmptyStringFromJson = ( target ) => {
  Object.keys( target ).map( function ( key ) {
    if ( target[ key ] instanceof Object ) {
      if ( ! Object.keys( target[ key ] ).length && typeof target[key].getMonth !== 'function') {
        target[ key ] = null;
      }
      else {
        removeEmptyStringFromJson( target[ key ] );
      }
    }
    else if ( target[ key ] === "" ) {
      target[ key ] = null;
    }
  } );
  return target;
};

module.exports = {
  removeEmptyStringFromJson
};
