<template>
    <article>
        <h1>Is the value chain environmentally sustainable? </h1>

        <h2>Which step in the chain has most impact ?</h2>
        <p>Environmental sustainability of a value chain should rather be assessed by product. 
            And yet, specific policies or project may be developped in order to improve the 
            sustainability of a step or of some actors to improve the overall sustainability 
            of the value chain.</p>

        <section class="climate-change">
            <h3>Climate change</h3>

            <h4>Proportions des impacts sur le réchauffement climatique</h4>

            <p class="TODO">Descriptif de l’indicateur. Empreinte carbone calculée en kg d’équivalent CO2)</p>

            <ol v-if="studyData">
                <li v-for="{value, label, cssClass} in climateImpactPerStep.perStep" 
                    :style="'width: ' + (value*100/climateImpactPerStep.max) + '%;'"
                    :class="cssClass"
                    :title="value">
                    <div>{{ label }}</div>
                </li>
            </ol>
        </section>

        <section class="human-health">
            <h3>Human health</h3>

            <ol v-if="studyData">
                <li v-for="{value, label} in humanHealthImpactPerStep.perStep">
                    <div class="bar-space" :title="value">
                        <div class="bar" :style="'height: ' + (value*100/humanHealthImpactPerStep.max) + '%;'"></div>
                    </div>
                    <div>{{ label }}</div>
                </li>
            </ol>
        </section>

    </article>

</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<script>
//@ts-check

import '../types.js'

export default {
    name: 'StudyEnvironment',
    props: ['studyData'],
    data() {
        return {
        }
    },
    computed: {
        climateImpactPerStep(){
            if(this.studyData){
                /** @type {StudyData} */
                const studyData = this.studyData
                const globalWarmingPerStep = studyData.environment.impacts["mid-points"]["Global-warming"]

                const perStep = Object.entries(globalWarmingPerStep).map(([label, value]) => {
                    return {
                        cssClass: label.toLowerCase(),
                        label, 
                        value: Math.max(0, value) // ignoring negative values for now. PPP : properly handle the case
                    }
                });
            
                return {
                    perStep,
                    max: Math.max(...perStep.map(({value}) => value))
                }
            }
        },
        humanHealthImpactPerStep(){
            if(this.studyData){
                /** @type {StudyData} */
                const studyData = this.studyData
                const humanHealthImpacts = studyData.environment.impacts["human-health"]

                const byStepHumanHealthImpacts = new Map();

                for(const byStepHumanHealthImpact of Object.values(humanHealthImpacts)){
                    for(const [step, value] of Object.entries(byStepHumanHealthImpact)){
                        if(!byStepHumanHealthImpacts.has(step)){
                            byStepHumanHealthImpacts.set(step, 0)
                        }

                        byStepHumanHealthImpacts.set(step, value + byStepHumanHealthImpacts.get(step))
                    }   
                }


                const perStep = [...byStepHumanHealthImpacts].map(([label, value]) => {
                    return {
                        label, 
                        value: Math.max(0, value) // ignoring negative values for now
                    }
                });
            
                return {
                    perStep,
                    max: Math.max(...perStep.map(({value}) => value))
                }
            }
        }
    }
}
</script>

<style scoped lang="scss">
@import '../../style/colors.scss';

pre{
    font-size: 8px;
}

article {

    section.climate-change, section.human-health{
        ol{
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: flex-start;

            list-style: none;
            margin: 0;

            height: 3rem;

            li{
                height: 100%;

                &.agricultural-production{
                    background-color: $step-agricultural-production-color;
                }
                &.collection{
                    background-color: $step-collection-color;
                }
                &.processing{
                    background-color: $step-processing-color;
                }
                &.wholesale{
                    background-color: $step-wholesale-color;
                }
                &.retail{
                    background-color: $step-retail-color;
                }
                &.export{
                    background-color: $step-export-color;
                }
                &.transport{
                    background-color: $step-transport-color;
                }
            }
        }
    }

    section.climate-change .bar-space .bar{
        background-color: brown;
    }
    
    
    section.human-health .bar-space .bar{
        background-color: pink;
    }
}

</style>