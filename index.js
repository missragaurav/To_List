const mainToDo = document.querySelector(".todo-listE");
    const inputValue = document.getElementById("inputValue");

    const getToDoListFromLocal = () => {
      return JSON.parse(localStorage.getItem("youtubeToDoList")) || [];
    };

    const addToDoListToLocal = (list) => {
      localStorage.setItem("youtubeToDoList", JSON.stringify(list));
    };

    let localToDoLists = getToDoListFromLocal();

    const createTodoElement = (todoItem) => {
      const divElement = document.createElement("div");
      divElement.classList.add("main_todo_div");

      divElement.innerHTML = `
        <input type="checkbox" class="checkTodo">
        <li>${todoItem}</li>
        <button class="dltBtn">Delete</button>
      `;

      // Delete functionality
      divElement.querySelector(".dltBtn").addEventListener("click", () => {
        localToDoLists = localToDoLists.filter(item => item !== todoItem);
        addToDoListToLocal(localToDoLists);
        divElement.remove();
      });

      // Checkbox toggle style
      divElement.querySelector(".checkTodo").addEventListener("change", (e) => {
        const li = divElement.querySelector("li");
        li.style.textDecoration = e.target.checked ? "line-through" : "none";
      });

      mainToDo.appendChild(divElement);
    };

    const addToDoList = (e) => {
      e.preventDefault();

      const todoListValue = inputValue.value.trim();
      if (!todoListValue) return;

      if (localToDoLists.includes(todoListValue)) {
        alert("This ToDo is already present!");
        return;
      }

      localToDoLists.push(todoListValue);
      addToDoListToLocal(localToDoLists);
      createTodoElement(todoListValue);
      inputValue.value = "";
    };

    const showToDoList = () => {
      mainToDo.innerHTML = ""; // Clear existing
      localToDoLists.forEach(createTodoElement);
    };

    document.querySelector(".btn").addEventListener("click", addToDoList);

    showToDoList();

    const toggleBtn = document.getElementById("toggleTheme");

const setTheme = (theme) => {
  document.body.className = theme;
  localStorage.setItem("theme", theme);
  toggleBtn.textContent = theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode";
};

// Load saved theme from localStorage on page load
const savedTheme = localStorage.getItem("theme") || "dark";
setTheme(savedTheme);

// Toggle on button click
toggleBtn.addEventListener("click", () => {
  const current = document.body.className === "light" ? "dark" : "light";
  setTheme(current);
});