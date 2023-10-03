
const getQuestionsGroup = (ws, firstRow, lastRow) => {
    return {
      title: ws[`A${firstRow}`]?.v,
      averageValue: ws[`E${lastRow}`]?.v,
      averageText: ws[`D${lastRow}`]?.v,
      questions: Array.from(Array(lastRow - 1 - (firstRow + 1) + 1).keys(), (num) => num + firstRow + 1).map(index => ({
        text: ws[`A${index}`]?.v,
        scoreValue: ws[`E${index}`]?.v,
        scoreText: ws[`D${index}`]?.v,
        comment: ws[`F${index}`]?.v
      }))
    }
  }
  
  export const parseSustainabilityWorksheet = (worksheet) => {
    return [
      {
        title: worksheet['A3']?.v,
        groups: [
          getQuestionsGroup(worksheet, 4, 10),
          getQuestionsGroup(worksheet, 11, 14),
          getQuestionsGroup(worksheet, 15, 17),
          getQuestionsGroup(worksheet, 18, 21),
        ]
      },
      {
        title: worksheet['A22']?.v,
        groups: [
          getQuestionsGroup(worksheet, 23, 26),
          getQuestionsGroup(worksheet, 27, 32),
          getQuestionsGroup(worksheet, 33, 38),
        ]
      },
      {
        title: worksheet['A39']?.v,
        groups: [
          getQuestionsGroup(worksheet, 40, 43),
          getQuestionsGroup(worksheet, 44, 49),
          getQuestionsGroup(worksheet, 50, 56),
          getQuestionsGroup(worksheet, 57, 62),
          getQuestionsGroup(worksheet, 63, 66),
        ]
      },
      {
        title: worksheet['A67']?.v,
        groups: [
          getQuestionsGroup(worksheet, 68, 71),
          getQuestionsGroup(worksheet, 72, 75),
          getQuestionsGroup(worksheet, 76, 80),
          getQuestionsGroup(worksheet, 81, 84),
        ]
      },
      {
        title: worksheet['A85']?.v,
        groups: [
          getQuestionsGroup(worksheet, 86, 91),
          getQuestionsGroup(worksheet, 92, 95),
          getQuestionsGroup(worksheet, 96, 100),
        ]
      },
      {
        title: worksheet['A101']?.v,
        groups: [
          getQuestionsGroup(worksheet, 102, 106),
          getQuestionsGroup(worksheet, 107, 110),
          getQuestionsGroup(worksheet, 111, 115),
        ]
      }
    ]
  }