// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const { remote} = require('electron');
const dbInstance = remote.getGlobal('db');

const mainProcess = require ("electron").remote;

var reload = () => {
    mainProcess.getCurrentWindow().reload()
}

function setting(content) {
    const portDiv = document.getElementById('portDiv');

    const span1 = document.createElement("span");
    span1.textContent = '현재 포트 : '
    
    const span2 = document.createElement("span");
    span2.id = 'nowPort';

    const modify = document.createTextNode(content);
    span2.appendChild(modify);

    const span3 = document.createElement("span");
    span3.textContent=' / 포트 설정 : '

    const input = document.createElement("input");
    input.type = 'number'
    input.maxLength = 5;
    input.id = 'port';
    input.addEventListener("keypress", function (event) {
        //console.log(this.parentElement.id);
        if (event.keyCode == 13) {
            insertPort();
        }
    });
    input.value = '';
    
    
    portDiv.appendChild(span1)
    portDiv.appendChild(span2)
    portDiv.appendChild(span3)
    portDiv.appendChild(input);    

}


function insertPort() {
    const inputValue = document.getElementById('port').value;
    if (inputValue) {
        dbInstance.deleteAll()
            .then(result => {            
                console.log("삭제 : " + result);
                dbInstance.create({content: inputValue})
                    .then(result => {
                        console.log("입력 : " + result);
                        //document.getElementById('port').value = null;
                        reload();
                        //updateView();
                })
        })

        
    }
}

function updateView() {
    dbInstance.readAll()
        .then(allPortLists => {
            if (allPortLists.length > 0) {
                allPortLists.forEach(item => {
                    //console.log("초기 화면 : " + item.content);
                    setting(item.content);                                        
                });
            } else {
                dbInstance.create({content: '80'})
                    .then(result => {                    
                        updateView();
                })
            }
        })    
}

updateView();
