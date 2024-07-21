//ensuring the content loaded after html content is fully loaded
document.addEventListener('DOMContentLoaded', function (event){
    //storing necessary elements into variables
    const addButton=document.getElementById('add-task-btn')
    const taskInput =document.getElementById('task-input')
    const taskList=document.getElementById('task-list')
    //addition of tasks to task list
    function addTask (taskText, save = true){
        taskText= taskInput.value.trim()
        if(taskText.length<=0){
            alert('No task added')
        }
        //removing unwanted tasks from task list
        else {
            const li=document.createElement('li')
            li.textContent=taskText;
            const removeButton=document.createElement('button')
            removeButton.textContent='Remove'
            removeButton.classList.add='remove-btn'
            removeButton.onclick=()=>{
            taskList.removeChild(li)
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const indexToRemove=storedTasks.findIndex(task=>task===li.textContent);
            storedTasks.splice(indexToRemove,1);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
            }
            li.appendChild(removeButton)
            taskList.appendChild(li)
            taskInput.value=''
            
        }
        //adding new task to the local storage
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }  
    }
    //attaching events listeners to ensure interactivity
            addButton.addEventListener('click', addTask)
            taskInput.addEventListener('keypress', function(event){
            if(event.key==='Enter'){
            addTask()
            }
            })
             //ensuring data fetching to run after html loaded fully
             document.addEventListener('DOMContentLoaded', addTask)
    //checking presence of tasks in local storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false))
    }
    
})
