<template>
    <div class="main-content-container container-fluid px-4">
        <!-- Page Header -->
        <div class="page-header row no-gutters py-4">
            <div class="col-12 col-sm-4 text-center text-sm-left mb-0">
            <h3 class="page-title">Add Question</h3>
            <span class="text-uppercase page-subtitle">Fill form to create new question</span>
            </div>
        </div>
        <!-- End Page Header -->

        <!-- Button -->
        <div class="row">
        <div class="col">
            <nuxt-link to="/admin/questions">
            <button type="button" class="mb-2 btn btn-outline-primary mr-2">Go back</button></nuxt-link>
        </div>
        </div>
        <!-- / Button -->

        <!-- Form -->
        <div class="row">
            <div class="col">
                <strong class="text-muted d-block mb-2"></strong>
                <form @submit.prevent="checkForm">
                    <p v-if="errors.length">
                        <b>Please correct the following error(s):</b>
                        <ul>
                        <li class="text-danger" v-for="error in errors" :key="error">{{ error }}</li>
                        </ul>
                    </p>
                    <div class="alert alert-success" v-if="success"><button type="button" class="pi-close" data-dismiss="alert"><i class="material-icons" data-dismiss="alert">close</i></button>{{ success }}</div>
                    <div class="alert alert-danger" v-if="error"><button type="button" class="pi-close" data-dismiss="alert"><i class="material-icons" data-dismiss="alert">close</i></button>{{ error }}</div>
                    <div class="form-group" style="max-width: 30%">
                        <div class="input-group mb-3">
                        <div class="input-group-prepend">
                        </div>
                        <select class="form-control" v-model="question.category_id">
                            <option value="">-- Select Category --</option>
                            <option v-for="category in categories" :value="category">{{ category.name}}</option>
                        </select>
                        </div>
                    </div>
                    <div class="form-group" style="max-width: 30%">
                        <div class="input-group mb-3">
                        <div class="input-group-prepend">
                        </div>
                        <input type="text" class="form-control" v-model="question.subject" placeholder="Subject" aria-label="Subject" aria-describedby="basic-addon1"> </div>
                    </div>

                    <div class="form-group" style="max-width: 30%">
                        <div class="input-group mb-3">
                        <div class="input-group-prepend">
                        </div>
                        <textarea type="text" class="form-control" v-model="question.description" rows="4" aria-describedby="basic-addon1">
                        </textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                        <button type="submit" class="mb-2 btn btn-primary mr-2">Add Question</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- End Form -->

        <!-- Button -->

        <!-- / Button -->
    </div>

</template>
<script>
export default {
    props:['categories'],
    data(){
        return {
            errors: [],
            question: {
                category_id: '',
                subject:'',
                description:''
            },
            success:'',
            error: ''
        }
    },
    methods: {
        register(){
            let component = this;
            this.$store.dispatch('addQuestion', [component.question,this.$store.state.auth.headers])
            .then((resp) => {
              this.error = ''
              this.success = ''
              if(resp.data.error){
                this.error = resp.data.msg
              }else{
                this.success = resp.data.msg
                this.question= {
                    category_id: '',
                    subject:'',
                    description:''
                }
                this.errors = []
              }
            })
            .catch(err => {
                this.error = 'please verify that the data entered are correct.'
                console.log(err)
            })
        },
        checkForm: function (e) {
            if (this.question.category_id && this.question.subject && this.question.description) {
            this.register();
            return true;
            }

            this.errors = [];
            if (!this.question.category_id) {
            this.errors.push('Category required.');
            return false;
            }
            if (!this.question.subject) {
            this.errors.push('Name required.');
            return false;
            }
            if (!this.question.description) {
            this.errors.push('Description required.');
            return false;
            }
            e.preventDefault();
        }
    }
}
</script>

