<template>
  <div id="wizard">
    <div id="content">
        <NameDatesPriorityForm id="step" v-show="stepIndex == 0" @getData="setDataFromNameDatesPriorityForm"/>
        <CustomerAndPerformerForm id="step" v-show="stepIndex == 1" @getData="setDataFromCustomerAndPerformerForm"/>
        <ManagerForm id="step" v-show="stepIndex == 2" @getData="setDataFromManagerForm"/>
        <WorkerForm id="step" v-show="stepIndex == 3" @getData="setDataFromWorkersForm"/>
        <DocumentForm id="step" v-show="stepIndex == 4" @getData="setDocuments"/>
    </div>
    
    <div id="navigation">
        <label id="worningLabel">{{ messageText }}</label>
        <NavigationTabs :stepIndex="stepIndex" :stepCount="stepsCount" @next="handleNext" @prev="handlePrevious" @create="sendForm"/>
    </div>
    
  </div>
</template>

<script>
import NameDatesPriorityForm from './NameDatesPriorityForm.vue'
import CustomerAndPerformerForm from './CustomerAndPerformerForm.vue'
import ManagerForm from './ManagerForm.vue'
import WorkerForm from './WorkerForm.vue'
import NavigationTabs from './NavigationTabs.vue'
import DocumentForm from './DocumentForm.vue'
import { createProject } from '../data/projectData'

export default {
    components: {NameDatesPriorityForm, CustomerAndPerformerForm, ManagerForm, WorkerForm, NavigationTabs, DocumentForm},
    data(){
        return {
            //navigation data
            stepIndex: 0,
            stepsCount: 5,
            stepsDone: [], //indecates which steps have been performed

            //components data
            name: '',
            startDate: null,
            endDate: null,
            priority: null,
            customerName: '',
            performerName: '',
            managerId: null,
            workerIds: [],
            documents: [],

            messageText: ''
        }
        
    },

    mounted() {
        for (let i = 0; i < this.stepCount; i++) {
            this.stepsDone.push(false)
        }
    },

    methods: {
        async sendForm() {
            //fetching data
            if(this.isAllDataFilled()) {
                createProject(this.name, this.startDate, this.endDate, this.priority, this.customerName, this.performerName, this.managerId, this.workerIds)
                location.reload()
                console.log("created")
            }
            else
                this.messageText = 'Please, fill in all of the following data.'
        },

        handleNext() {
            if(this.stepsDone[this.stepIndex]) {
                this.stepIndex++
                this.messageText = ''
            }
            else {
                this.messageText = 'Please, fill in all of the following data.'
            }
        },

        handlePrevious() {
            this.stepIndex--
            this.messageText = ''
        },

        setStepDone(data) {
            //sets this.stepsDone[this.stepIndex] to false if one of the data element not been set
            for (let i = 0; i < data.length; i++) {
                if(data[i] == null || data[i] === '') {
                    this.stepsDone[this.stepIndex] = false
                    return
                }
            }

            this.stepsDone[this.stepIndex] = true
        },

        isAllDataFilled() {
            return this.name && this.startDate && this.endDate && this.priority != null && this.customerName && this.performerName && this.managerId != null && this.documents.length > 0 && this.workerIds.length > 0
        },

        //setting data from components

        setDataFromNameDatesPriorityForm(name, startDate, endDate, priority) {
            if(startDate < endDate) {
                this.name = name
                this.startDate = startDate.toString()
                this.endDate = endDate.toString()
                this.priority = priority
                this.setStepDone([name, startDate, endDate, priority])
                this.messageText = ""
            }
            else {
                this.messageText = "Start date sould be earlier than end date"
                this.stepsDone[this.stepIndex] = false
            } 
            
        },

        setDataFromCustomerAndPerformerForm(customerName, performerName) {
            this.customerName = customerName
            this.performerName = performerName

            this.setStepDone([customerName, performerName])
        },

        setDataFromManagerForm(manager) {

            if(manager) {
                this.managerId = manager.id
                this.setStepDone([manager])
            }

        },

        setDataFromWorkersForm(workers) {

            this.workerIds = []

            for (let i = 0; i < workers.length; i++) {
                const worker = workers[i];
                this.workerIds.push(worker.id)
            }

            if (workers.length > 0)
                this.stepsDone[this.stepIndex] = true
            else
                this.stepsDone[this.stepIndex] = false
        },

        setDocuments(files) {
            this.documents = files

            this.setStepDone([files])
        }
    }
}
</script>

<style>
div{
    display: flex;
    flex-direction: column;
    gap: 10px;
}

label{
    margin-top: 20px;
}

#worningLabel {
    color: red;
}

#wizard {
    justify-content: space-between;
}
</style>