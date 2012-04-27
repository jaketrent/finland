define(
  [ 'order!vendor/underscore-min',
    'order!vendor/backbone',
    'order!handlebars'
  ], function(){

    Backbone.View.prototype.close = function() {
      //this.remove();
      this.unbind();
      if (this.onClose){
        this.onClose();
      }
    };

    /**
     * Return the first entry in 'data.objects' if it exists and is an array, or else just plain 'data'.
     */
    Backbone.Model.prototype.parse = function( data ) {
      return data && data.objects && ( _.isArray( data.objects ) ? data.objects[ 0 ] : data.objects ) || data;
    };

    /**
     * Return 'data.objects' if it exists.
     * If present, the 'data.meta' object is assigned to the 'collection.meta' var.
     */
    Backbone.Collection.prototype.parse = function( data ) {
      if ( data && data.meta ) {
        this.meta = data.meta;
      }
      return data && data.objects;
    };

    return { version: "1.0" };
});

