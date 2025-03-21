let box = document.querySelector('.box');
let addbtn = document.querySelector('.addbtn');
let addModal = document.querySelector('.addModal');
let addname = document.querySelector('.addname');
let addcontact = document.querySelector('.addcontact');
let addtext = document.querySelector('.addtext');
let addemail = document.querySelector('.addinfo');
let addstatus = document.querySelector('.addstatus');
let addimg = document.querySelector('.addimg');
let addsave = document.querySelector('.addsave');
let editDialog = document.querySelector('.editDialog');
let editForm = document.querySelector('.editForm');
let editclose = document.querySelector('.editclose');
let inpsearch = document.querySelector('.inpsearch');
let search = document.querySelector('.search');
let infoModal = document.querySelector('.infoModal');
let infotext = document.querySelector('.infotext');
let infoname = document.querySelector('.infoname');
let infoclose = document.querySelector('.infoclose');
let sellected = document.querySelector('.selected');
let addclose=document.querySelector(".addclose");
let xclose=document.querySelector(".xclose");
let idx = null;

let API = "http://localhost:3000/data"


xclose.onclick=()=>{
    addModal.close()
}

/////function async
async function get() {
    try {
        let response = await axios(API)
        getData(response.data)
    } catch (error) {
        console.error(error);
    }
}
get()


async function delFun(id) {
    try {
        await axios.delete(`${API}/${id}`)
    } catch (error) {
        console.error(error);
        
    }
    get()
}


addbtn.onclick = () => {
    addModal.showModal()
}
addsave.onclick = async () => {
        let data = {
            img: addimg.value,
            name: addname.value,
            contact: addcontact.value,
            text: addtext.value,
            info :addinfo.value,
            status: addstatus.checked
        }
        try {
            await axios.post(API, data)
            get()
            addModal.close()
           
        } catch (error) {
            console.error(error);
        }
    }
    

function openEditModal(user){
    editDialog.showModal()
    editForm["editimg"].value = user.img
    editForm["editName"].value = user.name
    editForm["editemail"].value = user.info
    editForm["editcontact"].value = user.contact
    editForm["editDescription"].value = user.text
    editForm["editStatus"].value = user.status==true?"true":"false"
    idx = user.id
}
editForm.onsubmit = async (event) => {
    event.preventDefault()
    let data = {
        img: editForm["editimg"].value,
        name: editForm["editName"].value,
        info: editForm["editemail"].value,
        contact: editForm["editcontact"].value,
        text: editForm["editDescription"].value,
        status: editForm["editStatus"].value == "true" ? true : false
    }
    try {
        await axios.put(`${API}/${idx}`, data)
        editDialog.close()
        get()
    } catch (error) {
        console.error(error);
    }
}
editclose.onclick = () =>{
    editDialog.close()
}

async function chking(elem) {
    let user = {
        ...elem,
        status: !elem.status
    }
    try {
        await axios.put(`${API}/${elem.id}`, user)
        get()
    } catch (error) {
        console.error(error);
        
    }
}


search.onclick = async () => {
    try {
        let response = await axios.get(`${API}?name=${inpsearch.value}`)
        getData(response.data)
    } catch (error) {
        console.error(error);
    }
}

sellected.onchange = async () => {
    if (sellected.value != "all") {   
        try {
            let respons = await axios.get(`${API}?status=${sellected.value}`)
            getData(respons.data)
        } catch (error) {
            console.error(error);
       }   
    }else{
        get()
    }
}



async function  infoFun(id){
    
    try {
        let respons = await axios.get(`${API}/${id}`)
        getById(respons.data)
    } catch (error) {
        console.error(error);
        
    }
}

function getById(data){
    infoModal.showModal()
    infoname.innerHTML = data.name
    infotext.innerHTML = data.text
}
infoclose.onclick = () => {
    infoModal.close()
}


function getData(data) {
    box.innerHTML = ""
    data.forEach((elem) => {
        let container = document.createElement('div')
        let Name = document.createElement('h2')
        let img = document.createElement("img")
        let info = document.createElement("h3")
        let text = document.createElement("p")
        let contact = document.createElement("h3")
        let status = document.createElement("p")
        let delbtn = document.createElement("button")
        let editbtn = document.createElement("button")
        let infobtn = document.createElement("button")
        let check = document.createElement("input")
        check.type = "checkbox"
        check.checked = elem.status 
        elem.status == true ? Name.style.color = "green" : Name.style.color = "red"
        delbtn.innerHTML = "Delete User"
        editbtn.innerHTML = "Edit profile"
        delbtn.classList = "delbtn"
        editbtn.classList = "editbtn"
        infobtn.classList = "infobtn"
        Name.innerHTML = elem.name
        img.src = elem.img
        img.classList = "foto"
        info.innerHTML = elem.email
        text.innerHTML = elem.text
        contact.innerHTML = elem.contact
        container.classList = "container"
        infobtn.innerHTML = "info"
        delbtn.onclick = () =>{
            delFun(elem.id)
        }
        editbtn.onclick = () =>{
            openEditModal(elem)
        }
        check.onclick = () =>{
            chking(elem)
        }
        infobtn.onclick = () =>{
            infoFun(elem.id)
        }
        check.style.marginLeft="10px"
        container.style.borderRadius="10px"
        status.innerHTML = elem.status == true ? Name.style.textDecoration = "none" : Name.style.textDecoration = "line-through"
        container.append(img, Name, info, text, contact,delbtn,editbtn,infobtn,check)
        box.append(container)
    })
}