const form=document.querySelector('#task-form')
const tasklist=document.querySelector('.collection')
const clearBtn=document.querySelector('.clear-tasks')
const filer=document.getElementById('filter')
const taskInput=document.getElementById('task')

// load all event listners
loadAllEventListners();

function loadAllEventListners(){
  form.addEventListener('submit',addTask);

}

function addTask(e){
  if(taskInput.value === ''){
    alert('add a task')
  }

  //create li element
  const li=document.createElement('li');
  //add class
  li.className='collection-item';

  // crete text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  //create new link elemen
  const link=document.createElement('a');
  link.className='delete-item secondary-content';
  link.innerHTML="<i class='fa fa-remove'></i>";

  //append the link to li 
  li.appendChild(link);  

  //append li to ul
  tasklist.appendChild(li);
  //clear input
  taskInput.value=''
  console.log(li)

  e.preventDefault();
}