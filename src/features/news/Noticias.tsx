import { NewsContainer, NewsList, NewsTitle } from "./styled";
import { useNews} from "./hook/useNews";
import { Card }from "./components/Tarjeta";
import { Modal } from "./components/Modal";

const Noticias = () => {
  const { noticias, modal, setModal } = useNews();

  return (
    <NewsContainer>
      <NewsTitle>Noticias de los Simpsons</NewsTitle>
      <NewsList>
        {noticias.map((n) => (
          <Card noticia={n} setModal={setModal} />
        ))}
        {modal ? ( <Modal modal={modal} setModal={setModal} />
         ) : null}
      </NewsList>
    </NewsContainer>
  );
};

export default Noticias;

/*
Utilice el principio SOLID de Principio de responsabilidad única  o Single Responsibility Principle (SRP): 
Este principio establece que separa el componente en varios y cada uno con su respectiva responsabilidad
    Noticias: Se encarga de la presentación y estructura de la lista de noticias.
    Card: Se encarga de la presentación individual de cada noticia (puede representar un "elemento" de la lista).
    Modal: Se encarga de la presentación y lógica del modal para ver detalles de una noticia.
 */