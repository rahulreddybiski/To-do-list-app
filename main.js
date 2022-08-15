const listContainer = document.querySelector('[data-lists');
const newListForm = document.querySelector('[data-new-list-form]')
const newListinput = document.querySelector('[data-new-list-input]')


//array to store the userentered lists under mylists
let lists = [
   ];


//newlist added eventlistener
newListForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newListName = newListinput.value;
    if(newListName === null || newListName ==='') return

    const myLists = createList(newListName);

    newListinput.value = null;
    lists.push(myLists)
    render()

})

//reates list from user entered value
function createList(name){
    return {
        id : Date.now().toString(),
        name : name, tasks: []
    }
}



//show the rendered data 
function render(){
    clearElements(listContainer);
    //<li class="list-name">work</li>
    lists.forEach(list => {
        let listElement =document.createElement("li");
        listElement.dataset.listId = list.id;
        listElement.classList.add("list-name");
        listElement.innerText = list.name;
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