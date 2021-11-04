<template>
<div>
  <div class="center">
    <el-button-group >
      <router-link to="/all" class="el-link" type="primary">
          <el-button type="primary" icon="el-icon-arrow-left"
            > 
            All Cards
          </el-button>
        </router-link>
        <router-link to="/" class="el-link" type="primary">
          <el-button type="primary"
            >Main<i class="el-icon-arrow-right el-icon-right"></i
          ></el-button>
        </router-link>
      </el-button-group>
</div>
  <el-form ref="form" :model="form" label-width="120px"  @submit.prevent="onSubmit">

    <el-form-item label="Full Pet Name">
      <el-input v-model="form.fullPetName"></el-input>
    </el-form-item>

     <el-form-item label="Nick Name">
      <el-input v-model="form.nickName"></el-input>
    </el-form-item>

    <el-form-item label="Kind">
      <el-input v-model="form.kind"></el-input>
    </el-form-item>

    <el-form-item label="Gender">
      <el-select v-model="form.gender" placeholder="please select pet's gender">
        <el-option label="Male" value="Male"></el-option>
        <el-option label="Female" value="Female"></el-option>
      </el-select>
    </el-form-item> 



    <el-form-item label="Period of Life">
      <el-col :span="11">
        <el-date-picker
          v-model="form.date1"
          type="date"
          placeholder="Pick a date of birth"
          style="width: 100%"
        ></el-date-picker>
      </el-col>
      

      <el-col class="line" :span="2">-</el-col>

      <el-col :span="11">
        <el-date-picker
          v-model="form.date2"
          type="date"
          placeholder="Pick a date of death"
          style="width: 100%"
        ></el-date-picker>
        <!-- <el-time-picker
          v-model="form.date2"
          placeholder="Pick a time"
          style="width: 100%"
        ></el-time-picker> -->
      </el-col>
    </el-form-item>
    
     <el-form-item label="Weight, kilos">
      <el-input v-model="form.weight" type="number" min="0"></el-input>
    </el-form-item>

    <el-form-item label="Homeless">
      <el-switch v-model="form.homeless"></el-switch>
    </el-form-item>

    <el-form-item label="Pedigree">
      <el-switch v-model="form.pedigree"></el-switch>
    </el-form-item>

    <el-form-item label="Passport">
      <el-switch v-model="form.passport"></el-switch>
    </el-form-item>

    <el-form-item label="Colour">
      <el-checkbox-group v-model="form.colour">
        <el-checkbox label="Black" name="colour"></el-checkbox>
        <el-checkbox label="White" name="colour"></el-checkbox>
        <el-checkbox label="Brown" name="colour"></el-checkbox>
        <el-checkbox label="Orange" name="colour"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item label="Active Lifestyle">
      <el-radio-group v-model="form.activeLifestyle">
        <el-radio label="Yes"></el-radio>
        <el-radio label="No"></el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="Activity Form">
      <el-input v-model="form.activityForm" type="textarea"></el-input>
    </el-form-item>

    <el-form-item label="Health Problems">
      <el-input v-model="form.diseases" type="textarea"></el-input>
    </el-form-item>


    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button @click="clear">Cancel</el-button>
    </el-form-item>
     
 
  </el-form>
  
</div>
</template>

<script>
import {  useNewPetForm } from "../use/newPet-form.js";

export default {
  data() {
    return  {
      form: {
        fullPetName: '',
        nickName:'',
        kind:'',
        gender: '',
        date1: '',
        date2: '',
        weight:'',
        homeless: false,
        pedigree:false,
        passport: false,
        colour: [],
        activeLifestyle: '',
        activityForm: '',
        diseases: '',

      },
    }
  },
  methods: {
    onSubmit() {
      this.$store.commit('addNewFormInsidePetsBase', {...this.form, id:Date.now()})
      this.clear()
    },
    clear() {
        this.form = {
        fullPetName: '',
        nickName:'',
        kind:'',
        gender: '',
        date1: '',
        date2: '',
        weight:'',
        homeless: false,
        pedigree:false,
        passport: false,
        colour: [],
        activeLifestyle: '',
        activityForm: '',
        diseases: '',
        }
    }
  },

}
</script>
