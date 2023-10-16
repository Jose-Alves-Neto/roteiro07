const cadeiras = [
    [{nome:"P1"},{nome:"LP1"},{nome:"IC"},{nome:"FMCC1"},{nome:"Português"}],
    [{nome:"P2"},{nome:"LP2"},{nome:"FMCC2"},{nome:"Calculo I"}],
    [{nome:"P1"},{nome:"LP1"},{nome:"IC"},{nome:"FMCC1"},{nome:"Português"}],
];

const event1 = new CustomEvent("onCellSelection",{bubbles:true});

class JnCell extends HTMLElement {
    constructor() {
        super();
        this.id = this.getAttribute("id");
        this.isSelected = false;
        this.innerHTML = `<button>${this.id}</button>`;
        this.$button = this.querySelector("button");
        this.$button.onclick = () => {this.dispatchEvent(event1)};
        this.$button.addEventListener('click', ()=>{
            if (this.isSelected) {
                this.$button.className = '';
                this.isSelected = !this.isSelected;
                
                return;
            } 
            this.$button.className = 'selected';
            this.isSelected = !this.isSelected;
        });
    }

    connectCallback() {

    }

    update() {

    }
}

customElements.define("jn-cell",JnCell);


class JnTable extends HTMLElement {
    constructor() {
        super();
        this.selected = [];
        this.innerHTML = `${cadeiras.map((periodo, index)=>`
        <p>${index+1} periodo</p>
        <div>${periodo.map((cadeira)=>`<jn-cell id="${cadeira.nome}"></jn-cell>`).join("")}</div>`).join("")}
        `;
        this.addEventListener("onCellSelection", (e)=>this.handleClick(e.target.getAttribute("id")));
    }

    handleClick(id) {
        if (!this.selected.includes(id)) {
            this.selected.push(id);
            return;
        }
        this.selected = this.selected.filter((value) => value != id);
    }


}


customElements.define("jn-table",JnTable);
