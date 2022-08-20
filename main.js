const listContainer = document.querySelector('[data-lists');
const newListForm = document.querySelector('[data-new-list-form]')
const newListInput = document.querySelector('[data-new-list-input]')
const deleteListButton = document.querySelector('[data-delete-list-button]');
const listDisplayContainer = document.querySelector('[data-list-display-container]')
const listTitle = document.querySelector('[data-list-title]')
const listCount = document.querySelector('[data-list-count]')

const tasksContainer = document.querySelector('[data-tasks]')
const taskTemplate = document.querySelector('#task-template')
const newTaskForm =document.querySelector('[data-new-task-form]')
const newTaskInput =document.querySelector('[data-new-input]')




//to store information inside user browser

const LOCAL_STORAGE_LIST_KEY = 'task.lists';
const LOCAL_STORAGE_LIST_idKEY = 'task.selectedListId';

let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];

let selectedListId = localStorage.getItem(LOCAL_STORAGE_LIST_idKEY)

listContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li') {
      selectedListId = e.target.dataset.listId
      saveAndRender()
    }
  })

deleteListButton.addEventListener('click', e => {
    lists = lists.filter(list => list.id !== selectedListId)
    selectedListId = null
    saveAndRender()
})
  


//newlist added eventlistener
newListForm.addEventListener('submit', e => {
    e.preventDefault()
    const listName = newListInput.value
    if (listName == null || listName === '') return
    const list = createList(listName)
    newListInput.value = null
    lists.push(list)
    saveAndRender()
  })

//new task form
newTaskForm.addEventListener('submit', e => {
    e.preventDefault()
    const taskName = newTaskInput.value
    if (taskName === null || taskName === '') return
    const task = createTask(taskName)
    newTaskInput.value = null
    const selectedList = lists.find(list => list.id === selectedListId)
    selectedList.tasks.push(task)
    saveAndRender()
  })

function createTask(name){
    return {
        id : Date.now().toString(),
        name : name, 
        complete : false
    }
}

//reates list from user entered value
function createList(name){
    return {
        id : Date.now().toString(),
        name : name, tasks: []
    }
}

function saveAndRender(){
    
    save()
    render()
}

//save the user entered data
function save(){
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))
    localStorage.setItem(LOCAL_STORAGE_LIST_idKEY, selectedListId)
}


//show the rendered data 
function render(){
    clearElements(listContainer);
    renderList()
    let selectedList = lists.find(list => list.id ===selectedListId)
    if(selectedListId == null){
        listDisplayContainer.style.display = 'none';
    }
    else{
       listDisplayContainer.style.display = '' 
       listTitle.innerText = selectedList.name;
       renderTaskCount(selectedList)
       clearElements(tasksContainer)
    }
 
}

function renderTasks(selectedList){
    selectedList.tasks.forEach(task => {
        const taskElement = document.importNode(taskTemplate.content, true)
        const checkbox = taskElement.querySelector('input')
        checkbox.id = task.id
        checkbox.checked = task.complete
        const label = taskElement.querySelector('label')
        label.htmlFor = task.id
        label.append(task.name)
        tasksContainer.appendChild(taskElement)
    })
}

function renderTaskCount(selectedList){
    const incompleteTasks = selectedList.tasks.filter(task =>
        !task.complete).length
    const taskString = incompleteTasks === 1 ? "task" : "tasks"
    listCount.innerText  = `${incompleteTasks} ${taskString} remaining`
}

function renderList(){
    lists.forEach(list => {
        let listElement =document.createElement("li");
        listElement.dataset.listId = list.id;
        listElement.classList.add("list-name");
        listElement.innerText = list.name;
        if(list.id === selectedListId) {
            listElement.classList.add('active-list');
        }
        listContainer.appendChild(listElement)
    })
}

//fuction to clear he elements if any on html
function clearElements(elements){
    while(elements.firstChild){
        elements.removeChild(elements.firstChild)
    }
}

//render();
//console.log(lists)
localStorage.clear()
