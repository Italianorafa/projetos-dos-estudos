
document.addEventListener('DOMContentLoaded', () => {
    // selecao de documentos
    const lista = document.getElementById('list');
    const addTask = document.querySelector('input#add');
    const popUpHidden = document.querySelector('div#hidden');
    const popUp = document.querySelector('div#conteudo-pop');
    const fecha = document.querySelector('button#fechar');
    const newTask = document.querySelector('input#newtask');
    const confirma = document.querySelector('button#confirmar');
    const concluidas = document.getElementById('concluidas');
    const inProgress = document.getElementById('progresso');
    const all = document.getElementById('todas');
    const search = document.getElementById('search');

    // gerenciamento de tarefas
    let tasks = [];

    // carregar as tarefas do Banco de dados local
    window.addEventListener('load',() => {
        tasks = carregarTasks();
        tasks.forEach(tarefa => showList(tarefa))
    });


    // abrir e fechar pop-ups
    function showPopUp(){
        popUpHidden.style.display = 'flex';
        
        newTask.focus()
    }

    function closePopUp(){
        popUpHidden.style.display = 'none';
        newTask.value = '';
    }


    window.addEventListener('click', (evento) => {
        if(evento.target === popUpHidden){
            closePopUp();
        }
    })
    addTask.addEventListener('click', showPopUp);
    fecha.addEventListener('click', closePopUp);

    //adicionar tarefas
    
    confirma.addEventListener('click', addNewTask)
    newTask.addEventListener('keydown', (event) => {
        if(event.key === 'Enter'){

            addNewTask();
        }
    })

    // mudanças de estado da tarefa
    lista.addEventListener('change', (event) => {
        
        if(event.target.matches('input[type=checkbox')){
            const checkbox = event.target;
            let idTask = checkbox.id;
        
        
            const taskFound = tasks.find(tarefa => tarefa.id === idTask)

            if(taskFound){
                taskFound.checked = checkbox.checked;
            }

            const span = checkbox.nextElementSibling; // pega o elemento 'irmao'do checkbox'
            if(taskFound.checked){
                span.style.textDecoration = 'line-through';
            }
            else{
                span.style.textDecoration = 'none';
            }
            salvarTasks();
        }
        
    })

    lista.addEventListener('click', (event) => {
        if((event.target.matches('span') && event.target.classList.contains('delete-button')) || event.target.matches('button')){
            const taskId = event.target.closest('.delete-btn').dataset.id;

            tasks = tasks.filter(tarefa => tarefa.id !== taskId);
            salvarTasks();

            event.target.closest('label').remove();

            
        }
        
    })

    // filter functions
    concluidas.addEventListener('click', () => {
        lista.innerHTML = '';

        const completedTasks = tasks.filter(tarefa => tarefa.checked === true)
        completedTasks.forEach(tarefa => {
            showList(tarefa);
        })
    })
    inProgress.addEventListener('click', () => {
        lista.innerHTML = '';

        const inProgressTasks = tasks.filter(tarefa => tarefa.checked === false);
        inProgressTasks.forEach(tarefa => {
            showList(tarefa);
        })
    })
    all.addEventListener('click', () => {
        lista.innerHTML = '';

        tasks.forEach(tarefa => {
            showList(tarefa)
        })
    })

    // search function
    function pesquisa(){
        const procura = search.value.toLowerCase();

        const searchedTasks = tasks.filter(tarefa => tarefa.name.toLowerCase().includes(procura));

        lista.innerHTML = '';
        searchedTasks.forEach(tarefa => {
            showList(tarefa);
        })
    }

    search.addEventListener('input', debounce(pesquisa, 300));



    function showList(tarefa){
        //criando elementos
        let label = document.createElement('label');
        let checkbox = document.createElement('input');
        let span = document.createElement('span');
        let deleteBtn = document.createElement('button');
        let icon = document.createElement('span');

        //editando elementos
        label.classList.add('item');
        label.htmlFor = tarefa.id;
        checkbox.type = 'checkbox';
        checkbox.id = tarefa.id;
        checkbox.checked = tarefa.checked;
        span.innerText = tarefa.name;
        if(tarefa.checked){
            span.style.textDecoration = 'line-through';
        }
        else{
            span.style.textDecoration = 'none';
        }
        deleteBtn.classList.add('delete-btn')
        deleteBtn.dataset.id = tarefa.id;
        icon.classList.add('material-symbols-outlined');
        icon.classList.add('delete-button')
        icon.textContent = 'delete'
        deleteBtn.appendChild(icon);

        //adicionando na lista
        label.appendChild(checkbox);
        label.appendChild(span);
        label.appendChild(deleteBtn)
        lista.appendChild(label);
    }

    function debounce(func, delay = 300){
        //inicia o timer;
        let timer;

        return function(...args){
            const context = this;
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(context, args);
            }, delay);
        }

    }

    function salvarTasks(){
        let JSONtasks = JSON.stringify(tasks);
        localStorage.setItem('Tarefas', JSONtasks);
    }

    function carregarTasks(){
        let savedTasks = localStorage.getItem('Tarefas');
        if(savedTasks){
            return JSON.parse(savedTasks);
        }
        
        return [];
        
    }

    function addNewTask(){
        const task = newTask.value.trim();

        if(task !== ''){
            const unicId = `Task-${Date.now()}`;
            const objTask = {
                name: task,
                id: unicId,
                checked: false,
                decoration: 'none'
            }

            tasks.push(objTask);
            salvarTasks();
            showList(objTask);
            // voltando para a tela inicial
            newTask.value = '';
            closePopUp();
        }
        else{
            closePopUp();
        }
    }
})