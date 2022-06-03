var app = new Vue({
    el: '.items, .item, .contactUs',
    data: {
        products:[
            {id:1, title:"Red ball", short_text:"A high-yielding variety with high-quality round root crops ripens for 65-100 days.", image:"redBall.jpg", desc:"When sowing before winter, they get high-quality products of the super-early harvest on a bunch. Vegetables are smooth, dense red in color with a lilac tint, weighing from 200 to 500 g."},
            {id:2, title:"Boltardi", short_text:"The leveled burgundy roots are harvested 70-100 days from the moment of mass shoots.", image:"Boltardi.jpg", desc:"The variety works well in podzimny and super-early sowing under film, to obtain marketable bundles. Beetroot is round, beautiful, with elastic skin, weighs 150-370 g."},
            {id:3, title:"Nochowski", short_text:"Round dark red roots are almost completely submerged in the soil, so the coarse corky.", image:"Nochowski.jpg", desc:"The first harvest is started 70 days after full germination. The beets are attractive - even, weighing 150–380 g, with a dense elastic skin and fine-fiber juicy pulp of a monochromatic cherry-red color."},
            {id:4, title:"One-sprout", short_text:"This variety is one of those with which it is convenient to start the beet season.", image:"One-sprout.jpg", desc:"Root crops at Odnorostkova ripen in 72-81 days, and her yield for early varieties is very high. The roots themselves are for lovers of traditional shapes and colors: rounded, with maroon flesh without rings."},
            {id:5, title:"Podzimnyaya A-474", short_text:"This variety is perhaps the best suited for winter crops, and in this case.", image:"Podzimnyaya.jpg", desc:"Root crops in Podzimnya look almost the same as in Odnorostkovaya - the most common, with dark red flesh without rings. In good conditions and with proper care, the yield of this variety can reach 6.5 kg / m2, although, I must say, it fluctuates very much, and for many reasons."}
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
