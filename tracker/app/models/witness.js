import DS from "ember-data";
import { computed } from "@ember/object";
const { Model } = DS;

export default Model.extend({
  title: DS.attr("string"),
  fName: DS.attr("string"),
  lName: DS.attr("string"),
  email: DS.attr("string"),
  sightings: DS.hasMany("sighting"),
  fullName: Ember.computed("fName", "lName", function() {
    return this.get("fName") + " - " + this.get("email");
  })
});
