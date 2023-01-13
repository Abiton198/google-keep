//create a constructor func - 1
class App {
    constructor(){
        this.notes = [] //new array to store the created notes(from addNote())
        //$ - to distinguish as an element not data - 2
this.$placeholder = document.querySelector('#placeholder') //placeholder - where notes are displayed
this.$form = document.querySelector('#form') //form 
this.$formTitle = document.querySelector('#note-title') //title
this.$formButton = document.querySelector('#form-buttons') //buttons 
this.$noteTitle = document.querySelector('#note-title') //note title
this.$noteText = document.querySelector('#note-text') //note text
this.$notes = document.querySelector('#notes') //notes div that carry a displayed page
this.$closeButton = document.querySelector('#form-close-button') //close button
this.$modal = document.querySelector('#modal') // modal

this.addListeners() //trigger func - 4
}
//add eventListner func - 3
addListeners(){
    document.body.addEventListener('click', event => {
      this.handleFormClick(event)
    })

    //func to listen for form submit - 7
    this.$form.addEventListener('submit', event =>{
        event.preventDefault() //prevent a default behaiour of submit to reload a page when clicked - 8
        const title = this.$noteTitle.value // value = input in the text area - 9
        const text = this.$noteText.value   // value = ''
        const hasText = title || text // creating a value for the condition to submit -10
        if(hasText){ //a conditional when to submit - 11
            
            this.addNote({title, text})
        }
    })
}
handleFormClick(event){
    //console.log('run') - 21 shows that the funct is running allover the form
    //contains() - func that retains a true / false if the target is clicked - 5
const isFormClicked = this.$form.contains(event.target)
const title = this.$noteTitle.value 
const text = this.$noteText.value 
const hasText = title || text 
if(isFormClicked){
    //open form
    this.openForm()
}else if (hasText){
    this.addNote({title,text}) //if text is inputted add text
    
    }else{
    //close form
    this.closeForm()
}

//close button - 21
this.$closeButton.addEventListener('click', event =>{
    event.stopPropagation() //envoking funct that prevents default behavior of the whole handleFormClick()
    this.closeForm()
})

}
//func to open form when clicked - 6
openForm(){
    this.$form.classList.add('#form')
    this.$formButton.style.display = 'block' //buttons
    this.$formTitle.style.display = 'block' // title
}

//duplicate the open fun but change to hide/none - 6
closeForm(){
    this.$form.classList.add('#form')
    this.$formButton.style.display = 'none'
    this.$formTitle.style.display = 'none'
    this.$noteTitle.value = '' //clear the input text area after closing the form
    this.$noteText.value = '' // ''
}

//func for modal - 22
openModal(event){
   if(event.target.closest('.note')){ //closest() = respond to mouse event nearest to the selected item class or id
    this.$modal.classList.toggle('#open-modal') //toggle() - makes modal close and or open
   }    
    
}

//funct to add note added
addNote({title, text}){
// func to add note 12 === object destructured
const newNote = {
    title, text, //object destructure === from the [] of notes
    color: 'white', 
    id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1 //conditional add of a not if there is a not already in the array - 13
}
 this.notes = [...this.notes, newNote] //manual updating of the notes array - 14
console.log(this.notes)
this.displayNotes() //function to display notes - 15
this.closeForm() // to close form after adding note - 19

}

displayNotes(){
    //conditional display of added notes - 16
const hasNotes = this.notes.length > 0
this.$placeholder.style.display = hasNotes ? 'flex': 'none'

//making the notes display on page - 17
this.$notes.innerHTML = this.notes.map(note => 

    `
    <div style=${note.color} class='note'>
        <div class=${note.title && 'note-title'}>${note.title} </div>
             <div class="note-text">${note.text}</div>
                <div class="toolbar-container">
                    <div class="toolbar">
                        <img class="toolbar-color" src="https://icon.now.sh/palette"/>
                            <img class="toolbar-delete" src="https://icon.now.sh/delete"/>
                            </div>
                </div>
    
    </div>
    `
).join('') //to join elements of the map[] into one string - 18

}
} 
new App() 