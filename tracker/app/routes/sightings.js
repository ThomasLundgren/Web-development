import Route from "@ember/routing/route";

export default Route.extend({
  model() {
    return [
      {
        id: 1,
        location: "Asilomar",
        sightedAt: new Date("2019-10-14")
      },
      {
        id: 2,
        location: "Asilomar",
        sightedAt: new Date("2019-10-14")
      },
      {
        id: 3,
        location: "Asilomar",
        sightedAt: new Date("2019-10-14")
      },
      {
        id: 4,
        location: "Asilomar",
        sightedAt: new Date("2019-10-14")
      },
      {
        id: 5,
        location: "Asilomar",
        sightedAt: new Date("2019-10-14")
      },
      {
        id: 6,
        location: "Asilomar",
        sightedAt: new Date("2019-10-14")
      }
    ];
  }
});
