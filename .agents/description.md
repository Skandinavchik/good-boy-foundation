# Assignement for Frontend developer - GoodRequest

The goal of the task is to create a simple application in Next.js that serves as a form for the GoodBoy Foundation to support Slovak shelters for dogs.

**The application should allow potential supporters to:**

- choose the form of help- a general donation for the foundation or a donation for a specific shelter
- select a specific shelter from a list of participating shelters (optional field for a general donation, mandatory field if donating to a specific shelter)
- choose the amount of the donation, with the possibility to set a custom value (mandatory field)
- fill in their personal details:
    - name – optional field (2-20 characters)
    - surname – mandatory field (2-30 characters)
    - e-mail – valid format of the e-mail address
    - phone – Slovak or Czech number with the country code +420 / +421, showing the selected country flag
    - confirm consent for personal data processing (mandatory field)
    - submit the validated form, or clearly notify the user of any errors
- view the contact details of the organization on the Contact page
- see the total amount raised and the number/list of donors (these data are regularly updated and accessible through the API endpoint described below)

For the purpose of this assignment, we have created 3 simple API endpoints: a GET for the list of shelters participating in the project, a GET for the total amount raised and the number of donors, and a POST for submitting the form content. You can find the documentation for these endpoints at the following link: https://frontend-assignment-api.goodrequest.dev/apidoc/

Design assets for the assignment can be found at the following link (registration to Figma tool is free): https://www.figma.com/design/Kj6FmFL82gHVpqpsRLoGtk/Frontend-Assignment-2.0--Copy-?node-id=369-662&t=R2ogL0guvdPnDLfp-0

The visual quality of the application and styling is also part of the evaluation. A smooth and user-friendly UI with nice transitions and animations will earn extra points. Use Shadcn UI library.

**Criteria for technologies to use:**

- Use Next.js
- Use TypeScript
- Use [TanStack Query](https://tanstack.com/query/latest) for server state management
- Use a client state management solution (The choice is yours. We recommend context + reducer, zustand or other )
- Use a library for form management (We recommend [react-hook-form](https://www.react-hook-form.com/), formik)
- You are free to decide the project structure, but we will evaluate it. :)

* Nice to have (optional criteria):

  - Use a localization library for strings (e.g., i18next)
  - Use styled-components
  - Form validation using a [Zod](https://zod.dev/) schema
  - Consider accessibility (https://www.goodrequest.com/en/blog/web-accessibility-for-developers)
    

* If you have some spare time :):
  - Responsive design
  - SEO (implement og:image and various titles and descriptions on different form steps)
  - Allow adding multiple donors – it's up to you how this will look
