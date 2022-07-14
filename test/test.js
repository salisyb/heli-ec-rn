const data = [
  {id: 1, types: 'send', status: 'pending'},
  {id: 2, types: 'send', status: 'completed'},
  {id: 3, types: 'received', status: 'pending'},
  {id: 4, types: 'send', status: 'pending'},
  {id: 5, types: 'subscriptions', status: 'pending'},
  {id: 6, types: 'send', status: 'pending'},
  {id: 7, types: 'received', status: 'failed'},
];

const filterValue = [{status: 'pending'}, {types: 'send'}];

let filteredData = data;

for (var x = 0; x < filterValue.length; x++) {
  const key = Object.keys(filterValue[x]).toString();
  const filtered = filteredData.filter(
    element => element[key] === filterValue[x][key],
  );
  filteredData = filtered;
  console.log(filtered);
}
