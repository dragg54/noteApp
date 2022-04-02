const addBtn = document.querySelector('#add');

const notes = JSON.parse(localStorage.getItem('notes'));

if(notes){
    notes.forEach(note =>{
        addNewNote(note);
    })
}

addBtn.addEventListener('click',()=>{
    addNewNote();
})

function addNewNote(text =''){
    const note = document.createElement('div');
    note.classList.add('notes');
    note.innerHTML = `
        <div class="note">
            <div class="tools">
                <button class="edit"><i class="fas fa-edit"></i></button>
                <button class="delete"><i class="fas fa-trash"></i></button>
            </div>
            <div class="main hidden">
            </div>
            <textarea> </textarea>
        </div>
    `;
    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete');
    const main = note.querySelector('.main');
    const textArea = note.querySelector('textarea');
    textArea.value = text;
    main.innerHTML = marked(text);

    editBtn.addEventListener('click',()=>{
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    });

    deleteBtn.addEventListener('click',()=>{
        note.remove();
    })
    
    textArea.addEventListener('input',(e)=>{
        const value = e.target.value;
        main.innerHTML = marked(value);
        updateLS();
    })
        document.body.appendChild(note);
}

function updateLS(){
    const notesText = document.querySelectorAll('textarea');
    const notes = [];
    notesText.forEach(note=>{
        notes.push(note.value);
    });
    localStorage.setItem('notes',JSON.stringify(notes));
}


