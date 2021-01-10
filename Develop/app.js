const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the Employee's name?"
    },
    {
        type: "input",
        name: "email",
        message: "What is your employee's email address?"
    },
    {
        type: "input",
        name: "id",
        message: "What is your employee's id?"
    },
    {
        type: "list",
        name: "role",
        choices: [
            "Intern",
            "Manager",
            "Engineer"
        ]
    },
]

///// All answers are saved in this array /////////
const employeeList = [];

employeeType = () => {
    inquirer.prompt(employeeQuestions)
    .then(function(data) {
        console.log(data);

////// if ENGINEER - ask this extra questions and push the answer to the array//////////
        if (data.role === "Engineer"){
            inquirer.prompt([{
                type: "input",
                name: "github",
                message: "What is your Engineer's github?"
            },
            {
            type: "list",
            name: "addmore",
            message: "Would you like to add another employee?",
            choices: [
                "yes",
                "no"
            ]  
            }])
            .then(function(engineerData){
                const engineer = new Engineer(data.name, data.id , data.email, engineerData.github)
                employeeList.push(engineer);
                
                if (engineerData.addmore === "yes"){
                    employeeType();
                }
                if (engineerData.addmore === "no"){
                fs.writeFileSync('renderEmployee/myTeam.html', render(employeeList));
                }
            })
        }

////// if INTERN - ask this extra questions and push the answer to the array//////////
        if (data.role === "Intern"){
            inquirer.prompt([{
                type: "input",
                name: "school",
                message: "What school did the intern attend?"
            },
            {
                type: "list",
                name: "addmore",
                message: "Would you like to add another employee?",
                choices: [
                    "yes",
                    "no"
                ]
            }])
            .then(function(internData){
              const intern = new Intern(data.name, data.id , data.email, internData.school)
              employeeList.push(intern); 
              
              if (internData.addmore === "yes"){
                  employeeType();
              }
              if (internData.addmore === "no"){
                fs.writeFileSync('renderEmployee/myTeam.html', render(employeeList));
              }
            })
        }

////// if MANAGER - ask this extra questions and push the answer to the array//////////
        if (data.role === "Manager"){
            inquirer.prompt([{
                type: "input",
                name: "office",
                message: "What is the manager's office number?"
            },
            {
                type: "list",
                name: "addmore",
                message: "Would you like to add another employee?",
                choices: [
                    "yes",
                    "no"
                ]
            }])
            .then(function(managerData){
              const manager = new Manager(data.name, data.id , data.email, managerData.office)
              employeeList.push(manager); 

              if (managerData.addmore === "yes"){
                employeeType();
            }
              if (managerData.addmore === "no"){
                fs.writeFileSync('renderEmployee/myTeam.html', render(employeeList));
                }
                
            })   
        }
    })
}
employeeType();