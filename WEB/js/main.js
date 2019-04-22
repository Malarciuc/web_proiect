var json = null;
window.onload = function(){ 
    (async () => {
        const response = await fetch('./data/element.json')
        json = await response.json()
  
    
        var element = new Configurator();
        element.createElement();
        element.setListeners();
        element.addPrice();
        element.addcant_1();
    })() 
}

class Configurator{
    createElement(){
        let containerHTML = ' ';
      for (let i = 0; i < json.produts.length; i++) {
          containerHTML = containerHTML + `
          <div id="card-${i}" class="card ">
              <div class="card-body">
              <img src="${json.produts[i].src}"></img><br>${json.produts[i].name}<br>${json.produts[i].price}<br>${json.produts[i].description}
              <br>
              <button type="button" class="btn1 btn-info">В корзину</button>
              <button id="${i}" type="button" class="btn2 btn-info">Подробнее...</button>
              </div>
          </div> 
          `;
      } 
        document.getElementById('card_container').innerHTML = containerHTML;    
    } 

    createModal(i){
        var name = document.querySelector(".name")
		var img = document.getElementById("pizzaImg")
        var price = document.querySelector("#price")
        var description = document.querySelector("#description")

		name.innerHTML = json.produts[i].name;
		img.src = json.produts[i].src
        price.innerHTML = json.produts[i].price 
        description.innerHTML = json.produts[i].description;
    }
    setListeners(){
        let btnMore = document.getElementsByClassName('btn2 btn-info')
        let bntClose = document.querySelector('.close')
        let total = document.querySelector('#total')
        let cant =  document.querySelector("#cant");
        let createModalFunction = this
        
        for(let i = 0; i < btnMore.length; i++){
            btnMore[i].onclick = function(){
                    total.value = 0;
                    cant.value = 1;
                    
                   
                document.querySelector(".modal").style.display = "block";
                createModalFunction.createModal(i);
            }
        }
        bntClose.onclick = function() {
            document.querySelector(".modal").style.display = "none";
        }
			
    }
    
    addPrice(){
       
        let inputs = document.querySelectorAll(".form-check input")
        let me = this
        inputs.forEach( e => {
            e.onclick = function(){
                me.event()
            }
        })
    }
    event (){
        
            let suma = 80;
            let radio1 = 'input[name="exampleRadios"]:checked'
            let radio2 = 'input[name="exampleRadiosm"]:checked'
            let check1 = document.querySelector("#exampleCheck1")
            let check2 = document.querySelector("#exampleCheck2")
            let cant =  document.querySelector("#cant");
            suma += parseInt(document.querySelector(radio1).value)
            suma += parseInt(document.querySelector(radio2).value)
            if (check1.checked)
                suma += parseInt(check1.value)
            if (check2.checked)
                suma += parseInt(check2.value)
            console.log(suma)
            let x = parseInt( cant.value)
            document.querySelector("#total").value = suma*x
        
    }

    addcant_1(){
        let addbut = document.querySelector("#add")
        let removebut = document.querySelector("#remove")
        let cant =  document.querySelector("#cant");
        let me = this
        addbut.onclick = function(){
           cant.value = parseInt(cant.value) + 1;
           me.event() 
        }
        removebut.onclick = function(){
            if (cant.value > 1){
                cant.value = parseInt(cant.value) - 1;
            me.event() 
            }
         }
    }


}