export default class Persons {
  constructor(state = []) {
    this.state = state;
  }

  get() {
    return this.state;
  }

  indexOf(person) {
    return this.state.findIndex((entry) => entry.id === person.id);
  }

  has(person) {
    return this.indexOf(person) > -1;
  }

  update(person) {
    const state = this.state.map((entry) => {
      return entry.id === person.id ? person : entry;
    });

    return new Persons(state);
  }

  add(person) {
    const newPerson = new Persons([...this.state, person]);

    console.log(this.state);

    return newPerson;
  }

  upsert(person) {
    return this.has(person) ? this.update(person) : this.add(person);
  }
}
