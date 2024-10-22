import legendaNTI from '../assets/marca-nti.png';
import legendaPrefeitura from '../assets/marca-prefeitura.png';

export function Footer() {
  return (
    <footer className="py-4 bg-light mt-auto">
         <div className="container-fluid fixed-bottom d-flex align-items-center p-3" style={{ backgroundColor: "#aad3ee", color: "#8D8D99"}}>
          <div className="col-7 px-5 fs-5 fw-normal lh-1" style={{color: '#8D8D99'}}>
            <p className="">2023 - SMS - Secretaria Municipal de Saúde - Todos os Direitos Reservados</p>
          </div>
          <div className="col-4 d-flex gap-4">
            <img src={legendaNTI} style={{width: 130, color:'#8D8D99' }} />
            <img src={legendaPrefeitura} style={{width: 130, color:'#8D8D99'}} />
          </div>
      </div> 
    </footer>
  );
}
