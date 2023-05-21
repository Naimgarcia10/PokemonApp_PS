// load("../../../components/Footer/index.html", elm => document.querySelector('body').appendChild(elm))
export const load = (route, func) => fetch(route)
    .then(res => res.text())
    .then(data => {
        let frag = new DocumentFragment()
        let elm = document.createElement("div")
        elm.innerHTML = `<div class="loaded">${data}</div>`
        frag.append(elm)
        func(frag)
    })

// loadOver("../../../components/Footer/index.html", document.querySelector('script[src="/scripts/components/footer.js"]'))
const headerCargado = new CustomEvent("HeaderCargado", {
    bubbles: true,
    detail: {
        message: "Header cargado satisfactoriamente."
    }
})
export const loadOver = (route, node) => fetch(route)
    .then(res => res.text())
    .then(data => {
        let frag = new DocumentFragment()
        let elm = document.createElement("div")
        elm.innerHTML = `<div class="loaded">${data}</div>`
        frag.append(elm)
        if(node != null) node.replaceWith(frag)        
        if(route === "header.html") document.dispatchEvent(headerCargado);
    })

export const cargarSelectorIdiomas = () => {        
    const spanishFlag = document.querySelector("#spanish");
    const englishFlag = document.querySelector("#english");
    spanishFlag.addEventListener("click", () => {
        localStorage.setItem("userLanguage", "es");
        location.reload();
    });
    englishFlag.addEventListener("click", () => {
        localStorage.setItem("userLanguage", "en");
            location.reload();
    });    
}