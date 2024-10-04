app.component('product-display', {
	props: {
		premium: {
			type: Boolean,
			required: false,
		},
	},

	template:
		/*html*/
		`<div class="product-display">
			<div class="product-container">
				<div class="product-image">
					<img :class="{'out-of-stock-img': !inStock}" :src="image" :alt="image">
				</div>

				<div class="product-info">
					<h1>{{ title }}</h1>

					<p v-if="inStock">In Stock</p>
					<p v-else>Out of Stock</p>

					<p>Shipping: {{ shipping }}</p>

					<product-details :details="details"></product-details>

					<div class="color-circle" :style="{ backgroundColor: variant.color }" v-for="(variant, index) in variants"
						:key="variant.id" @mouseover="updateVariant(index)">
					</div>


					<button class="button" :class="{ disabledButton: !inStock }" :disabled="!inStock" @click="addToCart">
						Add to Cart
					</button>

					<button class="button" :class="{ disabledButton: !inStock }" :disabled="!inStock" @click="removeFromCart">
						Remove Item
					</button>
				</div>
			</div>

			<review-list v-if="reviews.length" :reviews="reviews"></review-list>
			<review-form @review-submitted="addReview"></review-form>

			
		</div>`,

	data() {
		return {
			product: 'Socks',
			brand: 'Vue Mastery',
			selectedVariant: 0,
			details: ['50% cotton', '30% wool', '20% polyester'],
			variants: [
				{
					id: 2234,
					color: 'green',
					image: './assets/images/socks_green.jpg',
					quantity: 50,
					onSale: true,
				},
				{
					id: 2235,
					color: 'blue',
					image: './assets/images/socks_blue.jpg',
					quantity: 0,
					onSale: false,
				},
			],

			reviews: [],

			description: 'some text',
			onSale: true,
			sizes: ['38', '39', '40', '41', '42'],
		}
	},

	methods: {
		addToCart() {
			this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
		},

		removeFromCart() {
			this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
		},

		updateVariant(index) {
			this.selectedVariant = index
		},

		addReview(review) {
			this.reviews.push(review)
		},
	},

	computed: {
		title() {
			if (this.variants[this.selectedVariant].onSale) {
				return `${this.brand} ${this.product} is on sale`
			} else {
				return `${this.brand} ${this.product}`
			}
		},

		image() {
			return this.variants[this.selectedVariant].image
		},

		inStock() {
			return this.variants[this.selectedVariant].quantity
		},

		shipping() {
			if (this.premium) {
				return 'Free'
			}
			return 2.99
		},
	},
})
