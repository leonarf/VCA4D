import jsonData from '../../data/data.json'

export const geAllJsonData = () => {
    const localStudy = JSON.parse(localStorage.getItem('localStudyProperties'))
    if (!localStudy) {
        return jsonData
    }
    const category = jsonData.categories.find(category => category.prettyName === localStudy.category)
    return {
        ...jsonData,
        studies: [
            ...jsonData.studies,
            {
                category: category ? category.id : 'unknown',
                country: localStudy.country.toLowerCase(),
                id: localStudy.id,
                product: localStudy.commodity.toLowerCase(),
                title: ["Local", localStudy.commodity, localStudy.year].join(' '),
                year: localStudy.year,
                local: true
            }
        ]
    }
}