<template>
    <article>
        <h1>Overview</h1>
        <section class="introduction">
            <h2>Main steps in the value chain</h2>
            <ol>
                <li>
                    <img class="TODO" alt="agricultural production illustration">
                    <strong>Agricultural production</strong>
                    <p class="TODO">The cow farmers producing milk, animals and manure using various 
                        techniques: stabling, grazing and mixes thereof.</p>
                </li>
                <li>
                    <img class="TODO" alt="collection illustration">
                    <strong>Collection</strong>
                    <p class="TODO">Collection is typically done by bike using 4 twenty-liters milk cans.</p>
                </li>
                <li>
                    <img class="TODO" alt="Processing illustration">
                    <strong>Processing</strong>
                    <p class="TODO">Mostly done in artisanal dairy (making yoghurt and cheese), but also 
                        in 10-15 semi-industrial facilities with more modern equipment 
                        and 1 industrial facility.</p>
                </li>
                <li>
                    <img class="TODO" alt="Wholesale illustration">
                    <strong>Wholesale</strong>
                    <p class="TODO">Assembles milk from individual collectors. The wholesaler generally 
                        takes care of pasteurizing the milk and then sends it by truck to retailers.</p>
                </li>
                <li>
                    <img class="TODO" alt="Retail illustration">
                    <strong>Retail</strong>
                    <p class="TODO">Either taking place in milk bars or through 
                        subscription-based milk distributing services, by bike.</p>
                </li>
            </ol>
        </section>

        <section>
            <h2>The various actors and their share in the flows of the value chain</h2>
            <div class="TODO">Sankey diagram</div>
        </section>


        <section v-if="studyData" class="explore">
            <h2>Explore the 4 dimensions of the value chain</h2>
            
            <!--
            <p class="TODO">
                Implémenter l'idée de Sofia où on reprend les 4 dimensions
                avec pour chacune le sous-menu
                et aucun graphique
                et juste un lien vers la section correspondante

            </p>
            -->
            <RouterLink :to="'/study?id=' + studyData.id + '&view=economics'">
                <h3>Contribution to growth</h3>
                <p>Learn more about <em>Contribution to GDP</em>, <em>Public finances</em>, 
                    <em>Balance of trade</em> and <em>Viability in international economy</em></p>
            </RouterLink>
            <RouterLink :to="'/study?id=' + studyData.id + '&view=inclusiveness'">
                <h3>Inclusiveness</h3>
                <p>Learn more about <em>Employment</em>, <em>Profits distribution across actors</em> and 
                    <em>Impact of governance</em></p>
            </RouterLink>
            <RouterLink :to="'/study?id=' + studyData.id + '&view=social'">
                <h3>Social sustainability</h3>
                <p>Learn more about <em>Working conditions</em>, <em>Land and water rights</em>, 
                    <em>Gender equality</em>, <em>Food & nutrition security</em>,
                    <em>Social capital</em> and
                    <em>Living conditions</em>
                </p>
            </RouterLink>
            <RouterLink :to="'/study?id=' + studyData.id + '&view=environment'">
                <h3>Environmental sustainability</h3>
                <p>Learn more about <em>Climate change</em>, <em>human health</em> and
                    <em>Ecosystems</em> </p>
            </RouterLink>

        </section>


        <section>
            <h2>Where these data come from?</h2>
            <p>
                <a href="../study-briefs/VCA4D 25- Mali cashew_0.pdf" target="_blank">Download the 6-page report</a>
            </p>
            <p>
                <a href="https://europa.eu/capacity4dev/value-chain-analysis-for-development-vca4d-/wiki/221-mali-cashew" target="_blank">Go to full study</a>
            </p>

            <section>
                <h3>Study conclusion</h3>
                <p>La CV anacarde au Mali est moins développée que dans les pays voisins en Afrique 
                    de l'Ouest, mais elle crée de la valeur ajoutée et de la croissance inclusive pour 
                    les acteurs. Le principal levier pour améliorer sa performance et sa durabilité se 
                    situe au niveau de la transformation. Il pourrait être envisagé la création de 
                    20-40 unités de transformation semi-industrielles/ artisanales de noix brutes 
                    en amandes et de pommes en jus. Ces créations pourraient se faire sous forme 
                    d'entreprises privées ou de coopératives, offrant des avantages en matière d'intégration 
                    de plusieurs activités de transformation, d'intégration de plusieurs étapes de la CV, 
                    de renforcement du pouvoir de négociation des producteurs, d'accès aux équipements et 
                    connaissances pour augmenter les rendements.
                </p>
                <p>Une plus grande efficience des processus techniques et de gestion de la production
                    et de la transformation doit être encouragée à tous les niveaux de la 
                    CV : efficience des rendements agronomiques, efficience énergétique, 
                    efficience générale de la productivité des unités de transformation, efficience 
                    du marketing...</p>
                <p>La durabilité sociale de la CV est exposée à plusieurs risques qui demandent
                    de la vigilance : exposition de la main d'œuvre aux travaux pénibles et/ou 
                    dangereux, fragilisation sociale et alimentaire des exploitations agricoles 
                    familiales, marginalisation et/ou accroissement de la dépendance des femmes et 
                    autres couches vulnérables, réduction de la part des producteurs dans les revenus de la CV.
                </p>
                <p>Un accent particulier doit être mis sur la fonctionnalité des organisations 
                    de producteurs notamment par le renforcement du leadership et de la bonne 
                    gouvernance. Il faut renforcer les capacités d'accès des producteurs et de leurs 
                    organisations à l'information, en particulier à l'information sur les politiques 
                    agricoles, sur les prix de marché et sur l'organisation de la CV, dans le but d'améliorer 
                    les relations de confiance entre les acteurs des différents segments et entre ces acteurs 
                    et leurs partenaires publics et privés nationaux et étrangers.</p>
                <p>Des marges d'amélioration existent également pour la durabilité environnementale, 
                    elles résident dans l'exploration des possibilités et des effets d'une valorisation 
                    par les plantations d'anacarde des terres dégradées par l'orpaillage ; et dans la 
                    valorisation des coques d'anacarde pour remplacer le bois de feu.</p>
            </section>

        </section>

    </article>

</template>

<script setup>
import { RouterLink } from 'vue-router'

</script>

<script>
//@ts-check

export default {
    name: 'StudyOverview',
    props: ['studyData'],
    data() {
        return {
        }
    }
}
</script>

<style scoped lang="scss">

article {
    section.introduction{
        ol{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;

            list-style: none;
            margin: 0;

            li{
                width: 18%;

                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;

                img{
                    width: 70%;
                    height: 5rem;
                    margin-bottom: 1rem;
                }
            }
        }
    }

    section.explore{
        a{
            display: block;
            width: 100%;
            min-height: 6rem;

            padding: 1rem;
            margin-bottom: 1rem;

            position: relative;

            color: unset;
            text-decoration: none;

            background-color: bisque;
            border-radius: 1rem;

            h3{
                text-transform: uppercase;
                margin: 0;
            }

            p{
                margin: 0;
            }
            
            &::after{
                content: '→';
                
                color: blue;
                font-size: 2rem;

                position: absolute;
                right: 1rem;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }

}

</style>