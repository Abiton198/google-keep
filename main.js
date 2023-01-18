//create a constructor func - 1
class App {
    constructor(){
        this.notes = [] //new array to store the created notes(from addNote())
        this.title = '' //to all a new string to be created for editing
        this.text = '' // ''
        this.id = '' // ''
        
        //$ - to distinguish as an element not data - 2
this.$placeholder = document.querySelector('#placeholder') //placeholder - where notes are displayed
this.$form = document.querySelector('#form') //form 
this.$formTitle = document.querySelector('#note-title') //title
this.$formButton = document.querySelector('#form-buttons') //buttons 
this.$noteTitle = document.querySelector('#note-title') //note title
this.$noteText = document.querySelector('#note-text') //note text
this.$notes = document.querySelector('#notes') //notes div that carry a displayed page
this.$closeButton = document.querySelector('#form-close-button') //close button
this.$modal = document.querySelector('.modal') // modal
this.$modalTitle = document.querySelector('.modal-title')
this.$modalText = document.querySelector('.modal-text') 
this.$closeModalButton = document.querySelector('.modal-close-button') //close modal button
this.$colorTool = document.querySelector('#color-tooltip')

this.addListeners() //trigger func - 4
}
//add eventListner func - 3
addListeners(){
    document.body.addEventListener('click', event => {
      this.handleFormClick(event) 
      this.selectNote(event)
      this.openModal(event)
      
    })

    //func to listen for form submit - 7
    this.$form.addEventListener('submit', event =>{
        event.preventDefault() //prevent a default behaiour of submit to reload a page when clicked - 8
        const title = this.$noteTitle.value // value = input in the text area - 9
        const text = this.$noteText.value   // value = ''
        const hasText = title || text // creating a value for the condition to submit -10
        if(hasText){ //a conditional when to submit - 11
            
            this.addNote({title, text}) //note only added when there is text either
        }
    })

    //event to bring a color-tool when body is hoovered - 27
    document.body.addEventListener('mouseover', event => {
        this.openToolTip(event)
    })
    //close button - 21
    this.$closeButton.addEventListener('click', event =>{
        event.stopPropagation() //envoking funct that prevents default behavior of the whole handleFormClick()
        this.closeForm()
    })

    //close-modal-button
    this.$closeModalButton.addEventListener('click', event => {
        this.closeModal(event)
    })
}
    //console.log('run') - 21 shows that the funct is running allover the form
    //contains() - func that retains a true / false if the target is clicked - 5
    handleFormClick(event){
        const isFormClicked = this.$form.contains(event.target)
        const title = this.$noteTitle.value 
        const text = this.$noteText.value 
        const hasText = title || text 

        if(isFormClicked){
            //open form
            this.openForm()
        }else if (hasText) {
            this.addNote({ title, text }) //if text is inputted add text
            
            } else {
            //close form
            this.closeForm()
        }
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
openModal(event) {
   if (event.target.closest('.note')) { //closest() = respond to mouse event nearest to the selected item class or id
    this.$modal.classList.toggle('open-modal') //toggle() - makes modal open
    this.$modalTitle.value = this.title
    this.$modalText.value = this.text   
}    
}

//close close MOdal - 25
closeModal(event){
    this.editNote()
    this.$modal.classList.toggle('open-modal') //close modal 
}

//function color-tool when hovered to appear-28
openToolTip(event){
    if(!event.target.matches('.toolbar-color'))return // if it does match the selected target it returns the event
   this.id =  event.target.nextElementSibling.dataset.id //nextElementSibling allows to get data from the next <div> after toolbar
    const noteCords = event.target.getBoundingClientRect() //func = get specific coordinates of the notes that are being hovered
    const horizontal = noteCords.left + window.scrollX //horizontal cordinate of how much the user scrolls X position
    const vertical = noteCords.top + window.scrollY // vertical cordinate '' '' ''
    this.$colorTool.style.transform = `translate(${horizontal}px, ${vertical}px)` //to position tool-color in relation with user mouse event
    this.$colorTool.style.display = 'flex'

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
this.displayNotes() //function to display notes - 15
this.closeForm() // to close form after adding note - 19

}

editNote(){ // func to edit the already submitted note - 26
    const title = this.$modalTitle.value
    const text = this.$modalText.value
    this.notes = this.notes.map(note => 
        note.id === Number(this.id) ? {...note, title, text} : note //conditionally making the id a number(from a string) so to match the id of notes
        ) //updating the notes array to bring in new edited note or just retain if note if not edited.
        
        this.displayNotes()
    }
    
    //selected note - 23 bring a stored data from modal for edit
    selectNote(event){
       const $selectedNote = event.target.closest('.note')
       if(!$selectedNote) return //condition to allow selected note to be edited or continue as is - 24
       const [$noteText, $noteTitle] = $selectedNote.children //children = returns an array of items within them
       this.text = $noteText.innerHTML //to access the items to the page 
       this.title = $noteTitle.innerHTML // ''
       this.id = $selectedNote.dataset.id //way to interact with data from the dom thru id
         
    }

displayNotes(){
    //conditional display of added notes - 16
const hasNotes = this.notes.length > 0
this.$placeholder.style.display = hasNotes ? 'flex': 'none'

//making the notes display on page - 17
this.$notes.innerHTML = this.notes
.map(
    note => 

    `
    <div style=${note.color} class='note'>
        <div class=${note.title && 'note-title'} data-id=${note.id}>${note.title} </div>
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