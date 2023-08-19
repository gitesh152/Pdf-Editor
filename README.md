<a name="readme-top"></a>

<div align="center" >
  <a href="https://github.com/gitesh152/Pdf-Editor">
    <img src="https://res.cloudinary.com/dm34wmjlm/image/upload/v1692397554/Pdf-Editor/pdf-editor-logo_tmfbuk.png" alt="Logo" width="80" height="80">
    <h3 align="center">Pdf-Editor</h3>
  </a>

  <p align="center">
    A simple pdf-editor to edit pdf form fields, developed using MongoDB, NestJS and ReactJS.
    <br />
    <!-- <br />
    <a target="_blank" href="https://talk-a-tive-qnvn.onrender.com/" >Live Preview</a>
    <br />
    (wait for app server to restart from sleep ...) -->
  </p>
</div>

<!-- TABLE OF CONTENTS -->

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <a href="#screenshots">Screenshots</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This is Pdf-Editor app where users can upload or select pdf(from database) with form,

then edit form values, save pdf and download edited pdf with same name. 

As user upload or select pdf, he/she will have canvas of uploaded or selected pdf.
User will also have a form to edit PDF form values.

When user save edited pdf to database, he/she will have canavas of edited pdf
and also download button to download pdf.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## screenshots

Upload PDF
![Screenshot](https://res.cloudinary.com/dm34wmjlm/image/upload/v1692398727/Pdf-Editor/SS/pdf-editor-home_respxz.png)

Uploaded/Selected PDF Preview
![Screenshot](https://res.cloudinary.com/dm34wmjlm/image/upload/v1692398726/Pdf-Editor/SS/pdf-editor-pdfUpload_oyjyq0.png)

Edit, Save and Download PDF
![Screenshot](https://res.cloudinary.com/dm34wmjlm/image/upload/v1692398727/Pdf-Editor/SS/pdf-editor-editedanddownloadPdf_wuf95d.png)


<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

<ol>
<li>MongoDB(MongooseJS)</li>
<li>ExpressJS</li>
<li>ReactJS</li>
<li>NodeJS</li>
<li>NestJS</li>
</ol>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Get started with setting up project in a environment.

### Prerequisites

Install npm (node package manager)

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

Get clone of git repository.

1. Clone the repo
   ```sh
   git clone https://github.com/gitesh152/Pdf-Editor.git
   ```
2. Goto the project folder
   ```sh
   cd Pdf-Editor
   ```
3. Create .env file and store environment variables
   ```js
   touch .env
   ```
4. Install NPM packages in backend folder
   ```sh
   npm run build
   ```
5. Start backend server
   ```sh
   npm start
   ```
6. Create new terminal and goto frontend folder
   ```js
   cd frontend
   ```
7. Start frontend server
   ```sh
   npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

This project is a powerful demonstration of tool for pdf editing in the browser.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Backend with NestJS and ExpresJS for backend endponits
- [x] Frontend with ReactJS and Bootstrap for frontend interface
- [ ] Deployment 

See the [open issues](https://github.com/gitesh152/Pdf-Editor/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Gitesh Kumar

[@LinkedIn](https://www.linkedin.com/in/gitesh-kumar-an5h/) - https://www.linkedin.com/in/gitesh-kumar-an5h/

[@Gmail](https://mail.google.com/mail/u/0/?fs=1&to=gitesh152@gmail.com&su=SUBJECT&body=BODY&tf=cm) - gitesh152@gmail.com/

Project Link: [https://github.com/gitesh152/Pdf-Editor](https://github.com/gitesh152/Pdf-Editor)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

These are some more useful libraries and resources used in project

<ol>
<li>Bootstrap5</li>
<li>fetch api</li>
<li>...</li>
</ol>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
