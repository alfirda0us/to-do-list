let tasks = [];

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn"); 
const taskList = document.getElementById("taskList");

window.addEventListener("DOMContentLoaded", () => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        tampilkanTugas();
    }
});

addBtn.addEventListener("click", tambahTugas);

function tambahTugas() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Tugas tidak boleh kosong!");
        return;
    }

    const task = { 
        text: taskText,
        completed: false
    };

    tasks.push(task); 
    taskInput.value = "";
    simpanData();
    tampilkanTugas();
}

function tampilkanTugas() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add("completed");
        }

        li.addEventListener("click", () => {
            task.completed = !task.completed;
            simpanData();
            tampilkanTugas();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Hapus";
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            hapusTugas(index);
        });
        
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

function hapusTugas(index) {
    tasks.splice(index, 1);
    simpanData();
    tampilkanTugas();
}

function simpanData() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}