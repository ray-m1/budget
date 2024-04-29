//let el = document.createElement('div');
'use strict';

let startBtn = document.getElementById("start"),
	budgetValue = document.getElementsByClassName('budget-value')[0],
	dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
	levelValue = document.getElementsByClassName('level-value')[0],
	expensesValue = document.getElementsByClassName('expenses-value')[0],
	optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
	incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],


	expensesItem = document.getElementsByClassName('expenses-item'),
	expensesBtn = document.getElementsByTagName('button')[0],
	optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
	incomeItem = document.querySelector('.choose-income'),
	checkSavings = document.querySelector('#savings'),
	sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

let money, time;

// function start() {
// 	money = +prompt("Ваш бюджет на месяц?", '');
// 	time = prompt( "Введите дату в формате YYYY-MM-DD", '');
// 	while(isNaN(money) || money == '' || money == null) {
// 		money = +prompt("Ваш бюджет на месяц?", '');
// 	}
// }

// start();

startBtn.addEventListener('click', function() {
	time = prompt( "Введите дату в формате YYYY-MM-DD", '');
	money = +prompt("Ваш бюджет на месяц?", '');
	while(isNaN(money) || money == '' || money == null) {
		money = +prompt("Ваш бюджет на месяц?", '');
	}
	appData.budget = money;
	appData.timeData = time;
	budgetValue.textContent = money.toFixed();
	yearValue.value = new Date(Date.parse(time)).getFullYear();
	monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
	dayValue.value = new Date(Date.parse(time)).getDate();
	expensesBtn.disabled = false;
	optionalExpensesBtn.disabled = false;
	countBtn.disabled = false;
});

expensesBtn.addEventListener('click', function() {
	let sum = 0;
	for(let i=0; i<expensesItem.length; i++) {
		let a = expensesItem[i].value,
			 b = expensesItem[++i].value;
		if((typeof(a)) === 'string' && (typeof(a)) != null  && (typeof(b)) != null 
		&& a != '' && b != '' && a.length <50) {
			console.log("done");
			appData.expenses[a] = b;
			sum += +b; // + перед b  переводит строку в число
		} else {
			//console.log ("bad result");
			i--;
		}
	};	
	expensesValue.textContent = sum;
});

optionalExpensesBtn.addEventListener('click', function() {
	for (let i = 0; i <= optionalExpensesItem.length; i++) {
		let questionOptExpenses = optionalExpensesItem[i].value;
		appData.optionalExpenses[i] = questionOptExpenses; 
		optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
		//console.log(appData.optionalExpenses);
	}
});

countBtn.addEventListener('click', function() {
	if (appData.budget != undefined) {
		// округление () - до целого,  (1) - до первого знака после запятой
		let x = +expensesValue.textContent;
		appData.moneyPerDay = ((appData.budget - x) / 30).toFixed();
		dayBudgetValue.textContent = appData.moneyPerDay;
		if (appData.moneyPerDay < 100) {
			levelValue.textContent = "Это минимальный уровень достатка!";
		} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
			levelValue.textContent = "Это средний уровень достатка!";
		} else if (appData.moneyPerDay > 2000) {
			levelValue.textContent = "Это высокий уровень достатка!";
		} else {
			levelValue.textContent = "Ошибочка...!";
		}
	} else {
		dayBudgetValue.textContent = "Ошибочка...!";
	}
	
});

incomeItem.addEventListener('input', function() {
	let items = incomeItem.value;
	appData.income = items.split(", ");
	incomeValue.textContent = appData.income;
});

checkSavings.addEventListener('click', function() {
	if (appData.savings == true) {
		appData.savings = false;
	} else {
		appData.savings = true;
	}
});

sumValue.addEventListener('input', function() {
	if (appData.savings == true) {
		let sum = +sumValue.value,
			percent = +percentValue.value;
		appData.monthIncome = sum/100/12*percent;
		appData.yearIncome = sum/100*percent;

		monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
		yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
	}
	
});

percentValue.addEventListener('input', function() {
	if (appData.savings == true) {
		let sum = +sumValue.value,
			percent = +percentValue.value;
		appData.monthIncome = sum/100/12*percent;
		appData.yearIncome = sum/100*percent;

		monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
		yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
	}
});

let appData = {
	budget: money,
	timeData: time,
	expenses: {},
	optionalExpenses: {},
	monthIncome: [],
	yearIncome: [],
	savings: false
	/* chooseExpenses: function() {
		for(let i=0; i<2; i++) {
			let a = prompt("Введите обязательную статью расходов в этом месяце", '');
				 b = prompt("Во сколько обойдется?", '');
			if((typeof(a)) === 'string' && (typeof(a)) != null  && (typeof(b)) != null 
			&& a != '' && b != '' && a.length <50) {
				console.log("done");
				appData.expenses[a] = b;
			} else {
				console.log ("bad result");
				i--;
			}
		};	
	},
	detectDayBudget: function() {                                            // Расчет дневного бюджета
		// округление () - до целого,  (1) - до первого знака после запятой
		 appData.moneyPerDay = (appData.budget / 30).toFixed();
		 alert ("Бюджет на 1 день составляет " + appData.moneyPerDay + "руб.");
	 },
	  detectLevel: function() {                                                // Расчет уровня достатка
		if (appData.moneyPerDay < 100) {
			console.log ("Это минимальный уровень достатка!");
		} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
			console.log ("Это средний уровень достатка!");
		} else if (appData.moneyPerDay > 2000) {
			console.log ("Это высокий уровень достатка!");
		} else {
			console.log ("Ошибочка...!");
		}
	},
	checkSavings: function () {
		if(appData.savings == true) {
			let save = +prompt("Какова сумма накоплений?"),
				persent =  +prompt("Под какой процент?");
			appData.monthIncome = save/100/12*persent;
			alert("Доход в месяц с вашего депозита: " + appData.monthIncome)
		}
	},
	chooseOptExpenses: function() {                             // Функция для определения необязательных расходов

		for (let i = 1; i <= 3; i++) {
			let questionOptExpenses = prompt("Статья необязательных расходов?");
			appData.optionalExpenses[i] = questionOptExpenses;
			console.log(appData.optionalExpenses);
		}
	},
	chooseIncome: function () {

        let items = prompt("Что принесет дополнительный доход? (Перечислите через запятую)", "");
			if(typeof(items)!="string" || typeof(items) == null || items == '') {
				console.log("Вы ввели некорректные данные или не ввели их вовсе");
			}
			else {
				appData.income = items.split(", ");
				appData.income.push(prompt("Может что-то еще?"));
				appData.income.sort();
				
			}
			appData.income.forEach (function (itemmassive, i) {
				alert("Способы доп. заработка: " + (i+1) + " - " + itemmassive);
			});

           
	}  */
	  

};


/*     app = document.querySelector('.app');
    open = document.querySelector('.open');
    

el.classList.add('black');
el.textContent =  'Hello World!';
el.style.width = '150px';
el.style.height = '50px';
el.style.fontSize = '15px';
el.style.textAlign = 'center';
el.style.backgroundColor = '#000';
el.style.color = '#fff';
el.style.lineHeight = '50px'; 
el.style.margin = '20px auto';      
open.appendChild(el);
//document.body.insertBefore(el, startBtn); */





 