myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const tabBtn = document.getElementById("tab-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const deleteBtn = document.getElementById("delete-btn")

deleteBtn.addEventListener("click", function () {
    localStorage.clear()
    myLeads = []
    renderLeads()
})

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    renderLeads()
}

inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    renderLeads()
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
})

tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        renderLeads()
    })
})

function renderLeads() {
    listitems = ""
    for (let i = 0; i < myLeads.length; i++) {
        listitems += `<li>
        <a target='_blank' href='${myLeads[i]}'>${myLeads[i]}</a>
        </li>`
    }
    ulEl.innerHTML = listitems
}