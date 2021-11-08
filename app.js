//when page loads call shownotes
console.log("");
shownotes();

//if user adds a note
const addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click",(e) => {
    //get text from text area
    let text = document.getElementById("floatingTextarea");
    
    //get previous notes from local storage
    let notes = localStorage.getItem("notes");
    
    if(notes == null)
    {  
        notesObj = []; 
    }
    else{
        notesObj = JSON.parse(notes);      
    }
   
    notesObj.push(text.value);     //pushing value of new note into notes
    localStorage.setItem("notes",JSON.stringify(notesObj));        //update local storage
    text.value = "" ;                           //resetting value of text area after adding a note
    //to display notes
    shownotes();            //display previous and newly added notes
})
//function to show elements from local stoarage
function shownotes(){
    let notes = localStorage.getItem("notes");
    if(notes == null)
    {  
        notesObj = []; 
    }
    else{
        notesObj = JSON.parse(notes);      
    }
    let html = "";
    notesObj.forEach(function(element,index){
        html += `
        <div class="card noteCard my-2 mx-2" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">Note ${index+1}</h5>
            <p class="card-text">${element}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
      </div>`
    });
    let notesEle = document.getElementById('previous-notes-container');
    if(notesObj.length != 0){
        notesEle.innerHTML = html;
    }
}

// when user wants to delete all notes
const delBtn = document.getElementById("del-btn");
delBtn.addEventListener("click",()=>{
    localStorage.clear();
    let notesEle = document.getElementById('previous-notes-container');
    notesEle.innerHTML = "";
})

//function to delete note using index of that element from array
function deleteNote(index)                                      //function call is in html of delete note button
{
    
    //console.log("delete note function called");
    let notes =  localStorage.getItem("notes");
    if(notes == null)
    {
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);        //removes one elemnet starting from index
    //we have deleted that note in our local notesObj but we have to update our local storage
    localStorage.setItem("notes",JSON.stringify(notesObj));
  
    shownotes();

}

//search function
let search = document.getElementById("searchTxt");
//everytime we input anything in input box "input" event will fire
search.addEventListener("input",()=>{
    let inputVal = search.value.toLowerCase();      //taking input value from input box and converting it to lowercase
    let noteCard = document.getElementsByClassName("noteCard");
    Array.from(noteCard).forEach((element)=>{
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal))
        {
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
} )