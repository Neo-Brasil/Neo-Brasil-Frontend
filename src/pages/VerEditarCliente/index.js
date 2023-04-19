import Header from "../../components/Header/index.tsx";

import Pessoal from './Pessoal';
import Endereco from './Endereco';
import Titulo from './Titulo';

import React, { useState } from "react"

import MultiStepProgressBar from "../../components/MultiStepProgressBar";


export default function VerEditarCliente() {
  const [page, setPage] = useState("pageone");

  const nextPage = (page) => {
    setPage(page);
  };

  const nextPageNumber = (pageNumber) => {
    switch (pageNumber) {
      case "1":
        setPage("pageone");
        break;
      case "2":
        setPage("pagetwo");

        break;
      case "3":
        setPage("pagethree");
        break;
      default:
        setPage("1");
    }
  };

  return (
    <div>
      <Header />
      <div className="content">
        <h1>Visualizar e editar cliente</h1>
        <MultiStepProgressBar page={page} onPageNumberClick={nextPageNumber} />
        {
          {
            pageone: <Pessoal onButtonClick={nextPage} />,
            pagetwo: <Endereco onButtonClick={nextPage} />,
            pagethree: <Titulo onButtonClick={nextPage} />
          }[page]
        }
      </div>
    </div>
  );
}