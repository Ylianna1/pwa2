var app = new Vue({
    el: '#app',
    data: {
        products:[
            {
		id:1,
		title: "Chanterelle",
          short_text:"Chanterelle is the common name of several species of fungi in the genera Cantharellus, Craterellus, Gomphus, and Polyozellus.",
              img: "img/fox.jpg",
        },
        {
          id:2,
          title: "Hypholoma fasciculare",
          short_text:
            "Poisonous mushroom from the genus Hypholoma of the Strophariaceae family.",

          img: "img/Ложноопёнок.jpg",
        },
        {
          id:3,
          title: "Agaric Honey",
          short_text:
            "A honey-colored edible mushroom commonly associated with the roots of trees in late summer and fall; do not eat raw",
         
          img: "img/Опёнок.jpg",
        },
        {
          id:4,
          title: "Рsilocybin",
          short_text:
            "Naturally occurring psychedelic prodrug compound produced by more than 200 species of fungi. The most potent are members of the genus Psilocybe, such as P. azurescens, P. semilanceata, and P. cyanescens, but psilocybin has also been isolated from about a dozen other genera.",
       
          img: "img/Псилоцибин.jpg",
        },
        {
          id:5,
          title: "Stropharia aeruginosa",
          short_text:
            "Commonly known as the verdigris agaric, is a medium-sized green, slimy woodland mushroom, found on lawns, mulch and woodland from spring to autumn.",
     
          img: "img/Строфария_сине-зелёная.jpg",
        }
        ],

        product:[],
        cart:[],
        cartId:[],
        contactFields:[],
        btnVisible: 0,
        orderVisible: 0
    },

    mounted:function() {
        console.log(window.localStorage.getItem('prod'));
        this.getProduct();
        this.checkInCart();
        this.getCart();
        console.log(this.cartId);
        console.log(this.contactFields);
    },

    methods: {
        addItem:function(id){
            window.localStorage.setItem('prod',id)
        },
        getProduct:function(){
            if(window.location.hash) {
                var id = window.location.hash.replace('#','');
                if(this.products && this.products.length>0) {
                   for(i in this.products) {
                       if(this.products[i] && this.products[i].id && id==this.products[i].id) this.product=this.products[i];
                   } 
                }
            }
        },

        addToCart:function(id) {
            var cart = [];
            if(window.localStorage.getItem('cart')) {
                cart = window.localStorage.getItem('cart').split(',');
            }
            if(cart.indexOf(String(id))==-1) {
                cart.push(id);
                window.localStorage.setItem('cart', cart.join());
                this.btnVisible=1;
            }
        },

        checkInCart:function() {
            if(this.product && this.product.id && window.localStorage.getItem('cart').split(',').indexOf(String(this.product.id)) !=-1 ) this.btnVisible=1;
        },

        getCart:function() {
            for(i in localStorage.getItem('cart')) {
                for(p in this.products) {
                    if(this.products[p].id == localStorage.getItem('cart').split(',')[i]) {
                       this.cart.push(this.products[p]);
                       this.cartId.push(this.products[p].id);
                    }
                }
            }
        },

        removeFromCart:function(id) {
            for(i in this.cart) {
                if(this.cart[i].id == id) {
                    this.cart.splice(i, 1);
                    this.cartId.splice(i, 1);
                    window.localStorage.setItem('cart', this.cartId.join());
                }
            }
        },

        makeOrder:function() {
            this.orderVisible = 1;
            this.cart = [];
            this.cartId = [];
            window.localStorage.removeItem('cart');
        }
    },
});                    