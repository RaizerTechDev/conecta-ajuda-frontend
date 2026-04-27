import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Header } from "../../components/Header"; 
import  { Footer } from "../../components/Footer";
import logoConectaAjuda from "../../assets/images/logo-conecta-ajuda.png";
import "./styles.scss";

export function Home() {
  const palavras = ["inteligência", "agilidade", "propósito", "estratégia", "conexão"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % palavras.length);
    }, 3000);
    return () => clearInterval(intervalo);
  }, []);

  const handleNavigate = (path) => {
    window.open(path, "_blank");
  };

  return (
    <div className="home-container">
      <Header />  

      <main className="hero">
        <div className="hero-content">
          <h1>
            Solidariedade que se move com{" "}
            <em className="word-rotate">{palavras[index]}</em>.
          </h1>
          
          <p className="description-list">
            Escolha um ponto de coleta e veja como ajudar agora: cadastre-se como administrador, voluntário ou doador.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => handleNavigate("/dashboard")}>
              Ver Lista de Necessidades <Heart size={20} />
            </button>

            <button className="btn-secondary" onClick={() => handleNavigate("/cadastro")}>
              Criar Cadastro
            </button>
          </div>
        </div>

        <div className="hero-image">
          <img src={logoConectaAjuda} alt="Conecta Ajuda - Gestão de Doações" />
        </div>
      </main>
      <Footer />
    </div>   
  );
}