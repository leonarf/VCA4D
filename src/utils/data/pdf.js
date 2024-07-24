
export async function getBriefPdfPath(studyId) {
  let pdfUrl = `${window.location.origin}${import.meta.env.DEV ? '/' : '/../VCA4D/'}data/${studyId}/${studyId}-brief-report.pdf`
  let res = await fetch(pdfUrl, { method: 'HEAD' })
  if (res.status === 200) {
      return pdfUrl;
  }
  console.log("got status", res.status, "for pdf", pdfUrl)
  return null
}

async function getFullReportPdfPath(studyId) {
  let pdfUrl = `${window.location.origin}${import.meta.env.DEV ? '/' : '/../VCA4D/'}data/${studyId}/${studyId}-full-report.pdf`
  let res = await fetch(pdfUrl, { method: 'HEAD' })
  if (res.status === 200) {
      return pdfUrl;
  }
  console.log("got status", res.status, "for pdf", pdfUrl)
  return null
}

export async function getStudyPdfUrls(studyId) {
  return {
      fullReportPdfUrl: await getFullReportPdfPath(studyId),
      briefReportPdfUrl: await getBriefPdfPath(studyId)
  }
}
