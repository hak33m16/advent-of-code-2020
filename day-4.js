const fs = require('fs');

const input = fs.readFileSync('day-4-input.txt', 'utf-8').split('\n\n');

// Part 1

const required_passport_fields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

var totalValidPassports = 0;
input.map(passport => {
    let entries = passport.replace(/\n/g, ' ').split(' ');

    let presentPassportFields = new Set();
    entries.forEach(entry => {
        let arr = entry.split(':'); // byr:1994 -> ['byr', '1994']
        presentPassportFields.add(arr[0]);
    });

    let passportHasAllRequiredFields = true;
    required_passport_fields.forEach(required_field => {
        if (!presentPassportFields.has(required_field)) {
            passportHasAllRequiredFields = false;
        }
    });

    if (passportHasAllRequiredFields) {
        ++ totalValidPassports;
    }
});

console.log(`Total valid passports: ${totalValidPassports}`);

// Part 2

const required_field_validators = {
    'byr': (field) => {
        return parseInt(field) >= 1920 && parseInt(field) <= 2002;
    },
    'iyr': (field) => {
        return parseInt(field) >= 2010 && parseInt(field) <= 2020;
    },
    'eyr': (field) => {
        return parseInt(field) >= 2020 && parseInt(field) <= 2030;
    },
    'hgt': (field) => {
        const matches = field.match(/(^\d+)?(cm|in)?$/);
        const num = parseInt(matches[1]), units = matches[2];
        if (num && units) {
            return (units == 'cm') ?
                (num >= 150 && num <= 193) :
                (num >= 59 && num <= 76); 
        }
    },
    'hcl': (field) => {
        return field.match(/^#[a-f|0-9]{6}$/g) != null;
    },
    'ecl': (field) => {
        return field.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/g) != null;
    },
    'pid': (field) => {
        return field.match(/^[0-9]{9}$/g) != null;
    }
};

var totalValidPassports = 0;
input.map(passport => {
    let entries = passport.replace(/\n/g, ' ').split(' ');

    let presentPassportFields = { };
    entries.forEach(entry => {
        let arr = entry.split(':'); // byr:1994 -> ['byr', '1994']
        presentPassportFields[arr[0]] = arr[1];
    });

    let passportFieldsAllValid = true;
    let passportHasAllRequiredFields = true;
    required_passport_fields.forEach(field_name => {
        if (!presentPassportFields[field_name]) {
            passportHasAllRequiredFields = false;
        } else {
            if (!required_field_validators[field_name](presentPassportFields[field_name])) {
                passportFieldsAllValid = false;
            }
        }
    });

    if (passportHasAllRequiredFields && passportFieldsAllValid) {
        ++ totalValidPassports;
    }
});

console.log(`Part 2 total valid passports: ${totalValidPassports}`);
