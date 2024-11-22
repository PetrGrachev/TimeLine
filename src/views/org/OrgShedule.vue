<template>
    <div class="order-history">
        <nav class="top-nav">
            <button>Cотрудники</button>
            <button>Слоты</button>
        </nav>
        <EmployeeCard/>
        <div class="plus-card">
            <button @click="openDialog">+</button>
        </div>
        <EmployeeDialog :isVisible="isVisible" :employee="employee" @update:isVisible="isVisible = $event" />
    </div>
</template>


<script>
import EmployeeCard from '../../components/EmployeeCard.vue';
import EmployeeDialog from '../../components/dialog/EmployeeDialog.vue';
export default{
    components:{
        EmployeeCard,
        EmployeeDialog,
    },
    data(){
        return {
            isVisible: false,
            employee: {
          position: "",
          name: "",
          work_time: "",
          degree: "",
          photo: null,
        },
        }
    },
    methods: {
        openDialog() {
            this.isVisible = true;
        },
    },
}
</script>
<style>
.order-history {
    margin-top: 20px;
    width: 100%;
}
.top-nav {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.top-nav button {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  background-color: var(--input-background-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.top-nav button.active {
  background-color: #0F4EB3;
  color: var(--input-background-color);
}

.top-nav button:hover {
  background-color: var(--button-hover);
}
.plus-card {
    border-radius: 8px;
    border: 1px solid var(--border-color);
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
}

.plus-card button {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: none;
    background-color: #0F4EB3;
    color: white;
    font-size: 24px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.plus-card button:hover {
    background-color: #1A6CDB;
}
</style>