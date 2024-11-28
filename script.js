const inputEl = document.getElementById('input-el')
const inputBtn = document.getElementById('input-btn')
const ulEl = document.getElementById('ul-el')
let deleteBtn = document.getElementById("delete-btn")
let tabBtn = document.getElementById('tab-btn')
let myLeads = []
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads")) ;
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads); 
}

tabBtn.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const currentUrl = tabs[0].url;
        myLeads.push(currentUrl);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        console.log(myLeads);
        render(myLeads);
    });
});
deleteBtn.addEventListener('dblclick', function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})
inputBtn.addEventListener('click', function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""; 
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    console.log(myLeads)
    render(myLeads)
});
function render(leads){
    let listItems = ''
for(let i = 0 ; i < leads.length; i++){
    listItems += `
    <li>
        <a href="${leads[i]}" target="_blank">
           ${leads[i]}
        </a>
    </li>
`;
}
ulEl.innerHTML = listItems
}
