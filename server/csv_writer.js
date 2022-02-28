const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'out.csv',
  header: [
    {id: 'name', title: 'Name1'},
    {id: 'surname', title: 'Surname'},
    {id: 'age', title: 'Age'},
    {id: 'gender', title: 'Gender'},
    {id: "rand"}
  ]
});
human = {
  
    name: 'John',
    surname: 'Snow',
    age: 26,
    gender: 'M'
  
}
const data = [
  {
    name: 'John',
    surname: 'Snow',
    age: 26,
    gender: 'M'
  }, {
    name: 'Clair',
    surname: 'White',
    age: 33,
    gender: 'F',
  }, {
    name: 'Fancy',
    surname: 'Brown',
    age: 78,
    gender: 'F'
  }
];

for(var i = 0; i < 11; i++){
  human.age = i
  copy = Object.assign({}, human)
  data.push(Object.assign(copy))
}

csvWriter
  .writeRecords(data)
  .then(()=> console.log('The CSV file was written successfully'));