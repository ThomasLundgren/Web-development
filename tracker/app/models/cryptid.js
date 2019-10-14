import DS from "ember-data";
const { Model } = DS;

export default Model.extend({
  name: DS.attr("string"),
  cryptidType: DS.attr("string"),
  profileImg: DS.attr("string"),
  sightings: DS.hasMany("sighting")
});
