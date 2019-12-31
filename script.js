
const domStrings = {
  button: '.btn',
  input: '#input1',
  list: '.list-section'
};
//array of data
let data = [];
//when page loads

window.addEventListener('load', () => {
 
  /// read from local storage
  let readStorage = function(){
    const storage = JSON.parse(localStorage.getItem('tasks'));
    //restore from local storage
    if(storage)  data = storage;
  };
  readStorage();
  
  //render existing tasks 
  data.forEach(e => {
    let markup;
    console.log(e);
    markup = `<li class="list-group-item d-flex justify-content-between align-items-center     " id="${e.id}">
   ${e.task}
   <button class="btn btn-info btn-group-sm" type='button'>Done</button></li>
   `;

   document.querySelector(domStrings.list).insertAdjacentHTML('beforeend', markup);
  })
});


//function that generates id 
var ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  

  // constructor object for tasks  

  const TaskStorage = function(id, task){
    this.id = id;
    this.task = task;
  };


//add item to data structure after click

document.querySelector(domStrings.button).addEventListener('click',
e =>{
  if(document.querySelector(domStrings.input).value !== ""){
    let newTask, id, entry, markup;
    
    //save entries into variables
    newTask = document.querySelector(domStrings.input).value;
    id = ID();
   
    //create a new object with the variables
    entry = new TaskStorage(id, newTask);

    //add to array of data
    data.push(entry);

    //add new task to UI 
    
    markup = `<li class="list-group-item d-flex justify-content-between align-items-center     " id="${id}">
   ${newTask}
   <button class="btn btn-info btn-group-sm" type='button'>Done</button></li>
   `;

   document.querySelector(domStrings.list).insertAdjacentHTML('beforeend', markup);

   //empty input field
    document.querySelector(domStrings.input).value = '';

    //persist with local storage
    persistentStorage();
  }

}
);


// remove items after click 
document.querySelector(domStrings.list).addEventListener('click', e => {

  var ids = data.map(function(current){
    return current.id;
  });

  let id = e.target.parentNode.id;


   // remove from data structure
          index = ids.indexOf(id);

          if (index !== -1) {
            data.splice(index, 1);
          }
  //persist with local storage
  persistentStorage();


  // remove from ui
  if(id){
   e.target.parentNode.parentNode.removeChild(e.target.parentNode);
  }
})

let persistentStorage = function(){
localStorage.setItem('tasks', JSON.stringify(data));
};




