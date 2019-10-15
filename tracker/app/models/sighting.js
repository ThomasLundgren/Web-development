import DS from "ember-data";
const { Model } = DS;

export default Model.extend({
  // SILVER CHALLENGE: Flagging New Sightings
  isNew: DS.attr("boolean", {
    defaultValue() {
      return false;
    }
  }),
  location: DS.attr("string"),
  createdAt: DS.attr("date"),
  sightedAt: DS.attr("date"),
  cryptid: DS.belongsTo("cryptid"),
  witnesses: DS.hasMany("witness")
});
