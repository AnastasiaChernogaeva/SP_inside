.<template>
<div>
    <div class="center">
    <el-button-group >
       <router-link to="/addNewOne" class="el-link" type="primary">
            <el-button type="primary" icon="el-icon-arrow-left"
              >Add New Pet
            </el-button>
        </router-link>
        <router-link to="/" class="el-link" type="primary">
        <el-button type="primary"
          >Main<i class="el-icon-arrow-right el-icon-right"></i
        ></el-button>
        </router-link>
      </el-button-group>
</div>
 <div v-if="pets">
   <div v-for="(pet, idx) of pets" :key="pet.id">
     <el-container> 
      <el-aside width="200px"><img :src="pet.photo" v-if="pet.photo"/><span v-else>No photo</span></el-aside>
      <el-container>
       <el-header>
         <h1>{{pet.fullPetName}}</h1>
         
                <el-row>
                  <el-button icon="el-icon-search" circle></el-button>
                  <el-button type="primary" icon="el-icon-edit"  @click="editPet(pet)" circle></el-button>
                  <el-button type="warning" icon="el-icon-star-off" circle></el-button>
                  <el-button type="danger" icon="el-icon-delete"  @click="deletePet(pet)" circle></el-button>
                </el-row>
        </el-header>
        <el-main>
          <ul>
        <li>
          <b>Full Pet Name:</b>
         {{pet.fullPetName}}
       </li>
       <li>
          <b>Nick Name:</b>
         {{pet.nickname}}
       </li>
       <li>
          <b>Kind:</b>
         {{pet.kind}}
       </li>
       <li>
          <b>Gender:</b>
         {{pet.gender}}
       </li>
       <li>
          <b>Period of Life:</b>
         {{formatDate(pet.date1)}} - {{pet.date2?formatDate(pet.date2):'present days'}}
       </li>
       <li>
          <b>Weight, kilos:</b>
         {{pet.weight}}
       </li>
       <li>
          <b>Homeless:</b>
         {{pet.homeless?'Yes':'No'}}
       </li>
       <li>
          <b>Pedigree:</b>
         {{pet.pedigree?'Yes':'No'}}
       </li>
       <li>
          <b>Passport:</b>
         {{pet.passport?'Yes':'No'}}
       </li>       
       <li>
          <b>Active Lifestyle:</b>
         {{pet.activeLifestyle}}
       </li>
       <li>
          <b>Activity Form:</b>
         {{pet.activityForm}}
       </li>
       <li>
          <b>Health Problems:</b>
         {{pet.diseases}}
       </li>
          </ul>
        </el-main>
        <el-footer>
          <h1>№ {{idx+1}}</h1>
        </el-footer>
      </el-container> 
    </el-container>
     <br>
   </div>
  

   <!-- <p>
    Words, words, words ... <br>
    What do you feel?<br>
    Nothing?<br>
    Yes))<br>
    It was a sad smile<br>
    Don't you think so?<br>
    A little bit<br>
   </p> -->
      
  </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      pets:[],
    }
  },
  methods:{
      formatDate(number) {
          let date = new Date(number)

          var dd = date.getDate();
          if (dd < 10) dd = '0' + dd;

          var mm = date.getMonth() + 1;
          if (mm < 10) mm = '0' + mm;

          var yy = date.getFullYear() % 100;
          if (yy < 10) yy = '0' + yy;

          return dd + '.' + mm + '.' + yy;
    },
    deletePet(pet){
      this.$store.commit("delete", pet)
    },
    editPet(pet){
      
    },
  },
  mounted(){
     this.pets = this.$store.state.allPetsForms
  },
  beforeMount() {
    this.$store.commit("loadPetCards")
  },

}
</script>

<style>
.el-header,
.el-footer {
  background-color: #CEF8FE;
  color: var(--el-text-color-primary);
  /* text-align: center; */
  line-height: 30px;
      display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
  /* line-height: 60px; */
}

.el-aside {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 200px;
  border-right: 2px solid grey;
}

.el-main {
  /* background-color: #d3dce6; */
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 30px;
  /* line-height: 160px; */

}
.el-main ul{
  list-style: none;
  text-align: left;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

img{
  margin-top:30%;
  width:12rem;
  height:11.5rem;
}
</style>
