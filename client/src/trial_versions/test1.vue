<template>
<div>
  <div>
    HeyHeyHey!
  </div>
  <hr>

  <el-form ref="form" :model="form" label-width="120px"  @submit.prevent="onSubmit">

    <el-form-item label="Full Pet Name">
      <el-input v-model="fullPetName" @blur="fBlur"></el-input>
    </el-form-item>
    <el-alert :title="fError" type="error" v-if="fError" />

    <el-form-item label="Pet Name">
      <el-input  v-model="petName" @blur="()=>this.$alert('Speak up!')" valu="jhfjdhf"></el-input>
    </el-form-item>
    <!-- <el-alert :title="pError" type="error" v-if="pError" /> -->


     <el-form-item>



      <el-button type="primary" @click="onSubmit" :disabled="isSubmitting">Create</el-button>
    </el-form-item>
  </el-form>
</div>
</template>


<script>
import * as yup from "yup";
import { useField, useForm } from "vee-validate";

export default {
    data() {
  const { handleSubmit, isSubmitting } = useForm();

  const {
    value: fullPetName,
    errorMessage: fError,
    handleBlur: fBlur,
  } = useField(
    "fullPetName",
    yup
      .string()
      .trim()
      .required("The field is obligatory! Please, enter a pet name.")
  );

    const {
    value: petName,
    errorMessage: pError,
    handleBlur: pBlur,
  } = useField(
    "petName",
    yup
      .string()
      .trim()
      .required("The field is obligatory! Please, enter a pet name.")
  );


      
    return  {fullPetName, fError, fBlur, handleSubmit, isSubmitting, petName, pError, pBlur };
    },
  methods: {
    onSubmit() {
      
      this.handleSubmit(console.log(this.fullPetName))
      // this.$store.commit('addNewFormInsidePetsBase', {...this.info.form, id:Date.now()})
      // this.clear()
    },
  //   clear() {
  //       this.info = useNewPetForm(this.remember)
  //       this.info = {
  //       fullPetName: '',
  //       nickName:'',
  //       kind:'',
  //       gender: '',
  //       date1: '',
  //       date2: '',
  //       weight:'',
  //       homeless: false,
  //       pedigree:false,
  //       passport: false,
  //       colour: [],
  //       activeLifestyle: '',
  //       activityForm: '',
  //       diseases: '',
  //       }
  //   }
  },

}
</script>