let tasks = [];
let userAnswer = '';

class Task {
    constructor([name, description, priority, status]) {
        this.name = name || 'Task';
        this.description = description || 'Описание не добавлено';
		this.priority = priority || 'high';
		this.date = new Date();
		this.status = status || 'new';
    };

	printTask() {
		console.log( `
			${this.name}: ${this.description}
			Дата создания задачи: ${this.date}
			Приоритет: ${this.priority}
			Статус: ${this.status}
		`)
	}
}

while(userAnswer !== 'end') {
    userAnswer = prompt('Какую команду выполнить?');
	let answer = userAnswer.split(': ');
	let firstCommand = answer[0];
	let filter = answer[1];
	let newTask = {};

	switch(firstCommand) {
		case 'add':
			let task = answer.slice(1).join().split(', ');
			newTask = new Task(task);
			tasks.push(newTask);
			break;

		case 'print': 
			tasks.forEach((task, i) => task.printTask());
			break;

			// поиск таски по приоритету priority: <high/low/...любой приоритет, который задан>
		case 'priority': 
			getFilter(firstCommand, filter);
			break;

			// поиск таски по статусу status: <new/done/...любой статус, который задан>
		case 'status': 
			getFilter(firstCommand, filter);
			break;

			// поиск таски по индексу task: <от 1 и до ....>
		case 'task':
			getIndex(filter);
			break;

		case 'changeStatus': 
			changeStatus(answer)
			break;

			// поиск таски по имени search: <task name>
		case 'search':
			getSearch(filter)
			break;

			// удаляет любую задачу по индексу delete: <от 1 и до ....>
		case 'delete': 
			deleteTask(filter)
			break;

		default: console.log('Try another command');
	}
}

function changeStatus(answer) {
	let [index, status] = answer.splice(1)
	
	if (!index || index > tasks.length || !status) {
		console.log('Нет такого значения')
		return
	}

	tasks[index - 1].status = status
	return tasks.forEach((task) => task.printTask())
} 
// для смены статуса использовать команду changestatus: 1 (индекс task): done (новый статус)

function getFilter(command, filter) {
	if (!filter || !command) return;
	return tasks.filter((task) => task[command] === filter).forEach((task) => task.printTask());
}

function getSearch(name) {
	if (!name) {
		console.log('Введите имя задачи')
		return
	}
	let re = new RegExp(`${name}`, 'gi');
	return tasks.filter((task) => task.name.match(re)).forEach((task) => task.printTask())
}

function getIndex(index) {
	if (index > tasks.length) {
		console.log('Нет такого значения')
		return
	}
	return tasks[index - 1].printTask();
}

function deleteTask(index) {
	if (index > tasks.length) {
		console.log('Нет такого значения')
		return
	}
	return tasks.splice(index - 1, 1)
}