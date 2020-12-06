const fs = require('fs');

const input = fs.readFileSync('day-6-input.txt', 'utf-8').split('\n\n');

// Part 1

let part1_sum = 0;
input.map(group => {
    group = group.replace(/\n/g, '');

    let questions = new Set();
    [... group].forEach(c => {
        questions.add(c);
    });

    part1_sum += questions.size;
});

console.log(part1_sum);

// Part 2

let sum = 0;
input.map(group => {
    let people = group.split('\n');

    let master_question_set = new Set();
    let all_group_answers = [];
    [... people].forEach(answers => {
        let question_set = new Set();

        [... answers].forEach(answer => {
            question_set.add(answer);
        });

        all_group_answers.push(question_set);
    });

    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'].forEach(letter => {
        let allPeopleAnsweredYesToThisQuestion = true;

        all_group_answers.forEach(answer_set => {
            if (!answer_set.has(letter)) {
                allPeopleAnsweredYesToThisQuestion = false;
            }
        });

        if (allPeopleAnsweredYesToThisQuestion) {
            master_question_set.add(letter);
        }
    });

    sum += master_question_set.size;
});

console.log(sum);
