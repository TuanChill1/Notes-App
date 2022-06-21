const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const inputTitle = $('.input-title');
const inputContent = $('.input-content');
const addBtn = $('.add-btn');
const clearNotes = $('.clear-notes');
const noteList = $('.notes');
const editBtn = $('.edit-submit');
const noNote = $('.status-none');

var data = JSON.parse(localStorage.getItem('noteApp'));


const handleAddNote = () => {
    let valueTitle = inputTitle.value.trim();
    let valueContent = inputContent.value.trim();
    if(valueTitle && valueContent) {
        handleNote({
            title : valueTitle,
            content: valueContent,
        });
        saveNodeList();
        // reset value input
        inputTitle.value = '';
        inputContent.value = '';
    } else {
        alert("let complete your note!!!");
    }
}

// add note
addBtn.addEventListener('click',handleAddNote);


const handleNote = (note) => {
    // {
    //     title,
    //     content,
    // }
    var li = document.createElement('li');
    li.innerHTML = `
        <header class="header"> 
            <span>Note</span>
            <div class="control-note">
            <button class="delete"><i class="fa-solid fa-trash"></i> Delete</button>
            <button class="edit"><i class="fa-solid fa-pen-to-square"></i>Edit</button>
            </div>
        </header>
        <div class="content">
            <p class="title">Title: <span>${note.title}</span></p>
            <p class="content-text"><span>${note.content}</span></p>
        </div>
    `
    // handle delete 1 note
    li.querySelector('.delete').addEventListener('click', function() {
        if(confirm('Do you want to delete this note')) {
            this.closest('li').remove();
            saveNodeList();
            if(data == false) {
                noNote.classList.remove('hide')
            }
        }
    });
    // handle clear notes
    clearNotes.addEventListener('click', function() {
        if(confirm('Do you want to clear all notes')) {
            li.remove();
            localStorage.clear();
            noNote.classList.remove('hide')
        }
    });
    // handle edit note
    li.querySelector('.edit').addEventListener('click', async function() {
        if(confirm('Do you want to edit this note')) {
            inputTitle.value = note.title;
            inputContent.value = note.content;
            editBtn.classList.remove('hide');
            addBtn.classList.add('hide');
            this.closest('li').setAttribute('class', 'editing');
        }
    })
    editBtn.addEventListener('click', function() {
        if(inputTitle.value && inputContent.value) {
            $('.editing').querySelector('.title span').innerText = inputTitle.value;
            $('.editing').querySelector('.content-text span').innerText = inputContent.value;
            editBtn.classList.add('hide');
            addBtn.classList.remove('hide');
            saveNodeList()
        }
    })
    if(li) {
        noNote.classList.add('hide');
    }
    editBtn.addEventListener('click', function() {
        $('.editing').classList.remove('editing');
        inputContent.value = '';
        inputTitle.value = '';
    })
    noteList.appendChild(li)
}

const saveNodeList = ()=> {
    let noteStorage = [];
    let noteList = document.querySelectorAll('li');
    noteList.forEach(e => {
        let title = e.querySelector('.title span').innerText;
        let content = e.querySelector('.content-text span').innerText;
        noteStorage.push(
            {
                title : title,
                content : content,
            }
        )
    })
    localStorage.setItem('noteApp', JSON.stringify(noteStorage));
    console.log(JSON.parse(localStorage.getItem('noteApp')));
}

function render () {
    if(data) {
        data.forEach(e => {
            handleNote(e);
        })
    }
    if(data == false) {
        noNote.classList.remove('hide')
    }
}
render()