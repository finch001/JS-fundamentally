const person = {};

Object.defineProperty(person, 'name', {
    writable: false,
    value: 'Finch',
    configurable: true,
    enumerable: true
})

console.log(person.name);
console.log(Object.keys(person))

const book = {
    _year: 2004,
    edition: 1
}

Object.defineProperty(book, 'year', {
    get: function () {

    },
    set: function (newValue) {
        if (newValue > 2004) {
            this._year = newValue;
            this.edition += newValue - 2004;
        }
    }
})

book.year = 2005;
console.log(book.edition);


function Person() {

}
const person1 = new Person();
Person.prototype.name = "Nick";
Person.prototype.age = 29;
Person.prototype.job = "SoftWare engineer";
Person.prototype.sayName = function () {
    console.log(this.name);
}


const person2 = new Person();

const keys = Object.getOwnPropertyNames(Person.prototype);
