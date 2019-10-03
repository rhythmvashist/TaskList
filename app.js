const form=document.querySelector('#task-form')
const tasklist=document.querySelector('.collection')
const clearBtn=document.querySelector('.clear-tasks')
const filer=document.getElementById('filter')
const taskInput=document.getElementById('task')

// load all event listners
loadAllEventListners();

function loadAllEventListners(){

  //dom load event
  document.addEventListener('DOMContentLoaded',getTasks);
  form.addEventListener('submit',addTask);
  // reove task event 
  tasklist.addEventListener('click',removeTask);
  clearBtn.addEventListener('click',clearTask);
  filter.addEventListener('keyup',filterTasks);

}

// get task from LS.
function getTasks(){
  let tasks;
  if (localStorage.getItem('tasks')===null){
    tasks=[];
  }
  else{
    // local storage only store in string so we have to parse it evrytime it comes out 
    tasks=JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function(task){
    //create li element
    const li=document.createElement('li');
    //add class
    li.className='collection-item';

    // crete text node and append to li
    li.appendChild(document.createTextNode(task));
    //create new link elemen
    const link=document.createElement('a');
    link.className='delete-item secondary-content';
    link.innerHTML="<i class='fa fa-remove'></i>";

    //append the link to li 
    li.appendChild(link);  
    //append li to ul
    tasklist.appendChild(li);
    
  })


}

function filterTasks(e){
  const text=e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach
  (function(task){
    const item=task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text)!=-1){
      task.style.display='block'
    }
    else{
      task.style.display='none'
    }
  })
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

  //store in Local storage

  storeInLocalStorage(taskInput.value);
  //clear input
  taskInput.value=''

  e.preventDefault();
}

function storeInLocalStorage(task){
  let tasks;
  if (localStorage.getItem('tasks')===null){
    tasks=[];
  }
  else{
    // local storage only store in string so we have to parse it evrytime it comes out 
    tasks=JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.push(task);

  localStorage.setItem('tasks',JSON.stringify(tasks));
}

function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('are you sure ?')){
      e.target.parentElement.parentElement.remove();

      //remove from LS
      removeTaskfromLS(e.target.parentElement.parentElement);

      console.log(e.target)
    }
  }
  //alert("Task list is cleared");
}

function removeTaskfromLS(taskItem){
  let tasks;
  if (localStorage.getItem('tasks')===null){
    tasks=[];
  }
  else{
    // local storage only store in string so we have to parse it evrytime it comes out 
    tasks=JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function(task,index){
    if (taskItem.textContent===task){
      tasks.splice(index,1)
    }

  });
  localStorage.setItem('tasks',JSON.stringify(tasks));
  
}


function clearTask(){
  //tasklist.innerHTML='';

  //faster
  while(tasklist.firstChild){
    tasklist.removeChild(tasklist.firstChild);
  }

  //clear from LS
  clearfromLS();
}

function clearfromLS(){
  localStorage.clear();
}