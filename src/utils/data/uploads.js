let studiesAttachment = {}

export async function getStudyUploadUrls(studyId) {
  return {
    fullPdf: await getStudyFileAttachmentUrl(studyId, 'full-report.pdf'),
    briefPdf: await getStudyFileAttachmentUrl(studyId, 'brief-report.pdf'),
    ecoXlsx: await getStudyFileAttachmentUrl(studyId, 'eco.xlsx'),
    socialXlsx: await getStudyFileAttachmentUrl(studyId, 'social.xlsx'),
    acvXlsx: await getStudyFileAttachmentUrl(studyId, 'acv.xlsx'),
  }
}

async function getStudyFileAttachmentUrl(studyId, attachementType) {
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
      studiesAttachment[studyId][attachementType] = null;
    }
  }
  return studiesAttachment[studyId][attachementType]
}
