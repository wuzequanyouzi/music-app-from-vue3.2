export const privatecontentTranslator = (data: any) => {
  Array.isArray(data) &&
    data.forEach(content => {
      content._picUrl = content.picUrl;
      content.picUrl = content.sPicUrl;
    });
  return data;
};
