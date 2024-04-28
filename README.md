# HAMM

Healthcare Administration and Medical Management

### Setup

##### Backend

-   Install miniconda
    https://docs.anaconda.com/free/miniconda/miniconda-install/
-   Create a conda environment from the environment.yaml template
    `conda env create -f environment.yml`
-   Activate the conda environment to start testing the backend
    `conda activate HAMM`
-   cd into the 'HAMM/backend/' directory `cd backend`
-   Run a development server ` uvicorn main:app --reload`

##### Frontend

Install [Node.js](https://nodejs.org/en)

Install dependencies

```bash
npm i
```

Set environment variables

```bash
To run this project, you need to set the required environment variables. Create a new file called `.env` and fill in the values.
```

Start the local development server on http://localhost:3000

```bash
npm run dev
```
