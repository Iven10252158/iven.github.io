import pagination from './pagination.js';
Vue.component('pagination', pagination);

Vue.component('pagination', {
  template: '#pagination',
  data() {
    return {
    };
  },
  props: {
    pages: {
      type: Object,
      default() {
        return {
        };
      },
    },
  },
  methods: {
    emitPages(item) {
      this.$emit('emit-pages', item);
    },
  },
});

new Vue({
  el: '#app',
  data: {
    products: [],
    tempProduct: {},
    
    user: {
      uuid: '35e5ec2f-4b81-4496-9634-fef29022b381', 
      apiPath:'https://course-ec-api.hexschool.io/api/',
    },

    token:'iYpmrJbpfCZpoGmYHaL6MeLGQ1ZdjJyW4SrGZIlgqQryfpaf2e7c95o7A6vb',
    isNew:'',
  },

  methods: {

    // 取得產品資料
    getProducts(id) {
      const url = `${this.user.apiPath}${this.user.uuid}/admin/ec/products`;
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      axios.get(url)
        .then((res) => {
          this.products = res.data.data;
          console.log(res);
          // if (this.tempProduct.id) {
          //   this.tempProduct = {
          //     imageUrl: [],
          //   };
          //   $('#productModal').modal('hide');
          // }
        });
    },

     // 開啟 Modal 視窗
    openModal(isNew, item) {
      switch (isNew) {
        case 'new':
          this.tempProduct = {
            imageUrl: [],
          };
          this.isNew = true;
          $('#productModal').modal('show');
          break;
        case 'edit':
          this.tempProduct = Object.assign({}, item);
          // 使用 refs 觸發子元件方法
          this.$refs.productModel.getProduct(this.tempProduct.id);
          this.isNew = false;
          break;
        case 'delete':
          this.tempProduct = Object.assign({}, item);
          $('#delProductModal').modal('show');
          break;
        default:
          break;
      }
    },
  },
  created(){
      //取出token
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      // axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      this.getProducts();
  }

});