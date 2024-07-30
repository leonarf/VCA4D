let studiesAttachment = {}
export async function getStudyFileAttachmentUrl(studyId, attachementType) {
  if (studiesAttachment[studyId] == undefined) {
    studiesAttachment[studyId] = {}
  }
  if (studiesAttachment[studyId][attachementType] == undefined) {
    let attachmentUrl = `${window.location.origin}${import.meta.env.DEV ? '/' : '/../VCA4D/'}data/${studyId}/${studyId}-${attachementType}`
    let res = await fetch(attachmentUrl, { method: 'HEAD' })
    if (res.status === 200) {
      studiesAttachment[studyId][attachementType] = attachmentUrl;
    }
    else {
      console.log("got status", res.status, "for attachment", attachmentUrl)
      studiesAttachment[studyId][attachementType] = null;
    }
  }
  return studiesAttachment[studyId][attachementType]
}

export async function getStudyPdfUrls(studyId) {
  return {
    fullReportPdfUrl: await getStudyFileAttachmentUrl(studyId, 'full-report.pdf'),
    briefReportPdfUrl: await getStudyFileAttachmentUrl(studyId, 'brief-report.pdf'),
  }
}
