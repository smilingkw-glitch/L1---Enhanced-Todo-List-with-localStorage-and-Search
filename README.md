# Enhanced Todo List with localStorage and Search

This is a simple Todo List web application built using HTML, CSS, and JavaScript.  
It allows you to add tasks, mark them as completed, remove tasks, and search tasks in real time.  
All tasks are saved in the browser using `localStorage`, so they stay even after you reload the page.

## How to run the application

1. Clone or download this repository to your local machine.
2. Open the project folder.
3. Open `index.html` in your browser (you can double-click it or use Live Server in VS Code).

## How to use the application

- **Add a task**
  - Type your task in the input box at the top.
  - Click the **"Add Task"** button (or press Enter if you implemented it).
  - The task will appear in the list.

- **Mark a task as completed**
  - Click the **"Done"** (or similar) button next to a task.
  - The task text will be styled with a line-through to show it is completed.

- **Undo completion**
  - Click the **"Undo"** button next to a completed task to mark it as not completed again.

- **Remove a task**
  - Click the **"Remove"** button next to a task to delete it from the list and from `localStorage`.

- **Search tasks**
  - Type in the **search bar** to filter tasks in real time.
  - Only tasks whose text includes the search text will be shown.

## Data storage details

- All tasks are stored in `localStorage` under a key like `"todos"`.
- Each task is saved as an object inside a JSON array with the following structure:
  - `id`: unique ID for the task (e.g., timestamp).
  - `text`: the task description typed by the user.
  - `completed`: a boolean value (`true` or `false`) showing if the task is completed.

## Technologies used

- HTML
- CSS
- JavaScript
- localStorage (browser storage)
