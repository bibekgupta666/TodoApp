//selecting the element classes
const clear = document.querySelector(".clear");
const list = document.getElementById("list");   
const userInput = document.getElementById("txtInput");

//name of class
const Check = "fa-check-circle";
const Uncheck = "fa-circle-thin";
const Line_Through = "lineThrough";


let LIST = [], 
id = 0;

//retrive item from local storage
let data = localStorage.getItem("TODO");

//to check if there is any data in local storage
if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}else{
    LIST = [];
    id = 0;
}

function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.completed, item.deleted);
    });
}

//clean the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

function addToDo(toDo, id, completed, deleted){

    if(deleted){
        return;
    }
    const Done = completed ? Check:Uncheck;
    const Line = completed ? Line_Through : "";

    const item = `
            <li class="item">
                <i class="fa ${Done} co" job="complete" id="${id}"></i>
                <p class="text ${Line}">${toDo}</p>
                <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
            </li>
    `;
    
    
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);

}
//this will add user entered text to todo list
document.addEventListener("keyup", function(event){
    if(event.keyCode == 13){
        //this will check if empty input
        const toDo = userInput.value;
        //this will check if empty input
        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name : toDo,
                id : id,
                completed : false,
                deleted : false

            });
            //send data to local storage
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
        userInput.value = "";
    }
});

//completed todo list
function completeTodo(element){
    element.classList.toggle(Check);
    element.classList.toggle(Uncheck);
    element.parentNode.querySelector(".text").classList.toggle(Line_Through);

    LIST[element.id].completed = LIST[element.id].completed ? false : true;
}

//delete item from todo list
function removeTodo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].deleted = true;
}

//dynamic target
list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if(elementJob == "complete"){
        completeTodo(element);
    }else if(elementJob == "delete"){
        removeTodo(element);
    }
    //send data to local storage
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

document.getElementById("cameraTakePicture").addEventListener 
   ("click", cameraTakePicture); 

   function cameraTakePicture() { 
    navigator.camera.getPicture(onSuccess, onFail, {  
       quality: 50, 
       destinationType: Camera.DestinationType.DATA_URL 
    });  
    
    function onSuccess(imageData) { 
       var image = document.getElementById('myImage'); 
       image.src = "data:image/jpeg;base64," + imageData; 
    }  
    
    function onFail(message) { 
       alert('Failed because: ' + message); 
    } 
 }
