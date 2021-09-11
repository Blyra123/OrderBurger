document.addEventListener('DOMContentLoaded', function() {
   
    const btnOpenModal = document.querySelector('#btnOpenModal'); 
    const modalBlock = document.querySelector('#modalBlock');
    const CloseModal = document.querySelector('#closeModal');
        
    const qustionTitle = document.querySelector('#question');
    const formAnswer =  document.querySelector('#formAnswers');
    const nextButton =  document.querySelector('#next');
    const prevButton =  document.querySelector('#prev');
    const sendButton =  document.querySelector('#send');
    //Объект, содержащий вопросы и ответы
    const questions = [
        {
            question: "Какого цвета бургер?",
            answers: [
                {
                    title: 'Стандарт',
                    url: './image/burger.png'
                },
                {
                    title: 'Черный',
                    url: './image/burgerBlack.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Из какого мяса котлета?",
            answers: [
                {
                    title: 'Курица',
                    url: './image/chickenMeat.png'
                },
                {
                    title: 'Говядина',
                    url: './image/beefMeat.png'
                },
                {
                    title: 'Свинина',
                    url: './image/porkMeat.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Дополнительные ингредиенты?",
            answers: [
                {
                    title: 'Помидор',
                    url: './image/tomato.png'
                },
                {
                    title: 'Огурец',
                    url: './image/cucumber.png'
                },
                {
                    title: 'Салат',
                    url: './image/salad.png'
                },
                {
                    title: 'Лук',
                    url: './image/onion.png'
                }
            ],
            type: 'checkbox'
        },
        {
            question: "Добавить соус?",
            answers: [
                {
                    title: 'Чесночный',
                    url: './image/sauce1.png'
                },
                {
                    title: 'Томатный',
                    url: './image/sauce2.png'
                },
                {
                    title: 'Горчичный',
                    url: './image/sauce3.png'
                }
            ],
            type: 'radio'
        }
    ];
    //обработчик событий открытия и закрытия модального окна
    btnOpenModal.addEventListener('click', () => {
        modalBlock.classList.add('d-block');
        playTest();
    })
    CloseModal.addEventListener('click', ()=> {
        
        modalBlock.classList.remove('d-block');
    })
    // начало тестирования
    const playTest = () => {
        // переменная (номер вопроса)
        let numberQustion = 0; 
        const finalAnswers = [];

        // ф-ия переберает ответы и динамически выводит на нашу страницу
        const renderAnswers = (index) =>{
            questions[index].answers.forEach((answer) => {
                const answerItem = document.createElement('div');
                answerItem.classList.add('answers-item','d-flex','justify-content-center');
                answerItem.innerHTML = `                
                    <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value ="${answer.title}">
                    <label for="${answer.title}"" class="d-flex flex-column justify-content-between">
                    <img class="answerImg" src="${answer.url}" alt="burger">
                    <span>${answer.title}</span>
                    </label>
                `;
                formAnswer.appendChild(answerItem);
            })
        }
        // ф-ия обновлет окно
        const renderQustion = (indexQuestion) => {
            formAnswer.innerHTML=``;
            if (numberQustion>=0 && numberQustion<= questions.length-1) {
                qustionTitle.textContent = `${questions[indexQuestion].question}`;
                renderAnswers(indexQuestion);
                nextButton.classList.remove('d-none');
                prevButton.classList.remove('d-none');
                sendButton.classList.add('d-none');
            }
            if (numberQustion===0) {
                prevButton.classList.add('d-none');
            }
            if (numberQustion=== questions.length-1 ) {
               
            } 
            if (numberQustion=== questions.length) {
                nextButton.classList.add('d-none');
                prevButton.classList.add('d-none');
                sendButton.classList.remove('d-none');
                formAnswer.innerHTML = `
                <div class="form-group">
                    <label for="numberPhone">Enter your number</label>
                    <input type="phone" class="form-control" id="numberPhone">
                </div>
                `;
            }
            if (numberQustion=== questions.length+1) {
                formAnswer.textContent = 'Спасибо за пройденный тест';
                setTimeot(()=>{
                    modalBlock.classList.remove('d-block');
                },2000);
            }
        }
        // запускаем ф-ию обнавления
        renderQustion(numberQustion);
        const checkAnswer = () => {
            const obj ={};
            const inputs = [...formAnswer.elements].filter((input) => input.checked || input.id === 'numberPhone');
            inputs.forEach((input,index)=>{
                if (numberQustion>=0 && numberQustion<= questions.length-1) {
                    obj[`${index}_${questions[numberQustion].question}`] = input.value;
                }
                if (numberQustion=== questions.length) {
                    obj['Номер телефона'] = input.value;
                }
               
            })
            finalAnswers.push(obj);
            console.log(finalAnswers);
        }
        //обработчик событий на кнопку next
        nextButton.onclick = ()=>{
            checkAnswer();
            numberQustion++;
            renderQustion(numberQustion);
        };
        //обработчик событий на кнопку prev
        prevButton.onclick = ()=>{
            numberQustion--;
            renderQustion(numberQustion);
        }
        sendButton.onclick = ()=>{
            checkAnswer();
            numberQustion++;
            renderQustion(numberQustion);
        }    
    }
})
