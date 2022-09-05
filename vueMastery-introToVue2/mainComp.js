Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
    <div> <a :href="surgedu"><button>Surgedu</button></a></div>
    <div class="product-image">
        <!-- <img v-bind:src="image" v-bind:alt="altText"> -->
        <img :src="image" :alt="altText">
    </div>
    <div class="product-info">
        <!-- <h1>{{brand}} {{product}}</h1> böyle yada -->
        <!-- <h1>{{ brand + ' ' + product}}</h1>  böyle ya da-->
        <h1>{{ title}}</h1> <!-- computed properties le-->
        <!-- <p v-if="inStock">In Stock</p> -->
        <!-- <p v-show="inStock">In Stock</p> DOM da duruyor sadece css de display:none görünüyor. devtools da görülebiliyor-->
        <p v-if="inventory > 10 && inStock">In Stock</p>
        <p v-else-if="inventory<=10 && inventory > 0">Almost sold out!</p>
        <p v-else :style="{ 'text-decoration': 'line-through' }">Out of Stock</p>
        <p v-if="onSale"> {{productOnSale}}</p>
        <p>Shipping: {{shipping}} </p>

        <ul>
            <li v-for="detail in details">{{detail}}</li>
        </ul>
        <!-- suna: <div v-for="variant in variants" computed propertiye cevirmek icin index ekleyelim -->  
        <!-- ve surada variantImage yerine index i parametre verelim ==> @mouseover="updateProduct(variant.variantImage)" > -->
            <div v-for="(variant,index) in variants"  
            :key="variant.variantId"
            class="color-box"
            :style="{ backgroundColor: variant.variantColor}"
            @mouseover="updateProduct(index)" >
            <!-- <p>{{variant.variantId + " : " + variant.variantColor}}</p> -->
            <!-- <p class="variant" @mouseover="updateProduct(variant.variantImage)">{{variant.variantColor}}</p> div icine tasiyip p yi silelim -->
        </div>
        <div v-for="size in sizes">{{size}}</div>
        <!-- <button v-on:click="cart += 1">Add to Cart</button> artirimi addToCart metoduyla yapalim -->
        <button v-on:click="addToCart"
                :disabled="!inStock"
                :class="{ disabledButton: !inStock }" >Add to Cart</button>
        <!-- other methods like @click, @mouseover we can use: <form @submit="addToCart">...</form>,
            <input @keyup.enter="send"> etc...   -->
        <button @click="substructFromCart">Substruct from Cart</button>
            <!-- burasi buttondan cikarildi:  :disabled="cart < 1" :class="{ hidden:cart < 1 }" -->
        </div>
        <div>
            <h2>Reviews</h2>
            <p v-if="!reviews.length">There are no reviews yet.</p>
            <ul>
                <li v-for="review in reviews">
                    <p>{{ review.name }}</p>
                    <p>Rating: {{ review.rating }}</p>
                    <p>{{ review.review }}</p>
                    <p>I recommend this product: {{ review.recommendation }}</p>
                </li>  
            </ul>
        </div>
    <product-review @review-submitted="addReview"></product-review>
</div>
    `,
    
    // data: {     transform this to a function like below
    data () {
        return {     
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
                    variantQuantity: 20,
                },
                {
                    variantId: 2235,
                    variantColor: "yellow",
                    variantImage: './assets/yellow-flower.jpg',
                    variantQuantity: 10,
                }
            ],
            sizes: ["L","M","S"],
            visible:"hidden",
            reviews: []
        }
    },

    methods: {
        // addToCart: function () { bunu 
        addToCart () {   // bu sekilde kisaltabiliriz
            // this.cart += 1 component yaparken bunu asagidaki gibi degistiriyoruz
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)   
            //listen this in component in html ve cartta kullanmak icin id parameter ver
        },
        // updateProduct: function (variantImage) { AYNI SEKILDE BUNUDA
        // updateProduct (variantImage) {    burada variantImage yerine indexi gecirelim
        updateProduct (index) {
            // this.image = variantImage   image i update etmek yerine selectedVarianti update edelim
            this.selectedVariant = index
        //    console.log(index)
        },
        substructFromCart () {
            this.$emit('substruct-from-cart',this.variants[this.selectedVariant].variantId)
        },
        addReview (productReview) {
            this.reviews.push(productReview)
        }
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
        shipping() {
            if (this.premium) {
                return "Free"
            }
            return 2.99
        },
    }

})

Vue.component('product-review', {
    template:`
        <form class="review-form" @submit.prevent="onSubmit">

        <p v-if="errors.length">
            <b>Please correct the following error(s):</b> 
            <ul>
                <li v-for="error in errors">{{ error }}</li>
            </ul>       
        </p>

            <p>
                <label for="name">Name:</label>
                <input id="name" v-model="name" placeholder="name">
            </p>
            <p>
                <label for="review">Review:</label>
                <textarea id="review" v-model="review" ></textarea> <!-- required ekleyerek validate edebiliriz yada custom validate yapabiliriz -->
            </p>
            <p>
                <label for="rating">Rating:</label>
                <select id="rating" v-model.number="rating">
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
            </p>

            <fieldset>
                <legend>Would you recommend this product?</legend>
                <label for="recommendation1">Yes</label>
                <input type="radio" id="recommendation1" v-model="recommendation" name="recommendation" value="yes" checked>
                <label for="recommendation2">No</label>
                <input type="radio" id="recommendation2" v-model="recommendation" name="recommendation" value="no">
            </fieldset>

            <p>
                <input type="submit" value="Submit">
            </p>
        </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommendation: null,
            errors: [],
        }
    },
    methods: {
        onSubmit () {
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommendation: this.recommendation,
                }
                this.$emit('review-submitted',productReview)
                this.name=null
                this.review=null
                this.rating=null
                this.recommendation=null
            }
            else {
                if (!this.name) this.errors.push("Name required.")
                if (!this.review) this.errors.push("Review required.")
                if (!this.rating) this.errors.push("Rating required.")
                if (!this.recommendation) this.errors.push("Recommendation required.")
            }
        }
    }
})


var app = new Vue({
    el:'#app',
    data: {
        // cart:0, make the cart an array for the objects
        cart:[],
        premium:true,
    },
    methods: {
        updateCart(id) {
            // this.cart += 1  real up we want to see what is added to the cart so change the cart from number to array
            this.cart.push(id)  // id yi kullanmak icin methoda parametre olarak ekle
        },
        substructCart(id) {
            console.log(this.cart.indexOf(id),id)
            if (this.cart.indexOf(id) !== -1) this.cart.splice(this.cart.indexOf(id),1)    
        },
    }
})
