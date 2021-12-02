/*

--- 1. ---
function functionName(parameter) {
    parameter === "argumentum as a string"
}
functionName("argumentum as a string");

--- 2. ---
const argument = "argumentum as a string";

const functionName = function (parameter) {
    parameter === "argumentum as a string"
}
functionName(argument);

--- 3. ---
const functionName = () => {

}
functionName();

*/

const inputElement = (type, name, id, label) => {
    return `
        <div>
            <label for="${id}">${label}</label></br>
            <input type="${type}" name="${name}" id="${id}" >
        </div>
    `
}

const checkboxElement = (type, name, id, label) => {
    return `
        <div>
            <input type="${type}" name="${name}" id="${id}">
            <label for="${id}">${label}</label>
        </div>
    `
}

const selectElement = (type, name, id, label, selectOptions) => {
    
    // lehet létrehozni: let-tel (nem const) - változni fog a tartalma
    let optionElements = "";

    for (const option of selectOptions) {
        optionElements += ` 
            <option>${option}</option> 
        `;
    }
    
    return `
        <div>
            <label for="${id}">${label}</label>
            <${type} name="${name}" id="${id}">
                ${optionElements}
            </${type}>
        </div>
    `
}

/*
const formElement = '<form id="form">' + inputElement("text", "firstName", "Keresztneved") + inputElement("file", "profilePicture", "Profilképed") +  inputElement("email", "personalEmail", "Email címed") + inputElement("checkbox", "newsletter", "Szeretnél-e hírlevelet kapni?") + inputElement("checkbox", "terms", "Elfogadod-e a felhasználási feltételeket?") + selectElement("select", "where", "Hol hallottál rólunk?", ["internetről", "ismerőstől", "egyéb"]) +  '<button>OK</button>' + '</form>'
*/

const formElement =  `
    <form id="form">
        ${ inputElement("text", "firstName", "firstName", "Keresztneved*") }
        ${ inputElement("file", "profilePicture", "profilePicture", "Profilképed") }
        ${ inputElement("email", "personalEmail", "personalEmail", "Email címed*") }
        ${ checkboxElement("checkbox", "newsletter", "newsletter", "Szeretnél-e hírlevelet kapni?") }
        ${ checkboxElement("checkbox", "terms", "terms", "Elfogadod-e a felhasználási feltételeket?*") }
        ${ selectElement("select", "where", "where", "Hol hallottál rólunk?", ["internetről", "ismerőstől", "egyéb"]) }
        <button>OK</button>
    </form>
`;

const formSubmit = (event) => {
    event.preventDefault();
    // console.log(event);
    const et = event.target;
    et.classList.add("submitted");
    let etValue = et.querySelector(`select[name="where"]`).value;
    console.log(etValue);
}

const inputEvent = (event) => {
    console.log(event);
    // console.log(event.target.value);
    // document.getElementById("inputValueContent").innerHTML = event.target.value;

    const fName = document.querySelector(`input[name="firstName"]`);
    const tryForm = event.target.closest("#form");
    console.log(tryForm);

    console.log(event.target.name);
    // if (event.target.getAttribute("name") === "firstName")
    if (event.target.name === "firstName") {
        document.getElementById("inputValueContent")
            .innerHTML = event.target.value;
    }
}

function loadEvent() {
    const root = document.getElementById("root");

    root.insertAdjacentHTML("afterbegin", `
        <div id="registration">Regisztráció</div>
    `)
  
    root.insertAdjacentHTML("beforeend", formElement);

    /* root.insertAdjacentHTML("beforeend", `
        <div id="inputValueContent"></div>
    `);
    */

    root.insertAdjacentHTML("beforeend", `
        <span class="required">(A *-gal jelölt mezők kitöltése kötelező.)</span>
    `)

    const form = document.getElementById("form");
    form.addEventListener("submit", formSubmit);

    const inputList = form.querySelectorAll("input");
    for (const input of inputList) {
        input.addEventListener("input", inputEvent);
    }
}

window.addEventListener("load", loadEvent);

