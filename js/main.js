var app = new Vue({
    el: '.items, .item, .contactUs',
    data: {
        products:[
            {id:1, title:"Allium fistulosum", short_text:"This is a species of perennial plant, often considered to be a kind of scallion.", image:"Allium fistulosum.png", desc:"The species is very similar in taste and odor to the related common onion, Allium cepa, and hybrids between the two (tree onions) exist. A. fistulosum, however, does not develop bulbs, and possesses hollow leaves (fistulosum means 'hollow') and scapes."},
            {id:2, title:"Leek", short_text:"The leek is a vegetable, a cultivar of Allium ampeloprasum, the broadleaf wild leek.", image:"Leek.png", desc:"Three closely related vegetables, elephant garlic, kurrat and Persian leek or tareh, are also cultivars of A. ampeloprasum, although different in their uses as food."},
            {id:3, title:"Chives", short_text:"This is a species of flowering plant in the family Amaryllidaceae that produces edible leaves and flowers.", image:"Chives.png", desc:"Chives are a commonly used herb and can be found in grocery stores or grown in home gardens. In culinary use, the green stalks (scapes) and the unopened, immature flower buds are diced and used as an ingredient for omelettes, fish, potatoes, soups, and many other dishes."},
            {id:4, title:"Allium nutans", short_text:"This is a perennial herbaceous plant, a species of the genus Onion of the Onion family.", image:"Allium nutans.png", desc:"The slime onion begins its vegetation almost immediately after the snow melts, so its leaves are suitable for eating in early spring, when there are no other garden greens yet. Uses it in the same way as other types of onions: as greens in salads, and also added as a spice to various dishes."},
            {id:5, title:"Shallot", short_text:"The term shallot is usually applied to the French red shallot.", image:"Shallot.png", desc:"Like garlic, shallots are formed in clusters of offsets with a head composed of multiple cloves."}
        ],
        product:[],
        cart:[],
        cartIds:[],
        contactFields:[],
        btnVisible: 0,
        orderVisible: 0
    },
    mounted:function() {
        this.getProducts();
        this.checkInCart();
        this.getCart();
        console.log(this.cartIds);
        console.log(this.contactFields);
    },
    methods: {
        addItem:function(id){
            window.localStorage.setItem('prod',id)
        },
        getProducts:function(){
            if(window.location.hash) {
                var id = window.location.hash.replace('#','');
                if(this.products && this.products) {
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
                       this.cartIds.push(this.products[p].id);
                    }
                }
            }
        },
        removeFromCart:function(id) {
            for(i in this.cart) {
                if(this.cart[i].id == id) {
                    this.cart.splice(i, 1);
                    this.cartIds.splice(i, 1);
                    window.localStorage.setItem('cart', this.cartIds.join());
                }
            }
        },
        makeOrder:function() {
            this.orderVisible = 1;
            this.cart = [];
            this.cartIds = [];
            window.localStorage.removeItem('cart');
        }
    }
});
