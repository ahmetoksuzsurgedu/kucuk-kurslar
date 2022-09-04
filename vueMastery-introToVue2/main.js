var app = new Vue({
    el:'#app',
    data: {
        brand: 'Surgegifting',
        product: 'Socks',
        // image: './assets/red-flower.jpg', resmi su metodla
        /*
            @mouseover="updateProduct(variant.variantImage)" >
            
            updateProduct (variantImage) { this.image = variantImage },
        */
        //    update etmek yerine yeniden faktörleyelim:
        selectedVariant: 0,
        altText:'red flower',
        surgedu: 'https://surgedu.com',
        // inStock: true, //maybe we can check by inventory + bunu computed property yapalim
        inventory: 100,
        onSale: true,
        details: ["80% Cotton","20% Polyester","Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "red",
                variantImage: './assets/red-flower.jpg',
                variantQuantity: 10,
            },
            {
                variantId: 2235,
                variantColor: "yellow",
                variantImage: './assets/yellow-flower.jpg',
                variantQuantity: 0,
            }
        ],
        sizes: ["L","M","S"],
        cart:0,
        visible:"hidden",
    },

    methods: {
        // addToCart: function () { bunu 
        addToCart () {   // bu sekilde kisaltabiliriz
            this.cart += 1
        },
        // updateProduct: function (variantImage) { AYNI SEKILDE BUNUDA
        // updateProduct (variantImage) {    burada variantImage yerine indexi gecirelim
        updateProduct (index) {
            // this.image = variantImage   image i update etmek yerine selectedVarianti update edelim
            this.selectedVariant = index
        //    console.log(index)
        },
        substructFromCart () {
            if (this.cart > 0) this.cart -= 1
        },
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock () {
            return this.variants[this.selectedVariant].variantQuantity
        },
        productOnSale () {
            return this.brand+ ' ' + this.product + ' on Sale!'
        },
    }
})
