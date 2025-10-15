export const getContactMailHTML = (
  name: string,
  email: string,
  subject: string,
  message: string
) => `
<div style="font-family: Arial, sans-serif; line-height:1.5; padding: 20px;">
  <div style="color:#777; font-size:14px;">Kimden: <strong>${name} &lt;${email}&gt;</strong></div>
  <h2 style="color:#333;">${subject}</h2>
  <div style="color:#555;">${message}</div>
</div>
`;
